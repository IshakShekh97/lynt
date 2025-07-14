"use client";

import { motion } from "framer-motion";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skull, Flame, Zap, Crown, Eye, Heart } from "lucide-react";

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

const brutalSlideIn = {
  hidden: { x: -100, opacity: 0, rotate: -5 },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
      duration: 0.6,
    },
  },
};

const themePreview = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      duration: 0.8,
    },
  },
};

const featuredThemes = [
  {
    id: "brutal-red",
    name: "💀 BRUTAL RED DEATH",
    icon: Skull,
    gradient: "from-red-600 to-red-800",
    accent: "bg-red-400",
    description: "CLASSIC DESTRUCTION",
    rotation: "rotate-2",
  },
  {
    id: "toxic-green",
    name: "🧪 TOXIC WASTE",
    icon: Flame,
    gradient: "from-green-600 to-emerald-700",
    accent: "bg-lime-400",
    description: "RADIOACTIVE MAYHEM",
    rotation: "-rotate-1",
  },
  {
    id: "electric-purple",
    name: "⚡ ELECTRIC FURY",
    icon: Zap,
    gradient: "from-purple-600 to-violet-700",
    accent: "bg-cyan-400",
    description: "ELECTRIC CHAOS",
    rotation: "rotate-1",
  },
  {
    id: "golden-mayhem",
    name: "👑 GOLDEN MAYHEM",
    icon: Crown,
    gradient: "from-yellow-600 to-amber-700",
    accent: "bg-yellow-400",
    description: "ROYAL DESTRUCTION",
    rotation: "-rotate-2",
  },
  {
    id: "void-black",
    name: "🖤 ENDLESS VOID",
    icon: Eye,
    gradient: "from-gray-700 to-black",
    accent: "bg-white",
    description: "PURE DARKNESS",
    rotation: "rotate-3",
  },
  {
    id: "love-brutality",
    name: "💖 LOVE BRUTALITY",
    icon: Heart,
    gradient: "from-pink-600 to-rose-700",
    accent: "bg-pink-300",
    description: "VIOLENT AFFECTION",
    rotation: "-rotate-1",
  },
];

export const BrutalThemesSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Chaotic Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                currentColor 10px,
                currentColor 12px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 15px,
                currentColor 15px,
                currentColor 17px
              )
            `,
          }}
        />
      </div>

      {/* Floating Brutal Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 border-4 border-primary transform ${
              i % 2 === 0 ? "rotate-45" : "-rotate-45"
            }`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div variants={brutalSlideIn}>
              <ShakeElement intensity="high" trigger="hover">
                <BrutalBox
                  variant="destructive"
                  className="inline-block p-4 mb-8 transform rotate-2"
                >
                  <Badge
                    variant="outline"
                    className="text-lg px-4 py-2 font-black border-4 border-current"
                  >
                    BRUTAL THEMES
                  </Badge>
                </BrutalBox>
              </ShakeElement>
            </motion.div>

            <motion.div variants={brutalSlideIn}>
              <GlitchText
                className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
                intensity="high"
                trigger="hover"
              >
                UNLEASH YOUR{" "}
                <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                  VISUAL CHAOS
                </span>
              </GlitchText>
            </motion.div>

            <motion.p
              variants={brutalSlideIn}
              className="text-xl md:text-2xl text-muted-foreground font-bold max-w-3xl mx-auto leading-relaxed"
            >
              CHOOSE FROM{" "}
              <span className="text-primary font-black">30+ BRUTAL THEMES</span>{" "}
              DESIGNED TO ASSAULT THE SENSES AND BURN INTO MEMORY
            </motion.p>
          </div>

          {/* Theme Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {featuredThemes.map((theme, index) => (
              <motion.div
                key={theme.id}
                variants={themePreview}
                whileHover={{
                  scale: 1.05,
                  rotate: theme.rotation === "rotate-2" ? 3 : -2,
                  transition: { duration: 0.2 },
                }}
                className="group cursor-pointer"
              >
                <BrutalBox
                  variant="default"
                  className={`p-6 h-64 relative overflow-hidden transform ${theme.rotation} group-hover:shadow-brutal`}
                >
                  {/* Theme Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`}
                  />

                  {/* Accent Border */}
                  <div
                    className={`absolute top-0 left-0 w-full h-2 ${theme.accent}`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-2 h-full ${theme.accent}`}
                  />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <theme.icon className="w-12 h-12 mb-4 text-primary" />
                      <h3 className="text-xl font-black mb-2 tracking-tight">
                        {theme.name}
                      </h3>
                      <p className="text-sm font-bold text-muted-foreground">
                        {theme.description}
                      </p>
                    </div>

                    {/* Mini Profile Preview */}
                    <div className="space-y-2">
                      <div
                        className={`h-3 bg-gradient-to-r ${theme.gradient} rounded-full`}
                      />
                      <div className="h-2 bg-muted rounded-full w-3/4" />
                      <div className="h-2 bg-muted rounded-full w-1/2" />
                    </div>
                  </div>

                  {/* Brutal Pattern Overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            ${index % 2 === 0 ? "45deg" : "-45deg"},
                            transparent,
                            transparent 8px,
                            currentColor 8px,
                            currentColor 10px
                          )
                        `,
                      }}
                    />
                  </div>
                </BrutalBox>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats and CTA */}
          <motion.div
            variants={containerVariants}
            className="text-center space-y-8"
          >
            {/* Brutal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <ShakeElement intensity="medium" trigger="hover">
                <BrutalBox
                  variant="warning"
                  className="p-6 transform -rotate-1"
                >
                  <div className="text-3xl font-black text-primary mb-2">
                    30+
                  </div>
                  <div className="font-bold text-muted-foreground">
                    BRUTAL THEMES
                  </div>
                </BrutalBox>
              </ShakeElement>

              <ShakeElement intensity="medium" trigger="hover">
                <BrutalBox
                  variant="destructive"
                  className="p-6 transform rotate-1"
                >
                  <div className="text-3xl font-black text-primary mb-2">
                    DARK & LIGHT
                  </div>
                  <div className="font-bold text-muted-foreground">
                    MODE SUPPORT
                  </div>
                </BrutalBox>
              </ShakeElement>

              <ShakeElement intensity="medium" trigger="hover">
                <BrutalBox
                  variant="default"
                  className="p-6 transform -rotate-2"
                >
                  <div className="text-3xl font-black text-primary mb-2">∞</div>
                  <div className="font-bold text-muted-foreground">
                    CUSTOMIZATION
                  </div>
                </BrutalBox>
              </ShakeElement>
            </div>

            {/* CTA */}
            <motion.div variants={brutalSlideIn}>
              <ShakeElement intensity="low" trigger="hover">
                <Link href="/themes">
                  <Button
                    size="lg"
                    className="text-xl px-8 py-4 font-black transform hover:scale-105 transition-all duration-200 shadow-brutal"
                  >
                    <GlitchText intensity="low" trigger="hover">
                      EXPLORE ALL THEMES
                    </GlitchText>
                  </Button>
                </Link>
              </ShakeElement>
            </motion.div>

            <motion.p
              variants={brutalSlideIn}
              className="text-lg text-muted-foreground font-bold max-w-2xl mx-auto"
            >
              Each theme is a DIGITAL WEAPON designed to make your profile{" "}
              <span className="text-primary font-black">UNFORGETTABLE</span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
