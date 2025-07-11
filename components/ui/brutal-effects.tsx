"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  trigger?: "hover" | "always" | "click";
}

export const GlitchText = ({
  children,
  className = "",
  intensity = "medium",
  trigger = "hover",
}: GlitchTextProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getGlitchAnimation = () => {
    const baseX = intensity === "high" ? 3 : intensity === "medium" ? 2 : 1;
    const baseY = intensity === "high" ? 2 : intensity === "medium" ? 1 : 0.5;

    return {
      x: [-baseX, baseX, 0],
      y: [-baseY, baseY, 0],
      scale: [1, 1.01, 1],
      transition: {
        duration: 0.3,
      },
    };
  };

  // Don't animate until hydrated to prevent SSR issues
  if (!isMounted) {
    return (
      <div
        className={`relative inline-block ${className}`}
        style={{
          textShadow: `
            2px 0 #ff0000,
            -2px 0 #00ffff,
            0 2px #ffff00,
            0 -2px #ff00ff
          `,
        }}
      >
        {children}
      </div>
    );
  }

  const triggerProps =
    trigger === "hover"
      ? { whileHover: getGlitchAnimation() }
      : trigger === "click"
      ? { whileTap: getGlitchAnimation() }
      : { animate: getGlitchAnimation() };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ x: 0, y: 0, scale: 1 }}
      {...triggerProps}
      style={{
        textShadow: `
          2px 0 #ff0000,
          -2px 0 #00ffff,
          0 2px #ffff00,
          0 -2px #ff00ff
        `,
      }}
    >
      {children}

      {/* Glitch overlay layers */}
      <motion.div
        className={`absolute inset-0 text-red-500 opacity-20 mix-blend-multiply dark:mix-blend-screen ${className}`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
        }}
        animate={
          trigger === "always"
            ? {
                x: [-1, 1, 0],
                transition: {
                  duration: 0.1,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                },
              }
            : {}
        }
      >
        {children}
      </motion.div>

      <motion.div
        className={`absolute inset-0 text-cyan-500 opacity-20 mix-blend-multiply dark:mix-blend-screen ${className}`}
        style={{
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
        }}
        animate={
          trigger === "always"
            ? {
                x: [1, -1, 0],
                transition: {
                  duration: 0.1,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                  delay: 0.05,
                },
              }
            : {}
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

interface BrutalBoxProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "warning" | "success";
  glitchOnHover?: boolean;
}

export const BrutalBox = ({
  children,
  className = "",
  variant = "default",
  glitchOnHover = true,
}: BrutalBoxProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const variantStyles = {
    default: "bg-background border-foreground text-foreground",
    destructive: "bg-red-500 border-red-800 text-white",
    warning: "bg-yellow-400 border-yellow-800 text-black",
    success: "bg-green-500 border-green-800 text-white",
  };

  // Don't animate until hydrated
  if (!isMounted) {
    return (
      <div
        className={`border-4 ${variantStyles[variant]} ${className}`}
        style={{
          boxShadow: "4px 4px 0px 0px currentColor",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`border-4 ${variantStyles[variant]} ${className}`}
      initial={{
        boxShadow: "4px 4px 0px 0px currentColor",
        scale: 1,
        rotate: 0,
      }}
      whileHover={
        glitchOnHover
          ? {
              boxShadow: "8px 8px 0px 0px currentColor",
              scale: 1.02,
              rotate: [0, 1, -1, 0],
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
};

interface ShakeElementProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  trigger?: "hover" | "always";
}

export const ShakeElement = ({
  children,
  className = "",
  intensity = "medium",
  trigger = "hover",
}: ShakeElementProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getShakeAnimation = () => {
    const baseX = intensity === "high" ? 4 : intensity === "medium" ? 2 : 1;
    const baseY = intensity === "high" ? 2 : intensity === "medium" ? 1 : 0.5;

    return {
      x: [-baseX, baseX, -baseX / 2, baseX / 2, 0],
      y: [-baseY, baseY, -baseY / 2, baseY / 2, 0],
      transition: {
        duration: 0.4,
      },
    };
  };

  // Don't animate until hydrated to prevent SSR issues
  if (!isMounted) {
    return (
      <div className={className} style={{ display: "inline-block" }}>
        {children}
      </div>
    );
  }

  const triggerProps =
    trigger === "hover"
      ? { whileHover: getShakeAnimation() }
      : { animate: getShakeAnimation() };

  return (
    <motion.div
      className={className}
      initial={{ x: 0, y: 0 }}
      {...triggerProps}
      style={{
        display: "inline-block",
      }}
    >
      {children}
    </motion.div>
  );
};
