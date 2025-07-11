"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AuthAnimatedBackgroundProps {
  className?: string;
}

export const AuthAnimatedBackground = ({
  className = "",
}: AuthAnimatedBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Brutal Moving Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, transparent 0%, currentColor 1%, transparent 2%)",
            "linear-gradient(135deg, transparent 0%, currentColor 1%, transparent 2%)",
            "linear-gradient(225deg, transparent 0%, currentColor 1%, transparent 2%)",
            "linear-gradient(315deg, transparent 0%, currentColor 1%, transparent 2%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Chaos Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {i % 4 === 0 && (
            <div className="w-4 h-4 bg-primary/20 border-2 border-primary/40 transform rotate-45" />
          )}
          {i % 4 === 1 && (
            <div className="w-5 h-5 bg-secondary/20 border-2 border-secondary/40 rounded-full" />
          )}
          {i % 4 === 2 && (
            <div className="w-6 h-3 bg-accent/20 border-2 border-accent/40 transform -skew-x-12" />
          )}
          {i % 4 === 3 && (
            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-primary/40" />
          )}
        </motion.div>
      ))}

      {/* Glitch Static Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        animate={{
          x: [-100, 100, -100],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Brutal Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              currentColor,
              currentColor 1px,
              transparent 1px,
              transparent 20px
            ),
            repeating-linear-gradient(
              90deg,
              currentColor,
              currentColor 1px,
              transparent 1px,
              transparent 20px
            )
          `,
        }}
        animate={{
          backgroundPosition: ["0px 0px", "20px 20px", "0px 0px"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Chaotic Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
