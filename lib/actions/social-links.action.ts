"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSocialLinks = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const socialLinks = await prisma.socialLink.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      success: true,
      message: "Social links retrieved successfully",
      data: socialLinks,
    };
  } catch (error) {
    console.error("Error fetching social links:", error);
    return {
      success: false,
      message: "Failed to fetch social links",
      data: null,
    };
  }
};

export const upsertSocialLink = async (
  platform: string,
  url: string,
  isActive: boolean = true
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // Check if social link already exists for this user and platform
    const existingLink = await prisma.socialLink.findFirst({
      where: {
        userId: session.user.id,
        platform,
      },
    });

    if (existingLink) {
      // Update existing link
      await prisma.socialLink.update({
        where: {
          id: existingLink.id,
        },
        data: {
          url,
          isActive,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new link
      await prisma.socialLink.create({
        data: {
          userId: session.user.id,
          platform,
          url,
          isActive,
        },
      });
    }

    return {
      success: true,
      message: "Social link saved successfully",
    };
  } catch (error) {
    console.error("Error saving social link:", error);
    return {
      success: false,
      message: "Failed to save social link",
    };
  }
};

export const toggleSocialLinkStatus = async (platform: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const existingLink = await prisma.socialLink.findFirst({
      where: {
        userId: session.user.id,
        platform,
      },
    });

    if (!existingLink) {
      return {
        success: false,
        message: "Social link not found",
      };
    }

    await prisma.socialLink.update({
      where: {
        id: existingLink.id,
      },
      data: {
        isActive: !existingLink.isActive,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Social link status updated successfully",
    };
  } catch (error) {
    console.error("Error updating social link status:", error);
    return {
      success: false,
      message: "Failed to update social link status",
    };
  }
};

export const deleteSocialLink = async (platform: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await prisma.socialLink.deleteMany({
      where: {
        userId: session.user.id,
        platform,
      },
    });

    return {
      success: true,
      message: "Social link deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting social link:", error);
    return {
      success: false,
      message: "Failed to delete social link",
    };
  }
};
