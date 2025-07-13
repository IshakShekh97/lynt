"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "@/components/landing/FloatingGeometricShapes";
import {
  ExternalLink,
  Copy,
  MousePointer,
  Calendar,
  Crown,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Github,
  Globe,
  Share2,
  Eye,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Palette,
  Download,
  Bookmark,
  ArrowLeft,
  X,
  Skull,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { PublicUserProfile } from "@/lib/actions/public-profile.action";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ThemePicker } from "./ThemePicker";
import {
  brutalistColors,
  getPatternAnimation,
  getPatternSize,
  getPatternStyle,
  getSecondaryPatternAnimation,
  getSecondaryPatternSize,
  getSecondaryPatternStyle,
  isComplexPattern,
  profileThemes,
} from "@/lib/constants/themes";

interface PublicProfilePageProps {
  user: PublicUserProfile;
}

const socialIcons = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
  website: Globe,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, rotate: -5, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatingVariants = {
  float: {
    y: [0, -10, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function PublicProfilePage({ user }: PublicProfilePageProps) {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { data: session } = useSession();
  const { setTheme: setSystemTheme } = useTheme();
  const isOwnProfile = session?.user?.username === user.username;

  // Initialize theme from user's saved preference or default to 0
  useEffect(() => {
    if (user.theme) {
      const themeIndex = profileThemes.findIndex(
        (theme) => theme.id === user.theme || theme.name === user.theme
      );
      if (themeIndex !== -1) {
        setCurrentTheme(themeIndex);
        const selectedTheme = profileThemes[themeIndex];
        // Override system theme with the selected theme's mode
        setSystemTheme(selectedTheme.mode);
      }
    } else {
      // Default to first theme and set system theme accordingly
      setCurrentTheme(0);
      setSystemTheme(profileThemes[0].mode);
    }
  }, [user.theme, setSystemTheme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (isFullscreen) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isFullscreen]);

  const theme = profileThemes[currentTheme];
  const totalClicks = user.links.reduce(
    (total, link) => total + link.clicks,
    0
  );

  const handleLinkClick = async (link: PublicUserProfile["links"][0]) => {
    try {
      if (soundEnabled) {
        // Play a brutal click sound effect
        const audio = new Audio("/sounds/brutal-click.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }

      // Track the click
      await fetch("/api/links/track-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          linkId: link.id,
          userId: user.id,
        }),
      });

      // Open the link
      window.open(link.url, "_blank", "noopener,noreferrer");

      toast.success(
        `💀 LINK BRUTALLY CLICKED! ${link.clicks + 1} TOTAL CLICKS! 💀`
      );
    } catch {
      console.error("Error tracking click");
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  const copyLinkToClipboard = async (url: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(linkId);
      toast.success("💀 LINK BRUTALLY COPIED TO CLIPBOARD! 💀");
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {
      toast.error("Failed to copy link - THE BRUTALITY IS TOO STRONG!");
    }
  };

  const shareProfile = async () => {
    const profileUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.displayUsername || user.name}'s BRUTAL Profile`,
          text: `Check out this ABSOLUTELY BRUTAL profile on LYNTBRUTT! 💀`,
          url: profileUrl,
        });
      } catch {
        console.log("Sharing failed");
      }
    } else {
      try {
        await navigator.clipboard.writeText(profileUrl);
        toast.success("💀 PROFILE URL BRUTALLY COPIED! SPREAD THE CHAOS! 💀");
      } catch {
        toast.error("Failed to copy profile URL");
      }
    }
  };

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${user.displayUsername || user.name}
NICKNAME:${user.username}
${user.bio ? `NOTE:${user.bio}` : ""}
URL:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.username}_brutal_contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("💀 BRUTAL CONTACT CARD DOWNLOADED! 💀");
  };

  const formatMemberSince = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const selectTheme = async (index: number) => {
    setCurrentTheme(index);
    const selectedTheme = profileThemes[index];

    // Override system theme with the selected theme's mode
    setSystemTheme(selectedTheme.mode);

    // Save theme to database if this is the user's own profile
    if (isOwnProfile) {
      try {
        const response = await fetch("/api/profile/theme", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            theme: selectedTheme.id,
          }),
        });

        if (response.ok) {
          toast.success(`💀 THEME BRUTALLY SAVED TO ${selectedTheme.name}! 💀`);
        } else {
          throw new Error("Failed to save theme");
        }
      } catch (error) {
        console.error("Failed to save theme:", error);
        toast.error("Failed to save theme - THE BRUTALITY IS TOO STRONG!");
        // Revert theme selection on error
        setCurrentTheme(
          user.theme
            ? profileThemes.findIndex(
                (theme) => theme.id === user.theme || theme.name === user.theme
              ) || 0
            : 0
        );
      }
    } else {
      toast.success(`💀 THEME BRUTALLY CHANGED TO ${selectedTheme.name}! 💀`);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      } ${theme.background}`}
      style={{
        background: `linear-gradient(135deg, ${theme.primary.replace("from-", "").replace(" to-", ", ")})`,
      }}
    >
      {/* Cursor Trail Effect for Fullscreen */}
      {isFullscreen && (
        <div
          className="fixed w-8 h-8 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePos.x - 16,
            top: mousePos.y - 16,
            transition: "all 0.1s ease-out",
          }}
        />
      )}

      {/* Dynamic Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: getPatternStyle(theme.pattern),
          backgroundSize: getPatternSize(theme.pattern),
          animation: getPatternAnimation(theme.pattern),
        }}
      />

      {/* Additional animated overlay for complex patterns */}
      {isComplexPattern(theme.pattern) && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: getSecondaryPatternStyle(theme.pattern),
            backgroundSize: getSecondaryPatternSize(theme.pattern),
            animation: getSecondaryPatternAnimation(theme.pattern),
          }}
        />
      )}

      {/* Floating Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-20" />

      {/* Navigation - Only show to profile owner */}
      {isOwnProfile && (
        <div className="fixed top-4 left-4 z-40">
          <ShakeElement intensity="medium" trigger="hover">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-black border-2 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                DASHBOARD
              </Button>
            </Link>
          </ShakeElement>
        </div>
      )}

      {/* Control Panel - Only show to profile owner */}
      {isOwnProfile && (
        <div className="fixed top-4 right-4 z-40 flex gap-2">
          <ShakeElement intensity="high" trigger="hover">
            <Button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className={`${theme.accent} text-black font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2 ${
                showThemePicker ? "ring-4 ring-white" : ""
              }`}
            >
              {showThemePicker ? (
                <X className="w-4 h-4" />
              ) : (
                <Palette className="w-4 h-4" />
              )}
            </Button>
          </ShakeElement>

          <ShakeElement intensity="high" trigger="hover">
            <Button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`${soundEnabled ? "bg-green-500" : "bg-gray-500"} text-white font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </Button>
          </ShakeElement>

          <ShakeElement intensity="high" trigger="hover">
            <Button
              onClick={toggleFullscreen}
              className="bg-purple-500 text-white font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          </ShakeElement>
        </div>
      )}

      {/* Control Panel - placeholder for proper structure */}

      <div className="relative z-10 container mx-auto max-w-2xl px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <BrutalBox
              variant="destructive"
              className={`p-6 text-center bg-gradient-to-br ${theme.secondary} border-4 border-white transform -rotate-1 hover:rotate-1 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="space-y-4">
                <motion.div variants={floatingVariants} animate="float">
                  <ShakeElement intensity="medium" trigger="hover">
                    <div className="relative inline-block">
                      <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <AvatarImage
                          src={
                            user.profileImage && user.profileImageMimeType
                              ? `data:${user.profileImageMimeType};base64,${Buffer.from(
                                  user.profileImage
                                ).toString("base64")}`
                              : user.image || undefined
                          }
                          alt={user.name}
                        />
                        <AvatarFallback
                          className={`bg-gradient-to-br ${theme.primary} text-white font-black text-3xl`}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2">
                        <Badge
                          className={`${theme.accent} text-black font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                        >
                          <Crown className="w-4 h-4 mr-1" />
                          BRUTAL
                        </Badge>
                      </div>
                      {/* Floating Icons */}
                      <motion.div
                        className="absolute -top-4 -left-4 text-2xl"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        💀
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-4 -right-4 text-2xl"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        🔥
                      </motion.div>
                    </div>
                  </ShakeElement>
                </motion.div>

                <div className="space-y-3">
                  <GlitchText
                    className={`text-4xl font-black drop-shadow-lg ${theme.text}`}
                    intensity="high"
                    trigger="hover"
                  >
                    {user.displayUsername || user.name}
                  </GlitchText>

                  <div className={`text-lg font-bold ${theme.textSecondary}`}>
                    @{user.username}
                  </div>

                  {user.bio && (
                    <BrutalBox
                      className={`p-4 ${theme.mode === "dark" ? "bg-black/30" : "bg-white/30"} border-2 border-white/70 transform rotate-1 backdrop-blur-sm`}
                    >
                      <p className={`font-semibold text-lg ${theme.text}`}>
                        {user.bio}
                      </p>
                    </BrutalBox>
                  )}
                </div>

                {/* Enhanced Stats */}
                <div className="flex justify-center gap-3 flex-wrap">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <div
                      className="p-3 bg-green-500 border-2 border-black transform -rotate-2 cursor-pointer"
                      onClick={() => setShowStats(!showStats)}
                    >
                      <div className="text-center text-black font-black text-sm">
                        <div className="text-2xl">{user.links.length}</div>
                        <div>LINKS</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Only show clicks for own profile */}
                  {isOwnProfile && (
                    <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
                      <div
                        className="p-3 bg-blue-500 border-2 border-black transform rotate-2 cursor-pointer"
                        onClick={() => setShowStats(!showStats)}
                      >
                        <div className="text-center text-white font-black text-sm">
                          <div className="text-2xl">{totalClicks}</div>
                          <div>CLICKS</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Only show joined date for own profile */}
                  {isOwnProfile && (
                    <motion.div whileHover={{ scale: 1.1, rotate: 3 }}>
                      <div
                        className="p-3 bg-purple-500 border-2 border-black transform -rotate-1 cursor-pointer"
                        onClick={() => setShowStats(!showStats)}
                      >
                        <div className="text-center text-white font-black text-sm">
                          <div className="text-xl flex items-center justify-center gap-1">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="text-xs">
                            {formatMemberSince(user.createdAt)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.1, rotate: -3 }}>
                    <div
                      className="p-3 bg-yellow-500 border-2 border-black transform rotate-1 cursor-pointer"
                      onClick={() => setShowStats(!showStats)}
                    >
                      <div className="text-center text-black font-black text-sm">
                        <div className="text-2xl">⚡</div>
                        <div>BRUTAL</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3 flex-wrap">
                  {/* Only show share button for own profile */}
                  {isOwnProfile && (
                    <ShakeElement intensity="low" trigger="hover">
                      <Button
                        onClick={shareProfile}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-1"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        SHARE
                      </Button>
                    </ShakeElement>
                  )}

                  <ShakeElement intensity="low" trigger="hover">
                    <Button
                      onClick={downloadVCard}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 hover:-rotate-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      CONTACT
                    </Button>
                  </ShakeElement>

                  <ShakeElement intensity="low" trigger="hover">
                    <Button
                      onClick={() => {
                        const url = `${window.location.origin}/${user.username}`;
                        navigator.clipboard.writeText(url);
                        toast.success("💀 PROFILE LINK SAVED! 💀");
                      }}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-1"
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      SAVE
                    </Button>
                  </ShakeElement>
                </div>
              </div>
            </BrutalBox>
          </motion.div>

          {/* Enhanced Stats Panel */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                variants={itemVariants}
              >
                <BrutalBox
                  className={`p-6 bg-gradient-to-br ${theme.primary} border-4 border-white transform rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <div className="text-center space-y-4">
                    <GlitchText
                      className="text-2xl font-black text-white"
                      intensity="medium"
                    >
                      💀 BRUTAL ANALYTICS 💀
                    </GlitchText>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-black/20 p-3 border-2 border-white/50 transform -rotate-2">
                        <div className="text-white font-black text-center">
                          <div className="text-2xl">👁️</div>
                          <div className="text-xl">{totalClicks * 3}</div>
                          <div className="text-xs">VIEWS</div>
                        </div>
                      </div>

                      <div className="bg-black/20 p-3 border-2 border-white/50 transform rotate-2">
                        <div className="text-white font-black text-center">
                          <div className="text-2xl">💥</div>
                          <div className="text-xl">
                            {Math.floor(totalClicks * 0.15)}
                          </div>
                          <div className="text-xs">SHARES</div>
                        </div>
                      </div>

                      <div className="bg-black/20 p-3 border-2 border-white/50 transform -rotate-1">
                        <div className="text-white font-black text-center">
                          <div className="text-2xl">🔥</div>
                          <div className="text-xl">
                            {Math.floor(totalClicks * 0.08)}%
                          </div>
                          <div className="text-xs">CTR</div>
                        </div>
                      </div>

                      <div className="bg-black/20 p-3 border-2 border-white/50 transform rotate-1">
                        <div className="text-white font-black text-center">
                          <div className="text-2xl">⚡</div>
                          <div className="text-xl">
                            {user.socialLinks.length}
                          </div>
                          <div className="text-xs">SOCIALS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </BrutalBox>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Links */}
          {user.socialLinks.length > 0 && (
            <motion.div variants={itemVariants}>
              <BrutalBox
                variant="warning"
                className={`p-5 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-4 border-yellow-500 transform rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
              >
                <div className="text-center space-y-4">
                  <GlitchText
                    className={`text-2xl font-black ${theme.text}`}
                    intensity="medium"
                  >
                    💀 SOCIAL BRUTALITY 💀
                  </GlitchText>

                  <div className="flex justify-center gap-3 flex-wrap">
                    {user.socialLinks.map((social, index) => {
                      const Icon =
                        socialIcons[
                          social.platform as keyof typeof socialIcons
                        ] || Globe;
                      const colorClass =
                        brutalistColors[index % brutalistColors.length];
                      const rotation =
                        index % 2 === 0 ? "-rotate-3" : "rotate-3";

                      return (
                        <motion.div
                          key={social.id}
                          whileHover={{
                            scale: 1.2,
                            rotate: index % 2 === 0 ? 6 : -6,
                            y: -10,
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ShakeElement intensity="high" trigger="hover">
                            <Button
                              onClick={() => {
                                window.open(
                                  social.url,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                                toast.success(
                                  `💀 ${social.platform.toUpperCase()} BRUTALLY OPENED! 💀`
                                );
                              }}
                              className={`${colorClass} hover:scale-110 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 uppercase text-sm transform ${rotation} hover:-${rotation} transition-all duration-200 min-w-[100px]`}
                            >
                              <Icon className="w-5 h-5 mr-2" />
                              {social.platform}
                            </Button>
                          </ShakeElement>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </BrutalBox>
            </motion.div>
          )}

          {/* Links Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center">
              <GlitchText
                className={`text-3xl font-black drop-shadow-lg ${theme.text}`}
                intensity="high"
              >
                💥 BRUTAL LINKS OF DESTRUCTION 💥
              </GlitchText>
              <p className={`font-bold mt-2 ${theme.textSecondary}`}>
                CLICK AT YOUR OWN RISK - TOTAL CHAOS GUARANTEED
              </p>
            </div>

            {user.links.length > 0 ? (
              <div className="space-y-4">
                {user.links.map((link, index) => {
                  const colorClass =
                    brutalistColors[index % brutalistColors.length];
                  const rotation =
                    index % 3 === 0
                      ? "rotate-1"
                      : index % 3 === 1
                        ? "-rotate-1"
                        : "rotate-2";
                  const hoverRotation =
                    index % 3 === 0
                      ? "-rotate-1"
                      : index % 3 === 1
                        ? "rotate-1"
                        : "-rotate-2";

                  return (
                    <motion.div
                      key={link.id}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        y: -5,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="group"
                    >
                      <div
                        className={`p-5 ${colorClass} border-4 border-black transform ${rotation} hover:${hoverRotation} transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]`}
                        onClick={() => handleLinkClick(link)}
                      >
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className="flex-shrink-0">
                              {link.emoji ? (
                                <motion.div
                                  className="text-3xl font-black"
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  {link.emoji}
                                </motion.div>
                              ) : (
                                <div className="w-10 h-10 bg-black/30 rounded border-2 border-white flex items-center justify-center">
                                  <ExternalLink className="w-5 h-5" />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <motion.div
                                className="font-black text-xl truncate group-hover:text-yellow-200 transition-colors"
                                whileHover={{ x: 5 }}
                              >
                                {link.title}
                              </motion.div>
                              {link.description && (
                                <div className="text-sm font-semibold opacity-90 truncate mt-1">
                                  {link.description}
                                </div>
                              )}
                              {/* Only show click stats for own profile */}
                              {isOwnProfile && (
                                <div className="flex items-center gap-3 text-sm font-bold opacity-80 mt-2">
                                  <div className="flex items-center gap-1">
                                    <MousePointer className="w-3 h-3" />
                                    {link.clicks} clicks
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {link.clicks * 2} views
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <ShakeElement intensity="high" trigger="hover">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyLinkToClipboard(link.url, link.id);
                                }}
                                className="bg-black/30 hover:bg-black/50 text-white border-2 border-white p-2 h-auto transform hover:scale-110"
                              >
                                {copiedLink === link.id ? (
                                  <motion.span
                                    className="text-sm font-black text-green-400"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    ✓
                                  </motion.span>
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </ShakeElement>

                            <motion.div
                              className="transform group-hover:rotate-45 transition-transform duration-300"
                              whileHover={{ scale: 1.2 }}
                            >
                              <ExternalLink className="w-6 h-6" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Link Performance Bar - Only show for own profile */}
                        {isOwnProfile && (
                          <div className="mt-3 bg-black/30 rounded-full h-2 overflow-hidden border border-white/50">
                            <motion.div
                              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.min((link.clicks / Math.max(...user.links.map((l) => l.clicks), 1)) * 100, 100)}%`,
                              }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div variants={itemVariants}>
                <BrutalBox
                  variant="destructive"
                  className="p-10 text-center bg-gradient-to-br from-gray-600/30 to-gray-700/30 border-4 border-gray-500 transform rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="space-y-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Skull className="w-16 h-16 mx-auto text-gray-600" />
                    </motion.div>
                    <GlitchText
                      className="text-2xl font-black text-gray-600"
                      intensity="medium"
                    >
                      💀 NO LINKS IN THE VOID 💀
                    </GlitchText>
                    <p className="text-gray-500 font-semibold text-lg">
                      This brutal warrior hasn&apos;t forged any links yet.
                    </p>
                    <p className="text-gray-400 font-medium">
                      The chaos is yet to come...
                    </p>
                  </div>
                </BrutalBox>
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants}>
            <BrutalBox
              className={`p-6 bg-gradient-to-r ${theme.mode === "dark" ? "from-black/40 to-gray-900/40" : "from-white/40 to-gray-100/40"} border-4 ${theme.border} text-center transform -rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                  onClick={() => window.open("https://lyntbrutt.com", "_blank")}
                >
                  <GlitchText
                    className={`text-2xl font-black ${theme.text}`}
                    intensity="low"
                  >
                    💀 POWERED BY LYNTBRUTT 💀
                  </GlitchText>
                </motion.div>
                <p className={`text-lg font-semibold ${theme.textSecondary}`}>
                  BRUTAL LINK MANAGEMENT FOR DIGITAL WARRIORS
                </p>
                <p
                  className={`text-sm font-medium ${theme.textSecondary} opacity-80`}
                >
                  JOIN THE CHAOS - CREATE YOUR BRUTAL PROFILE TODAY
                </p>

                {/* Footer Stats */}
                <div
                  className={`flex justify-center gap-4 mt-4 text-xs font-bold ${theme.textSecondary} opacity-60`}
                >
                  <span>🔥 BRUTALITY LEVEL: MAXIMUM</span>
                  <span>
                    ⚡ CHAOS INDEX: {Math.floor(Math.random() * 100)}%
                  </span>
                  <span>💀 DESTRUCTION: GUARANTEED</span>
                </div>
              </div>
            </BrutalBox>
          </motion.div>
        </motion.div>
      </div>

      {/* Theme Picker */}
      <ThemePicker
        isOpen={showThemePicker}
        onClose={() => setShowThemePicker(false)}
        currentTheme={currentTheme}
        onThemeSelect={selectTheme}
        profileThemes={profileThemes}
        theme={theme}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
