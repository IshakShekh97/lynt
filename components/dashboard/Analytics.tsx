import { getAnalyticsData, getActivityLogs } from "@/lib/activity-logger";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { BrutalAnalytics } from "./BrutalAnalytics";

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

  return (
    <BrutalAnalytics
      analyticsData={analyticsData}
      activityLogs={activityLogs}
    />
  );
}
