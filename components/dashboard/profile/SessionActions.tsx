"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { ShakeElement } from "@/components/ui/brutal-effects";
import { LogOut, Shield, AlertTriangle, Loader2 } from "lucide-react";
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

export function SessionActions() {
  const [isRevokingOther, setIsRevokingOther] = useState(false);
  const [isRevokingAll, setIsRevokingAll] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleRevokeOtherSessions = async () => {
    try {
      setIsRevokingOther(true);
      await authClient.revokeOtherSessions();
      toast.success("All other sessions have been revoked successfully");
    } catch (error) {
      console.error("Failed to revoke other sessions:", error);
      toast.error("Failed to revoke other sessions");
    } finally {
      setIsRevokingOther(false);
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      setIsRevokingAll(true);
      await authClient.revokeSessions();
      toast.success("All sessions have been revoked successfully");
      // User will be automatically signed out after revoking all sessions
    } catch (error) {
      console.error("Failed to revoke all sessions:", error);
      toast.error("Failed to revoke all sessions");
    } finally {
      setIsRevokingAll(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Failed to sign out:", error);
      toast.error("Failed to sign out");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black mb-2">Session Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security and active sessions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Revoke Other Sessions */}
        <div className="p-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-orange-50 dark:bg-orange-950/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-500 rounded-lg border-2 border-black">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Revoke Other Sessions</h4>
              <p className="text-xs text-muted-foreground">
                Sign out from all devices except this one
              </p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <ShakeElement>
                <Button
                  variant="outline"
                  className="w-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
                  disabled={isRevokingOther}
                >
                  {isRevokingOther ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Shield className="mr-2 h-4 w-4" />
                  )}
                  Revoke Other Sessions
                </Button>
              </ShakeElement>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Revoke All Other Sessions?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will sign you out from all other devices and sessions.
                  You will remain signed in on this device. This action is
                  recommended if you suspect your account may have been
                  compromised.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRevokeOtherSessions}
                  className="bg-orange-500 hover:bg-orange-600 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  disabled={isRevokingOther}
                >
                  {isRevokingOther ? "Revoking..." : "Revoke Other Sessions"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Revoke ALL Sessions */}
        <div className="p-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-red-50 dark:bg-red-950/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-600 rounded-lg border-2 border-black">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Revoke ALL Sessions</h4>
              <p className="text-xs text-muted-foreground">
                Sign out from ALL devices including this one
              </p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <ShakeElement>
                <Button
                  variant="destructive"
                  className="w-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
                  disabled={isRevokingAll}
                >
                  {isRevokingAll ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <AlertTriangle className="mr-2 h-4 w-4" />
                  )}
                  Revoke ALL Sessions
                </Button>
              </ShakeElement>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Revoke ALL Sessions?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <strong>⚠️ WARNING:</strong> This will sign you out from ALL
                  devices including this one. You will need to sign in again.
                  This action is irreversible and should only be used if you
                  believe your account has been compromised.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRevokeAllSessions}
                  className="bg-red-600 hover:bg-red-700 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  disabled={isRevokingAll}
                >
                  {isRevokingAll ? "Revoking ALL..." : "Revoke ALL Sessions"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Sign Out */}
        <div className="p-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-50 dark:bg-blue-950/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg border-2 border-black">
              <LogOut className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Sign Out</h4>
              <p className="text-xs text-muted-foreground">
                Sign out from this device only
              </p>
            </div>
          </div>

          <ShakeElement>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
              disabled={isSigningOut}
            >
              {isSigningOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              Sign Out
            </Button>
          </ShakeElement>
        </div>
      </div>

      {/* Security Note */}
      <div className="p-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-purple-50 dark:bg-purple-950/20">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Security Tips</h4>
            <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
              <p>
                • <strong>Revoke Other Sessions:</strong> Use this if you want
                to stay logged in on this device but log out everywhere else.
              </p>
              <p>
                • <strong>Revoke ALL Sessions:</strong> Use this if you suspect
                your account is compromised - it will log you out everywhere.
              </p>
              <p>
                • <strong>Regular Review:</strong> Check your active sessions
                regularly and revoke any that you don&apos;t recognize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
