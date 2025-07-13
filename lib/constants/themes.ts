import {
  Skull,
  Flame,
  Zap,
  Snowflake,
  Crown,
  Sparkles,
  Sun,
  Moon,
  Star,
  Sword,
  Eye,
  Heart,
  Diamond,
  Target,
  Tornado,
  Waves,
} from "lucide-react";

export const brutalistColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-lime-500",
  "bg-sky-500",
];

export const profileThemes = [
  // DARK MODE THEMES (15 themes)
  {
    id: "brutal-red-dark",
    name: "💀 BRUTAL RED DEATH",
    mode: "dark",
    icon: Skull,
    primary: "from-red-600 to-red-800",
    secondary: "from-red-700 to-red-900",
    accent: "bg-red-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-red-500",
    pattern: "brutal-stripes-animated",
    description: "CLASSIC DESTRUCTION - DARK EDITION",
    category: "DARK",
  },
  {
    id: "toxic-green-dark",
    name: "🧪 TOXIC WASTE DARK",
    mode: "dark",
    icon: Flame,
    primary: "from-green-600 to-emerald-700",
    secondary: "from-green-700 to-emerald-800",
    accent: "bg-lime-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-green-500",
    pattern: "toxic-bubbles-animated",
    description: "TOXIC MAYHEM IN THE SHADOWS",
    category: "DARK",
  },
  {
    id: "electric-purple-dark",
    name: "⚡ ELECTRIC NIGHTMARE",
    mode: "dark",
    icon: Zap,
    primary: "from-purple-600 to-violet-700",
    secondary: "from-purple-700 to-violet-800",
    accent: "bg-cyan-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-purple-500",
    pattern: "electric-zigzag-animated",
    description: "ELECTRIC FURY FROM THE VOID",
    category: "DARK",
  },
  {
    id: "ocean-chaos-dark",
    name: "🌊 DEEP SEA CHAOS",
    mode: "dark",
    icon: Waves,
    primary: "from-blue-600 to-cyan-700",
    secondary: "from-blue-700 to-cyan-800",
    accent: "bg-yellow-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-blue-500",
    pattern: "wave-grid-animated",
    description: "LIQUID VIOLENCE IN DARKNESS",
    category: "DARK",
  },
  {
    id: "golden-mayhem-dark",
    name: "👑 GOLDEN SHADOW",
    mode: "dark",
    icon: Crown,
    primary: "from-yellow-600 to-amber-700",
    secondary: "from-yellow-700 to-amber-800",
    accent: "bg-yellow-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-yellow-500",
    pattern: "royal-diamonds-animated",
    description: "ROYAL DESTRUCTION IN THE DARK",
    category: "DARK",
  },
  {
    id: "void-black-dark",
    name: "🖤 ENDLESS VOID",
    mode: "dark",
    icon: Skull,
    primary: "from-gray-700 to-black",
    secondary: "from-gray-800 to-gray-900",
    accent: "bg-white",
    background: "bg-black",
    surface: "bg-gray-900",
    text: "text-white",
    textSecondary: "text-gray-400",
    border: "border-gray-600",
    pattern: "void-glitch-animated",
    description: "PURE DARKNESS INCARNATE",
    category: "DARK",
  },
  {
    id: "cyber-neon-dark",
    name: "🤖 CYBERPUNK DARK",
    mode: "dark",
    icon: Zap,
    primary: "from-cyan-600 to-purple-700",
    secondary: "from-cyan-700 to-purple-800",
    accent: "bg-lime-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-cyan-500",
    pattern: "cyber-matrix-animated",
    description: "DIGITAL DESTRUCTION IN THE MATRIX",
    category: "DARK",
  },
  {
    id: "sunset-rage-dark",
    name: "🌅 TWILIGHT TERROR",
    mode: "dark",
    icon: Flame,
    primary: "from-pink-600 to-orange-700",
    secondary: "from-pink-700 to-orange-800",
    accent: "bg-yellow-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-pink-500",
    pattern: "sunset-waves-animated",
    description: "SUNSET FURY IN THE ABYSS",
    category: "DARK",
  },
  {
    id: "blood-moon-dark",
    name: "🌙 BLOOD MOON RITUAL",
    mode: "dark",
    icon: Moon,
    primary: "from-red-800 to-purple-900",
    secondary: "from-red-900 to-purple-800",
    accent: "bg-red-300",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-red-700",
    pattern: "moon-phases-animated",
    description: "LUNAR BRUTALITY AT ITS PEAK",
    category: "DARK",
  },
  {
    id: "shadow-steel-dark",
    name: "⚔️ SHADOW STEEL",
    mode: "dark",
    icon: Sword,
    primary: "from-gray-600 to-slate-800",
    secondary: "from-gray-700 to-slate-900",
    accent: "bg-blue-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-gray-500",
    pattern: "steel-mesh-animated",
    description: "FORGED IN DARKNESS AND STEEL",
    category: "DARK",
  },
  {
    id: "cosmic-terror-dark",
    name: "🌌 COSMIC TERROR",
    mode: "dark",
    icon: Star,
    primary: "from-indigo-700 to-purple-800",
    secondary: "from-indigo-800 to-purple-900",
    accent: "bg-pink-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-indigo-500",
    pattern: "cosmic-stars-animated",
    description: "INFINITE CHAOS FROM THE COSMOS",
    category: "DARK",
  },
  {
    id: "neon-hazard-dark",
    name: "☢️ NEON HAZARD",
    mode: "dark",
    icon: Zap,
    primary: "from-lime-600 to-yellow-700",
    secondary: "from-lime-700 to-yellow-800",
    accent: "bg-black",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-lime-500",
    pattern: "hazard-stripes-animated",
    description: "RADIOACTIVE BRUTALITY UNLEASHED",
    category: "DARK",
  },
  {
    id: "crimson-edge-dark",
    name: "🗡️ CRIMSON EDGE",
    mode: "dark",
    icon: Target,
    primary: "from-red-700 to-black",
    secondary: "from-red-800 to-gray-900",
    accent: "bg-red-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-red-600",
    pattern: "blade-cuts-animated",
    description: "SHARP AS A BLADE, DARK AS NIGHT",
    category: "DARK",
  },
  {
    id: "phantom-violet-dark",
    name: "👻 PHANTOM VIOLET",
    mode: "dark",
    icon: Eye,
    primary: "from-violet-700 to-purple-800",
    secondary: "from-violet-800 to-purple-900",
    accent: "bg-white",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-violet-500",
    pattern: "phantom-mist-animated",
    description: "SPECTRAL BRUTALITY FROM BEYOND",
    category: "DARK",
  },
  {
    id: "obsidian-storm-dark",
    name: "🌪️ OBSIDIAN STORM",
    mode: "dark",
    icon: Tornado,
    primary: "from-slate-700 to-black",
    secondary: "from-slate-800 to-gray-900",
    accent: "bg-blue-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-slate-500",
    pattern: "storm-spiral-animated",
    description: "VOLCANIC GLASS MEETS TORNADO FURY",
    category: "DARK",
  },

  // LIGHT MODE THEMES (15 themes)
  {
    id: "brutal-red-light",
    name: "🔥 BRUTAL RED INFERNO",
    mode: "light",
    icon: Flame,
    primary: "from-red-400 to-red-600",
    secondary: "from-red-500 to-red-700",
    accent: "bg-red-600",
    background: "bg-red-50",
    surface: "bg-white",
    text: "text-red-900",
    textSecondary: "text-red-700",
    border: "border-red-300",
    pattern: "brutal-stripes-animated",
    description: "BLAZING DESTRUCTION IN DAYLIGHT",
    category: "LIGHT",
  },
  {
    id: "toxic-green-light",
    name: "🌿 TOXIC NEON LIGHT",
    mode: "light",
    icon: Sparkles,
    primary: "from-green-400 to-emerald-500",
    secondary: "from-green-500 to-emerald-600",
    accent: "bg-green-600",
    background: "bg-green-50",
    surface: "bg-white",
    text: "text-green-900",
    textSecondary: "text-green-700",
    border: "border-green-300",
    pattern: "toxic-bubbles-animated",
    description: "TOXIC ENERGY IN THE LIGHT",
    category: "LIGHT",
  },
  {
    id: "electric-purple-light",
    name: "⚡ ELECTRIC SUNSHINE",
    mode: "light",
    icon: Zap,
    primary: "from-purple-400 to-violet-500",
    secondary: "from-purple-500 to-violet-600",
    accent: "bg-purple-600",
    background: "bg-purple-50",
    surface: "bg-white",
    text: "text-purple-900",
    textSecondary: "text-purple-700",
    border: "border-purple-300",
    pattern: "electric-zigzag-animated",
    description: "ELECTRIC FURY IN BRIGHT LIGHT",
    category: "LIGHT",
  },
  {
    id: "ocean-chaos-light",
    name: "🌊 CRYSTAL OCEAN",
    mode: "light",
    icon: Waves,
    primary: "from-blue-400 to-cyan-500",
    secondary: "from-blue-500 to-cyan-600",
    accent: "bg-blue-600",
    background: "bg-blue-50",
    surface: "bg-white",
    text: "text-blue-900",
    textSecondary: "text-blue-700",
    border: "border-blue-300",
    pattern: "wave-grid-animated",
    description: "LIQUID VIOLENCE IN CRYSTAL CLEAR",
    category: "LIGHT",
  },
  {
    id: "golden-mayhem-light",
    name: "👑 GOLDEN DAYLIGHT",
    mode: "light",
    icon: Crown,
    primary: "from-yellow-400 to-amber-500",
    secondary: "from-yellow-500 to-amber-600",
    accent: "bg-yellow-600",
    background: "bg-yellow-50",
    surface: "bg-white",
    text: "text-yellow-900",
    textSecondary: "text-yellow-700",
    border: "border-yellow-300",
    pattern: "royal-diamonds-animated",
    description: "ROYAL DESTRUCTION IN GOLDEN LIGHT",
    category: "LIGHT",
  },
  {
    id: "void-light",
    name: "🤍 PURE LIGHT VOID",
    mode: "light",
    icon: Sun,
    primary: "from-gray-200 to-gray-400",
    secondary: "from-gray-300 to-gray-500",
    accent: "bg-gray-700",
    background: "bg-gray-50",
    surface: "bg-white",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    border: "border-gray-300",
    pattern: "void-glitch-animated",
    description: "MINIMALIST DESTRUCTION",
    category: "LIGHT",
  },
  {
    id: "cyber-neon-light",
    name: "🤖 CYBER BRIGHT",
    mode: "light",
    icon: Zap,
    primary: "from-cyan-400 to-purple-500",
    secondary: "from-cyan-500 to-purple-600",
    accent: "bg-cyan-600",
    background: "bg-cyan-50",
    surface: "bg-white",
    text: "text-cyan-900",
    textSecondary: "text-cyan-700",
    border: "border-cyan-300",
    pattern: "cyber-matrix-animated",
    description: "DIGITAL DESTRUCTION IN NEON LIGHT",
    category: "LIGHT",
  },
  {
    id: "sunset-rage-light",
    name: "🌅 DAWN DESTRUCTION",
    mode: "light",
    icon: Flame,
    primary: "from-pink-400 to-orange-500",
    secondary: "from-pink-500 to-orange-600",
    accent: "bg-pink-600",
    background: "bg-pink-50",
    surface: "bg-white",
    text: "text-pink-900",
    textSecondary: "text-pink-700",
    border: "border-pink-300",
    pattern: "sunset-waves-animated",
    description: "SUNRISE FURY IN FULL GLORY",
    category: "LIGHT",
  },
  {
    id: "mint-destruction-light",
    name: "🌿 MINT CHAOS LIGHT",
    mode: "light",
    icon: Sparkles,
    primary: "from-emerald-300 to-teal-400",
    secondary: "from-emerald-400 to-teal-500",
    accent: "bg-emerald-600",
    background: "bg-emerald-50",
    surface: "bg-white",
    text: "text-emerald-900",
    textSecondary: "text-emerald-700",
    border: "border-emerald-300",
    pattern: "toxic-bubbles-animated",
    description: "FRESH VIOLENCE IN DAYLIGHT",
    category: "LIGHT",
  },
  {
    id: "brutal-orange-light",
    name: "🔥 ORANGE INFERNO",
    mode: "light",
    icon: Flame,
    primary: "from-orange-400 to-red-500",
    secondary: "from-orange-500 to-red-600",
    accent: "bg-orange-600",
    background: "bg-orange-50",
    surface: "bg-white",
    text: "text-orange-900",
    textSecondary: "text-orange-700",
    border: "border-orange-300",
    pattern: "brutal-stripes-animated",
    description: "BLAZING CHAOS IN BRIGHT LIGHT",
    category: "LIGHT",
  },
  {
    id: "solar-flare-light",
    name: "☀️ SOLAR FLARE",
    mode: "light",
    icon: Sun,
    primary: "from-yellow-300 to-orange-400",
    secondary: "from-yellow-400 to-orange-500",
    accent: "bg-red-600",
    background: "bg-yellow-50",
    surface: "bg-white",
    text: "text-yellow-900",
    textSecondary: "text-yellow-700",
    border: "border-yellow-300",
    pattern: "solar-rays-animated",
    description: "NUCLEAR FUSION IN DAYLIGHT",
    category: "LIGHT",
  },
  {
    id: "crystal-blade-light",
    name: "💎 CRYSTAL BLADE",
    mode: "light",
    icon: Diamond,
    primary: "from-slate-300 to-blue-400",
    secondary: "from-slate-400 to-blue-500",
    accent: "bg-blue-600",
    background: "bg-slate-50",
    surface: "bg-white",
    text: "text-slate-900",
    textSecondary: "text-slate-700",
    border: "border-slate-300",
    pattern: "crystal-fractals-animated",
    description: "SHARP AS DIAMOND, CLEAR AS CRYSTAL",
    category: "LIGHT",
  },
  {
    id: "cherry-bomb-light",
    name: "🍒 CHERRY BOMB",
    mode: "light",
    icon: Heart,
    primary: "from-pink-300 to-red-400",
    secondary: "from-pink-400 to-red-500",
    accent: "bg-red-600",
    background: "bg-pink-50",
    surface: "bg-white",
    text: "text-pink-900",
    textSecondary: "text-pink-700",
    border: "border-pink-300",
    pattern: "cherry-burst-animated",
    description: "SWEET DESTRUCTION WITH A BANG",
    category: "LIGHT",
  },
  {
    id: "neon-lime-light",
    name: "🟢 NEON LIME ASSAULT",
    mode: "light",
    icon: Zap,
    primary: "from-lime-300 to-green-400",
    secondary: "from-lime-400 to-green-500",
    accent: "bg-black",
    background: "bg-lime-50",
    surface: "bg-white",
    text: "text-lime-900",
    textSecondary: "text-lime-700",
    border: "border-lime-300",
    pattern: "neon-pulse-animated",
    description: "ACIDIC BRIGHTNESS BURNS THE EYES",
    category: "LIGHT",
  },
  {
    id: "arctic-storm-light",
    name: "❄️ ARCTIC STORM",
    mode: "light",
    icon: Snowflake,
    primary: "from-blue-300 to-cyan-400",
    secondary: "from-blue-400 to-cyan-500",
    accent: "bg-blue-600",
    background: "bg-blue-50",
    surface: "bg-white",
    text: "text-blue-900",
    textSecondary: "text-blue-700",
    border: "border-blue-300",
    pattern: "ice-crystals-animated",
    description: "FROZEN FURY IN CRYSTALLINE FORM",
    category: "LIGHT",
  },
] as const;

