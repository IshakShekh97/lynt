import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, BarChart3, Users, Activity } from "lucide-react";
import SocialLinksSection from "@/components/dashboard/SocialLinksSection";
import { LinkManagerWrapper } from "@/components/dashboard/LinkManagerWrapper";
import Analytics from "@/components/dashboard/Analytics";
import { getSession } from "@/lib/auth";
import { getLinks } from "@/lib/actions/links.action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { 
  DashboardLoadingSkeleton, 
  LinkManagementSkeleton, 
  AnalyticsSkeleton 
} from "@/components/loading-skeletons";

async function DashboardStats() {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const linksResult = await getLinks();
  const links = linksResult.success ? linksResult.data || [] : [];
  const totalLinks = links.length;
  const activeLinks = links.filter((link) => link.isActive).length;
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Links</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLinks}</div>
          <p className="text-xs text-muted-foreground">
            {totalLinks === 0 ? "No links created yet" : "Links created"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClicks}</div>
          <p className="text-xs text-muted-foreground">
            {totalClicks === 0
              ? "No clicks recorded"
              : "Total clicks received"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Links</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeLinks}</div>
          <p className="text-xs text-muted-foreground">
            {activeLinks === totalLinks
              ? "All links are active"
              : `${activeLinks} of ${totalLinks} active`}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unique Visitors
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">Coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
}

async function LinkManagerTab() {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const linksResult = await getLinks();
  const links = linksResult.success ? linksResult.data || [] : [];

  return (
    <LinkManagerWrapper 
      links={links} 
      userId={session.user.id}
    />
  );
}

const DashboardPage = async () => {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your account.
          </p>
        </div>
      </div>

      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <DashboardStats />
      </Suspense>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="links" className="flex items-center space-x-2">
            <Link className="h-4 w-4" />
            <span>Manage Links</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics & Activity</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Social Links</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4">
          <Suspense fallback={<LinkManagementSkeleton />}>
            <LinkManagerTab />
          </Suspense>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Suspense fallback={<AnalyticsSkeleton />}>
            <Analytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Manage your social media links and profiles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SocialLinksSection />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
