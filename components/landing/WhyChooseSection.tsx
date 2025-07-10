"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const features = [
  {
    icon: "⚡",
    title: "LIGHTNING FAST",
    description:
      "Your links load faster than you can say 'brutalism'. No waiting, just pure speed.",
  },
  {
    icon: "🛡️",
    title: "BULLETPROOF",
    description:
      "Built to withstand anything. Your links will survive the digital apocalypse.",
  },
  {
    icon: "✨",
    title: "BRUTALLY BEAUTIFUL",
    description:
      "Aggressive visual design that makes your links impossible to ignore.",
  },
  {
    icon: "📊",
    title: "INSANE ANALYTICS",
    description:
      "Track everything. Know who clicked what, when, and where. Data obsessed.",
  },
];

export const WhyChooseSection = () => {
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
          WHY CHOOSE{" "}
          <motion.span
            className="bg-secondary px-2 uppercase text-black"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            LinkBrut?
          </motion.span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
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
                <CardHeader className="text-center">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-lg font-black">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
