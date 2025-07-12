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
import { Save, Loader2, Skull, AlertTriangle } from "lucide-react";
import {
  ShakeElement,
  BrutalBox,
  GlitchText,
} from "@/components/ui/brutal-effects";
import { Badge } from "@/components/ui/badge";

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
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
    email: user.email || "",
    image: user.image || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update user profile using better-auth
      await authClient.updateUser({
        name: formData.name,
        image: formData.image,
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
      {/* BRUTAL Warning */}
      <BrutalBox className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500">
        <div className="flex items-center gap-3 justify-center">
          <Skull className="h-6 w-6 text-red-500 animate-bounce" />
          <GlitchText
            className="text-lg font-black text-red-600 uppercase"
            intensity="medium"
          >
            ⚠️ MODIFY WITH EXTREME CAUTION ⚠️
          </GlitchText>
          <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
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
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="h-14 text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:shadow-[12px_12px_0px_0px_rgba(255,0,0,0.5)] transition-all bg-background/90"
              placeholder="ENTER YOUR WARRIOR NAME"
            />
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
          <Badge className="bg-red-500 text-white border-2 border-black font-black">
            🔒 IMMUTABLE FOREVER
          </Badge>
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
          <Badge className="bg-orange-500 text-white border-2 border-black font-black">
            🔥 VERIFICATION REQUIRED
          </Badge>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="bio"
            className="text-lg font-black uppercase tracking-wide"
          >
            📝 BIO / DESTRUCTION MANIFESTO
          </Label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="min-h-[120px] text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:shadow-[12px_12px_0px_0px_rgba(255,0,0,0.5)] transition-all bg-background/90"
              placeholder="DESCRIBE YOUR CHAOS AND DESTRUCTION..."
              maxLength={200}
            />
          </motion.div>
          <div className="flex justify-between items-center">
            <Badge
              className={`font-black ${
                formData.bio.length > 180 ? "bg-red-500" : "bg-green-500"
              } text-white border-2 border-black`}
            >
              {formData.bio.length}/200 CHARACTERS
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="image"
            className="text-lg font-black uppercase tracking-wide"
          >
            🖼️ PROFILE IMAGE URL
          </Label>
          <motion.div variants={inputVariants} whileFocus="focus">
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="h-14 text-lg font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:shadow-[12px_12px_0px_0px_rgba(255,0,0,0.5)] transition-all bg-background/90"
              placeholder="https://your-brutal-avatar.com/image.jpg"
            />
          </motion.div>
        </div>

        <ShakeElement intensity="medium" trigger="hover">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 text-xl font-black uppercase tracking-wider bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all text-white transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin" />
                <GlitchText intensity="high" trigger="always">
                  💀 DESTRUCTION IN PROGRESS 💀
                </GlitchText>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Save className="h-8 w-8" />
                <GlitchText intensity="medium" trigger="hover">
                  🔥 COMMIT CHANGES TO THE VOID 🔥
                </GlitchText>
              </div>
            )}
          </Button>
        </ShakeElement>
      </form>
    </div>
  );
}
