import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function DELETE() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Remove user's profile image from database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        profileImage: null,
        profileImageMimeType: null,
        updatedAt: new Date(),
      },
    });

    // Revalidate relevant paths to update the cached data
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    revalidatePath(`/api/profile-image/${session.user.id}`);

    return NextResponse.json({
      success: true,
      message: "Profile image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting profile image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
