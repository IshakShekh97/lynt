"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { CheckCircle, AlertCircle, Mail, Loader2, Skull } from "lucide-react";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { useState } from "react";

interface EmailVerificationStatusProps {
  user: {
    email: string;
    emailVerified: boolean;
    name?: string;
  };
  showVerifyButton?: boolean;
  compact?: boolean;
  className?: string;
}

export function EmailVerificationStatus({
  user,
  showVerifyButton = true,
  compact = false,
  className = "",
}: EmailVerificationStatusProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async () => {
    setIsLoading(true);
    try {
      await authClient.sendVerificationEmail({
        email: user.email,
        callbackURL: "/dashboard/profile",
      });

      toast.success("💀 VERIFICATION EMAIL SENT! 💀", {
        description:
          "Check your email (and spam folder) for the BRUTAL verification link!",
      });
    } catch (error) {
      console.error("Email verification error:", error);
      toast.error("🔥 VERIFICATION FAILED! 🔥", {
        description: "Failed to send verification email. Try again, warrior!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {user.emailVerified ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-700 border-green-500 font-bold"
            >
              ✅ VERIFIED
            </Badge>
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4 text-red-500" />
            <Badge
              variant="destructive"
              className="bg-red-500/20 text-red-700 border-red-500 font-bold"
            >
              ⚠️ UNVERIFIED
            </Badge>
          </>
        )}
      </div>
    );
  }

  return (
    <BrutalBox
      className={`p-4 border-4 ${
        user.emailVerified
          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500"
          : "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500"
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: user.emailVerified ? 0 : [0, -5, 5, 0],
              scale: user.emailVerified ? 1 : [1, 1.1, 1],
            }}
            transition={{
              duration: user.emailVerified ? 0 : 2,
              repeat: user.emailVerified ? 0 : Infinity,
            }}
          >
            {user.emailVerified ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500" />
            )}
          </motion.div>

          <div>
            <GlitchText
              className={`text-lg font-black uppercase ${
                user.emailVerified ? "text-green-600" : "text-red-600"
              }`}
              intensity={user.emailVerified ? "low" : "high"}
            >
              {user.emailVerified
                ? "💀 EMAIL VERIFIED! 💀"
                : "⚠️ EMAIL NOT VERIFIED! ⚠️"}
            </GlitchText>
            <p
              className={`text-sm font-bold ${
                user.emailVerified ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.emailVerified
                ? "You have BRUTAL access to all features!"
                : "Verify your email to unlock ULTIMATE POWER!"}
            </p>
          </div>
        </div>

        {!user.emailVerified && showVerifyButton && (
          <ShakeElement intensity="medium" trigger="hover">
            <Button
              onClick={handleVerification}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-black uppercase border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  💥 VERIFY NOW! 💥
                </>
              )}
            </Button>
          </ShakeElement>
        )}
      </div>

      {!user.emailVerified && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 p-3 bg-yellow-500/20 border-l-4 border-yellow-500 rounded"
        >
          <div className="flex items-center gap-2">
            <Skull className="h-4 w-4 text-yellow-600" />
            <p className="text-sm font-bold text-yellow-600">
              ⚠️ BRUTAL REMINDER: Check your spam folder for verification
              emails!
            </p>
          </div>
        </motion.div>
      )}
    </BrutalBox>
  );
}

// Utility function to check if user needs verification for an action
export function requiresEmailVerification(
  user: { emailVerified: boolean },
  action: string
): boolean {
  if (user.emailVerified) return false;

  const restrictedActions = [
    "profile-edit",
    "username-change",
    "email-change",
    "account-deletion",
    "sensitive-settings",
  ];

  return restrictedActions.includes(action);
}

// Hook for email verification status
export function useEmailVerificationStatus(user: { emailVerified: boolean }) {
  const [isVerifying, setIsVerifying] = useState(false);

  const sendVerification = async (email: string, callbackURL?: string) => {
    setIsVerifying(true);
    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: callbackURL || "/dashboard",
      });
      return { success: true };
    } catch (error) {
      console.error("Verification error:", error);
      return { success: false, error };
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    isVerified: user.emailVerified,
    isVerifying,
    sendVerification,
    requiresVerification: (action: string) =>
      requiresEmailVerification(user, action),
  };
}
