import { Suspense } from "react";
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
import { BrutalDashboard } from "@/components/dashboard/BrutalDashboard";
import { BrutalStats } from "@/components/dashboard/BrutalStats";
import { BrutalTabs } from "@/components/dashboard/BrutalTabs";

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
    <BrutalStats
      stats={{
        totalLinks,
        totalClicks,
        activeLinks,
      }}
    />
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
    <BrutalDashboard
      username={session.user.username || undefined}
      email={session.user.email || undefined}
    >
      {/* Stats Section */}
      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Tabs Section */}
      <BrutalTabs
        linkManagerContent={
          <Suspense fallback={<LinkManagementSkeleton />}>
            <LinkManagerTab />
          </Suspense>
        }
        analyticsContent={
          <Suspense fallback={<AnalyticsSkeleton />}>
            <Analytics />
          </Suspense>
        }
        socialContent={<SocialLinksSection />}
      />
    </BrutalDashboard>
  );
};

export default DashboardPage;
