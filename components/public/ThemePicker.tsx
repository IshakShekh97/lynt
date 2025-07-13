"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BrutalBox,
  GlitchText,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Check, X, Sun, Moon } from "lucide-react";
import { ProfileTheme } from "@/lib/constants/themes";

interface ThemePickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: number;
  onThemeSelect: (index: number) => Promise<void>;
  profileThemes: readonly ProfileTheme[];
  theme: ProfileTheme;
  isOwnProfile: boolean;
}

export function ThemePicker({
  isOpen,
  onClose,
  currentTheme,
  onThemeSelect,
  profileThemes,
  theme,
  isOwnProfile,
}: ThemePickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<"DARK" | "LIGHT">(
    "DARK"
  );

  const handleThemeSelect = async (index: number) => {
    await onThemeSelect(index);
    onClose();
  };

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
            className="fixed top-20 right-4 z-50 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
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
                      💀 BRUTAL THEME ARSENAL 💀
                    </GlitchText>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-sm font-bold ${theme.textSecondary}`}
                  >
                    Choose your weapon of mass attraction
                  </motion.p>
                </div>

                {/* Category Tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center gap-4 mb-6"
                >
                  {["DARK", "LIGHT"].map((category) => (
                    <ShakeElement
                      key={category}
                      intensity="medium"
                      trigger="hover"
                    >
                      <Button
                        onClick={() =>
                          setSelectedCategory(category as "DARK" | "LIGHT")
                        }
                        className={`font-black border-2 border-black transform hover:scale-105 transition-all ${
                          selectedCategory === category
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
                </motion.div>

                {/* Theme Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {profileThemes
                    .filter(
                      (themeOption) => themeOption.category === selectedCategory
                    )
                    .map((themeOption, index) => {
                      const globalIndex = profileThemes.findIndex(
                        (t) => t.id === themeOption.id
                      );
                      const IconComponent = themeOption.icon;

                      return (
                        <motion.div
                          key={themeOption.id}
                          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.5 + index * 0.05,
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div
                            onClick={() => handleThemeSelect(globalIndex)}
                            className={`cursor-pointer p-4 bg-gradient-to-br ${themeOption.primary} border-2 border-black transform hover:rotate-1 transition-all duration-200 ${
                              currentTheme === globalIndex
                                ? "ring-4 ring-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
                                : "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            } rounded-lg`}
                          >
                            <div className="text-center space-y-2">
                              <div className="flex justify-center mb-2">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div
                                className={`w-full h-8 bg-gradient-to-br ${themeOption.secondary} rounded border-2 border-white`}
                              ></div>
                              <div
                                className={`${themeOption.accent} text-white font-black text-xs px-2 py-1 rounded`}
                              >
                                SAMPLE
                              </div>
                              <div className="text-white font-black text-xs leading-tight">
                                {themeOption.name}
                              </div>
                              <div className="text-white/80 font-medium text-xs">
                                {themeOption.description}
                              </div>
                              {currentTheme === globalIndex && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="bg-green-500 text-black font-black text-xs px-2 py-1 rounded flex items-center justify-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  ACTIVE
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </motion.div>

                {/* Current Theme Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <BrutalBox
                    className={`p-4 ${theme.mode === "dark" ? "bg-gray-800" : "bg-gray-100"} border-2 ${theme.border}`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {theme.mode === "dark" ? (
                          <Moon className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Sun className="w-4 h-4 text-gray-600" />
                        )}
                        <span
                          className={`text-xs font-bold ${theme.mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {theme.mode.toUpperCase()} MODE
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-xs font-bold ${theme.mode === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      ACTIVE: {profileThemes[currentTheme].description}
                    </p>
                  </BrutalBox>
                </motion.div>

                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center"
                >
                  <ShakeElement intensity="medium" trigger="hover">
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      CLOSE ARSENAL
                    </Button>
                  </ShakeElement>
                </motion.div>
              </div>
            </BrutalBox>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
