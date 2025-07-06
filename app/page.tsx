"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LinkIcon,
  Zap,
  Sparkles,
  ArrowRight,
  Star,
  Globe,
  Palette,
  BarChart3,
  Shield,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Light mode gradients
  const lightGradients = [
    "linear-gradient(45deg, rgb(245, 243, 255), rgb(239, 246, 255), rgb(250, 245, 255))",
    "linear-gradient(45deg, rgb(239, 246, 255), rgb(250, 245, 255), rgb(245, 243, 255))",
    "linear-gradient(45deg, rgb(250, 245, 255), rgb(245, 243, 255), rgb(239, 246, 255))",
  ];

  // Dark mode gradients
  const darkGradients = [
    "linear-gradient(45deg, rgb(15, 23, 42), rgb(30, 27, 75), rgb(15, 23, 42))",
    "linear-gradient(45deg, rgb(30, 27, 75), rgb(15, 23, 42), rgb(30, 27, 75))",
    "linear-gradient(45deg, rgb(15, 23, 42), rgb(30, 27, 75), rgb(15, 23, 42))",
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background with animated gradient */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-violet-950 dark:to-blue-950"
          animate={{
            background: theme === "dark" ? darkGradients : lightGradients,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating orbs - adjusted for theme */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-violet-300/30 dark:bg-violet-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-300/30 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/2 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.main
        className="relative px-6 py-20 text-center max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/logo.svg"
              alt="Lynt Logo"
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </motion.div>
        </motion.div>
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-violet-200 dark:border-violet-800 rounded-full text-sm font-medium text-violet-700 dark:text-violet-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4" />
            Trusted by 10,000+ creators
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={itemVariants} className="space-y-6 mb-12">
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Digital
            </motion.span>
            <br />
            Identity{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              ✨
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create a stunning, personalized landing page that showcases all your
            links, content, and social media in one beautiful place.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0 shadow-xl px-8 py-4 text-lg"
              asChild
            >
              <Link href="/signup" className="flex items-center gap-2">
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-violet-200 dark:border-violet-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-8 py-4 text-lg"
              asChild
            >
              <Link href="/demo">View Demo</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            { number: "10K+", label: "Active Users" },
            { number: "1M+", label: "Links Created" },
            { number: "99.9%", label: "Uptime" },
            { number: "150+", label: "Countries" },
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-32"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            {
              icon: LinkIcon,
              title: "Unlimited Links",
              description:
                "Add as many links as you need. Social media, websites, portfolios - everything in one place.",
              color: "violet",
            },
            {
              icon: Palette,
              title: "Beautiful Themes",
              description:
                "Choose from stunning themes or customize your own. Make it uniquely yours.",
              color: "blue",
            },
            {
              icon: BarChart3,
              title: "Analytics & Insights",
              description:
                "Track clicks, views, and engagement with detailed analytics and insights.",
              color: "purple",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description:
                "Built with Next.js for blazing fast performance and SEO optimization.",
              color: "violet",
            },
            {
              icon: Shield,
              title: "Secure & Reliable",
              description:
                "Enterprise-grade security with 99.9% uptime guarantee.",
              color: "blue",
            },
            {
              icon: Globe,
              title: "Global CDN",
              description:
                "Fast loading times worldwide with our global content delivery network.",
              color: "purple",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:border-violet-300/50 dark:hover:border-violet-600/50 transition-all duration-300"
            >
              <motion.div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  feature.color === "violet"
                    ? "bg-gradient-to-r from-violet-500 to-violet-600"
                    : feature.color === "blue"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                    : "bg-gradient-to-r from-purple-500 to-purple-600"
                }`}
                whileHover={{ rotate: 5 }}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Loved by creators
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                text: "Lynt transformed how I share my content. The design is beautiful and it's so easy to use!",
                author: "Sarah Chen",
                role: "Content Creator",
                avatar: "SC",
              },
              {
                text: "Perfect for my business. Professional, fast, and the analytics help me understand my audience.",
                author: "Michael Rodriguez",
                role: "Entrepreneur",
                avatar: "MR",
              },
              {
                text: "The customization options are amazing. I can truly make it my own digital identity.",
                author: "Emma Thompson",
                role: "Designer",
                avatar: "ET",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-violet-300/50 dark:hover:border-violet-600/50 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-700 dark:to-purple-700 rounded-3xl p-12 md:p-16 text-white shadow-2xl border border-violet-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            Join thousands of creators who trust Lynt with their digital
            identity
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/95 dark:bg-gray-100 text-violet-600 dark:text-violet-700 hover:bg-white dark:hover:bg-white px-8 py-4 text-lg font-semibold shadow-lg"
              asChild
            >
              <Link href="/signup" className="flex items-center gap-2">
                Create Your Page Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </motion.main>
    </div>
  );
}
