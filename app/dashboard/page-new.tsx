import { Suspense } from "react";
import {
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
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "@/components/landing/FloatingGeometricShapes";

interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "warning";
}

const BrutalCard = ({
  children,
  className = "",
  variant = "default",
}: BrutalCardProps) => {
  const variantClasses = {
    default: "bg-background/10 border-foreground/20",
    destructive: "bg-red-500/10 border-red-500/30",
    warning: "bg-yellow-500/10 border-yellow-500/30",
  };

  return (
    <div
      className={`
      backdrop-blur-md backdrop-saturate-150 
      ${variantClasses[variant]}
      border-2 border-solid
      rounded-lg
      shadow-brutal
      transform transition-all duration-300
      hover:scale-105 hover:shadow-brutal-lg
      ${className}
    `}
    >
      {children}
    </div>
  );
};

async function BrutalDashboardStats() {
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

  const stats = [
    {
      title: "LINK ARSENAL",
      value: totalLinks,
      description:
        totalLinks === 0 ? "NO WEAPONS FORGED YET" : "WEAPONS FORGED",
      icon: Link,
      variant: "default" as const,
      rotation: "rotate-2",
      emoji: "🔗",
    },
    {
      title: "TOTAL DESTRUCTION",
      value: totalClicks,
      description:
        totalClicks === 0 ? "NO CARNAGE RECORDED" : "TOTAL DEVASTATION DEALT",
      icon: BarChart3,
      variant: "destructive" as const,
      rotation: "-rotate-1",
      emoji: "💥",
    },
    {
      title: "LIVE WEAPONS",
      value: activeLinks,
      description:
        activeLinks === totalLinks
          ? "ALL WEAPONS ARE LOADED"
          : `${activeLinks} OF ${totalLinks} ARMED`,
      icon: Link,
      variant: "warning" as const,
      rotation: "rotate-1",
      emoji: "⚡",
    },
    {
      title: "VICTIMS COUNT",
      value: 0,
      description: "CHAOS COMING SOON",
      icon: Users,
      variant: "default" as const,
      rotation: "-rotate-2",
      emoji: "👹",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <ShakeElement key={index} intensity="low" trigger="hover">
          <BrutalCard
            variant={stat.variant}
            className={`transform ${stat.rotation} hover:rotate-0 transition-transform duration-300`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{stat.emoji}</span>
                <GlitchText
                  className="text-sm font-black uppercase tracking-wider"
                  intensity="low"
                  trigger="hover"
                >
                  {stat.title}
                </GlitchText>
              </div>
              <BrutalBox variant={stat.variant} className="p-1">
                <stat.icon className="h-4 w-4" />
              </BrutalBox>
            </CardHeader>
            <CardContent>
              <GlitchText
                className="text-3xl font-black mb-2"
                intensity="medium"
                trigger="hover"
              >
                {stat.value.toLocaleString()}
              </GlitchText>
              <p className="text-xs font-bold tracking-wider uppercase opacity-80">
                {stat.description}
              </p>
            </CardContent>
          </BrutalCard>
        </ShakeElement>
      ))}
    </div>
  );
}

async function BrutalLinkManagerTab() {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const linksResult = await getLinks();
  const links = linksResult.success ? linksResult.data || [] : [];

  return (
    <BrutalCard className="p-6">
      <LinkManagerWrapper links={links} userId={session.user.id} />
    </BrutalCard>
  );
}

