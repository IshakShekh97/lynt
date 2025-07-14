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

      {/* Brutal spiky star */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 360, 0],
          scale: [1, 1.3, 1],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 0.3,
          },
        }}
        className="absolute top-1/8 left-3/4 w-8 h-8"
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          backgroundColor: "hsl(var(--primary))",
        }}
      />

      {/* Jagged brutal shape */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 180, 0],
          transition: {
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1.8,
          },
        }}
        className="absolute bottom-1/6 left-1/8 w-10 h-6 bg-accent"
        style={{
          clipPath:
            "polygon(0% 0%, 25% 100%, 50% 0%, 75% 100%, 100% 0%, 100% 60%, 0% 60%)",
        }}
      />

      {/* Brutal X mark */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [45, 135, 45],
          transition: {
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 2.8,
          },
        }}
        className="absolute top-3/5 right-1/8 w-8 h-8"
      >
        <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary transform -translate-y-1/2 rotate-45" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary transform -translate-y-1/2 -rotate-45" />
      </motion.div>

      {/* Chunky arrow */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          x: [-5, 5, -5],
          rotate: [0, 90, 0],
          transition: {
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 0.7,
          },
        }}
        className="absolute top-1/12 right-2/5 w-0 h-0"
        style={{
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "12px solid hsl(var(--primary))",
          filter: "drop-shadow(2px 2px 0px hsl(var(--foreground)))",
        }}
      />

      {/* Brutal zigzag */}
      <motion.div
        animate={{
          y: [-9, 9, -9],
          rotate: [0, 45, 0],
          transition: {
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1.6,
          },
        }}
        className="absolute bottom-2/5 right-3/5 w-12 h-4 bg-secondary"
        style={{
          clipPath:
            "polygon(0% 50%, 16% 0%, 33% 50%, 50% 0%, 66% 50%, 83% 0%, 100% 50%, 83% 100%, 66% 50%, 50% 100%, 33% 50%, 16% 100%)",
        }}
      />

      {/* Spiky diamond */}
      <motion.div
        animate={{
          y: [-7, 7, -7],
          rotate: [0, 90, 0],
          scale: [1, 1.2, 1],
          transition: {
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 3.2,
          },
        }}
        className="absolute top-4/5 right-1/4 w-6 h-6 bg-accent"
        style={{
          clipPath:
            "polygon(50% 0%, 70% 30%, 100% 50%, 70% 70%, 50% 100%, 30% 70%, 0% 50%, 30% 30%)",
        }}
      />

      {/* Brutal lightning bolt */}
      <motion.div
        animate={{
          y: [-11, 11, -11],
          rotate: [0, 15, 0],
          transition: {
            duration: 3.1,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 2.5,
          },
        }}
        className="absolute top-1/2 right-1/12 w-3 h-10 bg-primary"
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 30% 40%, 60% 40%, 0% 100%, 70% 60%, 40% 60%)",
        }}
      />

      {/* Chunky gear-like shape */}
      <motion.div
        animate={{
          rotate: [0, 360, 0],
          scale: [1, 1.1, 1],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear" as const,
          },
        }}
        className="absolute bottom-1/8 left-2/5 w-8 h-8 bg-secondary"
        style={{
          clipPath:
            "polygon(40% 0%, 60% 0%, 60% 20%, 80% 20%, 80% 40%, 100% 40%, 100% 60%, 80% 60%, 80% 80%, 60% 80%, 60% 100%, 40% 100%, 40% 80%, 20% 80%, 20% 60%, 0% 60%, 0% 40%, 20% 40%, 20% 20%, 40% 20%)",
        }}
      />

      {/* Brutal cross */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 45, 0],
          transition: {
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1.1,
          },
        }}
        className="absolute top-1/3 left-1/12 w-7 h-7"
      >
        <div className="absolute top-1/2 left-0 w-full h-2 bg-accent transform -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-2 h-full bg-accent transform -translate-x-1/2" />
      </motion.div>

      {/* Sharp triangle cluster */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [0, 120, 0],
          transition: {
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 0.9,
          },
        }}
        className="absolute bottom-3/5 left-3/5 w-10 h-8"
      >
        <div className="absolute top-0 left-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-primary transform -translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-secondary" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-accent" />
      </motion.div>

      {/* Brutal thick border square */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 90, 0],
          transition: {
            duration: 3.7,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 2.1,
          },
        }}
        className="absolute top-5/6 right-2/3 w-8 h-8 border-4 border-primary bg-transparent"
        style={{
          filter: "drop-shadow(3px 3px 0px hsl(var(--foreground)))",
        }}
      />
    </div>
  );
};
