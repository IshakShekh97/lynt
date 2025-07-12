"use client";

import { motion } from "framer-motion";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Activity, Shield, Skull, Eye, LogOut, Loader2 } from "lucide-react";
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
import { useState, useEffect } from "react";

interface Session {
  id: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  userId: string;
  userAgent?: string | null;
  ipAddress?: string | null;
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
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [revokingOther, setRevokingOther] = useState(false);
  const [revokingAll, setRevokingAll] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await authClient.multiSession.listDeviceSessions();
      if (response.data) {
        // Transform the response to match our Session interface
        const transformedSessions: Session[] = response.data.map((item) => ({
          id: item.session.id,
          token: item.session.token,
          createdAt: new Date(item.session.createdAt),
          updatedAt: new Date(item.session.updatedAt),
          expiresAt: new Date(item.session.expiresAt),
          userId: item.session.userId,
          userAgent: item.session.userAgent,
          ipAddress: item.session.ipAddress,
        }));
        setSessions(transformedSessions);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error("Failed to load sessions:", error);
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = async (sessionToken: string) => {
    try {
      setRevoking(sessionToken);
      await authClient.multiSession.revoke({ sessionToken });
      toast.success("Session revoked successfully");
      await loadSessions();
    } catch (error) {
      console.error("Failed to revoke session:", error);
      toast.error("Failed to revoke session");
    } finally {
      setRevoking(null);
    }
  };

  const revokeOtherSessions = async () => {
    try {
      setRevokingOther(true);
      await authClient.revokeOtherSessions();
      toast.success("All other sessions revoked successfully");
      await loadSessions();
    } catch (error) {
      console.error("Failed to revoke other sessions:", error);
      toast.error("Failed to revoke other sessions");
    } finally {
      setRevokingOther(false);
    }
  };

  const revokeAllSessions = async () => {
    try {
      setRevokingAll(true);
      await authClient.revokeSessions();
      toast.success("All sessions revoked successfully");
    } catch (error) {
      console.error("Failed to revoke all sessions:", error);
      toast.error("Failed to revoke all sessions");
    } finally {
      setRevokingAll(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 lg:space-y-10"
    >
      {/* BRUTAL Sessions Header */}
      <motion.div
        variants={brutalSlideIn}
        className="text-center space-y-4 sm:space-y-6"
      >
        <div className="relative">
          <ShakeElement intensity="medium" trigger="hover">
            <BrutalBox className="inline-block p-4 sm:p-6 bg-gradient-to-r from-orange-500 to-red-500 border-4 border-black transform -rotate-1 hover:rotate-1 transition-transform duration-300">
              <div className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </motion.div>
                <GlitchText
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  🔥 DIGITAL FOOTPRINTS 🔥
                </GlitchText>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
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
            👁️ EVERY DEVICE IS BEING WATCHED 👁️
          </GlitchText>
        </BrutalBox>

        {/* Warning Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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

            {/* Inline Sessions List with Alert Dialogs */}
            <div className="space-y-4">
              {/* Header with session count */}
              <div className="text-center">
                <h3 className="text-lg font-black text-orange-600 uppercase">
                  👁️ {sessions.length} Active Invasions Detected 👁️
                </h3>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
                  <p className="mt-2 text-orange-600 font-bold">
                    SCANNING INVASIONS...
                  </p>
                </div>
              ) : sessions.length === 0 ? (
                <BrutalBox className="p-6 bg-orange-500/20 border-2 border-orange-500 text-center">
                  <p className="text-orange-600 font-black uppercase">
                    🔍 NO INVASIONS DETECTED 🔍
                  </p>
                </BrutalBox>
              ) : (
                sessions.map((sessionItem) => {
                  const isCurrentSession =
                    sessionItem.id === session?.session.id;
                  return (
                    <BrutalBox
                      key={sessionItem.id}
                      className={`p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        isCurrentSession
                          ? "bg-green-50 dark:bg-green-950/20 border-green-500"
                          : "bg-orange-50 dark:bg-orange-950/20 border-orange-500"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-2 rounded-lg border-2 border-black ${
                              isCurrentSession
                                ? "bg-green-500"
                                : "bg-orange-500"
                            }`}
                          >
                            <Eye className="h-5 w-5 text-white" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-sm">
                                🕵️ INVASION #{sessionItem.id.slice(0, 8)}...
                                {sessionItem.id.slice(-4)}
                              </h4>
                              {isCurrentSession && (
                                <Badge className="text-xs bg-green-500 text-white border-2 border-black font-black">
                                  CURRENT
                                </Badge>
                              )}
                            </div>

                            <div className="text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-orange-600">
                                  ⏰ LAST SEEN:
                                </span>
                                <span className="font-mono">
                                  {new Date(
                                    sessionItem.updatedAt
                                  ).toLocaleString()}
                                </span>
                              </div>
                              {sessionItem.ipAddress && (
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-orange-600">
                                    🌐 IP TRACED:
                                  </span>
                                  <span className="font-mono">
                                    {sessionItem.ipAddress}
                                  </span>
                                </div>
                              )}
                              {sessionItem.userAgent && (
                                <div className="mt-2">
                                  <span className="font-black text-orange-600">
                                    🔍 SIGNATURE:
                                  </span>
                                  <div className="font-mono text-xs bg-orange-500/10 p-2 rounded border border-orange-500 mt-1">
                                    {sessionItem.userAgent}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {!isCurrentSession && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <ShakeElement>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  disabled={revoking === sessionItem.token}
                                  className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
                                >
                                  {revoking === sessionItem.token ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <>
                                      <LogOut className="h-4 w-4 mr-2" />
                                      TERMINATE
                                    </>
                                  )}
                                </Button>
                              </ShakeElement>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 dark:bg-red-950/20">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                                  <Skull className="h-5 w-5" />
                                  💀 TERMINATE INVASION 💀
                                </AlertDialogTitle>
                                <AlertDialogDescription className="space-y-2">
                                  <p className="font-bold text-red-700">
                                    ⚠️ You are about to terminate this session:
                                  </p>
                                  <div className="bg-red-100 dark:bg-red-950/50 p-3 rounded border-2 border-red-500">
                                    <div className="text-sm space-y-1">
                                      <p>
                                        <strong>Session ID:</strong>{" "}
                                        {sessionItem.id.slice(0, 8)}...
                                        {sessionItem.id.slice(-8)}
                                      </p>
                                      {sessionItem.ipAddress && (
                                        <p>
                                          <strong>IP Address:</strong>{" "}
                                          {sessionItem.ipAddress}
                                        </p>
                                      )}
                                      <p>
                                        <strong>Last Active:</strong>{" "}
                                        {new Date(
                                          sessionItem.updatedAt
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-red-600 font-bold">
                                    This will immediately sign out this device.
                                    This action cannot be undone.
                                  </p>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    revokeSession(sessionItem.token)
                                  }
                                  className="bg-red-600 hover:bg-red-700 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black"
                                  disabled={revoking === sessionItem.token}
                                >
                                  {revoking === sessionItem.token
                                    ? "TERMINATING..."
                                    : "💀 TERMINATE SESSION 💀"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </BrutalBox>
                  );
                })
              )}
            </div>
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

            {/* Inline Session Actions with Alert Dialogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revoke Other Sessions */}
              <BrutalBox className="p-6 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-500 shadow-[4px_4px_0px_0px_rgba(255,165,0,0.3)]">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="p-3 bg-orange-500 rounded-lg border-2 border-black inline-block mb-2">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-black text-lg text-orange-600 uppercase">
                      ⚡ Partial Termination ⚡
                    </h3>
                    <p className="text-xs text-orange-600">
                      Terminate all other invasions except this one
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <ShakeElement>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
                          disabled={revokingOther}
                        >
                          {revokingOther ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Shield className="mr-2 h-4 w-4" />
                          )}
                          {revokingOther
                            ? "TERMINATING..."
                            : "TERMINATE OTHERS"}
                        </Button>
                      </ShakeElement>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-orange-50 dark:bg-orange-950/20">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-orange-600">
                          <Shield className="h-5 w-5" />⚡ TERMINATE OTHER
                          INVASIONS ⚡
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                          <p className="font-bold text-orange-700">
                            This will terminate ALL other active sessions while
                            keeping you signed in on this device.
                          </p>
                          <div className="bg-orange-100 dark:bg-orange-950/50 p-3 rounded border-2 border-orange-500">
                            <p className="text-sm">
                              <strong>Sessions to terminate:</strong>{" "}
                              {
                                sessions.filter(
                                  (s) => s.id !== session?.session.id
                                ).length
                              }{" "}
                              invasions
                            </p>
                            <p className="text-sm">
                              <strong>This device:</strong> Will remain active
                            </p>
                          </div>
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
                          disabled={revokingOther}
                        >
                          {revokingOther
                            ? "TERMINATING..."
                            : "⚡ TERMINATE OTHERS ⚡"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </BrutalBox>

              {/* Revoke ALL Sessions */}
              <BrutalBox className="p-6 bg-red-50 dark:bg-red-950/20 border-2 border-red-500 shadow-[4px_4px_0px_0px_rgba(255,0,0,0.3)]">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="p-3 bg-red-600 rounded-lg border-2 border-black inline-block mb-2">
                      <Skull className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-black text-lg text-red-600 uppercase">
                      💀 Total Annihilation 💀
                    </h3>
                    <p className="text-xs text-red-600">
                      Terminate ALL invasions including this one
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <ShakeElement intensity="high">
                        <Button
                          variant="destructive"
                          className="w-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
                          disabled={revokingAll}
                        >
                          {revokingAll ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Skull className="mr-2 h-4 w-4" />
                          )}
                          {revokingAll
                            ? "ANNIHILATING..."
                            : "TOTAL ANNIHILATION"}
                        </Button>
                      </ShakeElement>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 dark:bg-red-950/20">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                          <Skull className="h-5 w-5" />
                          💀 TOTAL ANNIHILATION WARNING 💀
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                          <p className="font-bold text-red-700">
                            ⚠️ CRITICAL WARNING: This will terminate ALL
                            sessions including this one!
                          </p>
                          <div className="bg-red-100 dark:bg-red-950/50 p-3 rounded border-2 border-red-500">
                            <p className="text-sm">
                              <strong>Total sessions to terminate:</strong>{" "}
                              {sessions.length} invasions
                            </p>
                            <p className="text-sm">
                              <strong>Effect:</strong> You will be immediately
                              logged out everywhere
                            </p>
                            <p className="text-sm">
                              <strong>Recovery:</strong> You will need to sign
                              in again
                            </p>
                          </div>
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
                          disabled={revokingAll}
                        >
                          {revokingAll
                            ? "ANNIHILATING..."
                            : "💀 TOTAL ANNIHILATION 💀"}
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
