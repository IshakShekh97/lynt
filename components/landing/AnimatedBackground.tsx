"use client";

import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedBackground = ({
  className = "",
  children,
}: AnimatedBackgroundProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top floating elements */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-4 h-4 bg-primary/20 transform rotate-45"
        />

        <motion.div
          animate={{
            y: [-15, 15, -15],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-6 h-6 bg-secondary/20 rounded-full"
        />

        {/* Middle floating elements */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-8 h-2 bg-accent/20"
        />

        <motion.div
          animate={{
            y: [-25, 25, -25],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/3 w-5 h-5 bg-primary/20"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />

        {/* Bottom floating elements */}
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-1/3 w-6 h-6 bg-secondary/20 transform rotate-45"
        />

        <motion.div
          animate={{
            y: [-18, 18, -18],
            x: [-8, 8, -8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-10 w-7 h-7 bg-accent/20"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />

        {/* Additional scattered elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-3/4 left-1/5 w-3 h-8 bg-primary/20"
        />

        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/5 right-1/5 w-4 h-4 bg-secondary/20 border border-primary/20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
