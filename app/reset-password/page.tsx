"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { BrutalLoadingSpinner } from "@/components/ui/brutal-loading-spinner";
import { Skull, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("🔥 INVALID RESET LINK! 🔥", {
        description: "This password reset link is invalid or expired.",
      });
      router.push("/sign-in");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    if (password !== confirmPassword) {
      toast.error("💀 PASSWORDS DON'T MATCH! 💀", {
        description: "Your passwords must be identical for BRUTAL security!",
      });
      return;
    }

    if (password.length < 8) {
      toast.error("🔥 PASSWORD TOO WEAK! 🔥", {
        description: "Your new password must be at least 8 characters long!",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        throw new Error(error.message);
      }

      setIsSuccess(true);
      toast.success("💀 PASSWORD BRUTALLY RESET! 💀", {
        description: "Your new password has been forged in digital fire!",
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("🔥 RESET FAILED! 🔥", {
        description:
          error instanceof Error
            ? error.message
            : "Password reset failed. Try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <BrutalBox className="p-8 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 border-4 border-green-500">
            <div className="text-center space-y-6">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </motion.div>

              <GlitchText
                className="text-2xl font-black text-green-600 uppercase"
                intensity="high"
              >
                💀 PASSWORD RESET COMPLETE! 💀
              </GlitchText>

              <p className="text-lg font-bold">
                Your password has been BRUTALLY updated! Redirecting to sign-in
                in 3 seconds...
              </p>

              <Link
                href="/sign-in"
                className="inline-block text-primary hover:text-primary/80 font-black uppercase underline decoration-2"
              >
                🚀 SIGN IN NOW
              </Link>
            </div>
          </BrutalBox>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <BrutalBox className="p-8 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Shield className="h-16 w-16 text-red-500 mx-auto" />
              </motion.div>

              <GlitchText
                className="text-3xl font-black text-center uppercase"
                intensity="high"
              >
                💀 PASSWORD RESET 💀
              </GlitchText>

              <p className="text-lg font-bold text-center">
                Forge your new BRUTAL password below!
              </p>
            </div>

            {/* Warning */}
            <BrutalBox className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500">
              <div className="flex items-center gap-3 justify-center">
                <Skull className="h-5 w-5 text-yellow-500" />
                <p className="text-sm font-bold text-yellow-600 uppercase text-center">
                  ⚠️ Check spam folder for password reset emails! ⚠️
                </p>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
            </BrutalBox>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="text-lg font-black uppercase tracking-wide"
                >
                  🔐 New Password
                </Label>
                <BrutalBox className="p-0 border-2">
                  <PasswordInput
                    id="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                    required
                    minLength={8}
                  />
                </BrutalBox>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-lg font-black uppercase tracking-wide"
                >
                  🔐 Confirm Password
                </Label>
                <BrutalBox className="p-0 border-2">
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                    required
                    minLength={8}
                  />
                </BrutalBox>
              </div>

              <div className="pt-4">
                <ShakeElement intensity="medium" trigger="hover">
                  <BrutalBox variant="destructive" glitchOnHover={true}>
                    <Button
                      type="submit"
                      className="w-full px-6 py-4 text-lg font-black uppercase tracking-wide border-0 bg-transparent text-white hover:bg-red-400/20 transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <BrutalLoadingSpinner className="mr-2" size="md" />
                          RESETTING PASSWORD...
                        </>
                      ) : (
                        "🔥 RESET PASSWORD 🔥"
                      )}
                    </Button>
                  </BrutalBox>
                </ShakeElement>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center">
              <BrutalBox className="inline-block p-3 transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                <p className="text-sm font-bold tracking-wide">
                  REMEMBER YOUR PASSWORD?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary hover:text-primary/80 font-black uppercase underline decoration-2 underline-offset-2"
                  >
                    💥 SIGN IN INSTEAD
                  </Link>
                </p>
              </BrutalBox>
            </div>
          </div>
        </BrutalBox>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10">
          <div className="w-full max-w-md">
            <BrutalBox className="p-8 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <div className="space-y-8">
                {/* Header Skeleton */}
                <div className="text-center space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-8 w-2/3 mx-auto bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
                </div>
                {/* Warning Skeleton */}
                <BrutalBox className="p-4 border-2 border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="h-5 w-5 rounded-full bg-yellow-200 animate-pulse" />
                    <div className="h-4 w-40 bg-yellow-200 rounded animate-pulse" />
                    <div className="h-5 w-5 rounded-full bg-yellow-200 animate-pulse" />
                  </div>
                </BrutalBox>
                {/* Form Skeleton */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                    <BrutalBox className="p-0 border-2">
                      <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
                    </BrutalBox>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                    <BrutalBox className="p-0 border-2">
                      <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
                    </BrutalBox>
                  </div>
                  <div className="pt-4">
                    <BrutalBox variant="destructive">
                      <div className="h-12 w-full bg-red-200 rounded animate-pulse" />
                    </BrutalBox>
                  </div>
                </div>
                {/* Footer Skeleton */}
                <div className="text-center">
                  <BrutalBox className="inline-block p-3">
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
                  </BrutalBox>
                </div>
              </div>
            </BrutalBox>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
