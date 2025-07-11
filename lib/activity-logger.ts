import { prisma } from "@/lib/prisma";

export interface ActivityLogData {
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  linkId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logActivity({
  userId,
  action,
  entity,
  entityId,
  linkId,
  details,
  ipAddress,
  userAgent,
}: ActivityLogData) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        linkId,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}

export async function getActivityLogs(userId: string, limit = 50) {
  try {
    return await prisma.activityLog.findMany({
      where: { userId },
      include: {
        link: {
          select: {
            title: true,
            url: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch (error) {
    console.error("Failed to fetch activity logs:", error);
    return [];
  }
}

export async function getAnalyticsData(userId: string) {
  try {
    const [
      totalLinks,
      activeLinks,
      totalClicks,
      recentActivities,
      clicksThisWeek,
      clicksThisMonth,
      topLinks,
    ] = await Promise.all([
      // Total links count
      prisma.link.count({
        where: { userId },
      }),
      
      // Active links count
      prisma.link.count({
        where: { userId, isActive: true },
      }),
      
      // Total clicks across all links
      prisma.link.aggregate({
        where: { userId },
        _sum: { clicks: true },
      }),
      
      // Recent activities count
      prisma.activityLog.count({
        where: { userId },
      }),
      
      // Clicks this week
      prisma.activityLog.count({
        where: {
          userId,
          action: "clicked",
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      
      // Clicks this month
      prisma.activityLog.count({
        where: {
          userId,
          action: "clicked",
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      
      // Top 5 most clicked links
      prisma.link.findMany({
        where: { userId },
        orderBy: { clicks: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          url: true,
          clicks: true,
          emoji: true,
        },
      }),
    ]);

    return {
      totalLinks,
      activeLinks,
      totalClicks: totalClicks._sum.clicks || 0,
      recentActivities,
      clicksThisWeek,
      clicksThisMonth,
      topLinks,
    };
  } catch (error) {
    console.error("Failed to fetch analytics data:", error);
    return {
      totalLinks: 0,
      activeLinks: 0,
      totalClicks: 0,
      recentActivities: 0,
      clicksThisWeek: 0,
      clicksThisMonth: 0,
      topLinks: [],
    };
  }
}