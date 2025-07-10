"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 px-4 bg-foreground text-background"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-black">
            READY TO
            <br />
            BRUTALIZE YOUR LINKS?
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            JOIN THOUSANDS OF CREATORS WHO CHOSE VIOLENCE OVER VANILLA
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-12 py-4 text-lg font-bold"
          >
            START YOUR BRUTALIZATION →
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};
