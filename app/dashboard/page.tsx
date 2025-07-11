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
  AnalyticsSkeleton,
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
          <CardTitle className="text-sm font-medium">Link Arsenal</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLinks}</div>
          <p className="text-xs text-muted-foreground">
            {totalLinks === 0 ? "No weapons forged yet" : "Weapons forged"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Destruction
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClicks}</div>
          <p className="text-xs text-muted-foreground">
            {totalClicks === 0
              ? "No carnage recorded"
              : "Total devastation dealt"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Live Weapons</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeLinks}</div>
          <p className="text-xs text-muted-foreground">
            {activeLinks === totalLinks
              ? "All weapons are loaded"
              : `${activeLinks} of ${totalLinks} armed`}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Victims Count</CardTitle>
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

  return <LinkManagerWrapper links={links} userId={session.user.id} />;
}

const DashboardPage = async () => {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Command Center
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your digital arsenal overview.
          </p>
        </div>
      </div>

      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <DashboardStats />
      </Suspense>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="links"
            className="flex items-center justify-center space-x-1 sm:space-x-2"
          >
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">Link Factory</span>
            <span className="sm:hidden">Links</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center justify-center space-x-1 sm:space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Damage Reports</span>
            <span className="sm:hidden">Reports</span>
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="flex items-center justify-center space-x-1 sm:space-x-2"
          >
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Social Brutts</span>
            <span className="sm:hidden">Social</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4 overflow-hidden">
          <Suspense fallback={<LinkManagementSkeleton />}>
            <LinkManagerTab />
          </Suspense>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 overflow-hidden">
          <Suspense fallback={<AnalyticsSkeleton />}>
            <Analytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Social Brutees
              </CardTitle>
              <CardDescription>
                Manage your social media links and control their visibility
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
