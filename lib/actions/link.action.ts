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

export async function reorderLinks(
  userId: string,
  input: ReorderLinksInput
): Promise<{ success: boolean; error?: string; data?: Link[] }> {
  try {
    // Validate input
    const { linkIds } = reorderLinksSchema.parse(input);

    // Get the profile
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        links: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    // Verify all linkIds belong to this profile
    const existingLinkIds = new Set(profile.links.map((link) => link.id));
    const invalidLinks = linkIds.filter((id) => !existingLinkIds.has(id));

    if (invalidLinks.length > 0) {
      return {
        success: false,
        error: "Some links do not belong to this profile",
      };
    }

    // Start a transaction to ensure all updates happen atomically
    const updatedLinks = await prisma.$transaction(async (tx) => {
      // Step 1: Move all links to temporary negative order values to avoid constraint conflicts
      // This prevents unique constraint violations during the reordering process
      const tempUpdatePromises = linkIds.map((linkId, index) =>
        tx.link.update({
          where: {
            id: linkId,
            profileId: profile.id,
          },
          data: {
            order: -(index + 1), // Use negative values as temporary placeholders
          },
        })
      );

      await Promise.all(tempUpdatePromises);

      // Step 2: Update each link with its final order value
      const finalUpdatePromises = linkIds.map((linkId, index) =>
        tx.link.update({
          where: {
            id: linkId,
            profileId: profile.id,
          },
          data: {
            order: index, // Set the final order value
          },
        })
      );

      return await Promise.all(finalUpdatePromises);
    });

    // Sort the updated links by their new order
    const sortedLinks = updatedLinks.sort((a, b) => a.order - b.order);

    revalidatePath(`/dashboard`);
    revalidatePath(`/${userId}`); // Also revalidate the profile page
    return { success: true, data: sortedLinks };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed" };
    }
    console.error("Error reordering links:", error);
    return { success: false, error: "Failed to reorder links" };
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
