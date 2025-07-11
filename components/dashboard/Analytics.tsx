import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getAnalyticsData, getActivityLogs } from "@/lib/activity-logger";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { BarChart3, TrendingUp, Eye, Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function Analytics() {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const [analyticsData, activityLogs] = await Promise.all([
    getAnalyticsData(session.user.id),
    getActivityLogs(session.user.id, 50),
  ]);

  const formatActionText = (action: string, entity: string) => {
    switch (action) {
      case "created":
        return `Created ${entity}`;
      case "updated":
        return `Updated ${entity}`;
      case "deleted":
        return `Deleted ${entity}`;
      case "clicked":
        return `Clicked on link`;
      case "enabled":
        return `Enabled ${entity}`;
      case "disabled":
        return `Disabled ${entity}`;
      default:
        return `${action} ${entity}`;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return "➕";
      case "updated":
        return "✏️";
      case "deleted":
        return "🗑️";
      case "clicked":
        return "👆";
      case "enabled":
        return "✅";
      case "disabled":
        return "❌";
      default:
        return "📝";
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Carnage
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.clicksThisWeek}
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.clicksThisWeek > analyticsData.clicksThisMonth / 4
                ? "Above average"
                : "Below average"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Massacre
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.clicksThisMonth}
            </div>
            <p className="text-xs text-muted-foreground">Monthly performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Chaos</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.recentActivities}
            </div>
            <p className="text-xs text-muted-foreground">
              Total destruction logged
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Top Performing Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Killers</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              {analyticsData.topLinks.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.topLinks.map((link, index) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <Badge
                          variant="secondary"
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center p-0 flex-shrink-0"
                        >
                          {index + 1}
                        </Badge>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            {link.emoji && (
                              <span className="flex-shrink-0">
                                {link.emoji}
                              </span>
                            )}
                            <p className="text-sm font-medium leading-none truncate">
                              {link.title}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {link.url}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <Badge variant="outline" className="text-xs">
                          {link.clicks} kills
                        </Badge>
                        <ExternalLink className="h-3 w-3 text-muted-foreground hidden sm:block" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No deadly weapons yet
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Battle Log</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              {activityLogs.length > 0 ? (
                <div className="space-y-4">
                  {activityLogs.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="text-lg">
                        {getActionIcon(activity.action)}
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">
                          {formatActionText(activity.action, activity.entity)}
                        </p>
                        {activity.link && (
                          <p className="text-xs text-muted-foreground">
                            {activity.link.title}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No battle history yet
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
