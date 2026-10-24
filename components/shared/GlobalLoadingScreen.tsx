"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

export interface GlobalLoadingScreenProps {
  message?: string;
  maxWaitMs?: number;
}

export function GlobalLoadingScreen({
  message = "Loading experience",
  maxWaitMs = 10000,
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

  // Keyframe timing loop (4.0s full cycle)
  // 0%   -> Perfectly assembled, natural rest position at (0, 0)
  // 25%  -> Smoothly floating apart in 3D
  // 45%  -> Hovering separated in 3D space
  // 68%  -> Snapping back into the unified Turrim cube with elastic feel
  // 82%  -> Solid unified cube resting
  // 90%  -> Gentle celebratory hop together
  // 100% -> Smooth landing back at (0, 0), completing seamless loop
  const duration = 4.0;
  const times = [0, 0.25, 0.45, 0.68, 0.82, 0.9, 1];

  const topVariants: Variants = {
    initial: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
    },
    animate: {
      y: [0, -28, -28, 0, 0, -6, 0],
      x: [0, 0, 0, 0, 0, 0, 0],
      scale: [1, 0.93, 0.93, 1.02, 1, 1.05, 1],
      opacity: [1, 0.82, 0.82, 1, 1, 1, 1],
      filter: [
        "drop-shadow(0px 0px 0px rgba(4,147,0,0))",
        "drop-shadow(0px -5px 10px rgba(4,147,0,0.45))",
        "drop-shadow(0px -5px 10px rgba(4,147,0,0.45))",
        "drop-shadow(0px -2px 4px rgba(4,147,0,0.25))",
        "drop-shadow(0px -2px 4px rgba(4,147,0,0.25))",
        "drop-shadow(0px -6px 12px rgba(4,147,0,0.5))",
        "drop-shadow(0px 0px 0px rgba(4,147,0,0))",
      ],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        times,
      },
    },
  };

  const leftVariants: Variants = {
    initial: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
    animate: {
      x: [0, -26, -26, 0, 0, -3, 0],
      y: [0, 20, 20, 0, 0, -4, 0],
      scale: [1, 0.93, 0.93, 1.02, 1, 1.05, 1],
      opacity: [1, 0.82, 0.82, 1, 1, 1, 1],
      filter: [
        "drop-shadow(0px 0px 0px rgba(255,154,21,0))",
        "drop-shadow(-5px 5px 10px rgba(255,154,21,0.45))",
        "drop-shadow(-5px 5px 10px rgba(255,154,21,0.45))",
        "drop-shadow(-2px 2px 4px rgba(255,154,21,0.25))",
        "drop-shadow(-2px 2px 4px rgba(255,154,21,0.25))",
        "drop-shadow(-6px 6px 12px rgba(255,154,21,0.5))",
        "drop-shadow(0px 0px 0px rgba(255,154,21,0))",
      ],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        times,
      },
    },
  };

  const rightVariants: Variants = {
    initial: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
    animate: {
      x: [0, 26, 26, 0, 0, 3, 0],
      y: [0, 20, 20, 0, 0, -4, 0],
      scale: [1, 0.93, 0.93, 1.02, 1, 1.05, 1],
      opacity: [1, 0.82, 0.82, 1, 1, 1, 1],
      filter: [
        "drop-shadow(0px 0px 0px rgba(255,236,0,0))",
        "drop-shadow(5px 5px 10px rgba(255,236,0,0.5))",
        "drop-shadow(5px 5px 10px rgba(255,236,0,0.5))",
        "drop-shadow(2px 2px 4px rgba(255,236,0,0.25))",
        "drop-shadow(2px 2px 4px rgba(255,236,0,0.25))",
        "drop-shadow(6px 6px 12px rgba(255,236,0,0.55))",
        "drop-shadow(0px 0px 0px rgba(255,236,0,0))",
      ],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        times,
      },
    },
  };

  return (
    <motion.div
      key="global-page-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-white dark:bg-black select-none"
      aria-label="Loading page content"
      role="status"
    >
      <div className="relative flex flex-col items-center gap-7 max-w-xs text-center px-4">
        {/* Ambient Gradient Glow Aura */}
        <motion.div
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-6 w-44 h-44 rounded-full bg-linear-to-tr from-[#ff9a15]/20 via-[#049300]/25 to-[#ffec00]/25 blur-3xl pointer-events-none"
        />

        {/* Isometric 3D Logo Container with Floating Bounce */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-4, 4, -4],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="turrim-isometric-logo"
              viewBox="0 0 455.762 474.089"
              className="w-full h-full overflow-visible"
            >
              {/* 1. Green Top Facet (HATCH-TOP) */}
              <motion.g
                id="c"
                variants={topVariants}
                initial="initial"
                animate="animate"
                style={{ transformOrigin: "227.88px 105px" }}
              >
                <path
                  d="M455.51,79.574l-227.63,131.42L.25,79.574,114.07,13.864c31.42-18.15,82.38-18.15,113.81,0,31.43,18.14,31.43,47.56,0,65.71h227.63Z"
                  fill="#049300"
                />
              </motion.g>

              {/* 2. Orange Left Facet (HATCH-LEFT) */}
              <motion.g
                id="b"
                variants={leftVariants}
                initial="initial"
                animate="animate"
                style={{ transformOrigin: "114px 250px" }}
              >
                <polygon
                  points="227.88 210.994 227.88 289.844 136.83 237.274 136.83 421.274 91.3 394.984 91.3 210.994 .25 158.424 .25 79.574 227.88 210.994"
                  fill="#ff9a15"
                />
              </motion.g>

              {/* 3. Yellow Right Facet (HATCH-RIGHT) */}
              <motion.g
                id="d"
                variants={rightVariants}
                initial="initial"
                animate="animate"
                style={{ transformOrigin: "341px 276px" }}
              >
                <polygon
                  points="455.51 79.574 455.51 342.414 227.88 473.844 227.88 210.994 341.7 250.424 455.51 79.574"
                  fill="#ffec00"
                />
              </motion.g>
            </svg>
          </motion.div>

          {/* Dynamic 3D Contact Shadow beneath the isometric emblem */}
          <motion.div
            animate={{
              scale: [0.75, 1.1, 0.75],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-3 bg-black/30 dark:bg-white/20 rounded-full blur-xs mt-1"
          />
        </div>

        {/* Minimalist Multi-color Gradient Progress Pulse */}
        <div className="w-36 h-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-full overflow-hidden p-0.5 shadow-inner">
          <motion.div
            className="h-full bg-linear-to-r from-[#ff9a15] via-[#049300] to-[#ffec00] rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Animated Message with Bouncing Dots */}
        <div className="flex items-center justify-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 tracking-wider uppercase">
          <span>{message}</span>
          <span className="inline-flex tracking-widest text-[#049300]">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            >
              .
            </motion.span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
