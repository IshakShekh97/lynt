import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  diagnoseLinkOrderingIssues,
  fixLinkOrdering,
} from "@/lib/utils/linkOrderingDiagnostic";
import { headers } from "next/headers";

async function getServerSession() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    return session;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === "fix") {
      const result = await fixLinkOrdering(session.user.id);
      return NextResponse.json(result);
    } else {
      // Default action is diagnose
      const result = await diagnoseLinkOrderingIssues(session.user.id);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const result = await diagnoseLinkOrderingIssues(session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
