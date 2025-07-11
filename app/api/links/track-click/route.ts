import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity-logger";

export async function POST(request: NextRequest) {
  try {
    const { linkId, userId } = await request.json();

    if (!linkId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update click count
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    // Log the click activity
    await logActivity({
      userId,
      action: "clicked",
      entity: "link",
      entityId: linkId,
      linkId,
      details: {
        title: updatedLink.title,
        url: updatedLink.url,
      },
      ipAddress: request.headers.get("x-forwarded-for") || 
                 request.headers.get("x-real-ip") ||
                 "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
