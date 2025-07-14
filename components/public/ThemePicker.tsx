"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Check, X, Sun, Moon, Palette, Zap, Save } from "lucide-react";
import { colorThemes, type ColorTheme } from "@/lib/constants/color-themes";
import {
  backgroundAnimations,
  animationCategories,
  getAnimationStyle,
  getAnimationSize,
  getAnimationKeyframes,
} from "@/lib/constants/animations";

interface ThemePickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentColorTheme?: string;
  currentBackgroundAnimation?: string;
  onThemeAndAnimationSelect: (
    colorThemeId: string,
    backgroundAnimationId?: string
  ) => Promise<void>;
  theme: ColorTheme;
  isOwnProfile: boolean;
}

export function ThemePicker({
  isOpen,
  onClose,
  currentColorTheme,
  currentBackgroundAnimation,
  onThemeAndAnimationSelect,
  theme,
  isOwnProfile,
}: ThemePickerProps) {
  const [selectedColorCategory, setSelectedColorCategory] = useState<
    "DARK" | "LIGHT"
  >("DARK");
  const [selectedAnimationCategory, setSelectedAnimationCategory] =
    useState<string>("ALL");
  const [selectedColorTheme, setSelectedColorTheme] = useState<string>(
    currentColorTheme || ""
  );
  const [selectedBackgroundAnimation, setSelectedBackgroundAnimation] =
    useState<string>(currentBackgroundAnimation || "");
  const [previewMode, setPreviewMode] = useState<"color" | "animation">(
    "color"
  );

  const handleSave = async () => {
    if (selectedColorTheme) {
      await onThemeAndAnimationSelect(
        selectedColorTheme,
        selectedBackgroundAnimation
      );
      onClose();
    }
  };

  const filteredAnimations =
    selectedAnimationCategory === "ALL"
      ? backgroundAnimations
      : backgroundAnimations.filter(
          (anim) => anim.category === selectedAnimationCategory
        );

  return (
    <AnimatePresence>
      {isOpen && isOwnProfile && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-45"
            onClick={onClose}
          />

          {/* Theme Picker Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 right-4 z-50 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            <BrutalBox
              className={`p-6 ${theme.surface} ${theme.border} border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <GlitchText
                      className={`text-2xl font-black ${theme.text}`}
                      intensity="medium"
                    >
                      💀 BRUTAL THEME CUSTOMIZER 💀
                    </GlitchText>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-sm font-bold ${theme.textSecondary}`}
                  >
                    Mix and match colors with brutal animations
                  </motion.p>
                </div>

                {/* Preview Mode Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center gap-4"
                >
                  {[
                    {
                      mode: "color" as const,
                      label: "COLOR PREVIEW",
                      icon: Palette,
                    },
                    {
                      mode: "animation" as const,
                      label: "ANIMATION PREVIEW",
                      icon: Zap,
                    },
                  ].map(({ mode, label, icon: Icon }) => (
                    <ShakeElement key={mode} intensity="medium" trigger="hover">
                      <Button
                        onClick={() => setPreviewMode(mode)}
                        className={`font-black border-2 border-black transform hover:scale-105 transition-all ${
                          previewMode === mode
                            ? "bg-red-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {label}
                      </Button>
                    </ShakeElement>
                  ))}
                </motion.div>

                {/* Color Theme Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <GlitchText
                      className={`text-xl font-black ${theme.text}`}
                      intensity="low"
                    >
                      🎨 COLOR SCHEMES OF DESTRUCTION
                    </GlitchText>
                  </div>

                  {/* Color Category Tabs */}
                  <div className="flex justify-center gap-4">
                    {["DARK", "LIGHT"].map((category) => (
                      <ShakeElement
                        key={category}
                        intensity="medium"
                        trigger="hover"
                      >
                        <Button
                          onClick={() =>
                            setSelectedColorCategory(
                              category as "DARK" | "LIGHT"
                            )
                          }
                          className={`font-black border-2 border-black transform hover:scale-105 transition-all ${
                            selectedColorCategory === category
                              ? `${category === "DARK" ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                              : "bg-gray-500 text-white hover:bg-gray-600"
                          }`}
                        >
                          {category === "DARK" ? (
                            <Moon className="w-4 h-4 mr-2" />
                          ) : (
                            <Sun className="w-4 h-4 mr-2" />
                          )}
                          {category} MODE
                        </Button>
                      </ShakeElement>
                    ))}
                  </div>

                  {/* Color Theme Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {colorThemes
                      .filter(
                        (colorTheme) =>
                          colorTheme.category === selectedColorCategory
                      )
                      .map((colorTheme, index) => {
                        const IconComponent = colorTheme.icon;
                        const isSelected = selectedColorTheme === colorTheme.id;

                        return (
                          <motion.div
                            key={colorTheme.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.02 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div
                              onClick={() =>
                                setSelectedColorTheme(colorTheme.id)
                              }
                              className={`cursor-pointer p-3 bg-gradient-to-br ${colorTheme.primary} border-2 border-black transform hover:rotate-1 transition-all duration-200 ${
                                isSelected
                                  ? "ring-4 ring-yellow-400 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
                                  : "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                              } rounded-lg`}
                            >
                              <div className="text-center space-y-2">
                                <div className="flex justify-center">
                                  <IconComponent className="w-4 h-4 text-white" />
                                </div>
                                {previewMode === "color" && (
                                  <>
                                    <div
                                      className={`w-full h-6 bg-gradient-to-br ${colorTheme.secondary} rounded border border-white`}
                                    ></div>
                                    <div
                                      className={`${colorTheme.accent} text-white font-black text-xs px-2 py-1 rounded`}
                                    >
                                      COLOR
                                    </div>
                                  </>
                                )}
                                {previewMode === "animation" &&
                                  selectedBackgroundAnimation && (
                                    <div
                                      className="w-full h-8 rounded border border-white overflow-hidden relative"
                                      style={{
                                        background:
                                          colorTheme.mode === "dark"
                                            ? "#1f2937"
                                            : "#f9fafb",
                                      }}
                                    >
                                      <div
                                        className="absolute inset-0 opacity-40"
                                        style={{
                                          backgroundImage: getAnimationStyle(
                                            selectedBackgroundAnimation
                                          ),
                                          backgroundSize: getAnimationSize(
                                            selectedBackgroundAnimation
                                          ),
                                          animation: getAnimationKeyframes(
                                            selectedBackgroundAnimation
                                          ),
                                          color:
                                            colorTheme.mode === "dark"
                                              ? "#ffffff"
                                              : "#000000",
                                        }}
                                      />
                                    </div>
                                  )}
                                <div className="text-white font-black text-xs leading-tight">
                                  {colorTheme.name.slice(0, 15)}...
                                </div>
                                {isSelected && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-500 text-black font-black text-xs px-2 py-1 rounded flex items-center justify-center gap-1"
                                  >
                                    <Check className="w-3 h-3" />
                                    SELECTED
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </motion.div>

                {/* Background Animation Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <GlitchText
                      className={`text-xl font-black ${theme.text}`}
                      intensity="low"
                    >
                      💥 BACKGROUND ANIMATIONS OF CHAOS
                    </GlitchText>
                  </div>

                  {/* Animation Category Tabs */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {animationCategories.map((category) => (
                      <ShakeElement
                        key={category}
                        intensity="low"
                        trigger="hover"
                      >
                        <Button
                          size="sm"
                          onClick={() => setSelectedAnimationCategory(category)}
                          className={`font-black border border-black text-xs transform hover:scale-105 transition-all ${
                            selectedAnimationCategory === category
                              ? "bg-purple-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                              : "bg-gray-400 text-black hover:bg-gray-500"
                          }`}
                        >
                          {category}
                        </Button>
                      </ShakeElement>
                    ))}
                  </div>

                  {/* Animation Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filteredAnimations.map((animation, index) => {
                      const IconComponent = animation.icon;
                      const isSelected =
                        selectedBackgroundAnimation === animation.id;

                      return (
                        <motion.div
                          key={animation.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.02 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div
                            onClick={() =>
                              setSelectedBackgroundAnimation(animation.id)
                            }
                            className={`cursor-pointer p-2 bg-gray-800 border-2 border-black transform hover:rotate-1 transition-all duration-200 ${
                              isSelected
                                ? "ring-4 ring-yellow-400 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                                : "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            } rounded-lg relative overflow-hidden`}
                          >
                            <div className="text-center space-y-2 relative z-10">
                              <div className="flex justify-center">
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              {previewMode === "animation" && (
                                <div
                                  className="w-full h-8 rounded border border-white relative overflow-hidden"
                                  style={{ background: "#374151" }}
                                >
                                  <div
                                    className="absolute inset-0 opacity-60"
                                    style={{
                                      backgroundImage: animation.patternStyle,
                                      backgroundSize: animation.patternSize,
                                      animation: animation.animation,
                                      color: "#ffffff",
                                    }}
                                  />
                                </div>
                              )}
                              {previewMode === "color" &&
                                selectedColorTheme && (
                                  <div
                                    className={`w-full h-6 bg-gradient-to-br ${
                                      colorThemes.find(
                                        (ct) => ct.id === selectedColorTheme
                                      )?.primary || "from-gray-500 to-gray-700"
                                    } rounded border border-white`}
                                  ></div>
                                )}
                              <div className="text-white font-black text-xs leading-tight">
                                {animation.name.slice(0, 12)}...
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="bg-green-500 text-black font-black text-xs px-1 py-1 rounded flex items-center justify-center gap-1"
                                >
                                  <Check className="w-2 h-2" />
                                  ON
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center gap-4"
                >
                  <ShakeElement intensity="medium" trigger="hover">
                    <Button
                      onClick={handleSave}
                      disabled={!selectedColorTheme}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      SAVE & APPLY BRUTALITY
                    </Button>
                  </ShakeElement>

                  <ShakeElement intensity="medium" trigger="hover">
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 hover:-rotate-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      CANCEL CHAOS
                    </Button>
                  </ShakeElement>
                </motion.div>

                {/* Current Selection Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-center"
                >
                  <BrutalBox
                    className={`p-3 ${theme.mode === "dark" ? "bg-gray-800" : "bg-gray-100"} border-2 ${theme.border}`}
                  >
                    <div className="space-y-2">
                      <p
                        className={`text-xs font-bold ${theme.mode === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        🎨 SELECTED COLOR:{" "}
                        {selectedColorTheme
                          ? colorThemes.find(
                              (ct) => ct.id === selectedColorTheme
                            )?.name || "NONE"
                          : "NONE SELECTED"}
                      </p>
                      <p
                        className={`text-xs font-bold ${theme.mode === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        💥 SELECTED ANIMATION:{" "}
                        {selectedBackgroundAnimation
                          ? backgroundAnimations.find(
                              (ba) => ba.id === selectedBackgroundAnimation
                            )?.name || "NONE"
                          : "RANDOM WILL BE CHOSEN"}
                      </p>
                    </div>
                  </BrutalBox>
                </motion.div>
              </div>
            </BrutalBox>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
