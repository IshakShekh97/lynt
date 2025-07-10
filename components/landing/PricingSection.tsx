"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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

const plans = [
  {
    name: "STARTER",
    price: "Free",
    popular: false,
    features: [
      "5 Links",
      "Basic Analytics",
      "Custom Domain",
      "Community Support",
    ],
  },
  {
    name: "PRO",
    price: "$9/mo",
    popular: true,
    features: [
      "Unlimited Links",
      "Advanced Analytics",
      "Priority Support",
      "Custom Themes",
      "A/B Testing",
    ],
  },
  {
    name: "ENTERPRISE",
    price: "$29/mo",
    popular: false,
    features: [
      "Everything in Pro",
      "White Label",
      "API Access",
      "Custom Integrations",
      "Dedicated Support",
    ],
  },
];

export const PricingSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-16 px-4 bg-muted/50 overflow-hidden"
    >
      {/* Background Geometric Shapes */}
      <FloatingGeometricShapes className="opacity-5" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-4"
          whileHover={{ scale: 1.02 }}
        >
          PRICING THAT{" "}
          <motion.span
            className="bg-secondary px-2 uppercase text-black"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {"Doesn't"} Suck!
          </motion.span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              <Card
                className={`border-2 border-foreground shadow-[4px_4px_0px_0px_theme(colors.foreground)] h-full relative transition-all duration-300 hover:shadow-[6px_6px_0px_0px_theme(colors.foreground)] ${
                  plan.popular ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Badge className="bg-accent text-accent-foreground font-bold">
                        MOST POPULAR
                      </Badge>
                    </motion.div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="text-sm font-bold mb-2">{plan.name}</div>
                  <motion.div
                    className="text-4xl font-black"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {plan.price}
                  </motion.div>
                  {plan.price !== "Free" && (
                    <div className="text-sm opacity-75">
                      Per month, billed annually
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter>
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant={plan.popular ? "secondary" : "default"}
                      className="w-full font-bold hover:shadow-lg transition-all duration-300"
                      size="lg"
                    >
                      {plan.name === "STARTER"
                        ? "START FOR FREE"
                        : plan.name === "PRO"
                        ? "CHOOSE PRO"
                        : "CHOOSE ENTERPRISE"}
                    </Button>
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
