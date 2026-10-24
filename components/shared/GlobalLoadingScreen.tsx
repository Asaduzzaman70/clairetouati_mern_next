"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export interface GlobalLoadingScreenProps {
  message?: string;
  maxWaitMs?: number;
}

export function GlobalLoadingScreen({
  message = "Loading experience...",
  maxWaitMs = 5000,
}: GlobalLoadingScreenProps) {
  const [timedOut, setTimedOut] = useState(false);

  // Safety fallback: Never trap the user on loader for more than maxWaitMs
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, maxWaitMs);
    return () => clearTimeout(timer);
  }, [maxWaitMs]);

  if (timedOut) return null;

  return (
    <motion.div
      key="global-page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-md select-none"
      aria-label="Loading page content"
      role="status"
    >
      <div className="flex flex-col items-center gap-6 max-w-xs text-center px-4">
        {/* Logo with gentle pulse */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-28 h-10 flex items-center justify-center"
        >
          <Image
            src={logo}
            alt="Turrim"
            width={120}
            height={40}
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Playful Turrim Geometric Shapes Animation */}
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#FFCE00] shadow-sm"
          />
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-3.5 h-3.5 rounded-sm bg-[#047857] shadow-sm"
          />
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#EB5E28] shadow-sm"
          />
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -20, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="w-3.5 h-3.5 rounded-sm bg-[#0056B3] shadow-sm"
          />
        </div>

        {/* Subtle Progress Bar */}
        <div className="w-36 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-[#FFCE00] via-[#047857] to-[#EB5E28] rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Message */}
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
          {message}
        </p>
      </div>
    </motion.div>
  );
}
