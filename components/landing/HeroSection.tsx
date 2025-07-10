"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <Badge className="text-xs px-3 py-1">
              THE MOST BRILLIANT LINK MANAGER
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
              YOUR LINKS,
            </h1>
            <h1 className="px-2 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight bg-secondary text-black w-fit mx-auto">
              BRUTALIZED
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
              STOP BEING BORING. CREATE LINK PAGES THAT SCREAM
              <br />
              PERSONALITY WITH OUR NEO BRUTALIST DESIGN SYSTEM.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="px-8 py-3 text-sm font-bold">
              START BRUTALIZING
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-sm font-bold"
            >
              SEE EXAMPLES
            </Button>
          </motion.div>

          {/* Floating Geometric Shapes */}
          <div className="relative mt-16">
            <motion.div
              animate={{
                y: [-10, 10, -10],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                },
              }}
              className="absolute top-0 left-1/4 w-6 h-6 bg-primary transform rotate-45"
            />
            <motion.div
              animate={{
                y: [-10, 10, -10],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: 1,
                },
              }}
              className="absolute top-10 right-1/4 w-4 h-4 bg-secondary border-2 border-foreground"
            />
            <motion.div
              animate={{
                y: [-10, 10, -10],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: 2,
                },
              }}
              className="absolute -top-5 right-1/3 w-8 h-8 bg-accent transform rotate-12"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
