"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-background border-t">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-lg font-black">LYNTBRUTT.</span>
          </motion.div>

          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-lg font-black">@Ishak Shekh</span>
          </motion.div>

          <motion.div
            className="text-sm text-muted-foreground"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            © {new Date().getFullYear()} LYNTBRUTT. Built with pure brutalist
            energy.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
