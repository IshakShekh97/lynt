"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import {
  Activity,
  Shield,
  Skull,
  Eye,
  Loader2,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/lib/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";

interface DeviceSession {
  session: {
    id: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    userId: string;
    userAgent?: string | null;
    ipAddress?: string | null;
  };
}

// Animation variants
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

const slideInVariants = {
  hidden: { x: -50, opacity: 0, rotate: -2 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 20,
      duration: 0.6,
    },
  },
};

const scaleInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    },
  },
};

// Helper functions
const getDeviceType = (userAgent?: string | null): string => {
  if (!userAgent) return "UNKNOWN DEVICE";
  const ua = userAgent.toLowerCase();
  if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone"))
    return "📱 MOBILE DEVICE";
  if (ua.includes("tablet") || ua.includes("ipad")) return "📟 TABLET DEVICE";
  return "💻 DESKTOP TERMINAL";
};

const getBrowserInfo = (userAgent?: string | null): string => {
  if (!userAgent) return "UNKNOWN BROWSER";
  const ua = userAgent.toLowerCase();
  if (ua.includes("chrome")) return "🔍 CHROME SURVEILLANCE";
  if (ua.includes("firefox")) return "🦊 FIREFOX TRACKER";
  if (ua.includes("safari")) return "🧭 SAFARI MONITOR";
  if (ua.includes("edge")) return "⚡ EDGE SCANNER";
  return "🔍 UNKNOWN BROWSER";
};

const getTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const past = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "JUST NOW";
  if (diffMins < 60) return `${diffMins}m AGO`;
  if (diffHours < 24) return `${diffHours}h AGO`;
  return `${diffDays}d AGO`;
};

const isSessionExpiringSoon = (expiresAt: Date | string): boolean => {
  const now = new Date();
  const expires =
    typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  const diffHours = (expires.getTime() - now.getTime()) / (1000 * 60 * 60);
  return diffHours < 24; // Less than 24 hours remaining
};

const getDeviceIcon = (userAgent?: string | null) => {
  if (!userAgent) return Monitor;
  const ua = userAgent.toLowerCase();
  if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone"))
    return Smartphone;
  if (ua.includes("tablet") || ua.includes("ipad")) return Tablet;
  return Monitor;
};

