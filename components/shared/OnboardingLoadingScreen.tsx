"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface OnboardingLoadingScreenProps {
  message?: string;
  maxWaitMs?: number;
  className?: string;
}

export function OnboardingLoadingScreen({
  message = "Loading experience",
  maxWaitMs = 10000,
  className = "",
}: OnboardingLoadingScreenProps) {
  const [timedOut, setTimedOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Safety fallback: Never trap the user on loader for more than maxWaitMs
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, maxWaitMs);
    return () => clearTimeout(timer);
  }, [maxWaitMs]);

  // Real-time chroma-key processor to render the black-background video seamlessly on white
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      if (video.readyState >= 2 && !video.paused) {
        const width = canvas.width;
        const height = canvas.height;

        ctx.drawImage(video, 0, 0, width, height);

        try {
          const imgData = ctx.getImageData(0, 0, width, height);
          const data = imgData.data;
          const len = data.length;

          // Seamless background removal for dark background
          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const maxVal = r > g ? (r > b ? r : b) : (g > b ? g : b);

            if (maxVal < 38) {
              data[i + 3] = 0;
            } else if (maxVal < 75) {
              data[i + 3] = Math.round(((maxVal - 38) / 37) * 255);
            }
          }

          ctx.putImageData(imgData, 0, 0);
        } catch {
          // If security or read fails, the drawImage remains visible
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    video.play().catch(() => {
      // Autoplay handled
    });

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (timedOut) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="onboarding-loading-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        className={`fixed inset-0 z-99999 flex flex-col items-center justify-center bg-white dark:bg-black select-none overflow-hidden ${className}`}
        style={{ zIndex: 99999 }}
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
            className="absolute -top-6 w-52 h-52 rounded-full bg-linear-to-tr from-[#ff9a15]/20 via-[#049300]/25 to-[#ffec00]/25 blur-3xl pointer-events-none"
          />

          {/* Hidden video source */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="sr-only"
          >
            <source src="/onboarding_loading_animation.mp4" type="video/mp4" />
            <source src="/onboarding_loading_animation.gif" type="video/mp4" />
          </video>

          {/* Canvas Rendering Transparent Animated Emblem */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [-3, 3, -3],
              }}
              transition={{
                scale: { duration: 0.4, ease: "easeOut" },
                opacity: { duration: 0.4, ease: "easeOut" },
                y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-64 sm:w-72 aspect-video flex items-center justify-center"
            >
              <canvas
                ref={canvasRef}
                width={320}
                height={180}
                className="w-full h-full object-contain pointer-events-none filter drop-shadow-sm"
              />
            </motion.div>

            {/* Dynamic Contact Shadow beneath the emblem */}
            <motion.div
              animate={{
                scale: [0.75, 1.1, 0.75],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-24 h-3 bg-black/15 dark:bg-white/20 rounded-full blur-xs -mt-1"
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
    </AnimatePresence>
  );
}

export default OnboardingLoadingScreen;