const BrutalDashboardPage = async () => {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Floating Geometric Background */}
      <FloatingGeometricShapes className="opacity-30" />

      {/* Brutal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, currentColor 2px, transparent 2px),
              radial-gradient(circle at 80% 50%, currentColor 2px, transparent 2px),
              linear-gradient(45deg, transparent 49%, currentColor 49%, currentColor 51%, transparent 51%)
            `,
            backgroundSize: "30px 30px, 30px 30px, 60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox
                variant="destructive"
                className="inline-block p-3 transform -rotate-2"
              >
                <GlitchText
                  className="text-sm font-black tracking-widest uppercase text-white"
                  intensity="high"
                  trigger="hover"
                >
                  💀 COMMAND CENTER 💀
                </GlitchText>
              </BrutalBox>
            </ShakeElement>

            <GlitchText
              className="text-3xl md:text-5xl font-black tracking-tight"
              intensity="medium"
              trigger="hover"
            >
              <h1 className="uppercase">CHAOS DASHBOARD</h1>
            </GlitchText>

            <BrutalBox className="inline-block p-4 transform rotate-1 bg-gray-800 border-gray-600">
              <p className="text-lg font-bold tracking-wide uppercase">
                WELCOME BACK, DIGITAL DESTROYER!
                <br />
                <span className="text-red-400">
                  YOUR ARSENAL AWAITS COMMANDS
                </span>
              </p>
            </BrutalBox>
          </div>
        </div>

        {/* Stats Section */}
        <Suspense fallback={<DashboardLoadingSkeleton />}>
          <BrutalDashboardStats />
        </Suspense>

        {/* Tabs Section */}
        <BrutalCard className="p-6">
          <Tabs defaultValue="links" className="w-full">
            <div className="mb-6">
              <BrutalBox
                variant="warning"
                className="inline-block p-3 transform -rotate-1"
              >
                <GlitchText
                  className="text-lg font-black text-black uppercase"
                  intensity="medium"
                  trigger="hover"
                >
                  🔥 CONTROL PANELS 🔥
                </GlitchText>
              </BrutalBox>
            </div>

            <TabsList className="grid w-full grid-cols-3 bg-black/20 border-2 border-foreground/20 backdrop-blur-sm">
              <TabsTrigger
                value="links"
                className="flex items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-red-500/20 data-[state=active]:border-red-500 border-2 border-transparent font-bold"
              >
                <Link className="h-4 w-4" />
                <span className="hidden sm:inline">LINK FACTORY</span>
                <span className="sm:hidden">LINKS</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-yellow-500/20 data-[state=active]:border-yellow-500 border-2 border-transparent font-bold"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">DAMAGE REPORTS</span>
                <span className="sm:hidden">REPORTS</span>
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="flex items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-blue-500/20 data-[state=active]:border-blue-500 border-2 border-transparent font-bold"
              >
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">SOCIAL BRUTTS</span>
                <span className="sm:hidden">SOCIAL</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="links"
              className="space-y-4 overflow-hidden mt-6"
            >
              <div className="mb-4">
                <BrutalBox
                  variant="destructive"
                  className="inline-block p-3 transform rotate-1"
                >
                  <GlitchText
                    className="text-lg font-black text-white uppercase"
                    intensity="medium"
                    trigger="hover"
                  >
                    ⚡ WEAPON MANAGEMENT ⚡
                  </GlitchText>
                </BrutalBox>
              </div>
              <Suspense fallback={<LinkManagementSkeleton />}>
                <BrutalLinkManagerTab />
              </Suspense>
            </TabsContent>

            <TabsContent
              value="analytics"
              className="space-y-4 overflow-hidden mt-6"
            >
              <div className="mb-4">
                <BrutalBox
                  variant="warning"
                  className="inline-block p-3 transform -rotate-1"
                >
                  <GlitchText
                    className="text-lg font-black text-black uppercase"
                    intensity="medium"
                    trigger="hover"
                  >
                    📊 DESTRUCTION ANALYTICS 📊
                  </GlitchText>
                </BrutalBox>
              </div>
              <BrutalCard>
                <Suspense fallback={<AnalyticsSkeleton />}>
                  <Analytics />
                </Suspense>
              </BrutalCard>
            </TabsContent>

            <TabsContent value="social" className="space-y-4 mt-6">
              <div className="mb-4">
                <BrutalBox
                  variant="default"
                  className="inline-block p-3 transform rotate-2"
                >
                  <GlitchText
                    className="text-lg font-black uppercase"
                    intensity="medium"
                    trigger="hover"
                  >
                    🌐 SOCIAL CHAOS CONTROL 🌐
                  </GlitchText>
                </BrutalBox>
              </div>
              <BrutalCard>
                <CardHeader>
                  <GlitchText
                    className="text-3xl font-black"
                    intensity="high"
                    trigger="hover"
                  >
                    <CardTitle>SOCIAL BRUTEES</CardTitle>
                  </GlitchText>
                  <CardDescription className="text-lg font-bold tracking-wide uppercase">
                    MANAGE YOUR SOCIAL MEDIA LINKS AND CONTROL THEIR VISIBILITY
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SocialLinksSection />
                </CardContent>
              </BrutalCard>
            </TabsContent>
          </Tabs>
        </BrutalCard>

        {/* Bottom Warning */}
        <div className="text-center">
          <ShakeElement intensity="high" trigger="hover">
            <BrutalBox
              variant="warning"
              className="inline-block p-4 transform -rotate-1"
            >
              <GlitchText
                className="text-lg font-black text-black uppercase"
                intensity="high"
                trigger="always"
              >
                ⚠️ HANDLE WITH EXTREME CAUTION - DIGITAL CHAOS AHEAD ⚠️
              </GlitchText>
            </BrutalBox>
          </ShakeElement>
        </div>
      </div>
    </div>
  );
};

export default BrutalDashboardPage;
