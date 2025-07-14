"use server";

import { prisma } from "@/lib/prisma";

export interface PublicUserProfile {
  id: string;
  name: string;
  username: string;
  bio?: string | null;
  image?: string | null;
  profileImage?: Buffer | null;
  profileImageMimeType?: string | null;
  displayUsername?: string | null;
  theme?: string | null;
  colorTheme?: string | null;
  backgroundAnimation?: string | null;
  createdAt: Date;
  links: {
    id: string;
    title: string;
    url: string;
    description?: string | null;
    emoji?: string | null;
    clicks: number;
    isActive: boolean;
    order: number;
  }[];
  socialLinks: {
    id: string;
    platform: string;
    url: string;
    isActive: boolean;
  }[];
  _count: {
    links: number;
    activities: number;
  };
}

export const getPublicUserProfile = async (
  username: string
): Promise<PublicUserProfile | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        profileImage: true,
        profileImageMimeType: true,
        displayUsername: true,
        theme: true,
        colorTheme: true,
        backgroundAnimation: true,
        createdAt: true,
        links: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            title: true,
            url: true,
            description: true,
            emoji: true,
            clicks: true,
            isActive: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        socialLinks: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            platform: true,
            url: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            links: true,
            activities: true,
          },
        },
      },
    });

    return user as PublicUserProfile | null;
  } catch (error) {
    console.error("Error fetching public user profile:", error);
    return null;
  }
};

export const incrementLinkClick = async (linkId: string) => {
  try {
    await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error incrementing link click:", error);
    return { success: false };
  }
};
