"use client";

import { motion } from "framer-motion";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "SARAH DESTRUCTION",
    role: "CHAOS DESIGNER",
    avatar: "👩‍🎨",
    content:
      "THIS TOOL LITERALLY SAVED MY SOUL FROM BORING DESIGN HELL. MY LINKS NOW SCREAM PERSONALITY AND MY CLIENTS ARE TERRIFIED... IN A GOOD WAY!",
    rating: 5,
    variant: "destructive" as const,
    rotation: "rotate-2",
  },
  {
    name: "MIKE DEVASTATOR",
    role: "CODE DESTROYER",
    avatar: "👨‍💻",
    content:
      "FINALLY! A LINK MANAGER THAT DOESN&apos;T LOOK LIKE EVERY OTHER SOUL-CRUSHING CORPORATE TOOL. MY DEVELOPER PORTFOLIO NOW CAUSES PHYSICAL PAIN TO LOOK AT.",
    rating: 5,
    variant: "warning" as const,
    rotation: "-rotate-1",
  },
  {
    name: "ALEX ANNIHILATOR",
    role: "CONTENT OBLITERATOR",
    avatar: "🎭",
    content:
      "I&apos;VE TRIED 47 LINK TOOLS AND THEY ALL MADE ME WANT TO DELETE THE INTERNET. THIS ONE MAKES ME WANT TO BURN DOWN THE ENTIRE TECH INDUSTRY... BEAUTIFULLY.",
    rating: 5,
    variant: "default" as const,
    rotation: "rotate-3",
  },
  {
    name: "JENNY MAYHEM",
    role: "DIGITAL ANARCHIST",
    avatar: "🔥",
    content:
      "MY CONVERSION RATES INCREASED BY 666% AFTER SWITCHING. VISITORS ARE SO SHOCKED BY THE BRUTAL BEAUTY THEY CAN&apos;T HELP BUT CLICK EVERYTHING.",
    rating: 5,
    variant: "destructive" as const,
    rotation: "-rotate-2",
  },
  {
    name: "DAVE CHAOS",
    role: "STARTUP TERRORIST",
    avatar: "💀",
    content:
      "OUR INVESTORS LITERALLY FAINTED WHEN THEY SAW OUR NEW LINK PAGE. WE RAISED $2M JUST FROM THE PURE INTIMIDATION FACTOR OF OUR BRUTAL DESIGN.",
    rating: 5,
    variant: "warning" as const,
    rotation: "rotate-1",
  },
  {
    name: "LISA APOCALYPSE",
    role: "SOCIAL MEDIA DESTROYER",
    avatar: "⚡",
    content:
      "I USED TO BE A BORING INFLUENCER. NOW I&apos;M A DIGITAL WARLORD. MY FOLLOWERS FEAR AND RESPECT MY LINK TREE. ENGAGEMENT UP 420%.",
    rating: 5,
    variant: "default" as const,
    rotation: "-rotate-3",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Brutal Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, currentColor 2px, transparent 2px),
              radial-gradient(circle at 80% 50%, currentColor 2px, transparent 2px),
              linear-gradient(45deg, transparent 49%, currentColor 49%, currentColor 51%, transparent 51%)
            `,
            backgroundSize: "30px 30px, 30px 30px, 60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox
                variant="warning"
                className="inline-block p-4 mb-8 transform -rotate-2"
              >
                <GlitchText
                  className="text-sm font-black tracking-widest uppercase text-black dark:text-white"
                  intensity="high"
                  trigger="hover"
                >
                  👹 TESTIMONIALS FROM HELL 👹
                </GlitchText>
              </BrutalBox>
            </ShakeElement>

            <GlitchText
              className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white"
              intensity="medium"
              trigger="hover"
            >
              <h2 className="uppercase">REAL VICTIMS</h2>
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
                REAL CHAOS
              </GlitchText>
            </BrutalBox>

            <BrutalBox className="inline-block p-4 mt-6 transform -rotate-1 bg-gray-800 border-gray-600">
              <p className="text-lg font-bold tracking-wide uppercase max-w-2xl">
                THESE BRAVE SOULS CHOSE BRUTALITY OVER BEAUTY
                <br />
                <span className="text-red-400">AND LIVED TO TELL THE TALE</span>
              </p>
            </BrutalBox>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
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
                    delay: index * 0.1,
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  rotate:
                    testimonial.rotation === "rotate-1"
                      ? 2
                      : testimonial.rotation === "-rotate-1"
                      ? -2
                      : 1,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
                className={`transform ${testimonial.rotation} hover:rotate-0 transition-transform duration-300`}
              >
                <ShakeElement intensity="low" trigger="hover">
                  <BrutalBox
                    variant={testimonial.variant}
                    className="h-full p-6 relative overflow-hidden"
                    glitchOnHover={true}
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-30">
                      <Quote className="h-8 w-8" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <BrutalBox key={i} variant="warning" className="p-1">
                          <Star className="h-3 w-3 text-black fill-black dark:text-white dark:fill-white" />
                        </BrutalBox>
                      ))}
                    </div>

                    {/* Content */}
                    <GlitchText
                      className={`text-sm font-bold tracking-wide mb-6 leading-relaxed ${
                        testimonial.variant === "destructive"
                          ? "text-white"
                          : testimonial.variant === "warning"
                          ? "text-black dark:text-white"
                          : "text-foreground"
                      }`}
                      intensity="low"
                      trigger="hover"
                    >
                      &quot;{testimonial.content}&quot;
                    </GlitchText>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <BrutalBox
                        className={`p-3 ${
                          testimonial.variant === "destructive"
                            ? "bg-white/20 border-white"
                            : testimonial.variant === "warning"
                            ? "bg-black/20 border-black"
                            : "bg-muted"
                        }`}
                      >
                        <span className="text-2xl">{testimonial.avatar}</span>
                      </BrutalBox>

                      <div>
                        <GlitchText
                          className={`text-lg font-black uppercase ${
                            testimonial.variant === "destructive"
                              ? "text-white"
                              : testimonial.variant === "warning"
                              ? "text-black dark:text-white"
                              : "text-foreground"
                          }`}
                          intensity="medium"
                          trigger="hover"
                        >
                          {testimonial.name}
                        </GlitchText>
                        <p
                          className={`text-xs font-bold tracking-wider uppercase ${
                            testimonial.variant === "destructive"
                              ? "text-white/80"
                              : testimonial.variant === "warning"
                              ? "text-black/80 dark:text-white/90"
                              : "text-muted-foreground"
                          }`}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </BrutalBox>
                </ShakeElement>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { number: "666K+", label: "SOULS CONVERTED", icon: "👹" },
                { number: "99.9%", label: "SATISFACTION RATE", icon: "🔥" },
                { number: "∞", label: "CHAOS GENERATED", icon: "💀" },
              ].map((stat, index) => (
                <ShakeElement key={index} intensity="medium" trigger="hover">
                  <BrutalBox
                    variant={index === 1 ? "warning" : "destructive"}
                    className="p-6 text-center"
                  >
                    <GlitchText
                      className={`text-3xl font-black mb-2 ${
                        index === 1
                          ? "text-black dark:text-white"
                          : "text-white"
                      }`}
                      intensity="high"
                      trigger="hover"
                    >
                      {stat.icon} {stat.number}
                    </GlitchText>
                    <p
                      className={`text-xs font-bold tracking-widest uppercase ${
                        index === 1
                          ? "text-black/80 dark:text-white/90"
                          : "text-white/80"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </BrutalBox>
                </ShakeElement>
              ))}
            </div>
          </motion.div>

          {/* Final Warning */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="text-center mt-12"
          >
            <BrutalBox
              variant="warning"
              className="inline-block p-4 transform -rotate-2"
            >
              <GlitchText
                className="text-lg font-black text-black dark:text-white uppercase"
                intensity="high"
                trigger="always"
              >
                ⚠️ RESULTS NOT TYPICAL. SIDE EFFECTS MAY INCLUDE DIGITAL
                DOMINANCE ⚠️
              </GlitchText>
            </BrutalBox>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
