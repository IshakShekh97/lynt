import { NextRequest, NextResponse } from "next/server";
import { updateThemeAndAnimation } from "@/lib/actions/profile.action";
import { backgroundAnimations } from "@/lib/constants/animations";

export async function POST(request: NextRequest) {
  try {
    const { colorTheme, backgroundAnimation } = await request.json();

    if (!colorTheme || typeof colorTheme !== "string") {
      return NextResponse.json(
        { error: "Color theme is required" },
        { status: 400 }
      );
    }

    // If no background animation is provided, select one randomly
    let finalBackgroundAnimation = backgroundAnimation;
    if (!backgroundAnimation) {
      const randomIndex = Math.floor(
        Math.random() * backgroundAnimations.length
      );
      finalBackgroundAnimation = backgroundAnimations[randomIndex].id;
    }

    const result = await updateThemeAndAnimation(
      colorTheme,
      finalBackgroundAnimation
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating theme and animation:", error);
    return NextResponse.json(
      { error: "Failed to update theme and animation" },
      { status: 500 }
    );
  }
}
