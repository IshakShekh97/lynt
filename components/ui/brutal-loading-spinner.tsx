"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrutalLoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BrutalLoadingSpinner = ({
  className = "",
  size = "md",
}: BrutalLoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("relative inline-block", sizeClasses[size], className)}>
      {/* Main spinner */}
      <motion.div
        className="absolute inset-0 border-4 border-current border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Brutal square overlay */}
      <motion.div
        className="absolute inset-0 border-2 border-current bg-current/20"
        animate={{
          scale: [1, 0.8, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glitch effect */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/60"
        animate={{
          x: [-1, 1, -1],
          y: [-1, 1, -1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
