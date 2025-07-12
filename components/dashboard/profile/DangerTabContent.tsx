"use client";

import { motion } from "framer-motion";
import { AccountDeletion } from "./AccountDeletion";
import { DataExport } from "./DataExport";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import {
  AlertTriangle,
  Download,
  Trash2,
  Skull,
  Flame,
  Zap,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DangerTabContentProps {
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
      staggerChildren: 0.3,
    },
  },
};

const dangerVariants = {
  hidden: { x: -100, opacity: 0, scale: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 1,
    },
  },
};

export function DangerTabContent({ user }: DangerTabContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 lg:space-y-12"
    >
      {/* EXTREME Danger Zone Header */}
      <motion.div
        variants={dangerVariants}
        className="text-center space-y-6 sm:space-y-8"
      >
        <div className="relative">
          <ShakeElement intensity="high" trigger="always">
            <BrutalBox className="inline-block p-4 sm:p-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 border-4 border-black transform -rotate-2">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Skull className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </motion.div>
                <GlitchText
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase"
                  intensity="high"
                  trigger="always"
                >
                  💀 TOTAL DESTRUCTION 💀
                </GlitchText>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Skull className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </motion.div>
              </div>
            </BrutalBox>
          </ShakeElement>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-4xl sm:text-6xl"
          >
            🔥
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 text-4xl sm:text-6xl"
          >
            ⚡
          </motion.div>
        </div>

        <BrutalBox className="inline-block p-3 sm:p-4 bg-yellow-400 border-4 border-black transform rotate-1">
          <GlitchText
            className="text-lg sm:text-2xl font-black text-black uppercase"
            intensity="medium"
          >
            ⚠️ NO SURVIVORS - NO MERCY ⚠️
          </GlitchText>
        </BrutalBox>

        {/* Warning Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {[
            { icon: "☠️", text: "PERMANENT", color: "bg-red-600" },
            { icon: "💀", text: "IRREVERSIBLE", color: "bg-black" },
            { icon: "🔥", text: "CATASTROPHIC", color: "bg-orange-600" },
            { icon: "⚡", text: "INSTANT DEATH", color: "bg-yellow-600" },
          ].map((badge, index) => (
            <ShakeElement key={index} intensity="medium" trigger="hover">
              <Badge
                className={`${badge.color} text-white border-2 border-black font-black text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-all animate-pulse`}
              >
                {badge.icon}{" "}
                <span className="hidden sm:inline">{badge.text}</span>
              </Badge>
            </ShakeElement>
          ))}
        </div>
      </motion.div>

      {/* MEGA WARNING Section */}
      <motion.div variants={dangerVariants}>
        <BrutalBox className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 border-4 sm:border-6 border-red-500 shadow-[16px_16px_0px_0px_rgba(255,0,0,0.5)] sm:shadow-[20px_20px_0px_0px_rgba(255,0,0,0.5)] transform hover:shadow-[20px_20px_0px_0px_rgba(255,0,0,0.7)] sm:hover:shadow-[25px_25px_0px_0px_rgba(255,0,0,0.7)] transition-all duration-300">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <ShakeElement intensity="high" trigger="always">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="p-3 sm:p-4 bg-red-600 rounded-lg border-2 sm:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </motion.div>
                  <GlitchText
                    className="text-3xl sm:text-4xl font-black text-red-600 uppercase"
                    intensity="high"
                    trigger="always"
                  >
                    🚨 FINAL WARNING 🚨
                  </GlitchText>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                    className="p-3 sm:p-4 bg-red-600 rounded-lg border-2 sm:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </motion.div>
                </div>
              </ShakeElement>

              <BrutalBox className="inline-block p-4 sm:p-6 bg-black text-white border-2 sm:border-4 border-red-500">
                <GlitchText
                  className="text-xl sm:text-2xl font-black uppercase"
                  intensity="medium"
                >
                  💀 THESE ACTIONS WILL OBLITERATE YOUR EXISTENCE 💀
                </GlitchText>
              </BrutalBox>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <BrutalBox className="p-4 sm:p-6 bg-red-500/10 border-2 sm:border-3 border-red-500">
                <div className="text-center space-y-3 sm:space-y-4">
                  <Shield className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-red-500 animate-pulse" />
                  <GlitchText
                    className="text-lg sm:text-xl font-black text-red-600 uppercase"
                    intensity="medium"
                  >
                    ⚠️ NO RECOVERY POSSIBLE ⚠️
                  </GlitchText>
                  <p className="font-bold text-red-600 text-sm sm:text-base">
                    Once you cross this line, there is no going back to the
                    light.
                  </p>
                </div>
              </BrutalBox>

              <BrutalBox className="p-6 bg-orange-500/10 border-3 border-orange-500">
                <div className="text-center space-y-4">
                  <Flame className="h-16 w-16 mx-auto text-orange-500 animate-bounce" />
                  <GlitchText
                    className="text-xl font-black text-orange-600 uppercase"
                    intensity="medium"
                  >
                    🔥 INSTANT DESTRUCTION 🔥
                  </GlitchText>
                  <p className="font-bold text-orange-600">
                    Your digital soul will be consumed by the void immediately.
                  </p>
                </div>
              </BrutalBox>
            </div>
          </div>
        </BrutalBox>
      </motion.div>

      {/* BRUTAL Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div variants={dangerVariants}>
          <BrutalBox className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-4 border-blue-500 shadow-[12px_12px_0px_0px_rgba(0,0,255,0.3)] transform hover:shadow-[16px_16px_0px_0px_rgba(0,0,255,0.5)] transition-all duration-300">
            <div className="space-y-6">
              <div className="text-center">
                <ShakeElement intensity="medium" trigger="hover">
                  <BrutalBox className="inline-block p-4 bg-blue-500 border-3 border-black transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <Download className="h-8 w-8 text-white animate-bounce" />
                      <GlitchText
                        className="text-3xl font-black text-white uppercase"
                        intensity="high"
                        trigger="hover"
                      >
                        EXTRACT SOUL
                      </GlitchText>
                    </div>
                  </BrutalBox>
                </ShakeElement>
              </div>

              <BrutalBox className="p-4 bg-blue-500/20 border-2 border-blue-500">
                <p className="text-center font-black text-lg uppercase text-blue-600">
                  📦 EXPORT YOUR DIGITAL REMAINS 📦
                </p>
              </BrutalBox>

              <DataExport
                user={{
                  ...user,
                  username: user.username || undefined,
                  bio: user.bio || undefined,
                }}
              />
            </div>
          </BrutalBox>
        </motion.div>

        <motion.div variants={dangerVariants}>
          <BrutalBox className="p-8 bg-gradient-to-br from-red-600/20 to-black/20 border-4 border-red-600 shadow-[12px_12px_0px_0px_rgba(255,0,0,0.5)] transform hover:shadow-[16px_16px_0px_0px_rgba(255,0,0,0.7)] transition-all duration-300">
            <div className="space-y-6">
              <div className="text-center">
                <ShakeElement intensity="high" trigger="always">
                  <BrutalBox className="inline-block p-4 bg-gradient-to-r from-red-600 to-black border-3 border-white transform rotate-1 hover:-rotate-1 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <Trash2 className="h-8 w-8 text-white animate-pulse" />
                      <GlitchText
                        className="text-3xl font-black text-white uppercase"
                        intensity="high"
                        trigger="always"
                      >
                        TOTAL ANNIHILATION
                      </GlitchText>
                    </div>
                  </BrutalBox>
                </ShakeElement>
              </div>

              <BrutalBox className="p-4 bg-red-600/30 border-2 border-red-600">
                <p className="text-center font-black text-lg uppercase text-red-600">
                  💀 DELETE EVERYTHING FOREVER 💀
                </p>
              </BrutalBox>

              <AccountDeletion
                user={{
                  ...user,
                  username: user.username || undefined,
                  bio: user.bio || undefined,
                }}
              />
            </div>
          </BrutalBox>
        </motion.div>
      </div>

      {/* FINAL BRUTAL WARNING */}
      <motion.div variants={dangerVariants} className="text-center">
        <BrutalBox className="inline-block p-8 bg-gradient-to-r from-purple-600 via-red-600 to-black border-4 border-white transform -rotate-1 hover:rotate-1 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Skull className="h-12 w-12 text-white" />
            </motion.div>
            <GlitchText
              className="text-3xl font-black text-white uppercase"
              intensity="high"
              trigger="hover"
            >
              REMEMBER: DESTRUCTION IS ETERNAL
            </GlitchText>
            <motion.div
              animate={{ rotate: [360, 180, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-12 w-12 text-yellow-300" />
            </motion.div>
          </div>
        </BrutalBox>
      </motion.div>
    </motion.div>
  );
}
