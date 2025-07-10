"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FloatingGeometricShapes } from "./FloatingGeometricShapes";

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
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-20" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Badge className="text-xs px-3 py-1 hover:bg-primary/90 transition-colors duration-300">
                THE MOST BRILLIANT LINK MANAGER
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              YOUR LINKS,
            </motion.h1>
            <motion.h1
              className="px-2 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight bg-secondary text-black w-fit mx-auto"
              whileHover={{
                scale: 1.02,
                backgroundColor: "#000000",
                color: "#ffffff",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              BRUTALIZED
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              STOP BEING BORING. CREATE LINK PAGES THAT SCREAM
              <br />
              PERSONALITY WITH OUR NEO BRUTALIST DESIGN SYSTEM.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="px-8 py-3 text-sm font-bold hover:shadow-lg transition-all duration-300"
              >
                START BRUTALIZING
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-sm font-bold hover:shadow-lg transition-all duration-300"
              >
                SEE EXAMPLES
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
