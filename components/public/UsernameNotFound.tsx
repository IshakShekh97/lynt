"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "@/components/landing/FloatingGeometricShapes";
import {
  Skull,
  Zap,
  Crown,
  ArrowRight,
  UserPlus,
  Target,
  Flame,
  Bolt,
} from "lucide-react";
import Link from "next/link";

interface UsernameNotFoundProps {
  username: string;
}

// Animation variants for staggered entrance
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

const brutalBounce = {
  hidden: { y: 100, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      duration: 0.8,
    },
  },
};

export function UsernameNotFound({ username }: UsernameNotFoundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background */}
      <FloatingGeometricShapes />

      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Main Error Section */}
            <motion.div
              variants={brutalSlideIn}
              className="text-center space-y-6"
            >
              {/* Warning Badge */}
              <ShakeElement intensity="low" trigger="hover">
                <BrutalBox variant="warning" className="inline-block p-2">
                  <Badge className="text-xs px-4 py-2 font-black tracking-wider border-2 border-black bg-red-500 text-white hover:bg-red-600 transition-colors duration-200">
                    ⚠️ TARGET NOT FOUND ⚠️
                  </Badge>
                </BrutalBox>
              </ShakeElement>

              {/* Skull Icon with Enhanced Animation */}
              <ShakeElement intensity="medium" trigger="hover">
                <div className="relative inline-block">
                  <motion.div
                    animate={{
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="bg-gradient-to-br from-red-500 to-orange-500 p-8 rounded-none border-8 border-black shadow-brutal"
                  >
                    <Skull className="w-20 h-20 text-white" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 border-4 border-black p-2 rounded-none">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                </div>
              </ShakeElement>

              {/* 404 Text with Glitch Effect */}
              <div className="space-y-4">
                <GlitchText
                  className="text-8xl font-black text-white"
                  intensity="high"
                  trigger="hover"
                >
                  404
                </GlitchText>
                <div className="relative">
                  <GlitchText
                    className="text-4xl md:text-6xl font-black text-white leading-tight uppercase"
                    intensity="medium"
                    trigger="hover"
                  >
                    USERNAME VOID
                  </GlitchText>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
                </div>
              </div>

              {/* Username Display with Enhanced Styling */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
                transition={{ duration: 0.3 }}
              >
                <BrutalBox className="bg-gray-800 border-red-500 p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-3">
                    <Target className="w-6 h-6 text-red-500" />
                    <GlitchText
                      className="text-xl font-mono text-red-400"
                      intensity="low"
                      trigger="hover"
                    >
                      @{username}
                    </GlitchText>
                    <Target className="w-6 h-6 text-red-500" />
                  </div>
                </BrutalBox>
              </motion.div>

              {/* Enhanced Description */}
              <div className="space-y-4">
                <BrutalBox className="inline-block p-4 bg-gray-800 border-yellow-400">
                  <GlitchText
                    className="text-xl text-yellow-400 font-black uppercase"
                    intensity="medium"
                    trigger="hover"
                  >
                    THIS NAME IS UNCLAIMED. FOR NOW.
                  </GlitchText>
                </BrutalBox>
                <BrutalBox className="inline-block p-6 bg-gray-900 border-white max-w-2xl">
                  <p className="text-gray-300 font-bold">
                    This space is empty. It could be yours. Seize this username
                    on the most brutal link platform before it&apos;s gone.
                  </p>
                </BrutalBox>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={brutalBounce}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Claim Username Card */}
              <ShakeElement intensity="low" trigger="hover">
                <Card className="bg-gradient-to-br from-green-500 to-teal-500 border-8 border-black p-8 rounded-none shadow-brutal hover:shadow-brutal-hover transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Crown className="w-8 h-8 text-yellow-400" />
                      <GlitchText
                        className="text-2xl font-black text-white uppercase"
                        intensity="medium"
                        trigger="hover"
                      >
                        SEIZE THIS NAME
                      </GlitchText>
                    </div>
                    <BrutalBox className="bg-green-600 border-green-800 p-4">
                      <p className="text-white/90 font-semibold">
                        Forge your digital identity with @{username}. Join the
                        ranks who dominate their online space.
                      </p>
                    </BrutalBox>
                    <BrutalBox variant="warning" className="inline-block p-2">
                      <div className="flex items-center gap-2 text-black font-black">
                        <Flame className="w-5 h-5" />
                        <span>FREE TO START</span>
                      </div>
                    </BrutalBox>
                    <Link href="/sign-up">
                      <Button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 px-6 rounded-none border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 group-hover:scale-105">
                        <UserPlus className="w-5 h-5 mr-2" />
                        SEIZE @{username}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </ShakeElement>

              {/* Explore Platform Card */}
              <ShakeElement intensity="low" trigger="hover">
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-8 border-black p-8 rounded-none shadow-brutal hover:shadow-brutal-hover transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Bolt className="w-8 h-8 text-yellow-400" />
                      <GlitchText
                        className="text-2xl font-black text-white uppercase"
                        intensity="medium"
                        trigger="hover"
                      >
                        WITNESS THE POWER
                      </GlitchText>
                    </div>
                    <BrutalBox className="bg-purple-600 border-purple-800 p-4">
                      <p className="text-white/90 font-semibold">
                        Discover why LYNT is the apex predator of link
                        management. Pure function, zero fluff.
                      </p>
                    </BrutalBox>
                    <BrutalBox variant="warning" className="inline-block p-2">
                      <div className="flex items-center gap-2 text-black font-black">
                        <Target className="w-5 h-5" />
                        <span>RAW AESTHETICS</span>
                      </div>
                    </BrutalBox>
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent hover:bg-white/10 text-white border-4 border-white font-black py-4 px-6 rounded-none shadow-brutal hover:shadow-brutal-hover transition-all duration-300 group-hover:scale-105"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        ENTER THE ARENA
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </ShakeElement>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={brutalBounce}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                {
                  icon: Crown,
                  title: "RAW AESTHETICS",
                  description: "Uncompromising, bold design.",
                  color: "from-red-500 to-orange-500",
                },
                {
                  icon: Zap,
                  title: "WARP SPEED",
                  description: "Engineered for raw velocity.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Target,
                  title: "DOMINATE DATA",
                  description: "Hard data for total control.",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((feature, index) => (
                <ShakeElement key={index} intensity="low" trigger="hover">
                  <BrutalBox
                    className={`bg-gradient-to-br ${feature.color} p-6 text-center group hover:scale-105 transition-transform duration-300`}
                  >
                    <feature.icon className="w-10 h-10 text-white mx-auto mb-3" />
                    <GlitchText
                      className="text-white font-black text-lg mb-2"
                      intensity="low"
                      trigger="hover"
                    >
                      {feature.title}
                    </GlitchText>
                    <p className="text-white/90 text-sm font-semibold">
                      {feature.description}
                    </p>
                  </BrutalBox>
                </ShakeElement>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div variants={brutalBounce} className="text-center">
              <BrutalBox className="inline-block bg-gray-800 border-gray-600 p-4">
                <p className="text-gray-400 text-sm font-black uppercase tracking-wider">
                  © {new Date().getFullYear()} LYNTBRUTT. - DOMINATE THE CLICK.
                </p>
              </BrutalBox>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
