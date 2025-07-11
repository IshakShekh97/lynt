"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "./FloatingGeometricShapes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
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

export const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-br from-background via-background to-secondary/10">
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

      {/* Background Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-20" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12"
        >
          <motion.div variants={brutalSlideIn} className="space-y-6">
            <ShakeElement intensity="low" trigger="hover">
              <BrutalBox variant="warning" className="inline-block p-2">
                <Badge className="text-xs px-4 py-2 font-black tracking-wider border-2 border-black bg-yellow-400 text-black hover:bg-yellow-300 transition-colors duration-200 dark:bg-yellow-600 dark:text-white dark:border-white dark:hover:bg-yellow-500">
                  ⚡ THE MOST BRUTAL LINK DESTROYER ⚡
                </Badge>
              </BrutalBox>
            </ShakeElement>

            <div className="space-y-4">
              <GlitchText
                className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
                intensity="medium"
                trigger="hover"
              >
                <motion.h1 className="font-black uppercase">
                  STOP BEING
                </motion.h1>
              </GlitchText>

              <BrutalBox
                variant="destructive"
                className="inline-block p-4 transform -rotate-1 hover:rotate-1 transition-transform duration-300"
              >
                <GlitchText
                  className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white"
                  intensity="high"
                  trigger="hover"
                >
                  BORING
                </GlitchText>
              </BrutalBox>

              <GlitchText
                className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
                intensity="medium"
                trigger="hover"
              >
                <motion.h1 className="font-black uppercase">
                  WITH YOUR LINKS!
                </motion.h1>
              </GlitchText>
            </div>

            <BrutalBox className="inline-block p-6 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
              <motion.p
                className="text-lg md:text-xl max-w-2xl mx-auto font-bold tracking-wide uppercase"
                whileHover={{ scale: 1.02 }}
              >
                CREATE LINK PAGES THAT SCREAM PERSONALITY
                <br />
                <span className="text-primary font-black">
                  WITH BRUTAL DESIGN CHAOS
                </span>
              </motion.p>
            </BrutalBox>
          </motion.div>

          <motion.div
            variants={brutalBounce}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox variant="default" glitchOnHover={true}>
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-black uppercase tracking-wide border-4 border-black bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
                >
                  💀 START DESTROYING 💀
                </Button>
              </BrutalBox>
            </ShakeElement>

            <ShakeElement intensity="low" trigger="hover">
              <BrutalBox variant="warning" glitchOnHover={true}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-black uppercase tracking-wide border-4 border-black bg-yellow-400 text-black hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 dark:bg-yellow-600 dark:text-white dark:border-white dark:hover:bg-yellow-500"
                >
                  🔥 SEE THE CHAOS 🔥
                </Button>
              </BrutalBox>
            </ShakeElement>
          </motion.div>

          {/* Brutal Stats */}
          <motion.div
            variants={brutalBounce}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              { number: "10K+", label: "LINKS DESTROYED", icon: "💥" },
              { number: "5K+", label: "BRUTAL USERS", icon: "🔥" },
              { number: "99.9%", label: "CHAOS UPTIME", icon: "⚡" },
            ].map((stat, index) => (
              <ShakeElement key={index} intensity="low" trigger="hover">
                <BrutalBox
                  variant={index === 1 ? "destructive" : "default"}
                  className="p-6 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <GlitchText
                    className="text-3xl font-black mb-2"
                    intensity="medium"
                    trigger="hover"
                  >
                    {stat.icon} {stat.number}
                  </GlitchText>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </BrutalBox>
              </ShakeElement>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
