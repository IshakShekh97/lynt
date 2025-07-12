"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "./ProfileForm";
import { ProfileImageForm } from "./ProfileImageForm";
import { PublicProfileCard } from "./PublicProfileCard";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Globe, Skull, Crown, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    user.image || `/api/profile-image/${user.id}`
  );

  const handleImageUpdate = (imageUrl: string | null) => {
    setProfileImageUrl(imageUrl);
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10"
    >
      {/* BRUTAL Profile Header */}
      <motion.div variants={brutalSlideIn}>
        <BrutalBox className="p-3 sm:p-6 lg:p-8 xl:p-10 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            <div className="relative flex-shrink-0">
              <ShakeElement intensity="medium" trigger="hover">
                <div className="relative">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40 border-2 sm:border-4 lg:border-6 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-transform duration-300">
                    <AvatarImage
                      src={profileImageUrl || user.image || ""}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
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
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 lg:-top-4 lg:-right-4 bg-green-500 border-2 sm:border-2 lg:border-4 border-black rounded-full p-0.5 sm:p-1 lg:p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 lg:h-6 lg:w-6 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 lg:-bottom-4 lg:-left-4 bg-yellow-500 border-2 sm:border-2 lg:border-4 border-black rounded-full p-0.5 sm:p-1 lg:p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Crown className="h-3 w-3 sm:h-4 sm:w-4 lg:h-6 lg:w-6 text-black" />
                  </motion.div>
                </div>
              </ShakeElement>
            </div>

            <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6 flex-1 min-w-0">
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <ShakeElement intensity="low" trigger="hover">
                  <GlitchText
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground uppercase tracking-tight break-words leading-tight"
                    intensity="medium"
                    trigger="hover"
                  >
                    {user.name || "ANONYMOUS WARRIOR"}
                  </GlitchText>
                </ShakeElement>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3 justify-center lg:justify-start">
                  <Badge className="text-sm sm:text-lg lg:text-xl border-2 sm:border-2 lg:border-4 border-black bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-all px-2 sm:px-3 lg:px-4 py-1 sm:py-1 lg:py-2">
                    👑 @{user.username || "UNNAMED_BEAST"}
                  </Badge>

                  <Badge className="text-xs sm:text-sm lg:text-lg border-2 sm:border-2 lg:border-3 border-black bg-red-500 text-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1">
                    💀 ACTIVE
                  </Badge>

                  <Badge
                    className={cn(
                      "text-xs sm:text-sm lg:text-lg border-2 sm:border-2 lg:border-3 border-black text-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1",
                      user.emailVerified ? "bg-green-500" : "bg-red-500"
                    )}
                  >
                    {user.emailVerified ? "🔥 VERIFIED" : "❌ UNVERIFIED"}
                  </Badge>
                </div>
              </div>

              {user.bio && (
                <BrutalBox className="p-2 sm:p-3 lg:p-4 bg-black/10 border-2 border-black">
                  <GlitchText
                    className="text-sm sm:text-base lg:text-lg font-bold text-muted-foreground max-w-md mx-auto lg:mx-0 break-words"
                    intensity="low"
                  >
                    &ldquo;{user.bio}&rdquo;
                  </GlitchText>
                </BrutalBox>
              )}

              <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-3 text-sm sm:text-base lg:text-lg font-bold text-muted-foreground">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary animate-pulse flex-shrink-0" />
                <span className="text-center lg:text-left break-words">
                  MEMBER SINCE{" "}
                  {new Date(user.createdAt).toLocaleDateString().toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </BrutalBox>
      </motion.div>

      {/* BRUTAL Form Sections - Mobile-First Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column: Profile Form Section */}
        <motion.div variants={brutalSlideIn} className="xl:col-span-1">
          <BrutalBox className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background/95 via-background/90 to-destructive/5 backdrop-blur-md border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="text-center">
                <ShakeElement intensity="medium" trigger="hover">
                  <BrutalBox
                    variant="warning"
                    className="inline-block p-1.5 sm:p-2 lg:p-3 transform -rotate-2 hover:rotate-2 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                      <Skull className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-black animate-bounce" />
                      <GlitchText
                        className="text-lg sm:text-2xl lg:text-3xl font-black text-black uppercase"
                        intensity="high"
                        trigger="hover"
                      >
                        EDIT IDENTITY
                      </GlitchText>
                      <Skull className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-black animate-bounce" />
                    </div>
                  </BrutalBox>
                </ShakeElement>
              </div>

              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <BrutalBox className="p-2 sm:p-3 lg:p-4 bg-red-500/10 border-2 border-red-500">
                  <p className="text-center font-black text-xs sm:text-sm lg:text-lg uppercase text-red-600">
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

        {/* Right Column: Profile Image Form and Public Profile */}
        <motion.div
          variants={brutalSlideIn}
          className="xl:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {/* Profile Image Section */}
          <div>
            <ProfileImageForm
              currentImage={profileImageUrl}
              userName={user.name}
              onImageUpdate={handleImageUpdate}
            />
          </div>

          {/* Public Profile Preview Section */}
          <div>
            <BrutalBox className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background/95 via-background/90 to-primary/5 backdrop-blur-md border-2 sm:border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="text-center">
                  <ShakeElement intensity="low" trigger="hover">
                    <BrutalBox
                      variant="default"
                      className="inline-block p-1.5 sm:p-2 lg:p-3 transform rotate-1 hover:-rotate-1 transition-transform duration-300"
                    >
                      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                        <Globe
                          className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary animate-spin"
                          style={{ animationDuration: "3s" }}
                        />
                        <GlitchText
                          className="text-lg sm:text-2xl lg:text-3xl font-black text-foreground uppercase"
                          intensity="medium"
                          trigger="hover"
                        >
                          PUBLIC FACE
                        </GlitchText>
                        <Globe
                          className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary animate-spin"
                          style={{ animationDuration: "3s" }}
                        />
                      </div>
                    </BrutalBox>
                  </ShakeElement>
                </div>

                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <BrutalBox className="p-2 sm:p-3 lg:p-4 bg-blue-500/10 border-2 border-blue-500">
                    <p className="text-center font-black text-xs sm:text-sm lg:text-lg uppercase text-blue-600">
                      🌍 THE WORLD WILL SEE THIS 🌍
                    </p>
                  </BrutalBox>

                  <PublicProfileCard
                    user={{
                      ...user,
                      image: profileImageUrl || user.image,
                      username: user.username || undefined,
                      bio: user.bio || undefined,
                    }}
                  />
                </div>
              </div>
            </BrutalBox>
          </div>
        </motion.div>
      </div>

      {/* BRUTAL Stats Section */}
      <motion.div
        variants={brutalSlideIn}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
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
              className={`p-3 sm:p-4 lg:p-6 ${stat.color} border-2 sm:border-4 border-black text-center text-white transform hover:scale-110 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl sm:text-3xl lg:text-4xl"
                >
                  {stat.icon}
                </motion.div>
                <GlitchText
                  className="text-lg sm:text-xl lg:text-2xl font-black uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  {stat.value}
                </GlitchText>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider break-words">
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
