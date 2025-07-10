"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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

const testimonials = [
  {
    name: "SARAH CHEN",
    role: "Designer",
    content:
      "This is absolutely incredible! My links now show my design prowess. The brutalist aesthetic perfectly captures my creative energy.",
  },
  {
    name: "MIKE RODRIGUEZ",
    role: "Developer",
    content:
      "Finally, a link manager that doesn't look like every other boring SaaS tool. My developer portfolio has never looked so bold.",
  },
  {
    name: "ALEX THOMPSON",
    role: "Creator",
    content:
      "I've tried dozens of link tools, and this is the only one that truly represents my brand. Bold, direct, and impossible to ignore.",
  },
];

export const TestimonialsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16"
          whileHover={{ scale: 1.02 }}
        >
          WHAT PEOPLE{" "}
          <motion.span
            className="bg-secondary px-2 uppercase text-black"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            BABEL.
          </motion.span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_theme(colors.foreground)] h-full transition-all duration-300 hover:shadow-[6px_6px_0px_0px_theme(colors.foreground)]">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <motion.div
                      className="text-2xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      ⭐⭐⭐⭐⭐
                    </motion.div>
                    <p className="text-sm leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="font-bold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
