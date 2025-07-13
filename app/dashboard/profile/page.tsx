"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Activity, Trash2, Skull, Flame, Zap } from "lucide-react";
import { ProfileTabContent } from "@/components/dashboard/profile/ProfileTabContent";
import { SessionsTabContent } from "@/components/dashboard/profile/SessionsTabContent";
import { DangerTabContent } from "@/components/dashboard/profile/DangerTabContent";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "@/components/landing/FloatingGeometricShapes";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { ProfileSkeleton } from "@/components/loading-skeletons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const brutalSlideIn = {
  hidden: { x: -100, opacity: 0, rotate: -5 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
      duration: 0.8,
    },
  },
};

const brutalBounce = {
  hidden: { y: 100, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 15,
      duration: 0.9,
    },
  },
};

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-destructive/5">
      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 2px, transparent 2px),
              linear-gradient(to bottom, currentColor 2px, transparent 2px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Background Effects */}
      <FloatingGeometricShapes className="opacity-30" />

      {/* Brutal Warning Banner */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative z-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-2"
      >
        <div className="container mx-auto">
          <ShakeElement intensity="medium" trigger="hover">
            <div className="flex items-center justify-center gap-2 text-white font-black text-sm md:text-lg uppercase tracking-wider">
              <Skull className="h-5 w-5 animate-bounce" />
              <GlitchText intensity="high" trigger="always">
                ⚠️ DANGER ZONE - MODIFY AT YOUR OWN RISK ⚠️
              </GlitchText>
              <Skull className="h-5 w-5 animate-bounce" />
            </div>
          </ShakeElement>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 lg:space-y-12"
      >
        {/* Brutal Header */}
        <motion.div
          variants={brutalSlideIn}
          className="text-center space-y-6 lg:space-y-8"
        >
          <div className="relative">
            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox
                variant="destructive"
                className="inline-block p-3 sm:p-4 transform -rotate-2 hover:rotate-2 transition-transform duration-300"
              >
                <GlitchText
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tight"
                  intensity="high"
                  trigger="hover"
                >
                  💀 PROFILE 💀
                </GlitchText>
              </BrutalBox>
            </ShakeElement>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-2xl sm:text-4xl"
            >
              🔥
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 text-2xl sm:text-4xl"
            >
              ⚡
            </motion.div>
          </div>

          <BrutalBox className="inline-block p-3 sm:p-4 bg-yellow-400 border-4 border-black transform rotate-1 hover:-rotate-1 transition-transform duration-300">
            <GlitchText
              className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase"
              intensity="medium"
              trigger="hover"
            >
              EDIT YOUR DIGITAL SOUL
            </GlitchText>
          </BrutalBox>

          {/* Warning Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { icon: "💀", text: "HARDCORE MODE", color: "bg-red-500" },
              { icon: "🔥", text: "NO MERCY", color: "bg-orange-500" },
              { icon: "⚡", text: "BRUTAL CHANGES", color: "bg-yellow-500" },
            ].map((badge, index) => (
              <ShakeElement key={index} intensity="low" trigger="hover">
                <Badge
                  className={`${badge.color} text-white border-2 border-black font-black text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-all`}
                >
                  {badge.icon}{" "}
                  <span className="hidden sm:inline">{badge.text}</span>
                </Badge>
              </ShakeElement>
            ))}
          </div>
        </motion.div>

        {/* Profile Tabs with EXTREME Brutal Design */}
        <motion.div variants={brutalBounce}>
          <BrutalBox className="p-4 sm:p-6 lg:p-8 bg-background/90 backdrop-blur-md border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-16 sm:h-20 p-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <TabsTrigger
                  value="profile"
                  className="flex flex-col items-center gap-1 sm:gap-2 text-sm sm:text-lg font-black h-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] data-[state=active]:border-2 data-[state=active]:border-black transition-all duration-300 hover:scale-105"
                >
                  <User className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="uppercase tracking-wider text-xs sm:text-base">
                    <span className="hidden sm:inline">💀 PROFILE 💀</span>
                    <span className="sm:hidden">💀</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="sessions"
                  className="flex flex-col items-center gap-1 sm:gap-2 text-sm sm:text-lg font-black h-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] data-[state=active]:border-2 data-[state=active]:border-black transition-all duration-300 hover:scale-105"
                >
                  <Activity className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="uppercase tracking-wider text-xs sm:text-base">
                    <span className="hidden sm:inline">🔥 SESSIONS 🔥</span>
                    <span className="sm:hidden">🔥</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="danger"
                  className="flex flex-col items-center gap-1 sm:gap-2 text-sm sm:text-lg font-black h-full data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] data-[state=active]:border-2 data-[state=active]:border-black transition-all duration-300 hover:scale-105"
                >
                  <Trash2 className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="uppercase tracking-wider text-xs sm:text-base">
                    <span className="hidden sm:inline">⚡ DESTROY ⚡</span>
                    <span className="sm:hidden">⚡</span>
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6 sm:mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 sm:mb-6">
                    <ShakeElement intensity="low" trigger="hover">
                      <BrutalBox
                        variant="warning"
                        className="inline-block p-2 sm:p-3 transform -rotate-1"
                      >
                        <GlitchText
                          className="text-lg sm:text-2xl font-black text-black uppercase"
                          intensity="medium"
                        >
                          🚨 MODIFY YOUR EXISTENCE 🚨
                        </GlitchText>
                      </BrutalBox>
                    </ShakeElement>
                  </div>
                  <Suspense fallback={<ProfileSkeleton />}>
                    <ProfileTabContent user={user} />
                  </Suspense>
                </motion.div>
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions" className="mt-6 sm:mt-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 sm:mb-6">
                    <ShakeElement intensity="medium" trigger="hover">
                      <BrutalBox
                        variant="destructive"
                        className="inline-block p-2 sm:p-3 transform rotate-1"
                      >
                        <GlitchText
                          className="text-lg sm:text-2xl font-black text-white uppercase"
                          intensity="high"
                        >
                          🔥 YOUR DIGITAL FOOTPRINTS 🔥
                        </GlitchText>
                      </BrutalBox>
                    </ShakeElement>
                  </div>
                  <Suspense fallback={<ProfileSkeleton />}>
                    <SessionsTabContent />
                  </Suspense>
                </motion.div>
              </TabsContent>

              {/* Danger Tab */}
              <TabsContent value="danger" className="mt-6 sm:mt-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="mb-4 sm:mb-6 text-center">
                    <ShakeElement intensity="high" trigger="always">
                      <BrutalBox
                        variant="destructive"
                        className="inline-block p-3 sm:p-4 bg-gradient-to-r from-red-600 to-red-800"
                      >
                        <GlitchText
                          className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase"
                          intensity="high"
                          trigger="always"
                        >
                          💀⚠️ TOTAL ANNIHILATION ZONE ⚠️💀
                        </GlitchText>
                      </BrutalBox>
                    </ShakeElement>
                    <div className="mt-4">
                      <Badge className="bg-red-500 text-white border-2 border-black font-black text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 animate-pulse">
                        🚫 NO SURVIVORS 🚫
                      </Badge>
                    </div>
                  </div>
                  <Suspense fallback={<ProfileSkeleton />}>
                    <DangerTabContent user={user} />
                  </Suspense>
                </motion.div>
              </TabsContent>
            </Tabs>
          </BrutalBox>
        </motion.div>

        {/* Brutal Footer Warning */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <BrutalBox className="inline-block p-4 sm:p-6 bg-gradient-to-r from-purple-600 to-pink-600 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-bounce" />
              <GlitchText
                className="text-sm sm:text-xl font-black text-white uppercase text-center"
                intensity="medium"
                trigger="hover"
              >
                CHANGES ARE PERMANENT - NO CRYING ALLOWED
              </GlitchText>
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-pulse" />
            </div>
          </BrutalBox>
        </motion.div>
      </motion.div>
    </div>
  );
}
