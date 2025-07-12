import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find user with profile image
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        profileImage: true,
        profileImageMimeType: true,
      },
    });

    if (!user || !user.profileImage || !user.profileImageMimeType) {
      return NextResponse.json(
        { error: "Profile image not found" },
        { status: 404 }
      );
    }

    // Return the image with proper content type
    return new NextResponse(user.profileImage, {
      status: 200,
      headers: {
        "Content-Type": user.profileImageMimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving profile image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
