"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { FloatingGeometricShapes } from "./FloatingGeometricShapes";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "STARTER",
    subtitle: "FOR WEAKLINGS",
    price: "FREE",
    period: "FOREVER",
    popular: false,
    variant: "default" as const,
    icon: "🐌",
    rotation: "rotate-2",
    features: [
      { text: "5 Pathetic Links", included: true },
      { text: "Basic Analytics", included: true },
      { text: "Custom Domain", included: false },
      { text: "Priority Support", included: false },
      { text: "Advanced Features", included: false },
    ],
    cta: "START CRAWLING",
    description: "For those who barely exist online",
  },
  {
    name: "PRO",
    subtitle: "FOR REBELS",
    price: "$9",
    period: "PER MONTH",
    popular: true,
    variant: "warning" as const,
    icon: "⚡",
    rotation: "-rotate-1",
    features: [
      { text: "Unlimited Links", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Custom Domain", included: true },
      { text: "Priority Support", included: true },
      { text: "Brutal Themes", included: true },
    ],
    cta: "JOIN THE CHAOS",
    description: "For serious digital destroyers",
  },
  {
    name: "ENTERPRISE",
    subtitle: "FOR OVERLORDS",
    price: "$49",
    period: "PER MONTH",
    popular: false,
    variant: "destructive" as const,
    icon: "💀",
    rotation: "rotate-3",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "White Label", included: true },
      { text: "API Access", included: true },
      { text: "24/7 Support", included: true },
      { text: "Custom Integration", included: true },
    ],
    cta: "DOMINATE NOW",
    description: "For those who rule the internet",
  },
];

