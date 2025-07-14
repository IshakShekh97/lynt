"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { colorThemes } from "@/lib/constants/color-themes";
import { backgroundAnimations } from "@/lib/constants/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Copy, Check } from "lucide-react";

interface ThemeShowcaseProps {
  onSelectTheme?: (themeId: string) => void;
}

export function ThemeShowcase({ onSelectTheme }: ThemeShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<"DARK" | "LIGHT">(
    "DARK"
  );
  const [copiedTheme, setCopiedTheme] = useState<string | null>(null);

  const filteredThemes = colorThemes.filter(
    (theme) => theme.category === selectedCategory
  );

  const copyThemeId = async (themeId: string) => {
    try {
      await navigator.clipboard.writeText(themeId);
      setCopiedTheme(themeId);
      setTimeout(() => setCopiedTheme(null), 2000);
    } catch (error) {
      console.error("Failed to copy theme ID:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black mb-4 text-gray-900 dark:text-white">
          💀 BRUTALIST THEME ARSENAL 💀
        </h1>
        <p className="text-lg font-bold text-gray-600 dark:text-gray-300">
          30 PREMIUM THEMES OF PURE DESTRUCTION
        </p>
      </div>

      {/* Category Toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Button
            onClick={() => setSelectedCategory("DARK")}
            variant={selectedCategory === "DARK" ? "default" : "ghost"}
            className={`flex items-center gap-2 font-black ${
              selectedCategory === "DARK"
                ? "bg-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Moon className="w-4 h-4" />
            DARK MODE ({colorThemes.filter((t) => t.category === "DARK").length}
            )
          </Button>
          <Button
            onClick={() => setSelectedCategory("LIGHT")}
            variant={selectedCategory === "LIGHT" ? "default" : "ghost"}
            className={`flex items-center gap-2 font-black ${
              selectedCategory === "LIGHT"
                ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Sun className="w-4 h-4" />
            LIGHT MODE (
            {colorThemes.filter((t) => t.category === "LIGHT").length})
          </Button>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme, index) => {
          const IconComponent = theme.icon;
          return (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card
                className={`border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-y-1 ${
                  theme.mode === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className={`text-lg font-black ${
                        theme.mode === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {theme.name}
                    </CardTitle>
                    <IconComponent
                      className={`w-6 h-6 ${
                        theme.mode === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    />
                  </div>
                  <Badge
                    variant={theme.mode === "dark" ? "secondary" : "default"}
                    className={`w-fit font-bold ${
                      theme.mode === "dark"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {theme.mode.toUpperCase()} MODE
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Theme Preview */}
                  <div
                    className={`h-24 rounded-lg border-2 border-black ${theme.background} relative overflow-hidden`}
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary.replace("from-", "").replace(" to-", ", ")})`,
                    }}
                  >
                    {/* Sample Elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`px-3 py-1 rounded border-2 border-black ${theme.accent} text-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                      >
                        SAMPLE
                      </div>
                    </div>
                  </div>

                  {/* Theme Description */}
                  <p
                    className={`text-xs font-semibold ${
                      theme.mode === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {theme.description}
                  </p>

                  {/* Theme Info */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        theme.mode === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      MODE: {theme.mode.toUpperCase()}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs font-bold ${
                        theme.mode === "dark"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {theme.mode.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyThemeId(theme.id)}
                      size="sm"
                      variant="outline"
                      className="flex-1 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {copiedTheme === theme.id ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          COPIED
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          COPY ID
                        </>
                      )}
                    </Button>

                    {onSelectTheme && (
                      <Button
                        onClick={() => onSelectTheme(theme.id)}
                        size="sm"
                        className={`flex-1 font-bold ${theme.accent} text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                      >
                        SELECT
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-12 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">
            💀 BRUTALIST STATISTICS 💀
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-red-600">
                {colorThemes.length}
              </div>
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">
                TOTAL THEMES
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600">
                {colorThemes.filter((t) => t.category === "DARK").length}
              </div>
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">
                DARK THEMES
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-600">
                {colorThemes.filter((t) => t.category === "LIGHT").length}
              </div>
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">
                LIGHT THEMES
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-600">
                {backgroundAnimations.length}
              </div>
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">
                ANIMATED PATTERNS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
