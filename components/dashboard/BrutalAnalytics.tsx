"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Eye, Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";

interface AnalyticsData {
  clicksThisWeek: number;
  clicksThisMonth: number;
  recentActivities: number;
  topLinks: Array<{
    id: string;
    title: string;
    url: string;
    clicks: number;
    emoji?: string | null;
  }>;
}

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  createdAt: Date;
  link?: {
    title: string;
  } | null;
}

interface BrutalAnalyticsProps {
  analyticsData: AnalyticsData;
  activityLogs: ActivityLog[];
}

export const BrutalAnalytics = ({
  analyticsData,
  activityLogs,
}: BrutalAnalyticsProps) => {
  const formatActionText = (action: string, entity: string) => {
    switch (action) {
      case "created":
        return `FORGED BRUTAL ${entity.toUpperCase()}`;
      case "updated":
        return `ENHANCED WEAPON ${entity.toUpperCase()}`;
      case "deleted":
        return `OBLITERATED ${entity.toUpperCase()}`;
      case "clicked":
        return `VICTIM ELIMINATED`;
      case "enabled":
        return `WEAPON ${entity.toUpperCase()} ARMED FOR BATTLE`;
      case "disabled":
        return `WEAPON ${entity.toUpperCase()} DISABLED`;
      default:
        return `BRUTAL ${action.toUpperCase()} ON ${entity.toUpperCase()}`;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return "⚒️";
      case "updated":
        return "�";
      case "deleted":
        return "💥";
      case "clicked":
        return "🩸";
      case "enabled":
        return "🔥";
      case "disabled":
        return "❄️";
      default:
        return "💀";
    }
  };

  const statsConfig = [
    {
      title: "Weekly Slaughter",
      value: analyticsData.clicksThisWeek,
      subtitle:
        analyticsData.clicksThisWeek > analyticsData.clicksThisMonth / 4
          ? "APOCALYPTIC DEVASTATION LEVELS"
          : "PATHETIC DESTRUCTION OUTPUT",
      icon: TrendingUp,
      variant: "default" as const,
      emoji: "🔥",
    },
    {
      title: "Monthly Genocide",
      value: analyticsData.clicksThisMonth,
      subtitle: "TOTAL SOULS HARVESTED THIS MONTH",
      icon: BarChart3,
      variant: "destructive" as const,
      emoji: "💀",
    },
    {
      title: "Recent Chaos",
      value: analyticsData.recentActivities,
      subtitle: "DESTRUCTION EVENTS LOGGED",
      icon: Eye,
      variant: "warning" as const,
      emoji: "⚡",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Top Performing Links */}
        <ShakeElement intensity="low" trigger="hover">
          <BrutalBox variant="default" className="p-0">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="border-b-4 border-foreground">
                <CardTitle className="text-lg font-black uppercase tracking-wider">
                  <GlitchText intensity="medium" trigger="hover">
                    🏆 TOP KILLER WEAPONS
                  </GlitchText>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className="h-80">
                  {analyticsData.topLinks.length > 0 ? (
                    <div className="space-y-4">
                      {analyticsData.topLinks.map((link, index) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between gap-2 p-2 rounded border-2 border-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center space-x-2 min-w-0 flex-1">
                            <BrutalBox
                              variant={index === 0 ? "warning" : "default"}
                              className="w-8 h-8 flex items-center justify-center p-1 flex-shrink-0"
                            >
                              <span className="text-xs font-black">
                                #{index + 1}
                              </span>
                            </BrutalBox>
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center space-x-2">
                                {link.emoji && (
                                  <span className="flex-shrink-0 text-lg">
                                    {link.emoji}
                                  </span>
                                )}
                                <p className="text-sm font-black leading-none truncate uppercase">
                                  {link.title}
                                </p>
                              </div>
                              <p className="text-xs opacity-70 truncate font-mono">
                                {link.url}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                            <BrutalBox
                              variant="destructive"
                              className="px-2 py-1"
                            >
                              <Badge className="text-xs font-black bg-transparent text-inherit border-0">
                                {link.clicks} KILLS
                              </Badge>
                            </BrutalBox>
                            <ExternalLink className="h-3 w-3 opacity-60 hidden sm:block" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <GlitchText
                        className="text-sm font-bold uppercase"
                        intensity="low"
                        trigger="hover"
                      >
                        💀 NO DEADLY WEAPONS YET 💀
                      </GlitchText>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </BrutalBox>
        </ShakeElement>

        {/* Recent Activity Log */}
        <ShakeElement intensity="low" trigger="hover">
          <BrutalBox variant="destructive" className="p-0">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="border-b-4 border-current">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <GlitchText
                    intensity="medium"
                    trigger="hover"
                    className="text-white"
                  >
                    ⚔️ BATTLE LOG
                  </GlitchText>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className="h-80">
                  {activityLogs.length > 0 ? (
                    <div className="space-y-4">
                      {activityLogs.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 p-2 rounded border-2 border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="text-2xl">
                            {getActionIcon(activity.action)}
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="text-sm font-black leading-none uppercase text-white">
                              {formatActionText(
                                activity.action,
                                activity.entity
                              )}
                            </p>
                            {activity.link && (
                              <p className="text-xs text-white/70 font-bold">
                                TARGET: {activity.link.title.toUpperCase()}
                              </p>
                            )}
                            <p className="text-xs text-white/50 font-mono">
                              {formatDistanceToNow(
                                new Date(activity.createdAt),
                                {
                                  addSuffix: true,
                                }
                              ).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <GlitchText
                        className="text-sm font-bold uppercase text-white"
                        intensity="low"
                        trigger="hover"
                      >
                        💀 NO BATTLE HISTORY YET 💀
                      </GlitchText>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </BrutalBox>
        </ShakeElement>
      </div>
    </div>
  );
};
