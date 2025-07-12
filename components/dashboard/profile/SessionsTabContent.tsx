"use client";

import { motion } from "framer-motion";
import { SessionsList } from "./SessionsList";
import { SessionActions } from "./SessionActions";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Activity, Shield, Skull, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/auth-client";

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
  hidden: { x: -100, opacity: 0, rotate: -3 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
      duration: 0.8,
    },
  },
};

export function SessionsTabContent() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* BRUTAL Sessions Header */}
      <motion.div variants={brutalSlideIn} className="text-center space-y-6">
        <div className="relative">
          <ShakeElement intensity="medium" trigger="hover">
            <BrutalBox className="inline-block p-6 bg-gradient-to-r from-orange-500 to-red-500 border-4 border-black transform -rotate-1 hover:rotate-1 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="h-10 w-10 text-white" />
                </motion.div>
                <GlitchText
                  className="text-4xl font-black text-white uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  🔥 DIGITAL FOOTPRINTS 🔥
                </GlitchText>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="h-10 w-10 text-white" />
                </motion.div>
              </div>
            </BrutalBox>
          </ShakeElement>
        </div>

        <BrutalBox className="inline-block p-4 bg-yellow-400 border-4 border-black transform rotate-1">
          <GlitchText
            className="text-xl font-black text-black uppercase"
            intensity="medium"
          >
            👁️ EVERY DEVICE IS BEING WATCHED 👁️
          </GlitchText>
        </BrutalBox>

        {/* Warning Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: "🔍", text: "SURVEILLANCE", color: "bg-blue-600" },
            { icon: "⚡", text: "ACTIVE TRACKING", color: "bg-yellow-600" },
            { icon: "🚨", text: "SECURITY ALERT", color: "bg-red-600" },
          ].map((badge, index) => (
            <ShakeElement key={index} intensity="low" trigger="hover">
              <Badge
                className={`${badge.color} text-white border-2 border-black font-black text-sm px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-all animate-pulse`}
              >
                {badge.icon} {badge.text}
              </Badge>
            </ShakeElement>
          ))}
        </div>
      </motion.div>

      {/* BRUTAL Current Session */}
      <motion.div variants={brutalSlideIn}>
        <BrutalBox className="p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-4 border-green-500 shadow-[12px_12px_0px_0px_rgba(0,128,0,0.3)] transform hover:shadow-[16px_16px_0px_0px_rgba(0,128,0,0.5)] transition-all duration-300">
          <div className="space-y-6">
            <div className="text-center">
              <ShakeElement intensity="medium" trigger="hover">
                <BrutalBox className="inline-block p-4 bg-green-500 border-3 border-black transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Shield className="h-8 w-8 text-white" />
                    </motion.div>
                    <GlitchText
                      className="text-3xl font-black text-white uppercase"
                      intensity="high"
                      trigger="hover"
                    >
                      💀 CURRENT INVASION 💀
                    </GlitchText>
                  </div>
                </BrutalBox>
              </ShakeElement>
            </div>

            <BrutalBox className="p-4 bg-green-500/20 border-2 border-green-500">
              <p className="text-center font-black text-lg uppercase text-green-600">
                🔒 THIS DEVICE - ACTIVELY MONITORED 🔒
              </p>
            </BrutalBox>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "SESSION ID",
                  value: `${session.session.id.slice(
                    0,
                    8
                  )}...${session.session.id.slice(-8)}`,
                  icon: "🔑",
                },
                {
                  label: "CREATED",
                  value: new Date(session.session.createdAt).toLocaleString(),
                  icon: "⏰",
                },
                {
                  label: "LAST ACTIVE",
                  value: new Date(session.session.updatedAt).toLocaleString(),
                  icon: "👁️",
                },
                {
                  label: "EXPIRES",
                  value: new Date(session.session.expiresAt).toLocaleString(),
                  icon: "💀",
                },
              ].map((item, index) => (
                <BrutalBox
                  key={index}
                  className="p-4 bg-background/90 border-2 border-green-500"
                >
                  <div className="space-y-2">
                    <GlitchText
                      className="text-sm font-black text-green-600 uppercase"
                      intensity="low"
                    >
                      {item.icon} {item.label}
                    </GlitchText>
                    <p className="text-xs font-mono bg-green-500/10 p-2 rounded border border-green-500">
                      {item.value}
                    </p>
                  </div>
                </BrutalBox>
              ))}
            </div>

            {session.session.userAgent && (
              <BrutalBox className="p-4 bg-background/90 border-2 border-green-500">
                <GlitchText
                  className="text-sm font-black text-green-600 uppercase mb-2"
                  intensity="low"
                >
                  🕵️ USER AGENT SIGNATURE
                </GlitchText>
                <p className="text-xs font-mono bg-green-500/10 p-3 rounded border border-green-500">
                  {session.session.userAgent}
                </p>
              </BrutalBox>
            )}

            {session.session.ipAddress && (
              <BrutalBox className="p-4 bg-background/90 border-2 border-green-500">
                <GlitchText
                  className="text-sm font-black text-green-600 uppercase mb-2"
                  intensity="low"
                >
                  🌐 IP ADDRESS TRACED
                </GlitchText>
                <p className="text-lg font-mono bg-green-500/10 p-3 rounded border border-green-500 text-center">
                  {session.session.ipAddress}
                </p>
              </BrutalBox>
            )}
          </div>
        </BrutalBox>
      </motion.div>

      {/* BRUTAL All Sessions */}
      <motion.div variants={brutalSlideIn}>
        <BrutalBox className="p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-4 border-orange-500 shadow-[12px_12px_0px_0px_rgba(255,165,0,0.3)] transform hover:shadow-[16px_16px_0px_0px_rgba(255,165,0,0.5)] transition-all duration-300">
          <div className="space-y-6">
            <div className="text-center">
              <ShakeElement intensity="high" trigger="hover">
                <BrutalBox className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 border-3 border-black transform rotate-1 hover:-rotate-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <Activity className="h-8 w-8 text-white animate-pulse" />
                    <GlitchText
                      className="text-3xl font-black text-white uppercase"
                      intensity="high"
                      trigger="hover"
                    >
                      🚨 ALL INVASIONS 🚨
                    </GlitchText>
                  </div>
                </BrutalBox>
              </ShakeElement>
            </div>

            <BrutalBox className="p-4 bg-orange-500/20 border-2 border-orange-500">
              <p className="text-center font-black text-lg uppercase text-orange-600">
                👁️ EVERY DEVICE UNDER SURVEILLANCE 👁️
              </p>
            </BrutalBox>

            <SessionsList currentSessionId={session.session.id} />
          </div>
        </BrutalBox>
      </motion.div>

      {/* BRUTAL Session Actions */}
      <motion.div variants={brutalSlideIn}>
        <BrutalBox className="p-8 bg-gradient-to-br from-red-500/20 to-black/10 border-4 border-red-500 shadow-[12px_12px_0px_0px_rgba(255,0,0,0.3)] transform hover:shadow-[16px_16px_0px_0px_rgba(255,0,0,0.5)] transition-all duration-300">
          <div className="space-y-6">
            <div className="text-center">
              <ShakeElement intensity="high" trigger="always">
                <BrutalBox className="inline-block p-4 bg-gradient-to-r from-red-600 to-black border-3 border-white transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <Skull className="h-8 w-8 text-white animate-bounce" />
                    <GlitchText
                      className="text-3xl font-black text-white uppercase"
                      intensity="high"
                      trigger="always"
                    >
                      💀 TERMINATE SESSIONS 💀
                    </GlitchText>
                  </div>
                </BrutalBox>
              </ShakeElement>
            </div>

            <BrutalBox className="p-4 bg-red-500/30 border-2 border-red-500">
              <p className="text-center font-black text-lg uppercase text-red-600">
                ⚡ CUT ALL CONNECTIONS TO THE MATRIX ⚡
              </p>
            </BrutalBox>

            <SessionActions />
          </div>
        </BrutalBox>
      </motion.div>

      {/* FINAL BRUTAL WARNING */}
      <motion.div variants={brutalSlideIn} className="text-center">
        <BrutalBox className="inline-block p-6 bg-gradient-to-r from-purple-600 to-black border-4 border-yellow-400 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Eye className="h-10 w-10 text-yellow-300" />
            </motion.div>
            <GlitchText
              className="text-2xl font-black text-white uppercase"
              intensity="medium"
              trigger="hover"
            >
              👁️ THE SYSTEM NEVER SLEEPS 👁️
            </GlitchText>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Eye className="h-10 w-10 text-yellow-300" />
            </motion.div>
          </div>
        </BrutalBox>
      </motion.div>
    </motion.div>
  );
}
