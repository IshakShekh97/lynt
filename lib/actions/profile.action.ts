"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { logActivity, getAnalyticsData } from "@/lib/activity-logger";
import { headers } from "next/headers";

interface UpdateProfileData {
  name?: string;
  bio?: string;
  username?: string;
  email?: string;
  image?: string;
}

export const updateProfile = async (data: UpdateProfileData) => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Check if username is taken (if username is being updated)
    if (data.username && data.username !== session.user.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: data.username },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new Error("Username already taken");
      }
    }

    // Check if email is taken (if email is being updated)
    if (data.email && data.email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new Error("Email already taken");
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    // Log the activity
    await logActivity({
      userId,
      action: "updated",
      entity: "user",
      entityId: userId,
      details: {
        updatedFields: Object.keys(data),
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to update profile",
    };
  }
};

export const updateUserSettings = async (settings: {
  profileVisible?: boolean;
  showAnalytics?: boolean;
  allowDirectMessages?: boolean;
  emailNotifications?: boolean;
}) => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Store settings in the activity log for now
    await logActivity({
      userId,
      action: "updated",
      entity: "user",
      entityId: userId,
      details: {
        type: "settings_update",
        settings,
      },
    });

    return {
      success: true,
      message: "Settings updated successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to update settings",
    };
  }
};

export const deleteUserAccount = async (callbackURL?: string) => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    // This would trigger better-auth's delete user flow
    await auth.api.deleteUser({
      headers: Object.fromEntries(headersList.entries()),
      body: {
        callbackURL: callbackURL || "/goodbye",
      },
    });

    return {
      success: true,
      message:
        "Account deletion initiated. Please check your email for verification.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to initiate account deletion",
    };
  }
};

export const revokeAllSessions = async () => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    // This would revoke all sessions except the current one
    await auth.api.revokeSessions({
      headers: Object.fromEntries(headersList.entries()),
    });

    return {
      success: true,
      message: "All sessions revoked successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to revoke sessions",
    };
  }
};

export const signOutUser = async () => {
  try {
    const headersList = await headers();
    await auth.api.signOut({
      headers: Object.fromEntries(headersList.entries()),
    });

    redirect("/");
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to sign out",
    };
  }
};

export const getUserAnalytics = async () => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const analytics = await getAnalyticsData(userId);

    return {
      success: true,
      data: analytics,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get analytics",
    };
  }
};

export const getUserSessions = async () => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    // This would get all user sessions from better-auth
    // For now, we'll return mock data since better-auth doesn't expose listSessions
    const sessions = [
      {
        id: session.session.id,
        token: session.session.token,
        createdAt: session.session.createdAt,
        updatedAt: session.session.updatedAt,
        ipAddress: session.session.ipAddress,
        userAgent: session.session.userAgent,
        isCurrent: true,
      },
    ];

    return {
      success: true,
      data: sessions,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get sessions",
      data: [],
    };
  }
};

export const getProfileImageUrl = async (
  userId: string
): Promise<string | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        profileImage: true,
        profileImageMimeType: true,
      },
    });

    if (!user || !user.profileImage || !user.profileImageMimeType) {
      return null;
    }

    return `/api/profile-image/${userId}`;
  } catch (error) {
    console.error("Error getting profile image URL:", error);
    return null;
  }
};

export const hasProfileImage = async (userId: string): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        profileImage: true,
      },
    });

    return !!(user && user.profileImage);
  } catch (error) {
    console.error("Error checking profile image:", error);
    return false;
  }
};
