"use client";

import { motion } from "framer-motion";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";

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

const features = [
  {
    icon: "⚡",
    title: "BLAZING FAST",
    description:
      "YOUR LINKS LOAD FASTER THAN YOU CAN BLINK. NO WAITING, JUST PURE DIGITAL VIOLENCE.",
    variant: "destructive" as const,
    rotation: "rotate-2",
  },
  {
    icon: "🛡️",
    title: "BULLETPROOF CHAOS",
    description:
      "BUILT TO SURVIVE THE DIGITAL APOCALYPSE. YOUR LINKS WILL OUTLAST HUMANITY.",
    variant: "warning" as const,
    rotation: "-rotate-1",
  },
  {
    icon: "✨",
    title: "BRUTALLY BEAUTIFUL",
    description:
      "DESIGN SO AGGRESSIVE, IT HURTS TO LOOK AT. YOUR VISITORS WILL NEVER FORGET.",
    variant: "default" as const,
    rotation: "rotate-1",
  },
  {
    icon: "🔥",
    title: "UNLIMITED MAYHEM",
    description:
      "CREATE INFINITE LINKS AND WATCH THE WORLD BURN. NO LIMITS, NO MERCY.",
    variant: "destructive" as const,
    rotation: "-rotate-2",
  },
  {
    icon: "📊",
    title: "BRUTAL ANALYTICS",
    description: "TRACK EVERY CLICK LIKE A DIGITAL STALKER. KNOW YOUR VICTIMS.",
    variant: "warning" as const,
    rotation: "rotate-3",
  },
  {
    icon: "🎨",
    title: "INSANE CUSTOMIZATION",
    description:
      "MAKE IT YOURS OR MAKE IT WEIRD. PERSONALIZATION TAKEN TO EXTREMES.",
    variant: "default" as const,
    rotation: "-rotate-1",
  },
];

export const WhyChooseSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-background via-secondary/5 to-primary/5 relative overflow-hidden">
      {/* Brutal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, currentColor 2px, transparent 0),
              linear-gradient(45deg, transparent 40%, currentColor 40%, currentColor 60%, transparent 60%)
            `,
            backgroundSize: "60px 60px, 40px 40px",
          }}
        />
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
            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox
                variant="warning"
                className="inline-block p-4 mb-8 transform -rotate-1"
              >
                <GlitchText
                  className="text-sm font-black tracking-widest uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  💀 WHY CHOOSE US? 💀
                </GlitchText>
              </BrutalBox>
            </ShakeElement>

            <GlitchText
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
              intensity="medium"
              trigger="hover"
            >
              <h2 className="uppercase">BECAUSE WE&apos;RE</h2>
            </GlitchText>

            <BrutalBox
              variant="destructive"
              className="inline-block p-6 transform rotate-1"
            >
              <GlitchText
                className="text-4xl md:text-6xl font-black tracking-tight text-white"
                intensity="high"
                trigger="hover"
              >
                ABSOLUTELY BRUTAL
              </GlitchText>
            </BrutalBox>

            <BrutalBox className="inline-block p-4 mt-6 transform -rotate-1">
              <p className="text-lg font-bold tracking-wide uppercase max-w-2xl">
                STOP SETTLING FOR BORING. START CREATING CHAOS.
                <br />
                <span className="text-primary">
                  DIGITAL DESTRUCTION AWAITS.
                </span>
              </p>
            </BrutalBox>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{
                  y: 50,
                  opacity: 0,
                  rotate: -5,
                  scale: 0.9,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                  transition: {
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 12,
                    duration: 0.6,
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  rotate:
                    feature.rotation === "rotate-1"
                      ? 2
                      : feature.rotation === "-rotate-1"
                      ? -2
                      : 0,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
                className={`transform ${feature.rotation} hover:rotate-0 transition-transform duration-300`}
              >
                <ShakeElement intensity="low" trigger="hover">
                  <BrutalBox
                    variant={feature.variant}
                    className="h-full p-6 cursor-pointer"
                    glitchOnHover={true}
                  >
                    <div className="text-center space-y-4">
                      <GlitchText
                        className="text-4xl mb-4"
                        intensity="medium"
                        trigger="hover"
                      >
                        {feature.icon}
                      </GlitchText>

                      <GlitchText
                        className={`text-xl font-black tracking-wide uppercase ${
                          feature.variant === "destructive"
                            ? "text-white"
                            : feature.variant === "warning"
                            ? "text-black dark:text-white"
                            : "text-foreground"
                        }`}
                        intensity="low"
                        trigger="hover"
                      >
                        {feature.title}
                      </GlitchText>

                      <p
                        className={`text-sm font-bold tracking-wider leading-relaxed ${
                          feature.variant === "destructive"
                            ? "text-white/90"
                            : feature.variant === "warning"
                            ? "text-black/80 dark:text-white/90"
                            : "text-muted-foreground"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </BrutalBox>
                </ShakeElement>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
              rotate: -5,
              scale: 0.9,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
              transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12,
                duration: 0.6,
              },
            }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <BrutalBox
              variant="destructive"
              className="inline-block p-8 transform -rotate-2 hover:rotate-2 transition-transform duration-300"
            >
              <div className="space-y-4">
                <GlitchText
                  className="text-2xl md:text-3xl font-black text-white uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  💥 READY FOR TOTAL CHAOS? 💥
                </GlitchText>
                <p className="text-white/90 font-bold tracking-wide">
                  JOIN THE REVOLUTION. DESTROY THE ORDINARY.
                </p>
              </div>
            </BrutalBox>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
