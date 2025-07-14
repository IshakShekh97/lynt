// Re-export from new modular files
export { colorThemes, themeCategories } from "./color-themes";
export {
  backgroundAnimations,
  animationCategories,
  getAnimationStyle,
  getAnimationSize,
  getAnimationKeyframes,
  isComplexAnimation,
  getSecondaryAnimationStyle,
  getSecondaryAnimationSize,
  getSecondaryAnimationKeyframes,
} from "./animations";

export type { ColorTheme, ThemeMode, ThemeCategory } from "./color-themes";
export type { BackgroundAnimation, AnimationCategory } from "./animations";

// Backward compatibility exports
export { colorThemes as profileThemes } from "./color-themes";
export {
  getAnimationStyle as getPatternStyle,
  getAnimationSize as getPatternSize,
  getAnimationKeyframes as getPatternAnimation,
  isComplexAnimation as isComplexPattern,
  getSecondaryAnimationStyle as getSecondaryPatternStyle,
  getSecondaryAnimationSize as getSecondaryPatternSize,
  getSecondaryAnimationKeyframes as getSecondaryPatternAnimation,
} from "./animations";
export type { ColorTheme as ProfileTheme } from "./color-themes";

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
