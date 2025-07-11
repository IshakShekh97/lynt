"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "./FloatingGeometricShapes";

export const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-24 px-4 bg-gradient-to-br from-destructive via-destructive to-red-800 text-white overflow-hidden"
    >
      {/* Brutal Background Pattern */}
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
                currentColor 20px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 10px,
                currentColor 10px,
                currentColor 20px
              )
            `,
          }}
        />
      </div>

      {/* Background Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-5" />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
          className="space-y-12"
        >
          {/* Main Heading */}
          <div className="space-y-6">
            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox
                variant="warning"
                className="inline-block p-3 transform -rotate-2"
              >
                <span className="text-sm font-black tracking-widest uppercase text-black dark:text-white">
                  ⚠️ FINAL WARNING ⚠️
                </span>
              </BrutalBox>
            </ShakeElement>

            <GlitchText
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase"
              intensity="high"
              trigger="hover"
            >
              <h2>
                READY TO
                <br />
                <span className="text-yellow-400">DESTROY</span>
                <br />
                THE ORDINARY?
              </h2>
            </GlitchText>
          </div>

          {/* Description */}
          <BrutalBox className="inline-block p-6 bg-black/50 border-white transform rotate-1">
            <GlitchText
              className="text-lg md:text-xl font-bold tracking-wide uppercase max-w-2xl"
              intensity="low"
              trigger="hover"
            >
              <p>
                JOIN THOUSANDS OF DIGITAL REBELS WHO CHOSE
                <br />
                <span className="text-yellow-400 font-black">
                  VIOLENCE OVER VANILLA
                </span>
              </p>
            </GlitchText>
          </BrutalBox>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <ShakeElement intensity="high" trigger="hover">
              <BrutalBox
                variant="warning"
                className="transform -rotate-2 hover:rotate-2 transition-transform duration-300"
              >
                <Button
                  size="lg"
                  className="px-12 py-6 text-xl font-black uppercase tracking-wider bg-yellow-400 text-black border-4 border-black hover:bg-yellow-300 hover:scale-110 transition-all duration-200 dark:bg-yellow-600 dark:text-white dark:border-white dark:hover:bg-yellow-500"
                >
                  💀 START DESTROYING 💀
                </Button>
              </BrutalBox>
            </ShakeElement>

            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox className="bg-black border-white transform rotate-1 hover:-rotate-1 transition-transform duration-300">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-12 py-6 text-xl font-black uppercase tracking-wider bg-transparent text-white border-4 border-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-200"
                >
                  🔥 WITNESS THE CHAOS 🔥
                </Button>
              </BrutalBox>
            </ShakeElement>
          </div>

          {/* Stats/Social Proof */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              { number: "666+", label: "SOULS CORRUPTED", icon: "👹" },
              { number: "13K+", label: "LINKS DESTROYED", icon: "💥" },
              { number: "∞", label: "CHAOS LEVEL", icon: "🌪️" },
            ].map((stat, index) => (
              <ShakeElement key={index} intensity="low" trigger="hover">
                <BrutalBox
                  variant={index === 1 ? "warning" : "default"}
                  className="p-4 text-center bg-black/30 border-white"
                >
                  <GlitchText
                    className="text-2xl font-black mb-2"
                    intensity="medium"
                    trigger="hover"
                  >
                    {stat.icon} {stat.number}
                  </GlitchText>
                  <p className="text-xs font-bold tracking-widest uppercase">
                    {stat.label}
                  </p>
                </BrutalBox>
              </ShakeElement>
            ))}
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <BrutalBox
              variant="destructive"
              className="inline-block p-4 bg-red-900 border-red-500 transform -rotate-1"
            >
              <GlitchText
                className="text-sm font-black tracking-wider uppercase"
                intensity="high"
                trigger="always"
              >
                ⚡ NO REFUNDS. NO REGRETS. ONLY CHAOS. ⚡
              </GlitchText>
            </BrutalBox>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
