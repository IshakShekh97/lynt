"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { User as UserType } from "better-auth";
import {
  Save,
  Loader2,
  Skull,
  AlertTriangle,
  Mail,
  UserCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  ShakeElement,
  BrutalBox,
  GlitchText,
} from "@/components/ui/brutal-effects";
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

interface ProfileFormProps {
  user: UserType & {
    username?: string;
    bio?: string;
  };
}

const inputVariants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 20px rgba(255, 0, 0, 0.3)",
    transition: { duration: 0.2 },
  },
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerificationLoading, setIsEmailVerificationLoading] =
    useState(false);
  const [isUsernameChangeLoading, setIsUsernameChangeLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
    email: user.email || "",
    image: user.image || "",
  });
  const [pendingEmail, setPendingEmail] = useState("");

  const handleEmailVerification = async () => {
    setIsEmailVerificationLoading(true);
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
      setIsEmailVerificationLoading(false);
    }
  };

  const handleEmailChange = async () => {
    if (!pendingEmail || pendingEmail === user.email) {
      toast.error("💀 ENTER A NEW EMAIL! 💀", {
        description: "You must provide a different email address!",
      });
      return;
    }

    if (!user.emailVerified) {
      toast.error("🔥 VERIFY CURRENT EMAIL FIRST! 🔥", {
        description: "You must verify your current email before changing it!",
      });
      return;
    }

    try {
      await authClient.changeEmail({
        newEmail: pendingEmail,
        callbackURL: "/dashboard/profile",
      });

      toast.success("💀 EMAIL CHANGE INITIATED! 💀", {
        description:
          "Check your CURRENT email for approval link! Don't forget spam folder!",
      });
      setPendingEmail("");
    } catch (error) {
      console.error("Email change error:", error);
      toast.error("🔥 EMAIL CHANGE FAILED! 🔥", {
        description: "Failed to initiate email change. Try again!",
      });
    }
  };

  const handleUsernameChange = async () => {
    if (!formData.username) {
      toast.error("💀 ENTER A USERNAME! 💀", {
        description: "Username cannot be empty!",
      });
      return;
    }

    if (!user.emailVerified) {
      toast.error("🔥 EMAIL VERIFICATION REQUIRED! 🔥", {
        description: "You must verify your email before changing username!",
      });
      return;
    }

    setIsUsernameChangeLoading(true);
    try {
      await authClient.updateUser({
        username: formData.username,
      });

      toast.success("💀 USERNAME BRUTALLY UPDATED! 💀", {
        description: "Your digital identity has been forged anew!",
      });
    } catch (error) {
      console.error("Username change error:", error);
      toast.error("🔥 USERNAME CHANGE FAILED! 🔥", {
        description: "Failed to update username. It might be taken!",
      });
    } finally {
      setIsUsernameChangeLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.emailVerified) {
      toast.error("🔥 EMAIL VERIFICATION REQUIRED! 🔥", {
        description:
          "You must verify your email before making profile changes!",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Update user profile using better-auth
      await authClient.updateUser({
        name: formData.name,
        image: formData.image,
        bio: formData.bio,
      });

      toast.success("💀 PROFILE ANNIHILATION COMPLETE! 💀", {
        description: "Your digital identity has been brutally updated!",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("🔥 DESTRUCTION FAILED! 🔥", {
        description: "The system fought back. Try again, warrior!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Email Verification Status */}
      <BrutalBox
        className={`p-6 border-4 ${
          user.emailVerified
            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500"
            : "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user.emailVerified ? (
              <>
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <GlitchText
                    className="text-xl font-black text-green-600 uppercase"
                    intensity="medium"
                  >
                    💀 EMAIL VERIFIED! 💀
                  </GlitchText>
                  <p className="text-sm font-bold text-green-600">
                    You have BRUTAL access to all profile features!
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-8 w-8 text-red-500 animate-pulse" />
                <div>
                  <GlitchText
                    className="text-xl font-black text-red-600 uppercase"
                    intensity="high"
                  >
                    ⚠️ EMAIL NOT VERIFIED! ⚠️
                  </GlitchText>
                  <p className="text-sm font-bold text-red-600">
                    Verify your email to unlock ULTIMATE PROFILE POWER!
                  </p>
                </div>
              </>
            )}
          </div>

          {!user.emailVerified && (
            <ShakeElement intensity="high" trigger="hover">
              <Button
                onClick={handleEmailVerification}
                disabled={isEmailVerificationLoading}
                className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-black uppercase border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {isEmailVerificationLoading ? (
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
          <div className="mt-4 p-3 bg-yellow-500/20 border-l-4 border-yellow-500 rounded">
            <p className="text-sm font-bold text-yellow-600">
              ⚠️ BRUTAL REMINDER: Check your spam folder for verification
              emails!
            </p>
          </div>
        )}
      </BrutalBox>

      {/* BRUTAL Warning */}
      <BrutalBox className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500">
        <div className="flex items-center gap-3 justify-center">
          <Skull className="h-6 w-6 text-red-500 animate-bounce" />
          <GlitchText
            className="text-lg font-black text-red-600 uppercase"
            intensity="medium"
          >
            ⚠️ PROFILE CHANGES REQUIRE EMAIL VERIFICATION ⚠️
          </GlitchText>
          <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
        </div>
      </BrutalBox>

      {/* Email Change Section */}
      <BrutalBox className="p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-4 border-purple-500">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-purple-500" />
            <GlitchText
              className="text-xl font-black text-purple-600 uppercase"
              intensity="medium"
            >
              🔄 CHANGE EMAIL ADDRESS 🔄
            </GlitchText>
          </div>

          <p className="text-sm font-bold text-purple-600">
            Current Email: <span className="text-purple-800">{user.email}</span>
          </p>

          <div className="flex gap-3">
            <Input
              placeholder="Enter new email address..."
              value={pendingEmail}
              onChange={(e) => setPendingEmail(e.target.value)}
              type="email"
              className="flex-1 font-bold border-2 border-purple-300 focus:border-purple-500"
              disabled={!user.emailVerified}
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!user.emailVerified || !pendingEmail}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-black uppercase border-2 border-white"
                >
                  📧 CHANGE EMAIL
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gradient-to-br from-purple-900/90 to-red-900/90 border-4 border-purple-500 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-black uppercase text-purple-300">
                    💀 CONFIRM EMAIL CHANGE 💀
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-lg font-bold text-purple-200">
                    Are you sure you want to change your email from{" "}
                    <strong>{user.email}</strong> to{" "}
                    <strong>{pendingEmail}</strong>?
                    <br />
                    <br />
                    You&apos;ll receive a confirmation email at your CURRENT
                    address. Check your spam folder!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700 text-white font-bold border-2 border-gray-400">
                    ❌ CANCEL
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleEmailChange}
                    className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-black border-2 border-white"
                  >
                    ⚡ CONFIRM CHANGE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </BrutalBox>

      {/* Username Change Section */}
      <BrutalBox className="p-6 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border-4 border-orange-500">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserCheck className="h-6 w-6 text-orange-500" />
            <GlitchText
              className="text-xl font-black text-orange-600 uppercase"
              intensity="medium"
            >
              👤 CHANGE USERNAME 👤
            </GlitchText>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Enter new username..."
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="flex-1 font-bold border-2 border-orange-300 focus:border-orange-500"
              disabled={!user.emailVerified}
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={
                    !user.emailVerified ||
                    !formData.username ||
                    formData.username === user.username
                  }
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black uppercase border-2 border-white"
                >
                  🔥 CHANGE USERNAME
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gradient-to-br from-orange-900/90 to-red-900/90 border-4 border-orange-500 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-black uppercase text-orange-300">
                    💀 CONFIRM USERNAME CHANGE 💀
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-lg font-bold text-orange-200">
                    Are you sure you want to BRUTALLY change your username to{" "}
                    <strong>{formData.username}</strong>?
                    <br />
                    <br />
                    This savage act will free up your old username for ANYONE to
                    claim. Once you proceed, another warrior may seize your
                    former identity!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-600 hover:bg-gray-700 text-white font-bold border-2 border-gray-400">
                    ❌ CANCEL
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleUsernameChange}
                    disabled={isUsernameChangeLoading}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black border-2 border-white"
                  >
                    {isUsernameChangeLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        UPDATING...
                      </>
                    ) : (
                      "⚡ CONFIRM CHANGE"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </BrutalBox>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="name"
            className="text-lg font-black uppercase tracking-wide"
          >
            💀 FULL NAME
          </Label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <BrutalBox className="p-0 border-2">
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your BRUTAL name..."
                className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                disabled={isLoading || !user.emailVerified}
              />
            </BrutalBox>
          </motion.div>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="username"
            className="text-lg font-black uppercase tracking-wide"
          >
            🎯 USERNAME
          </Label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="h-14 text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gray-100 cursor-not-allowed"
              placeholder="PERMANENTLY LOCKED"
              disabled
            />
          </motion.div>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="email"
            className="text-lg font-black uppercase tracking-wide"
          >
            📧 EMAIL ADDRESS
          </Label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="h-14 text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gray-100 cursor-not-allowed"
              placeholder="REQUIRES VERIFICATION RITUAL"
              disabled
            />
          </motion.div>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="bio"
            className="text-lg font-black uppercase tracking-wide"
          >
            📝 BRUTAL BIO
          </Label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <BrutalBox className="p-0 border-2">
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Tell the world about your BRUTAL journey..."
                className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold min-h-[120px] resize-none"
                disabled={isLoading || !user.emailVerified}
                maxLength={500}
              />
            </BrutalBox>
          </motion.div>
          <p className="text-sm text-muted-foreground font-bold">
            {formData.bio.length}/500 characters
          </p>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="image"
            className="text-lg font-black uppercase tracking-wide"
          >
            🖼️ PROFILE IMAGE URL
          </Label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <BrutalBox className="p-0 border-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://your-brutal-image.com/avatar.jpg"
                className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                disabled={isLoading || !user.emailVerified}
              />
            </BrutalBox>
          </motion.div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <ShakeElement intensity="high" trigger="hover">
            <BrutalBox variant="destructive" glitchOnHover={true}>
              <Button
                type="submit"
                className="w-full px-8 py-4 text-xl font-black uppercase tracking-wide border-0 bg-transparent text-white hover:bg-red-400/20 transition-all duration-200"
                disabled={isLoading || !user.emailVerified}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    UPDATING PROFILE...
                  </>
                ) : (
                  <>
                    <Save className="mr-3 h-6 w-6" />
                    💀 SAVE BRUTAL CHANGES 💀
                  </>
                )}
              </Button>
            </BrutalBox>
          </ShakeElement>
        </div>

        {!user.emailVerified && (
          <div className="text-center p-4 bg-red-500/20 border-2 border-red-500 rounded-lg">
            <p className="font-black text-red-600 uppercase">
              🔒 VERIFY YOUR EMAIL TO UNLOCK PROFILE EDITING! 🔒
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
