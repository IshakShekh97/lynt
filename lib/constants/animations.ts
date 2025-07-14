import {
  Zap,
  Skull,
  Waves,
  Crown,
  Eye,
  Star,
  Snowflake,
  Target,
  Tornado,
  Heart,
  Diamond,
  Sparkles,
  Sun,
} from "lucide-react";

export const backgroundAnimations = [
  {
    id: "brutal-stripes-animated",
    name: "💥 BRUTAL STRIPES",
    icon: Target,
    description: "AGGRESSIVE DIAGONAL ASSAULT",
    patternStyle:
      "linear-gradient(45deg, transparent 40%, currentColor 40%, currentColor 60%, transparent 60%)",
    patternSize: "40px 40px",
    animation: "brutal-slide 3s linear infinite",
    category: "GEOMETRIC",
  },
  {
    id: "toxic-bubbles-animated",
    name: "🧪 TOXIC BUBBLES",
    icon: Sparkles,
    description: "POISONOUS FLOATING CHAOS",
    patternStyle:
      "radial-gradient(circle at 25% 25%, currentColor 20%, transparent 20%), radial-gradient(circle at 75% 75%, currentColor 15%, transparent 15%)",
    patternSize: "30px 30px",
    animation: "toxic-float 4s ease-in-out infinite",
    category: "ORGANIC",
  },
  {
    id: "electric-zigzag-animated",
    name: "⚡ ELECTRIC ZIGZAG",
    icon: Zap,
    description: "HIGH VOLTAGE MADNESS",
    patternStyle:
      "linear-gradient(90deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%)",
    patternSize: "50px 50px",
    animation: "electric-pulse 2s ease-in-out infinite",
    category: "ENERGY",
  },
  {
    id: "wave-grid-animated",
    name: "🌊 WAVE GRID",
    icon: Waves,
    description: "LIQUID DESTRUCTION PATTERN",
    patternStyle:
      "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
    patternSize: "25px 25px",
    animation: "wave-flow 5s linear infinite",
    category: "GEOMETRIC",
  },
  {
    id: "royal-diamonds-animated",
    name: "👑 ROYAL DIAMONDS",
    icon: Crown,
    description: "CRYSTALLINE MAJESTY",
    patternStyle:
      "linear-gradient(45deg, transparent 30%, currentColor 30%, currentColor 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, currentColor 30%, currentColor 70%, transparent 70%)",
    patternSize: "60px 60px",
    animation: "royal-sparkle 3s ease-in-out infinite",
    category: "LUXURY",
  },
  {
    id: "void-glitch-animated",
    name: "🖤 VOID GLITCH",
    icon: Skull,
    description: "DIGITAL CORRUPTION",
    patternStyle:
      "linear-gradient(90deg, transparent 50%, currentColor 50%), linear-gradient(0deg, transparent 80%, currentColor 80%)",
    patternSize: "20px 20px",
    animation: "void-glitch 1s steps(10) infinite",
    category: "TECH",
  },
  {
    id: "cyber-matrix-animated",
    name: "🤖 CYBER MATRIX",
    icon: Eye,
    description: "DIGITAL RAIN OF TERROR",
    patternStyle:
      "linear-gradient(180deg, transparent 85%, currentColor 85%), linear-gradient(90deg, transparent 95%, currentColor 95%)",
    patternSize: "30px 30px",
    animation: "matrix-rain 2s linear infinite",
    category: "TECH",
  },
  {
    id: "sunset-waves-animated",
    name: "🌅 SUNSET WAVES",
    icon: Sun,
    description: "APOCALYPTIC HORIZON",
    patternStyle:
      "radial-gradient(ellipse at center, currentColor 20%, transparent 20%)",
    patternSize: "50px 50px",
    animation: "sunset-ripple 6s ease-in-out infinite",
    category: "ORGANIC",
  },
  {
    id: "moon-phases-animated",
    name: "🌙 MOON PHASES",
    icon: Star,
    description: "LUNAR DESTRUCTION CYCLE",
    patternStyle:
      "radial-gradient(circle at 50% 50%, currentColor 30%, transparent 30%)",
    patternSize: "100px 100px",
    animation: "moon-cycle 8s ease-in-out infinite",
    category: "COSMIC",
  },
  {
    id: "steel-mesh-animated",
    name: "⚔️ STEEL MESH",
    icon: Target,
    description: "INDUSTRIAL BRUTALITY",
    patternStyle:
      "linear-gradient(90deg, currentColor 2px, transparent 2px), linear-gradient(currentColor 2px, transparent 2px)",
    patternSize: "40px 40px",
    animation: "steel-shift 4s linear infinite",
    category: "INDUSTRIAL",
  },
  {
    id: "cosmic-stars-animated",
    name: "🌌 COSMIC STARS",
    icon: Star,
    description: "INFINITE SPACE CHAOS",
    patternStyle:
      "radial-gradient(circle at 30% 20%, currentColor 2px, transparent 2px), radial-gradient(circle at 70% 80%, currentColor 1px, transparent 1px)",
    patternSize: "80px 80px",
    animation: "cosmic-twinkle 3s ease-in-out infinite",
    category: "COSMIC",
  },
  {
    id: "hazard-stripes-animated",
    name: "☢️ HAZARD STRIPES",
    icon: Zap,
    description: "RADIOACTIVE WARNING PATTERN",
    patternStyle:
      "linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%)",
    patternSize: "40px 40px",
    animation: "hazard-warning 1.5s linear infinite",
    category: "WARNING",
  },
  {
    id: "blade-cuts-animated",
    name: "🗡️ BLADE CUTS",
    icon: Target,
    description: "SLASHING DESTRUCTION",
    patternStyle:
      "linear-gradient(135deg, transparent 40%, currentColor 40%, currentColor 44%, transparent 44%)",
    patternSize: "30px 30px",
    animation: "blade-slash 2s ease-in-out infinite",
    category: "WEAPON",
  },
  {
    id: "phantom-mist-animated",
    name: "👻 PHANTOM MIST",
    icon: Eye,
    description: "SPECTRAL FOG OF DOOM",
    patternStyle:
      "radial-gradient(ellipse at 20% 30%, currentColor 30%, transparent 30%), radial-gradient(ellipse at 80% 70%, currentColor 25%, transparent 25%)",
    patternSize: "120px 120px",
    animation: "phantom-drift 7s ease-in-out infinite",
    category: "MYSTICAL",
  },
  {
    id: "storm-spiral-animated",
    name: "🌪️ STORM SPIRAL",
    icon: Tornado,
    description: "HURRICANE DESTRUCTION",
    patternStyle:
      "radial-gradient(circle at center, transparent 40%, currentColor 40%, currentColor 60%, transparent 60%)",
    patternSize: "100px 100px",
    animation: "storm-rotate 4s linear infinite",
    category: "WEATHER",
  },
  {
    id: "solar-rays-animated",
    name: "☀️ SOLAR RAYS",
    icon: Sun,
    description: "NUCLEAR FUSION BEAMS",
    patternStyle:
      "conic-gradient(from 0deg, transparent 70%, currentColor 70%)",
    patternSize: "80px 80px",
    animation: "solar-burst 3s ease-in-out infinite",
    category: "ENERGY",
  },
  {
    id: "crystal-fractals-animated",
    name: "💎 CRYSTAL FRACTALS",
    icon: Diamond,
    description: "GEOMETRIC CRYSTAL GROWTH",
    patternStyle:
      "linear-gradient(60deg, currentColor 50%, transparent 50%), linear-gradient(-60deg, currentColor 50%, transparent 50%)",
    patternSize: "35px 35px",
    animation: "crystal-refract 5s ease-in-out infinite",
    category: "LUXURY",
  },
  {
    id: "cherry-burst-animated",
    name: "🍒 CHERRY BURST",
    icon: Heart,
    description: "EXPLOSIVE SWEETNESS",
    patternStyle:
      "radial-gradient(circle at 25% 25%, currentColor 30%, transparent 30%), radial-gradient(circle at 75% 75%, currentColor 20%, transparent 20%)",
    patternSize: "60px 60px",
    animation: "cherry-pop 2s ease-in-out infinite",
    category: "ORGANIC",
  },
  {
    id: "neon-pulse-animated",
    name: "🟢 NEON PULSE",
    icon: Zap,
    description: "ELECTRIC HEARTBEAT",
    patternStyle:
      "linear-gradient(90deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%)",
    patternSize: "40px 40px",
    animation: "neon-strobe 1s ease-in-out infinite",
    category: "ENERGY",
  },
  {
    id: "ice-crystals-animated",
    name: "❄️ ICE CRYSTALS",
    icon: Snowflake,
    description: "FROZEN DESTRUCTION",
    patternStyle:
      "linear-gradient(30deg, currentColor 50%, transparent 50%), linear-gradient(-30deg, currentColor 50%, transparent 50%), linear-gradient(90deg, currentColor 50%, transparent 50%)",
    patternSize: "45px 45px",
    animation: "ice-shimmer 4s ease-in-out infinite",
    category: "WEATHER",
  },
] as const;

