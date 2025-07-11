"use client";

import { motion } from "framer-motion";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Github, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-gradient-to-t from-black via-gray-900 to-background text-white border-t-4 border-foreground relative overflow-hidden">
      {/* Brutal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, currentColor 1px, transparent 1px),
              linear-gradient(currentColor 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <ShakeElement intensity="medium" trigger="hover">
              <BrutalBox
                variant="destructive"
                className="inline-block p-4 transform -rotate-2"
              >
                <GlitchText
                  className="text-2xl font-black text-white tracking-wider"
                  intensity="high"
                  trigger="hover"
                >
                  💀 LYNTBRUTT 💀
                </GlitchText>
              </BrutalBox>
            </ShakeElement>

            <BrutalBox className="p-4 bg-gray-800 border-gray-600 transform rotate-1">
              <p className="text-sm font-bold tracking-wide uppercase">
                DESTROYING BORING LINKS
                <br />
                <span className="text-red-400">ONE PIXEL AT A TIME</span>
              </p>
            </BrutalBox>

            {/* Social Links Icons */}
            <div className="flex space-x-4">
              {[
                {
                  icon: Github,
                  label: "GITHUB",
                  href: "https://github.com/IshakShekh97",
                },
                {
                  icon: Twitter,
                  label: "TWITTER",
                  href: "https://x.com/Ishak_Shekh_",
                },
                {
                  icon: Mail,
                  label: "EMAIL",
                  href: "mailto:shekhishak90@gmail.com",
                },
              ].map((social, index) => (
                <ShakeElement key={index} intensity="low" trigger="hover">
                  <a
                    href={social.href}
                    target={social.label === "EMAIL" ? "_self" : "_blank"}
                    rel={social.label === "EMAIL" ? "" : "noopener noreferrer"}
                  >
                    <BrutalBox
                      variant={index === 1 ? "warning" : "default"}
                      className="p-3 cursor-pointer hover:scale-110 transition-transform duration-200"
                    >
                      <social.icon className="h-5 w-5" />
                    </BrutalBox>
                  </a>
                </ShakeElement>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6">
            <BrutalBox
              variant="warning"
              className="inline-block p-3 transform -rotate-1"
            >
              <GlitchText
                className="text-lg font-black text-black dark:text-white uppercase"
                intensity="medium"
                trigger="hover"
              >
                🔥 SOCIAL LINKS 🔥
              </GlitchText>
            </BrutalBox>

            <div className="space-y-3">
              {[
                {
                  label: "GITHUB",
                  href: "https://github.com/IshakShekh97",
                  icon: "🐙",
                },
                {
                  label: "INSTAGRAM",
                  href: "https://www.instagram.com/ishak_shekh_",
                  icon: "📸",
                },
                {
                  label: "TWITTER/X",
                  href: "https://x.com/Ishak_Shekh_",
                  icon: "🐦",
                },
                {
                  label: "EMAIL",
                  href: "mailto:shekhishak90@gmail.com",
                  icon: "📧",
                },
              ].map((link, index) => (
                <ShakeElement key={index} intensity="low" trigger="hover">
                  <a
                    href={link.href}
                    target={link.label === "EMAIL" ? "_self" : "_blank"}
                    rel={link.label === "EMAIL" ? "" : "noopener noreferrer"}
                  >
                    <BrutalBox className="block p-3 bg-gray-800 border-gray-600 hover:bg-gray-700 transition-colors duration-200">
                      <span className="font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                        <span>{link.icon}</span>
                        {link.label}
                      </span>
                    </BrutalBox>
                  </a>
                </ShakeElement>
              ))}
            </div>
          </div>

          {/* Creator Section */}
          <div className="space-y-6">
            <BrutalBox
              variant="destructive"
              className="inline-block p-3 transform rotate-1"
            >
              <GlitchText
                className="text-lg font-black text-white uppercase"
                intensity="medium"
                trigger="hover"
              >
                ⚡ CREATOR ⚡
              </GlitchText>
            </BrutalBox>

            <BrutalBox className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 transform -rotate-1">
              <div className="space-y-3">
                <GlitchText
                  className="text-xl font-black text-yellow-400"
                  intensity="low"
                  trigger="hover"
                >
                  @ISHAK SHEKH
                </GlitchText>
                <p className="text-sm font-bold tracking-wide">
                  FULL-STACK DEVELOPER
                  <br />
                  <span className="text-red-400">CHAOS ENGINEER</span>
                </p>
                <ShakeElement intensity="medium" trigger="hover">
                  <BrutalBox variant="warning" className="inline-block p-2">
                    <span className="text-xs font-black text-black dark:text-white tracking-wider">
                      💻 BUILDING THE FUTURE
                    </span>
                  </BrutalBox>
                </ShakeElement>
              </div>
            </BrutalBox>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 pt-8 border-t-2 border-gray-600"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <BrutalBox className="p-3 bg-black border-red-500 transform -rotate-1">
              <GlitchText
                className="text-sm font-bold tracking-wider"
                intensity="low"
                trigger="hover"
              >
                © {new Date().getFullYear()} LYNTBRUTT
              </GlitchText>
            </BrutalBox>

            <BrutalBox variant="destructive" className="p-3 transform rotate-1">
              <GlitchText
                className="text-sm font-black text-white tracking-wider uppercase"
                intensity="medium"
                trigger="hover"
              >
                BUILT WITH PURE CHAOS ENERGY
              </GlitchText>
            </BrutalBox>

            <ShakeElement intensity="high" trigger="hover">
              <BrutalBox variant="warning" className="p-3">
                <span className="text-sm font-black text-black dark:text-white tracking-wider uppercase">
                  ⚠️ HANDLE WITH CARE ⚠️
                </span>
              </BrutalBox>
            </ShakeElement>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