export const getPatternStyle = (pattern: string): string => {
  switch (pattern) {
    case "brutal-stripes-animated":
      return `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)`;
    case "toxic-bubbles-animated":
      return `radial-gradient(circle, currentColor 3px, transparent 3px)`;
    case "electric-zigzag-animated":
      return `linear-gradient(135deg, currentColor 25%, transparent 25%, transparent 50%, currentColor 50%, currentColor 75%, transparent 75%)`;
    case "wave-grid-animated":
      return `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`;
    case "royal-diamonds-animated":
      return `linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%), linear-gradient(-45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%)`;
    case "void-glitch-animated":
      return `linear-gradient(90deg, currentColor 2px, transparent 2px), linear-gradient(currentColor 2px, transparent 2px)`;
    case "cyber-matrix-animated":
      return `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`;
    case "sunset-waves-animated":
      return `radial-gradient(ellipse at center, currentColor 1px, transparent 1px)`;
    case "moon-phases-animated":
      return `radial-gradient(circle at 25% 25%, currentColor 30%, transparent 30%), radial-gradient(circle at 75% 75%, currentColor 30%, transparent 30%)`;
    case "steel-mesh-animated":
      return `linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)`;
    case "cosmic-stars-animated":
      return `radial-gradient(circle at 20% 30%, currentColor 2px, transparent 2px), radial-gradient(circle at 80% 70%, currentColor 1px, transparent 1px)`;
    case "hazard-stripes-animated":
      return `repeating-linear-gradient(45deg, currentColor 0px, currentColor 10px, transparent 10px, transparent 20px)`;
    case "blade-cuts-animated":
      return `linear-gradient(30deg, currentColor 2px, transparent 2px), linear-gradient(-30deg, currentColor 2px, transparent 2px)`;
    case "phantom-mist-animated":
      return `radial-gradient(ellipse at center, currentColor 40%, transparent 40%)`;
    case "storm-spiral-animated":
      return `conic-gradient(from 0deg, currentColor 0deg, transparent 90deg, currentColor 180deg, transparent 270deg)`;
    case "solar-rays-animated":
      return `conic-gradient(from 0deg, currentColor 0deg, transparent 30deg, currentColor 60deg, transparent 90deg)`;
    case "crystal-fractals-animated":
      return `linear-gradient(60deg, currentColor 1px, transparent 1px), linear-gradient(-60deg, currentColor 1px, transparent 1px)`;
    case "cherry-burst-animated":
      return `radial-gradient(circle at 50% 50%, currentColor 5px, transparent 5px)`;
    case "neon-pulse-animated":
      return `linear-gradient(90deg, currentColor 50%, transparent 50%)`;
    case "ice-crystals-animated":
      return `linear-gradient(0deg, currentColor 1px, transparent 1px), linear-gradient(60deg, currentColor 1px, transparent 1px), linear-gradient(-60deg, currentColor 1px, transparent 1px)`;
    default:
      return `linear-gradient(90deg, transparent 50%, currentColor 50%)`;
  }
};

