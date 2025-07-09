"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createLinkSchema,
  updateLinkSchema,
  reorderLinksSchema,
  type CreateLinkInput,
  type UpdateLinkInput,
  type ReorderLinksInput,
} from "@/lib/schemas/link.schema";

export interface Link {
  id: string;
  title: string;
  url: string;
  description: string | null;
  iconUrl: string | null;
  emoji: string | null;
  isActive: boolean;
  order: number;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

// Re-export types for convenience
export type { CreateLinkInput, UpdateLinkInput, ReorderLinksInput };

export async function getLinksForProfile(userId: string): Promise<Link[]> {
  // First get or create profile
  const profile = await prisma.profile.findFirst({
    where: { userId },
    include: {
      links: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!profile) {
    return [];
  }

  return profile.links;
}

export async function createLink(userId: string, input: CreateLinkInput) {
  try {
    // Validate input
    const validatedData = createLinkSchema.parse(input);

    // Get or create profile
    let profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: { userId },
      });
    }

    // Get the highest order number for this profile
    const lastLink = await prisma.link.findFirst({
      where: { profileId: profile.id },
      orderBy: { order: "desc" },
    });

    const newOrder = lastLink ? lastLink.order + 1 : 0;

    const link = await prisma.link.create({
      data: {
        title: validatedData.title,
        url: validatedData.url,
        description: validatedData.description || null,
        iconUrl: validatedData.iconUrl || null,
        emoji: validatedData.emoji || null,
        profileId: profile.id,
        order: newOrder,
      },
    });

    revalidatePath(`/dashboard`);
    return { success: true, data: link };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      };
    }
    console.error("Error creating link:", error);
    return { success: false, error: "Failed to create link" };
  }
}

export async function updateLink(linkId: string, input: UpdateLinkInput) {
  try {
    // Validate input
    const validatedData = updateLinkSchema.parse(input);

    // Prepare data for Prisma, converting undefined to null for optional fields
    const updateData: Partial<{
      title: string;
      url: string;
      description: string | null;
      iconUrl: string | null;
      emoji: string | null;
      isActive: boolean;
    }> = {};

    if (validatedData.title !== undefined)
      updateData.title = validatedData.title;
    if (validatedData.url !== undefined) updateData.url = validatedData.url;
    if (validatedData.description !== undefined) {
      updateData.description = validatedData.description || null;
    }
    if (validatedData.iconUrl !== undefined) {
      updateData.iconUrl = validatedData.iconUrl || null;
    }
    if (validatedData.emoji !== undefined) {
      updateData.emoji = validatedData.emoji || null;
    }
    if (validatedData.isActive !== undefined)
      updateData.isActive = validatedData.isActive;

    const link = await prisma.link.update({
      where: { id: linkId },
      data: updateData,
    });

    revalidatePath(`/dashboard`);
    return { success: true, data: link };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        details: error.errors,
      };
    }
    console.error("Error updating link:", error);
    return { success: false, error: "Failed to update link" };
  }
}

