import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { FloatingGeometricShapes } from "@/components/landing/FloatingGeometricShapes";
import { AuthAnimatedBackground } from "@/components/landing/AuthAnimatedBackground";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-dvh relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Background Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-20" />

      {/* Auth-specific Animated Background */}
      <AuthAnimatedBackground className="opacity-30" />

      <div className="relative z-10 flex items-center justify-center min-h-dvh p-4">
        {children}
      </div>

      <ThemeSwitcher className="fixed bottom-10 right-10 z-20" />
    </div>
  );
};

export default AuthLayout;
