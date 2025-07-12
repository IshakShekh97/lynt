"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ShakeElement } from "@/components/ui/brutal-effects";
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  LogOut,
  Calendar,
  MapPin,
  Loader2,
  RefreshCw,
} from "lucide-react";

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

interface SessionsListProps {
  currentSessionId: string;
}

export function SessionsList({ currentSessionId }: SessionsListProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const sessionsList = await authClient.listSessions();
      setSessions(sessionsList.data || []);
    } catch (error) {
      console.error("Failed to load sessions:", error);
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSessions = async () => {
    try {
      setRefreshing(true);
      const sessionsList = await authClient.listSessions();
      setSessions(sessionsList.data || []);
      toast.success("Sessions refreshed");
    } catch (error) {
      console.error("Failed to refresh sessions:", error);
      toast.error("Failed to refresh sessions");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const revokeSession = async (sessionToken: string) => {
    try {
      setRevoking(sessionToken);
      await authClient.revokeSession({ token: sessionToken });
      toast.success("Session revoked successfully");
      // Reload sessions to reflect the change
      await loadSessions();
    } catch (error) {
      console.error("Failed to revoke session:", error);
      toast.error("Failed to revoke session");
    } finally {
      setRevoking(null);
    }
  };

  const getDeviceIcon = (userAgent?: string | null) => {
    if (!userAgent) return <Globe className="h-5 w-5" />;

    const ua = userAgent.toLowerCase();
    if (
      ua.includes("mobile") ||
      ua.includes("android") ||
      ua.includes("iphone")
    ) {
      return <Smartphone className="h-5 w-5" />;
    }
    if (ua.includes("tablet") || ua.includes("ipad")) {
      return <Tablet className="h-5 w-5" />;
    }
    return <Monitor className="h-5 w-5" />;
  };

  const getBrowserName = (userAgent?: string | null) => {
    if (!userAgent) return "Unknown Browser";

    const ua = userAgent.toLowerCase();
    if (ua.includes("chrome")) return "Chrome";
    if (ua.includes("firefox")) return "Firefox";
    if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
    if (ua.includes("edge")) return "Edge";
    if (ua.includes("opera")) return "Opera";
    return "Unknown Browser";
  };

  const getOSName = (userAgent?: string | null) => {
    if (!userAgent) return "Unknown OS";

    const ua = userAgent.toLowerCase();
    if (ua.includes("windows")) return "Windows";
    if (ua.includes("macintosh") || ua.includes("mac os")) return "macOS";
    if (ua.includes("linux")) return "Linux";
    if (ua.includes("android")) return "Android";
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios"))
      return "iOS";
    return "Unknown OS";
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2 text-muted-foreground">Loading sessions...</p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No active sessions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">
          Active Sessions ({sessions.length})
        </h3>
        <ShakeElement>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshSessions}
            disabled={refreshing || loading}
            className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </ShakeElement>
      </div>

      {sessions.map((session) => {
        const isCurrentSession = session.id === currentSessionId;

        return (
          <div
            key={session.id}
            className={`p-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              isCurrentSession
                ? "bg-green-50 dark:bg-green-950/20 border-green-500"
                : "bg-background"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg border-2 border-black ${
                    isCurrentSession ? "bg-green-500" : "bg-muted"
                  }`}
                >
                  {getDeviceIcon(session.userAgent)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">
                      {getBrowserName(session.userAgent)} on{" "}
                      {getOSName(session.userAgent)}
                    </h4>
                    {isCurrentSession && (
                      <Badge
                        variant="default"
                        className="text-xs bg-green-500 text-white border-2 border-black"
                      >
                        Current
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        Last active:{" "}
                        {new Date(session.updatedAt).toLocaleString()}
                      </span>
                    </div>
                    {session.ipAddress && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{session.ipAddress}</span>
                      </div>
                    )}
                    <div className="text-xs font-mono bg-muted p-2 rounded border-2 border-black mt-2">
                      ID: {session.id.slice(0, 8)}...{session.id.slice(-8)}
                    </div>
                  </div>
                </div>
              </div>

              {!isCurrentSession && (
                <ShakeElement>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => revokeSession(session.token)}
                    disabled={revoking === session.token}
                    className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {revoking === session.token ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <LogOut className="h-4 w-4 mr-2" />
                        Revoke
                      </>
                    )}
                  </Button>
                </ShakeElement>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
