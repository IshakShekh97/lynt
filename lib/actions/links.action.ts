"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { linkSchema, type LinkFormValues } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity-logger";

export const getLinks = async () => {
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

    const links = await prisma.link.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        order: "asc",
      },
    });

    return {
      success: true,
      message: "Links retrieved successfully",
      data: links,
    };
  } catch (error) {
    console.error("Error fetching links:", error);
    return {
      success: false,
      message: "Failed to fetch links",
      data: null,
    };
  }
};

export const createLink = async (data: LinkFormValues) => {
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

    // Validate the data
    const validatedData = linkSchema.parse(data);

    // Get the highest order number and increment it
    const maxOrderLink = await prisma.link.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        order: "desc",
      },
    });

    const newOrder = maxOrderLink ? maxOrderLink.order + 1 : 0;

    const link = await prisma.link.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        order: newOrder,
      },
    });

    // Log the activity
    await logActivity({
      userId: session.user.id,
      action: "created",
      entity: "link",
      entityId: link.id,
      linkId: link.id,
      details: {
        title: link.title,
        url: link.url,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Link created successfully",
      data: link,
    };
  } catch (error) {
    console.error("Error creating link:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create link",
      data: null,
    };
  }
};

export const updateLink = async (linkId: string, data: LinkFormValues) => {
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

    // Validate the data
    const validatedData = linkSchema.parse(data);

    // Check if the link belongs to the user
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: session.user.id,
      },
    });

    if (!existingLink) {
      return {
        success: false,
        message: "Link not found or you don't have permission to edit it",
        data: null,
      };
    }

    const updatedLink = await prisma.link.update({
      where: {
        id: linkId,
      },
      data: validatedData,
    });

    // Log the activity
    await logActivity({
      userId: session.user.id,
      action: "updated",
      entity: "link",
      entityId: linkId,
      linkId: linkId,
      details: {
        title: updatedLink.title,
        url: updatedLink.url,
        changes: validatedData,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Link updated successfully",
      data: updatedLink,
    };
  } catch (error) {
    console.error("Error updating link:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update link",
      data: null,
    };
  }
};

export const deleteLink = async (linkId: string) => {
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

    // Check if the link belongs to the user
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: session.user.id,
      },
    });

    if (!existingLink) {
      return {
        success: false,
        message: "Link not found or you don't have permission to delete it",
        data: null,
      };
    }

    await prisma.link.delete({
      where: {
        id: linkId,
      },
    });

    // Log the activity
    await logActivity({
      userId: session.user.id,
      action: "deleted",
      entity: "link",
      entityId: linkId,
      details: {
        title: existingLink.title,
        url: existingLink.url,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Link deleted successfully",
      data: null,
    };
  } catch (error) {
    console.error("Error deleting link:", error);
    return {
      success: false,
      message: "Failed to delete link",
      data: null,
    };
  }
};

export const toggleLinkStatus = async (linkId: string, isActive: boolean) => {
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

    // Check if the link belongs to the user
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: session.user.id,
      },
    });

    if (!existingLink) {
      return {
        success: false,
        message: "Link not found or you don't have permission to modify it",
        data: null,
      };
    }

    const updatedLink = await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        isActive,
      },
    });

    // Log the activity
    await logActivity({
      userId: session.user.id,
      action: isActive ? "enabled" : "disabled",
      entity: "link",
      entityId: linkId,
      linkId: linkId,
      details: {
        title: updatedLink.title,
        isActive,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Link ${isActive ? "activated" : "deactivated"} successfully`,
      data: updatedLink,
    };
  } catch (error) {
    console.error("Error toggling link status:", error);
    return {
      success: false,
      message: "Failed to toggle link status",
      data: null,
    };
  }
};

export const reorderLinks = async (linkId: string, newOrder: number) => {
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

    // Check if the link belongs to the user
    const existingLink = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: session.user.id,
      },
    });

    if (!existingLink) {
      return {
        success: false,
        message: "Link not found or you don't have permission to modify it",
        data: null,
      };
    }

    const oldOrder = existingLink.order;

    // Update the order of the link
    await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        order: newOrder,
      },
    });

    // Adjust the order of other links
    if (newOrder > oldOrder) {
      // Moving down: decrease the order of links between oldOrder and newOrder
      await prisma.link.updateMany({
        where: {
          userId: session.user.id,
          order: {
            gt: oldOrder,
            lte: newOrder,
          },
          id: {
            not: linkId,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    } else if (newOrder < oldOrder) {
      // Moving up: increase the order of links between newOrder and oldOrder
      await prisma.link.updateMany({
        where: {
          userId: session.user.id,
          order: {
            gte: newOrder,
            lt: oldOrder,
          },
          id: {
            not: linkId,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Links reordered successfully",
      data: null,
    };
  } catch (error) {
    console.error("Error reordering links:", error);
    return {
      success: false,
      message: "Failed to reorder links",
      data: null,
    };
  }
};

export const updateLinksOrder = async (
  linkOrders: { id: string; order: number }[]
) => {
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

    // Verify all links belong to the user
    const linkIds = linkOrders.map((item) => item.id);
    const existingLinks = await prisma.link.findMany({
      where: {
        id: { in: linkIds },
        userId: session.user.id,
      },
    });

    if (existingLinks.length !== linkIds.length) {
      return {
        success: false,
        message:
          "Some links not found or you don't have permission to modify them",
        data: null,
      };
    }

    // Update all links in a transaction
    await prisma.$transaction(
      linkOrders.map(({ id, order }) =>
        prisma.link.update({
          where: { id },
          data: { order },
        })
      )
    );

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Links reordered successfully",
      data: null,
    };
  } catch (error) {
    console.error("Error updating links order:", error);
    return {
      success: false,
      message: "Failed to update links order",
      data: null,
    };
  }
};
