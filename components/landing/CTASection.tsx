"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingGeometricShapes } from "./FloatingGeometricShapes";

export const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-24 px-4 bg-foreground text-background overflow-hidden"
    >
      {/* Background Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-10" />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-black"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            READY TO
            <br />
            BRUTALIZE YOUR LINKS?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            JOIN THOUSANDS OF CREATORS WHO CHOSE VIOLENCE OVER VANILLA
          </motion.p>
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
              variant="secondary"
              className="px-12 py-4 text-lg font-bold hover:shadow-2xl transition-all duration-300"
            >
              START YOUR BRUTALIZATION →
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
