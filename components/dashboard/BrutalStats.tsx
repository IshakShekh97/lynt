"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, BarChart3, Users, Zap } from "lucide-react";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";

interface StatsData {
  totalLinks: number;
  totalClicks: number;
  activeLinks: number;
}

interface BrutalStatsProps {
  stats: StatsData;
}

export const BrutalStats = ({ stats }: BrutalStatsProps) => {
  const { totalLinks, totalClicks, activeLinks } = stats;

  const statsConfig = [
    {
      title: "Death Arsenal",
      value: totalLinks,
      subtitle:
        totalLinks === 0
          ? "No brutal weapons forged yet"
          : "Vicious weapons unleashed",
      icon: Link,
      variant: "default" as const,
      emoji: "💥",
    },
    {
      title: "Total Annihilation",
      value: totalClicks,
      subtitle:
        totalClicks === 0
          ? "No bloodshed recorded"
          : "Souls crushed in digital warfare",
      icon: BarChart3,
      variant: "destructive" as const,
      emoji: "🔥",
    },
    {
      title: "Loaded Cannons",
      value: activeLinks,
      subtitle:
        activeLinks === totalLinks
          ? "All weapons primed for massacre"
          : `${activeLinks} of ${totalLinks} ready to obliterate`,
      icon: Zap,
      variant: "warning" as const,
      emoji: "⚡",
    },
    {
      title: "Victims Slaughtered",
      value: 0,
      subtitle: "Body count incoming",
      icon: Users,
      variant: "success" as const,
      emoji: "💀",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => (
        <ShakeElement key={stat.title} intensity="low" trigger="hover">
          <BrutalBox
            variant={stat.variant}
            className="p-0 transform hover:scale-105 transition-all duration-300"
            glitchOnHover={true}
          >
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-black uppercase tracking-wider">
                  <GlitchText intensity="low" trigger="hover">
                    {stat.emoji} {stat.title}
                  </GlitchText>
                </CardTitle>
                <stat.icon className="h-5 w-5 opacity-60" />
              </CardHeader>
              <CardContent>
                <GlitchText
                  className="text-3xl font-black mb-2"
                  intensity="medium"
                  trigger="hover"
                >
                  {stat.value}
                </GlitchText>
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                  {stat.subtitle}
                </p>
              </CardContent>
            </Card>
          </BrutalBox>
        </ShakeElement>
      ))}
    </div>
  );
};
