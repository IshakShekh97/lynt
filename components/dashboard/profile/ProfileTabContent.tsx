"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "./ProfileForm";
import { PublicProfileCard } from "./PublicProfileCard";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Globe, Skull, Crown, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileTabContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    username?: string | null;
    bio?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const brutalSlideIn = {
  hidden: { x: -100, opacity: 0, rotate: -5, scale: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
      duration: 0.8,
    },
  },
};

export function ProfileTabContent({ user }: ProfileTabContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* BRUTAL Profile Header */}
      <motion.div variants={brutalSlideIn}>
        <BrutalBox className="p-10 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="relative">
              <ShakeElement intensity="medium" trigger="hover">
                <div className="relative">
                  <Avatar className="h-40 w-40 border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback className="text-4xl font-black bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "💀"}
                    </AvatarFallback>
                  </Avatar>

                  {/* Brutal Status Indicators */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-4 -right-4 bg-green-500 border-4 border-black rounded-full p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Zap className="h-6 w-6 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-4 -left-4 bg-yellow-500 border-4 border-black rounded-full p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Crown className="h-6 w-6 text-black" />
                  </motion.div>
                </div>
              </ShakeElement>
            </div>

            <div className="text-center lg:text-left space-y-6 flex-1">
              <div className="space-y-4">
                <ShakeElement intensity="low" trigger="hover">
                  <GlitchText
                    className="text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tight"
                    intensity="medium"
                    trigger="hover"
                  >
                    {user.name || "ANONYMOUS WARRIOR"}
                  </GlitchText>
                </ShakeElement>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Badge className="text-xl border-4 border-black bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-all px-4 py-2">
                    👑 @{user.username || "UNNAMED_BEAST"}
                  </Badge>

                  <Badge className="text-lg border-3 border-black bg-red-500 text-white font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-3 py-1">
                    💀 ACTIVE
                  </Badge>

                  <Badge
                    className={cn(
                      "text-lg border-3 border-black  text-white font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-3 py-1",
                      user.emailVerified ? "bg-green-500" : "bg-red-500"
                    )}
                  >
                    {user.emailVerified ? "🔥 VERIFIED" : "❌ UNVERIFIED"}
                  </Badge>
                </div>
              </div>

              {user.bio && (
                <BrutalBox className="p-4 bg-black/10 border-2 border-black">
                  <GlitchText
                    className="text-lg font-bold text-muted-foreground max-w-md"
                    intensity="low"
                  >
                    &ldquo;{user.bio}&rdquo;
                  </GlitchText>
                </BrutalBox>
              )}

              <div className="flex items-center gap-3 text-lg font-bold text-muted-foreground">
                <Shield className="h-6 w-6 text-primary animate-pulse" />
                <span>
                  MEMBER SINCE{" "}
                  {new Date(user.createdAt).toLocaleDateString().toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </BrutalBox>
      </motion.div>

      {/* BRUTAL Form Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <motion.div variants={brutalSlideIn}>
          <BrutalBox className="p-8 bg-gradient-to-br from-background/95 via-background/90 to-destructive/5 backdrop-blur-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="space-y-6">
              <div className="text-center">
                <ShakeElement intensity="medium" trigger="hover">
                  <BrutalBox
                    variant="warning"
                    className="inline-block p-3 transform -rotate-2 hover:rotate-2 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Skull className="h-8 w-8 text-black animate-bounce" />
                      <GlitchText
                        className="text-3xl font-black text-black uppercase"
                        intensity="high"
                        trigger="hover"
                      >
                        EDIT IDENTITY
                      </GlitchText>
                      <Skull className="h-8 w-8 text-black animate-bounce" />
                    </div>
                  </BrutalBox>
                </ShakeElement>
              </div>

              <div className="space-y-4">
                <BrutalBox className="p-4 bg-red-500/10 border-2 border-red-500">
                  <p className="text-center font-black text-lg uppercase text-red-600">
                    ⚠️ WARNING: CHANGES CANNOT BE UNDONE ⚠️
                  </p>
                </BrutalBox>

                <ProfileForm
                  user={{
                    ...user,
                    username: user.username || undefined,
                    bio: user.bio || undefined,
                  }}
                />
              </div>
            </div>
          </BrutalBox>
        </motion.div>

        <motion.div variants={brutalSlideIn}>
          <BrutalBox className="p-8 bg-gradient-to-br from-background/95 via-background/90 to-primary/5 backdrop-blur-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="space-y-6">
              <div className="text-center">
                <ShakeElement intensity="low" trigger="hover">
                  <BrutalBox
                    variant="default"
                    className="inline-block p-3 transform rotate-1 hover:-rotate-1 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Globe
                        className="h-8 w-8 text-primary animate-spin"
                        style={{ animationDuration: "3s" }}
                      />
                      <GlitchText
                        className="text-3xl font-black text-foreground uppercase"
                        intensity="medium"
                        trigger="hover"
                      >
                        PUBLIC FACE
                      </GlitchText>
                      <Globe
                        className="h-8 w-8 text-primary animate-spin"
                        style={{ animationDuration: "3s" }}
                      />
                    </div>
                  </BrutalBox>
                </ShakeElement>
              </div>

              <div className="space-y-4">
                <BrutalBox className="p-4 bg-blue-500/10 border-2 border-blue-500">
                  <p className="text-center font-black text-lg uppercase text-blue-600">
                    🌍 THE WORLD WILL SEE THIS 🌍
                  </p>
                </BrutalBox>

                <PublicProfileCard
                  user={{
                    ...user,
                    username: user.username || undefined,
                    bio: user.bio || undefined,
                  }}
                />
              </div>
            </div>
          </BrutalBox>
        </motion.div>
      </div>

      {/* BRUTAL Stats Section */}
      <motion.div
        variants={brutalSlideIn}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: "💀",
            title: "PROFILE POWER",
            value: "MAXIMUM",
            color: "bg-red-500",
          },
          {
            icon: "🔥",
            title: "DESTRUCTION LEVEL",
            value: "INFINITE",
            color: "bg-orange-500",
          },
          {
            icon: "⚡",
            title: "CHAOS FACTOR",
            value: "UNSTOPPABLE",
            color: "bg-yellow-500",
          },
        ].map((stat, index) => (
          <ShakeElement key={index} intensity="medium" trigger="hover">
            <BrutalBox
              className={`p-6 ${stat.color} border-4 border-black text-center text-white transform hover:scale-110 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="space-y-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  {stat.icon}
                </motion.div>
                <GlitchText
                  className="text-2xl font-black uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  {stat.value}
                </GlitchText>
                <p className="text-sm font-bold uppercase tracking-wider">
                  {stat.title}
                </p>
              </div>
            </BrutalBox>
          </ShakeElement>
        ))}
      </motion.div>
    </motion.div>
  );
}