export function SessionsTabContent() {
  const { data: currentSession } = useSession();
  const [deviceSessions, setDeviceSessions] = useState<DeviceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<{
    type: string;
    sessionToken?: string;
  } | null>(null);

  // Load device sessions using the latest better-auth API
  const loadDeviceSessions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authClient.multiSession.listDeviceSessions();

      if (response.data) {
        setDeviceSessions(response.data);
      } else {
        setDeviceSessions([]);
      }
    } catch (error) {
      console.error("Failed to load device sessions:", error);
      toast.error("🚨 FAILED TO SCAN INVASIONS", {
        description: "The surveillance system encountered an error",
      });
      setDeviceSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeviceSessions();
  }, [loadDeviceSessions]);

  // Revoke specific session
  const revokeSession = useCallback(
    async (sessionToken: string) => {
      try {
        setActionLoading({ type: "revoke", sessionToken });
        await authClient.multiSession.revoke({ sessionToken });

        toast.success("💀 SESSION TERMINATED", {
          description: "The invasion has been successfully eliminated",
        });

        await loadDeviceSessions();
      } catch (error) {
        console.error("Failed to revoke session:", error);
        toast.error("⚠️ TERMINATION FAILED", {
          description: "Unable to eliminate the invasion",
        });
      } finally {
        setActionLoading(null);
      }
    },
    [loadDeviceSessions]
  );

  // Revoke all other sessions
  const revokeOtherSessions = useCallback(async () => {
    try {
      setActionLoading({ type: "revokeOthers" });
      await authClient.revokeOtherSessions();

      toast.success("⚡ OTHER INVASIONS TERMINATED", {
        description: "All foreign surveillance has been eliminated",
      });

      await loadDeviceSessions();
    } catch (error) {
      console.error("Failed to revoke other sessions:", error);
      toast.error("⚠️ PARTIAL TERMINATION FAILED", {
        description: "Some invasions remain active",
      });
    } finally {
      setActionLoading(null);
    }
  }, [loadDeviceSessions]);

  // Revoke ALL sessions (including current)
  const revokeAllSessions = useCallback(async () => {
    try {
      setActionLoading({ type: "revokeAll" });
      await authClient.revokeSessions();

      toast.success("💀 TOTAL ANNIHILATION COMPLETE", {
        description: "All surveillance networks have been destroyed",
      });

      // Note: User will be logged out after this, so no need to reload sessions
    } catch (error) {
      console.error("Failed to revoke all sessions:", error);
      toast.error("⚠️ ANNIHILATION FAILED", {
        description: "The system resisted destruction",
      });
    } finally {
      setActionLoading(null);
    }
  }, []);

  if (!currentSession) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <BrutalBox className="inline-block p-6 bg-red-500/20 border-4 border-red-500">
          <Skull className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <GlitchText
            className="text-xl font-black text-red-500 uppercase"
            intensity="high"
          >
            💀 NO ACTIVE SURVEILLANCE 💀
          </GlitchText>
        </BrutalBox>
      </motion.div>
    );
  }

  const currentSessionId = currentSession?.session?.id;
  const otherSessions = deviceSessions.filter(
    (ds) => ds.session.id !== currentSessionId
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/* BRUTAL HEADER */}
      <motion.div
        variants={slideInVariants}
        className="text-center space-y-4 sm:space-y-6"
      >
        <div className="relative">
          <ShakeElement intensity="high" trigger="hover">
            <BrutalBox className="inline-block p-4 sm:p-6 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 border-4 border-black transform -rotate-2 hover:rotate-2 transition-transform duration-300">
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Eye className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </motion.div>
                <GlitchText
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  🔥 SURVEILLANCE MATRIX 🔥
                </GlitchText>
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Eye className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </motion.div>
              </div>
            </BrutalBox>
          </ShakeElement>
        </div>

        <BrutalBox className="inline-block p-3 sm:p-4 bg-yellow-400 border-4 border-black transform rotate-1">
          <GlitchText
            className="text-lg sm:text-xl font-black text-black uppercase"
            intensity="medium"
          >
            👁️ {deviceSessions.length} ACTIVE SURVEILLANCE NODES 👁️
          </GlitchText>
        </BrutalBox>

        {/* Animated Warning Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            { icon: "🔍", text: "DEEP SCAN", color: "bg-blue-600", delay: 0 },
            {
              icon: "⚡",
              text: "LIVE TRACKING",
              color: "bg-yellow-600",
              delay: 0.2,
            },
            { icon: "🚨", text: "HIGH ALERT", color: "bg-red-600", delay: 0.4 },
            {
              icon: "💀",
              text: "TERMINATE READY",
              color: "bg-purple-600",
              delay: 0.6,
            },
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: badge.delay,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <ShakeElement intensity="low" trigger="hover">
                <Badge
                  className={`${badge.color} text-white border-2 border-black font-black text-sm px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 transition-all animate-pulse`}
                >
                  {badge.icon} {badge.text}
                </Badge>
              </ShakeElement>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CURRENT SESSION */}
      <motion.div variants={slideInVariants}>
        <BrutalBox className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-4 border-green-500 shadow-[12px_12px_0px_0px_rgba(0,128,0,0.3)] transform hover:shadow-[16px_16px_0px_0px_rgba(0,128,0,0.5)] transition-all duration-300">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <ShakeElement intensity="medium" trigger="hover">
                <BrutalBox className="inline-block p-4 bg-green-500 border-3 border-black transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Shield className="h-8 w-8 text-white" />
                    </motion.div>
                    <GlitchText
                      className="text-2xl sm:text-3xl font-black text-white uppercase"
                      intensity="high"
                      trigger="hover"
                    >
                      💻 CURRENT INVASION 💻
                    </GlitchText>
                  </div>
                </BrutalBox>
              </ShakeElement>
            </div>

            {currentSession && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BrutalBox className="p-4 bg-green-500/20 border-2 border-green-500">
                  <div className="space-y-2">
                    <GlitchText
                      className="text-sm font-black text-green-600 uppercase"
                      intensity="low"
                    >
                      🔑 SESSION ID
                    </GlitchText>
                    <p className="text-xs font-mono bg-green-500/10 p-2 rounded border border-green-500 break-all">
                      {currentSession.session.id.slice(0, 8)}...
                      {currentSession.session.id.slice(-8)}
                    </p>
                  </div>
                </BrutalBox>

                <BrutalBox className="p-4 bg-green-500/20 border-2 border-green-500">
                  <div className="space-y-2">
                    <GlitchText
                      className="text-sm font-black text-green-600 uppercase"
                      intensity="low"
                    >
                      🤖 DEVICE TYPE
                    </GlitchText>
                    <p className="text-xs font-mono bg-green-500/10 p-2 rounded border border-green-500">
                      {getDeviceType(currentSession.session.userAgent)}
                    </p>
                  </div>
                </BrutalBox>

                <BrutalBox className="p-4 bg-green-500/20 border-2 border-green-500">
                  <div className="space-y-2">
                    <GlitchText
                      className="text-sm font-black text-green-600 uppercase"
                      intensity="low"
                    >
                      ⏰ LAST ACTIVITY
                    </GlitchText>
                    <p className="text-xs font-mono bg-green-500/10 p-2 rounded border border-green-500">
                      {getTimeAgo(currentSession.session.updatedAt)}
                    </p>
                  </div>
                </BrutalBox>

                <BrutalBox className="p-4 bg-green-500/20 border-2 border-green-500">
                  <div className="space-y-2">
                    <GlitchText
                      className="text-sm font-black text-green-600 uppercase"
                      intensity="low"
                    >
                      💀 EXPIRES
                    </GlitchText>
                    <p
                      className={`text-xs font-mono p-2 rounded border ${
                        isSessionExpiringSoon(currentSession.session.expiresAt)
                          ? "bg-red-500/10 border-red-500 text-red-600"
                          : "bg-green-500/10 border-green-500"
                      }`}
                    >
                      {new Date(
                        currentSession.session.expiresAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </BrutalBox>
              </div>
            )}

            {currentSession?.session.userAgent && (
              <BrutalBox className="p-4 bg-green-500/20 border-2 border-green-500">
                <GlitchText
                  className="text-sm font-black text-green-600 uppercase mb-2"
                  intensity="low"
                >
                  🕵️ BROWSER SIGNATURE
                </GlitchText>
                <div className="text-xs font-mono bg-green-500/10 p-3 rounded border border-green-500 break-all">
                  <p className="mb-2 font-black text-green-600">
                    {getBrowserInfo(currentSession.session.userAgent)}
                  </p>
                  <p className="break-words opacity-70">
                    {currentSession.session.userAgent}
                  </p>
                </div>
              </BrutalBox>
            )}

            {currentSession?.session.ipAddress && (
              <BrutalBox className="p-4 bg-green-500/20 border-2 border-green-500">
                <GlitchText
                  className="text-sm font-black text-green-600 uppercase mb-2"
                  intensity="low"
                >
                  🌐 IP COORDINATES
                </GlitchText>
                <p className="text-lg font-mono bg-green-500/10 p-3 rounded border border-green-500 text-center">
                  {currentSession.session.ipAddress}
                </p>
              </BrutalBox>
            )}
          </div>
        </BrutalBox>
      </motion.div>

      {/* ALL SESSIONS LIST */}
      <motion.div variants={slideInVariants}>
        <BrutalBox className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-4 border-orange-500 shadow-[12px_12px_0px_0px_rgba(255,165,0,0.3)]">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <ShakeElement intensity="high" trigger="hover">
                <BrutalBox className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 border-3 border-black transform rotate-1 hover:-rotate-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <Activity className="h-8 w-8 text-white animate-pulse" />
                    <GlitchText
                      className="text-2xl sm:text-3xl font-black text-white uppercase"
                      intensity="high"
                      trigger="hover"
                    >
                      🚨 ALL SURVEILLANCE NODES 🚨
                    </GlitchText>
                  </div>
                </BrutalBox>
              </ShakeElement>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Loader2 className="h-12 w-12 text-orange-500" />
                </motion.div>
                <p className="mt-4 text-orange-600 font-black text-xl">
                  🔍 SCANNING THE MATRIX... 🔍
                </p>
              </div>
            ) : deviceSessions.length === 0 ? (
              <BrutalBox className="p-8 bg-orange-500/20 border-2 border-orange-500 text-center">
                <Skull className="h-16 w-16 mx-auto mb-4 text-orange-500" />
                <GlitchText
                  className="text-xl font-black text-orange-600 uppercase"
                  intensity="medium"
                >
                  💀 NO INVASIONS DETECTED 💀
                </GlitchText>
              </BrutalBox>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {deviceSessions.map((deviceSession, index) => {
                    const isCurrentSession =
                      deviceSession.session.id === currentSessionId;
                    const DeviceIcon = getDeviceIcon(
                      deviceSession.session.userAgent
                    );
                    const isExpiring = isSessionExpiringSoon(
                      deviceSession.session.expiresAt
                    );

                    return (
                      <motion.div
                        key={deviceSession.session.id}
                        variants={scaleInVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <BrutalBox
                          className={`p-4 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                            isCurrentSession
                              ? "bg-green-50 dark:bg-green-950/20 border-green-500"
                              : "bg-orange-50 dark:bg-orange-950/20 border-orange-500"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex items-start gap-4 min-w-0 flex-1">
                              <motion.div
                                animate={{
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: index * 0.2,
                                }}
                                className={`p-3 rounded-lg border-2 border-black flex-shrink-0 ${
                                  isCurrentSession
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                                }`}
                              >
                                <DeviceIcon className="h-6 w-6 text-white" />
                              </motion.div>

                              <div className="space-y-3 min-w-0 flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <h4 className="font-black text-sm break-all">
                                    🔍 NODE #
                                    {deviceSession.session.id.slice(0, 8)}...
                                    {deviceSession.session.id.slice(-4)}
                                  </h4>
                                  <div className="flex gap-2">
                                    {isCurrentSession && (
                                      <Badge className="text-xs bg-green-500 text-white border-2 border-black font-black">
                                        CURRENT
                                      </Badge>
                                    )}
                                    {isExpiring && (
                                      <Badge className="text-xs bg-red-500 text-white border-2 border-black font-black animate-pulse">
                                        ⚠️ EXPIRING
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                  <div>
                                    <span className="font-black text-orange-600">
                                      🤖 DEVICE:
                                    </span>
                                    <p className="font-mono mt-1">
                                      {getDeviceType(
                                        deviceSession.session.userAgent
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="font-black text-orange-600">
                                      ⏰ LAST SEEN:
                                    </span>
                                    <p className="font-mono mt-1">
                                      {getTimeAgo(
                                        deviceSession.session.updatedAt
                                      )}
                                    </p>
                                  </div>
                                  {deviceSession.session.ipAddress && (
                                    <div>
                                      <span className="font-black text-orange-600">
                                        🌐 IP:
                                      </span>
                                      <p className="font-mono mt-1">
                                        {deviceSession.session.ipAddress}
                                      </p>
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-black text-orange-600">
                                      🔍 BROWSER:
                                    </span>
                                    <p className="font-mono mt-1">
                                      {getBrowserInfo(
                                        deviceSession.session.userAgent
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {!isCurrentSession && (
                              <div className="flex-shrink-0 w-full sm:w-auto">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <ShakeElement intensity="medium">
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        disabled={
                                          actionLoading?.type === "revoke" &&
                                          actionLoading?.sessionToken ===
                                            deviceSession.session.token
                                        }
                                        className="w-full sm:w-auto border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-sm"
                                      >
                                        {actionLoading?.type === "revoke" &&
                                        actionLoading?.sessionToken ===
                                          deviceSession.session.token ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <>
                                            <Skull className="h-4 w-4 mr-2" />
                                            💀 TERMINATE
                                          </>
                                        )}
                                      </Button>
                                    </ShakeElement>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 dark:bg-red-950/20">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                                        <Skull className="h-5 w-5" />
                                        💀 TERMINATE SURVEILLANCE NODE 💀
                                      </AlertDialogTitle>
                                      <AlertDialogDescription className="space-y-3">
                                        <p className="font-bold text-red-700">
                                          ⚠️ You are about to terminate this
                                          surveillance node:
                                        </p>
                                        <BrutalBox className="p-3 bg-red-100 dark:bg-red-950/50 border-2 border-red-500">
                                          <div className="text-sm space-y-2">
                                            <p>
                                              <strong>🔍 Node ID:</strong>{" "}
                                              {deviceSession.session.id.slice(
                                                0,
                                                8
                                              )}
                                              ...
                                              {deviceSession.session.id.slice(
                                                -8
                                              )}
                                            </p>
                                            <p>
                                              <strong>🤖 Device:</strong>{" "}
                                              {getDeviceType(
                                                deviceSession.session.userAgent
                                              )}
                                            </p>
                                            {deviceSession.session
                                              .ipAddress && (
                                              <p>
                                                <strong>🌐 IP Address:</strong>{" "}
                                                {
                                                  deviceSession.session
                                                    .ipAddress
                                                }
                                              </p>
                                            )}
                                            <p>
                                              <strong>⏰ Last Active:</strong>{" "}
                                              {new Date(
                                                deviceSession.session.updatedAt
                                              ).toLocaleString()}
                                            </p>
                                          </div>
                                        </BrutalBox>
                                        <p className="text-red-600 font-bold">
                                          This will immediately sign out this
                                          device. This action cannot be undone.
                                        </p>
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          revokeSession(
                                            deviceSession.session.token
                                          )
                                        }
                                        className="bg-red-600 hover:bg-red-700 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black"
                                        disabled={
                                          actionLoading?.type === "revoke" &&
                                          actionLoading?.sessionToken ===
                                            deviceSession.session.token
                                        }
                                      >
                                        {actionLoading?.type === "revoke" &&
                                        actionLoading?.sessionToken ===
                                          deviceSession.session.token
                                          ? "TERMINATING..."
                                          : "💀 TERMINATE NODE 💀"}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </div>
                        </BrutalBox>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </BrutalBox>
      </motion.div>

      {/* SESSION TERMINATION ACTIONS */}
      <motion.div variants={slideInVariants}>
        <BrutalBox className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-red-500/20 to-black/10 border-4 border-red-500 shadow-[12px_12px_0px_0px_rgba(255,0,0,0.3)]">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <ShakeElement intensity="high" trigger="always">
                <BrutalBox className="inline-block p-4 bg-gradient-to-r from-red-600 to-black border-3 border-white transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Skull className="h-8 w-8 text-white" />
                    </motion.div>
                    <GlitchText
                      className="text-2xl sm:text-3xl font-black text-white uppercase"
                      intensity="high"
                      trigger="always"
                    >
                      💀 MASS TERMINATION 💀
                    </GlitchText>
                  </div>
                </BrutalBox>
              </ShakeElement>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Terminate Other Sessions */}
              <BrutalBox className="p-6 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-500 shadow-[4px_4px_0px_0px_rgba(255,165,0,0.3)]">
                <div className="space-y-4 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-3 bg-orange-500 rounded-lg border-2 border-black inline-block"
                  >
                    <Shield className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="font-black text-lg text-orange-600 uppercase">
                    ⚡ SELECTIVE TERMINATION ⚡
                  </h3>
                  <p className="text-sm text-orange-600">
                    Terminate all other surveillance nodes except this one
                  </p>
                  <p className="text-xs text-orange-500 font-bold">
                    {otherSessions.length} foreign nodes will be eliminated
                  </p>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <ShakeElement>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
                          disabled={
                            actionLoading?.type === "revokeOthers" ||
                            otherSessions.length === 0
                          }
                        >
                          {actionLoading?.type === "revokeOthers" ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Zap className="mr-2 h-4 w-4" />
                          )}
                          {actionLoading?.type === "revokeOthers"
                            ? "TERMINATING..."
                            : otherSessions.length === 0
                              ? "NO OTHER SESSIONS"
                              : "⚡ TERMINATE OTHERS ⚡"}
                        </Button>
                      </ShakeElement>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-orange-50 dark:bg-orange-950/20">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-orange-600">
                          <Zap className="h-5 w-5" />⚡ SELECTIVE TERMINATION
                          PROTOCOL ⚡
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                          <p className="font-bold text-orange-700">
                            This will terminate ALL other surveillance nodes
                            while keeping you connected on this device.
                          </p>
                          <BrutalBox className="p-3 bg-orange-100 dark:bg-orange-950/50 border-2 border-orange-500">
                            <div className="text-sm space-y-1">
                              <p>
                                <strong>🔍 Nodes to terminate:</strong>{" "}
                                {otherSessions.length}
                              </p>
                              <p>
                                <strong>💻 This device:</strong> Will remain
                                active
                              </p>
                              <p>
                                <strong>⚡ Effect:</strong> Immediate logout
                                from all other devices
                              </p>
                            </div>
                          </BrutalBox>
                          <p className="text-orange-600 font-bold">
                            Use this if you suspect unauthorized access but want
                            to stay logged in here.
                          </p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={revokeOtherSessions}
                          className="bg-orange-600 hover:bg-orange-700 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black"
                          disabled={actionLoading?.type === "revokeOthers"}
                        >
                          {actionLoading?.type === "revokeOthers"
                            ? "TERMINATING..."
                            : "⚡ EXECUTE TERMINATION ⚡"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </BrutalBox>

              {/* Terminate ALL Sessions */}
              <BrutalBox className="p-6 bg-red-50 dark:bg-red-950/20 border-2 border-red-500 shadow-[4px_4px_0px_0px_rgba(255,0,0,0.3)]">
                <div className="space-y-4 text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-3 bg-red-600 rounded-lg border-2 border-black inline-block"
                  >
                    <Skull className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="font-black text-lg text-red-600 uppercase">
                    💀 TOTAL ANNIHILATION 💀
                  </h3>
                  <p className="text-sm text-red-600">
                    Destroy ALL surveillance nodes including this one
                  </p>
                  <p className="text-xs text-red-500 font-bold">
                    {deviceSessions.length} total nodes will be annihilated
                  </p>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <ShakeElement intensity="high">
                        <Button
                          variant="destructive"
                          className="w-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
                          disabled={actionLoading?.type === "revokeAll"}
                        >
                          {actionLoading?.type === "revokeAll" ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          {actionLoading?.type === "revokeAll"
                            ? "ANNIHILATING..."
                            : "💀 TOTAL ANNIHILATION 💀"}
                        </Button>
                      </ShakeElement>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 dark:bg-red-950/20">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          💀 TOTAL ANNIHILATION WARNING 💀
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                          <p className="font-bold text-red-700">
                            ⚠️ CRITICAL WARNING: This will destroy ALL
                            surveillance nodes including this one!
                          </p>
                          <BrutalBox className="p-3 bg-red-100 dark:bg-red-950/50 border-2 border-red-500">
                            <div className="text-sm space-y-1">
                              <p>
                                <strong>💀 Total nodes to annihilate:</strong>{" "}
                                {deviceSessions.length}
                              </p>
                              <p>
                                <strong>⚡ Effect:</strong> You will be
                                immediately logged out everywhere
                              </p>
                              <p>
                                <strong>🔄 Recovery:</strong> You will need to
                                sign in again
                              </p>
                            </div>
                          </BrutalBox>
                          <p className="text-red-600 font-bold">
                            Only use this if you believe your account has been
                            completely compromised!
                          </p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={revokeAllSessions}
                          className="bg-red-700 hover:bg-red-800 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black"
                          disabled={actionLoading?.type === "revokeAll"}
                        >
                          {actionLoading?.type === "revokeAll"
                            ? "ANNIHILATING..."
                            : "💀 EXECUTE ANNIHILATION 💀"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </BrutalBox>
            </div>
          </div>
        </BrutalBox>
      </motion.div>

      {/* FINAL WARNING */}
      <motion.div variants={slideInVariants} className="text-center">
        <BrutalBox className="inline-block p-6 bg-gradient-to-r from-purple-600 via-red-500 to-black border-4 border-yellow-400 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Eye className="h-12 w-12 text-yellow-300" />
            </motion.div>
            <GlitchText
              className="text-xl sm:text-2xl font-black text-white uppercase"
              intensity="medium"
              trigger="hover"
            >
              👁️ THE SURVEILLANCE NEVER ENDS 👁️
            </GlitchText>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Eye className="h-12 w-12 text-yellow-300" />
            </motion.div>
          </div>
        </BrutalBox>
      </motion.div>
    </motion.div>
  );
}