export const getPatternSize = (pattern: string): string => {
  switch (pattern) {
    case "brutal-stripes-animated":
      return "40px 40px";
    case "toxic-bubbles-animated":
      return "30px 30px";
    case "electric-zigzag-animated":
      return "50px 50px";
    case "wave-grid-animated":
      return "25px 25px";
    case "royal-diamonds-animated":
      return "60px 60px";
    case "void-glitch-animated":
      return "20px 20px";
    case "cyber-matrix-animated":
      return "30px 30px";
    case "sunset-waves-animated":
      return "50px 50px";
    case "moon-phases-animated":
      return "100px 100px";
    case "steel-mesh-animated":
      return "40px 40px";
    case "cosmic-stars-animated":
      return "80px 80px";
    case "hazard-stripes-animated":
      return "40px 40px";
    case "blade-cuts-animated":
      return "30px 30px";
    case "phantom-mist-animated":
      return "120px 120px";
    case "storm-spiral-animated":
      return "100px 100px";
    case "solar-rays-animated":
      return "80px 80px";
    case "crystal-fractals-animated":
      return "35px 35px";
    case "cherry-burst-animated":
      return "60px 60px";
    case "neon-pulse-animated":
      return "40px 40px";
    case "ice-crystals-animated":
      return "45px 45px";
    default:
      return "40px 40px";
  }
};

