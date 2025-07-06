"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface Profile {
  id: string;
  userId: string;
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  textColor: string;
  fontStyle: string;
  backgroundImage: string | null;
  isPublic: boolean;
  customCss: string | null;
}

export async function getOrCreateProfile(userId: string): Promise<Profile> {
  let profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        userId,
      },
    });
  }

  return profile;
}

export async function getProfileWithLinks(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      user: true,
      links: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return profile;
}

export async function updateProfile(
  userId: string,
  data: Partial<{
    displayName: string;
    bio: string;
    backgroundColor: string;
    buttonColor: string;
    buttonTextColor: string;
    textColor: string;
    fontStyle: string;
    backgroundImage: string;
    isPublic: boolean;
    customCss: string;
  }>
) {
  // First, get or create the profile
  const profile = await getOrCreateProfile(userId);

  // Update user data if provided
  if (data.displayName !== undefined || data.bio !== undefined) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.displayName !== undefined && {
          displayName: data.displayName,
        }),
        ...(data.bio !== undefined && { bio: data.bio }),
      },
    });
  }

  // Update profile data
  const profileData = {
    backgroundColor: data.backgroundColor,
    buttonColor: data.buttonColor,
    buttonTextColor: data.buttonTextColor,
    textColor: data.textColor,
    fontStyle: data.fontStyle,
    backgroundImage: data.backgroundImage,
    isPublic: data.isPublic,
    customCss: data.customCss,
  };

  // Remove undefined values
  Object.keys(profileData).forEach((key) => {
    if (profileData[key as keyof typeof profileData] === undefined) {
      delete profileData[key as keyof typeof profileData];
    }
  });

  const updatedProfile = await prisma.profile.update({
    where: { id: profile.id },
    data: profileData,
  });

  revalidatePath("/dashboard");
  revalidatePath("/profile");
  return updatedProfile;
}