export async function deleteLink(linkId: string) {
  try {
    await prisma.link.delete({
      where: { id: linkId },
    });

    revalidatePath(`/dashboard`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting link:", error);
    return { success: false, error: "Failed to delete link" };
  }
}

// Optimized reorder links function with better performance and error handling
export async function reorderLinks(
  userId: string,
  input: ReorderLinksInput
): Promise<{ success: boolean; error?: string; data?: Link[] }> {
  try {
    // Validate input
    const { linkIds } = reorderLinksSchema.parse(input);

    if (linkIds.length === 0) {
      return { success: true, data: [] };
    }

    // Get the profile and verify ownership
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    // Verify all links belong to this profile and get current state
    const existingLinks = await prisma.link.findMany({
      where: {
        id: { in: linkIds },
        profileId: profile.id,
      },
      select: { id: true, order: true },
    });

    // Check if all requested links exist and belong to the user
    if (existingLinks.length !== linkIds.length) {
      const existingIds = new Set(existingLinks.map((link) => link.id));
      const missingIds = linkIds.filter((id) => !existingIds.has(id));
      return {
        success: false,
        error: `Links not found or access denied: ${missingIds.join(", ")}`,
      };
    }

    // Check if reordering is actually needed
    const currentOrder = existingLinks
      .sort((a, b) => a.order - b.order)
      .map((link) => link.id);

    if (JSON.stringify(currentOrder) === JSON.stringify(linkIds)) {
      // No change needed, return current state
      const links = await prisma.link.findMany({
        where: { profileId: profile.id },
        orderBy: { order: "asc" },
      });
      return { success: true, data: links };
    }

    // Perform atomic reordering using transaction
    const updatedLinks = await prisma.$transaction(async (tx) => {
      // Use a two-phase update to avoid unique constraint violations
      // Phase 1: Set temporary negative order values
      const tempUpdates = linkIds.map((linkId, index) =>
        tx.link.update({
          where: {
            id: linkId,
            profileId: profile.id, // Double-check ownership in transaction
          },
          data: { order: -(index + 1) },
        })
      );

      await Promise.all(tempUpdates);

      // Phase 2: Set final order values
      const finalUpdates = linkIds.map((linkId, index) =>
        tx.link.update({
          where: {
            id: linkId,
            profileId: profile.id,
          },
          data: { order: index },
        })
      );

      return await Promise.all(finalUpdates);
    });

    // Sort by final order for consistent response
    const sortedLinks = updatedLinks.sort((a, b) => a.order - b.order);

    // Revalidate relevant pages
    revalidatePath(`/dashboard`);
    revalidatePath(`/${userId}`);

    return { success: true, data: sortedLinks };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: `Invalid input data: ${error.errors
          .map((e) => e.message)
          .join(", ")}`,
      };
    }

    console.error("Error reordering links:", error);

    // Check for specific database errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return {
          success: false,
          error: "Database constraint error. Please try again.",
        };
      }
      if (error.message.includes("Record to update not found")) {
        return {
          success: false,
          error: "One or more links no longer exist.",
        };
      }
    }

    return {
      success: false,
      error: "Failed to reorder links. Please try again.",
    };
  }
}

// Alternative reordering method using raw SQL for better performance with large datasets
export async function reorderLinksOptimized(
  userId: string,
  input: ReorderLinksInput
): Promise<{ success: boolean; error?: string; data?: Link[] }> {
  try {
    // Validate input
    const { linkIds } = reorderLinksSchema.parse(input);

    // Get the profile
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    // Create a mapping of linkId to new order
    const orderMapping = linkIds.map((linkId, index) => ({
      linkId,
      order: index,
    }));

    // Use raw SQL for efficient bulk update
    await prisma.$transaction(async (tx) => {
      // First, verify all links belong to this profile
      const linkCount = await tx.link.count({
        where: {
          id: { in: linkIds },
          profileId: profile.id,
        },
      });

      if (linkCount !== linkIds.length) {
        throw new Error("Some links do not belong to this profile");
      }

      // Use a CASE statement to update all orders in a single query
      const caseStatements = orderMapping
        .map(({ linkId, order }) => `WHEN '${linkId}' THEN ${order}`)
        .join(" ");

      await tx.$executeRaw`
        UPDATE links 
        SET "order" = CASE id 
          ${caseStatements}
          ELSE "order" 
        END
        WHERE id IN (${linkIds.map((id) => `'${id}'`).join(", ")})
        AND profileId = ${profile.id}
      `;
    });

    // Fetch the updated links
    const updatedLinks = await prisma.link.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: { order: "asc" },
    });

    revalidatePath(`/dashboard`);
    revalidatePath(`/${userId}`);
    return { success: true, data: updatedLinks };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed" };
    }
    console.error("Error reordering links (optimized):", error);
    return { success: false, error: "Failed to reorder links" };
  }
}

export async function incrementLinkClick(linkId: string) {
  await prisma.link.update({
    where: { id: linkId },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
}