export const PricingSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Brutal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 50px,
                currentColor 50px,
                currentColor 51px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 50px,
                currentColor 50px,
                currentColor 51px
              )
            `,
          }}
        />
      </div>

      {/* Background Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-10" />

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
                variant="destructive"
                className="inline-block p-4 mb-8 transform -rotate-2"
              >
                <GlitchText
                  className="text-sm font-black tracking-widest uppercase text-white"
                  intensity="high"
                  trigger="hover"
                >
                  💰 PRICING THAT HURTS 💰
                </GlitchText>
              </BrutalBox>
            </ShakeElement>

            <GlitchText
              className="text-4xl md:text-6xl font-black tracking-tight mb-6"
              intensity="medium"
              trigger="hover"
            >
              <h2 className="uppercase">CHOOSE YOUR</h2>
            </GlitchText>

            <BrutalBox
              variant="warning"
              className="inline-block p-6 transform rotate-1"
            >
              <GlitchText
                className="text-4xl md:text-6xl font-black tracking-tight text-black dark:text-white"
                intensity="high"
                trigger="hover"
              >
                LEVEL OF CHAOS
              </GlitchText>
            </BrutalBox>

            <BrutalBox className="inline-block p-4 mt-6 transform -rotate-1">
              <p className="text-lg font-bold tracking-wide uppercase max-w-2xl">
                NO HIDDEN FEES. NO MERCY. NO REFUNDS.
                <br />
                <span className="text-primary">PAY OR SUFFER.</span>
              </p>
            </BrutalBox>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
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
                    plan.rotation === "rotate-1"
                      ? 2
                      : plan.rotation === "-rotate-1"
                      ? -2
                      : 1,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
                className={`relative transform ${plan.rotation} hover:rotate-0 transition-transform duration-300`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <ShakeElement intensity="high" trigger="always">
                      <BrutalBox
                        variant="destructive"
                        className="px-4 py-2 transform -rotate-12"
                      >
                        <GlitchText
                          className="text-xs font-black text-white tracking-widest uppercase"
                          intensity="high"
                          trigger="always"
                        >
                          🔥 MOST BRUTAL 🔥
                        </GlitchText>
                      </BrutalBox>
                    </ShakeElement>
                  </div>
                )}

                <BrutalBox
                  variant={plan.variant}
                  className="h-full p-8 relative overflow-hidden"
                  glitchOnHover={true}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <GlitchText
                      className="text-4xl mb-4"
                      intensity="medium"
                      trigger="hover"
                    >
                      {plan.icon}
                    </GlitchText>

                    <GlitchText
                      className={`text-2xl font-black tracking-wide uppercase mb-2 ${
                        plan.variant === "destructive"
                          ? "text-white"
                          : plan.variant === "warning"
                          ? "text-black dark:text-white"
                          : "text-foreground"
                      }`}
                      intensity="low"
                      trigger="hover"
                    >
                      {plan.name}
                    </GlitchText>

                    <p
                      className={`text-sm font-bold tracking-wider uppercase ${
                        plan.variant === "destructive"
                          ? "text-white/80"
                          : plan.variant === "warning"
                          ? "text-black/80 dark:text-white/90"
                          : "text-muted-foreground"
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <BrutalBox
                      className={`inline-block p-4 ${
                        plan.variant === "destructive"
                          ? "bg-white/20 border-white"
                          : plan.variant === "warning"
                          ? "bg-black/20 border-black"
                          : "bg-muted"
                      }`}
                    >
                      <GlitchText
                        className={`text-4xl font-black ${
                          plan.variant === "destructive"
                            ? "text-white"
                            : plan.variant === "warning"
                            ? "text-black dark:text-white"
                            : "text-foreground"
                        }`}
                        intensity="medium"
                        trigger="hover"
                      >
                        {plan.price}
                      </GlitchText>
                      <p
                        className={`text-xs font-bold tracking-wider uppercase ${
                          plan.variant === "destructive"
                            ? "text-white/80"
                            : plan.variant === "warning"
                            ? "text-black/80 dark:text-white/90"
                            : "text-muted-foreground"
                        }`}
                      >
                        {plan.period}
                      </p>
                    </BrutalBox>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <BrutalBox
                          className={`p-1 ${
                            feature.included ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {feature.included ? (
                            <Check className="h-3 w-3 text-white" />
                          ) : (
                            <X className="h-3 w-3 text-white" />
                          )}
                        </BrutalBox>
                        <span
                          className={`text-sm font-bold ${
                            plan.variant === "destructive"
                              ? "text-white"
                              : plan.variant === "warning"
                              ? "text-black dark:text-white"
                              : "text-foreground"
                          } ${
                            !feature.included ? "line-through opacity-50" : ""
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs font-bold tracking-wide text-center mb-6 ${
                      plan.variant === "destructive"
                        ? "text-white/80"
                        : plan.variant === "warning"
                        ? "text-black/80 dark:text-white/90"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* CTA Button */}
                  <ShakeElement intensity="medium" trigger="hover">
                    <BrutalBox
                      variant={plan.popular ? "destructive" : "default"}
                      className="w-full"
                    >
                      <Button
                        size="lg"
                        className={`w-full py-4 text-lg font-black uppercase tracking-wider border-4 ${
                          plan.popular
                            ? "bg-red-500 text-white border-red-800 hover:bg-red-400"
                            : "bg-primary text-primary-foreground border-primary-foreground hover:bg-primary/90"
                        } hover:scale-105 transition-all duration-200`}
                      >
                        {plan.cta}
                      </Button>
                    </BrutalBox>
                  </ShakeElement>
                </BrutalBox>
              </motion.div>
            ))}
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-16"
          >
            <BrutalBox
              variant="warning"
              className="inline-block p-6 transform -rotate-2"
            >
              <div className="space-y-3">
                <GlitchText
                  className="text-xl font-black text-black dark:text-white uppercase"
                  intensity="medium"
                  trigger="hover"
                >
                  ⚠️ WARNING: PRICES MAY CAUSE ADDICTION ⚠️
                </GlitchText>
                <p className="text-black/80 dark:text-white/90 font-bold tracking-wide">
                  ALL PLANS COME WITH GUARANTEED DIGITAL MAYHEM
                </p>
              </div>
            </BrutalBox>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
