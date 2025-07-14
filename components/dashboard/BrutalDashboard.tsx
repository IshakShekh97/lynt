"use client";

import { Badge } from "@/components/ui/badge";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "../landing/FloatingGeometricShapes";

interface BrutalDashboardProps {
  username?: string;
  email?: string;
  children: React.ReactNode;
}

export const BrutalDashboard = ({
  username,
  email,
  children,
}: BrutalDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 relative overflow-hidden">
      <FloatingGeometricShapes />
      <FloatingGeometricShapes className="rotate-90" />
      <FloatingGeometricShapes className="rotate-45" />
      <FloatingGeometricShapes className="rotate-180" />
      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-5">
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

      <div className="relative z-10 space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="space-y-6">
          <ShakeElement intensity="medium" trigger="hover">
            <BrutalBox variant="warning" className="inline-block p-2">
              <Badge className="text-xs px-4 py-2 font-black tracking-wider border-2 border-black bg-yellow-400 text-black hover:bg-yellow-300 transition-colors duration-200 dark:bg-yellow-600 dark:text-white dark:border-white dark:hover:bg-yellow-500">
                💀 CHAOS CONTROL CENTER ACTIVATED 💀
              </Badge>
            </BrutalBox>
          </ShakeElement>

          <div className="space-y-4">
            <GlitchText
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase"
              intensity="high"
              trigger="hover"
            >
              BRUTAL BATTLESTATION
            </GlitchText>

            <BrutalBox className="inline-block p-4 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
              <p className="text-base sm:text-lg font-bold tracking-wide uppercase opacity-80">
                RISE AND CONQUER,{" "}
                <span className="text-primary font-black">
                  {username || email}
                </span>
                !
                <br />
                <span className="text-sm">
                  YOUR DIGITAL WARFARE ARSENAL AWAITS DESTRUCTION
                </span>
              </p>
            </BrutalBox>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
