"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { logActivity, type ActivityLogData } from "@/lib/activity-logger";

export const logUserActivity = async (
  activityData: Omit<ActivityLogData, "userId" | "ipAddress" | "userAgent">
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

    // Get IP address and user agent from headers
    const headersList = await headers();
    const ipAddress =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    await logActivity({
      ...activityData,
      userId: session.user.id,
      ipAddress,
      userAgent,
    });

    return {
      success: true,
      message: "Activity logged successfully",
    };
  } catch (error) {
    console.error("Error logging activity:", error);
    return {
      success: false,
      message: "Failed to log activity",
    };
  }
};
