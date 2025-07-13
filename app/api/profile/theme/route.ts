import { NextRequest, NextResponse } from "next/server";
import { updateTheme } from "@/lib/actions/profile.action";

export async function POST(request: NextRequest) {
  try {
    const { theme } = await request.json();

    if (!theme || typeof theme !== "string") {
      return NextResponse.json(
        { error: "Theme name is required" },
        { status: 400 }
      );
    }

    const result = await updateTheme(theme);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating theme:", error);
    return NextResponse.json(
      { error: "Failed to update theme" },
      { status: 500 }
    );
  }
}
