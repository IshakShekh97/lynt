import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Link, BarChart3, Users } from "lucide-react";
import SocialLinksSection from "@/components/dashboard/SocialLinksSection";
import { LinkManagerWrapper } from "@/components/dashboard/LinkManagerWrapper";
import { getSession } from "@/lib/auth";
import { getLinks } from "@/lib/actions/links.action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your account.
          </p>
        </div>
      </div>

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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Manage Links</CardTitle>
            <CardDescription>
              Create, edit, and manage your links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LinkManagerWrapper />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent link activity will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-4">
                No recent activity to display
              </p>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <SocialLinksSection />
    </div>
  );
};

export default DashboardPage;
