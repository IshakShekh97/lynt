"use client";

import { motion } from "framer-motion";

interface FloatingGeometricShapesProps {
  className?: string;
}

export const FloatingGeometricShapes = ({
  className = "",
}: FloatingGeometricShapesProps) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Diamond shape */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [45, 90, 45],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        }}
        className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary transform rotate-45"
      />

      {/* Square with border */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 45, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1,
          },
        }}
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-secondary border-2 border-foreground"
      />

      {/* Tilted rectangle */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          rotate: [12, 35, 12],
          transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 2,
          },
        }}
        className="absolute top-1/6 right-1/3 w-8 h-8 bg-accent transform rotate-12"
      />

      {/* Circle */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          scale: [1, 1.2, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 0.5,
          },
        }}
        className="absolute top-1/2 left-1/6 w-5 h-5 bg-primary rounded-full"
      />

      {/* Triangle */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 180, 0],
          transition: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1.5,
          },
        }}
        className="absolute bottom-1/3 left-1/3 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-secondary"
      />

      {/* Hexagon */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          rotate: [0, 60, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 2.5,
          },
        }}
        className="absolute bottom-1/4 right-1/6 w-6 h-6 bg-accent transform rotate-30"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />

      {/* Small diamonds scattered */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [45, 90, 45],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 3,
          },
        }}
        className="absolute top-3/4 left-1/5 w-3 h-3 bg-primary transform rotate-45"
      />

      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 45, 0],
          transition: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 0.8,
          },
        }}
        className="absolute top-1/5 right-1/5 w-4 h-4 bg-secondary border border-foreground"
      />

      {/* Floating line */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [0, 90, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1.2,
          },
        }}
        className="absolute bottom-1/2 right-1/3 w-8 h-1 bg-accent"
      />

      {/* Plus sign */}
      <motion.div
        animate={{
          y: [-7, 7, -7],
          rotate: [0, 45, 0],
          transition: {
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 2.2,
          },
        }}
        className="absolute top-2/3 left-2/3 w-6 h-6"
      >
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary transform -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary transform -translate-x-1/2" />
      </motion.div>
    </div>
  );
};