export const animationCategories = [
  "ALL",
  "GEOMETRIC",
  "ORGANIC",
  "ENERGY",
  "TECH",
  "COSMIC",
  "LUXURY",
  "INDUSTRIAL",
  "WARNING",
  "WEAPON",
  "MYSTICAL",
  "WEATHER",
] as const;

export const getAnimationStyle = (animationId: string): string => {
  const animation = backgroundAnimations.find(
    (anim) => anim.id === animationId
  );
  return (
    animation?.patternStyle ||
    `linear-gradient(90deg, transparent 50%, currentColor 50%)`
  );
};

export const getAnimationSize = (animationId: string): string => {
  const animation = backgroundAnimations.find(
    (anim) => anim.id === animationId
  );
  return animation?.patternSize || "40px 40px";
};

export const getAnimationKeyframes = (animationId: string): string => {
  const animation = backgroundAnimations.find(
    (anim) => anim.id === animationId
  );
  return animation?.animation || "none";
};

export const isComplexAnimation = (animationId: string): boolean => {
  const complexAnimations = [
    "cyber-matrix-animated",
    "cosmic-stars-animated",
    "phantom-mist-animated",
    "storm-spiral-animated",
    "royal-diamonds-animated",
    "crystal-fractals-animated",
  ];
  return complexAnimations.includes(animationId);
};