export const getPatternAnimation = (pattern: string): string => {
  switch (pattern) {
    case "brutal-stripes-animated":
      return "brutal-slide 3s linear infinite";
    case "toxic-bubbles-animated":
      return "toxic-float 4s ease-in-out infinite";
    case "electric-zigzag-animated":
      return "electric-pulse 2s ease-in-out infinite";
    case "wave-grid-animated":
      return "wave-flow 5s linear infinite";
    case "royal-diamonds-animated":
      return "royal-sparkle 3s ease-in-out infinite";
    case "void-glitch-animated":
      return "void-glitch 1s steps(10) infinite";
    case "cyber-matrix-animated":
      return "matrix-rain 2s linear infinite";
    case "sunset-waves-animated":
      return "sunset-ripple 6s ease-in-out infinite";
    case "moon-phases-animated":
      return "moon-cycle 8s ease-in-out infinite";
    case "steel-mesh-animated":
      return "steel-shift 4s linear infinite";
    case "cosmic-stars-animated":
      return "cosmic-twinkle 3s ease-in-out infinite";
    case "hazard-stripes-animated":
      return "hazard-warning 1.5s linear infinite";
    case "blade-cuts-animated":
      return "blade-slash 2s ease-in-out infinite";
    case "phantom-mist-animated":
      return "phantom-drift 7s ease-in-out infinite";
    case "storm-spiral-animated":
      return "storm-rotate 4s linear infinite";
    case "solar-rays-animated":
      return "solar-burst 3s ease-in-out infinite";
    case "crystal-fractals-animated":
      return "crystal-refract 5s ease-in-out infinite";
    case "cherry-burst-animated":
      return "cherry-pop 2s ease-in-out infinite";
    case "neon-pulse-animated":
      return "neon-strobe 1s ease-in-out infinite";
    case "ice-crystals-animated":
      return "ice-shimmer 4s ease-in-out infinite";
    default:
      return "none";
  }
};

export const isComplexPattern = (pattern: string): boolean => {
  const complexPatterns = [
    "cyber-matrix-animated",
    "cosmic-stars-animated",
    "phantom-mist-animated",
    "storm-spiral-animated",
    "royal-diamonds-animated",
    "crystal-fractals-animated",
  ];
  return complexPatterns.includes(pattern);
};

export const getSecondaryPatternStyle = (pattern: string): string => {
  switch (pattern) {
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

export const getSecondaryPatternSize = (pattern: string): string => {
  switch (pattern) {
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

export const getSecondaryPatternAnimation = (pattern: string): string => {
  switch (pattern) {
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

export type ProfileTheme = (typeof profileThemes)[number];
export type ThemeMode = "dark" | "light";
export type ThemeCategory = "DARK" | "LIGHT";