export const getSecondaryAnimationStyle = (animationId: string): string => {
  switch (animationId) {
    case "cyber-matrix-animated":
      return `radial-gradient(circle at 20% 20%, currentColor 1px, transparent 1px)`;
    case "cosmic-stars-animated":
      return `radial-gradient(circle at 60% 40%, currentColor 1px, transparent 1px)`;
    case "phantom-mist-animated":
      return `radial-gradient(ellipse at 80% 20%, currentColor 20%, transparent 20%)`;
    case "storm-spiral-animated":
      return `radial-gradient(circle at center, currentColor 1px, transparent 1px)`;
    case "royal-diamonds-animated":
      return `radial-gradient(circle at center, currentColor 2px, transparent 2px)`;
    case "crystal-fractals-animated":
      return `linear-gradient(120deg, currentColor 1px, transparent 1px)`;
    default:
      return `radial-gradient(circle, currentColor 1px, transparent 1px)`;
  }
};

export const getSecondaryAnimationSize = (animationId: string): string => {
  switch (animationId) {
    case "cyber-matrix-animated":
      return "15px 15px";
    case "cosmic-stars-animated":
      return "60px 60px";
    case "phantom-mist-animated":
      return "150px 150px";
    case "storm-spiral-animated":
      return "25px 25px";
    case "royal-diamonds-animated":
      return "40px 40px";
    case "crystal-fractals-animated":
      return "25px 25px";
    default:
      return "20px 20px";
  }
};

export const getSecondaryAnimationKeyframes = (animationId: string): string => {
  switch (animationId) {
    case "cyber-matrix-animated":
      return "matrix-code 3s linear infinite reverse";
    case "cosmic-stars-animated":
      return "star-pulse 4s ease-in-out infinite";
    case "phantom-mist-animated":
      return "mist-swirl 10s ease-in-out infinite";
    case "storm-spiral-animated":
      return "spiral-reverse 6s linear infinite reverse";
    case "royal-diamonds-animated":
      return "diamond-shine 2s ease-in-out infinite";
    case "crystal-fractals-animated":
      return "fractal-grow 6s ease-in-out infinite";
    default:
      return "none";
  }
};

export type BackgroundAnimation = (typeof backgroundAnimations)[number];
export type AnimationCategory = (typeof animationCategories)[number];
