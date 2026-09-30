"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface LanguageToggleProps {
  variant?: "desktop" | "mobile" | "drawer";
  className?: string;
}

export default function LanguageToggle({
  variant = "desktop",
  className,
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  // Unique layoutId per variant to allow independent smooth animations
  const layoutId = `lang-bg-${variant}`;

  if (variant === "mobile") {
    return (
      <div
        className={cn(
          "flex items-center bg-secondary rounded-full p-0.5 gap-0.5 relative overflow-hidden notranslate",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-label="Switch to English"
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors relative z-10 cursor-pointer notranslate",
            isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          EN
          {isEnglish && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setLanguage("fr")}
          aria-label="Passer au Français"
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors relative z-10 cursor-pointer notranslate",
            !isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          FR
          {!isEnglish && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
      </div>
    );
  }

  if (variant === "drawer") {
    return (
      <div
        className={cn(
          "flex items-center bg-zinc-200 dark:bg-zinc-800 rounded-full p-1 gap-1 relative overflow-hidden notranslate",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-label="Switch to English"
          className={cn(
            "w-9 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors relative z-10 cursor-pointer notranslate",
            isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          EN
          {isEnglish && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setLanguage("fr")}
          aria-label="Passer au Français"
          className={cn(
            "w-9 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors relative z-10 cursor-pointer notranslate",
            !isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          FR
          {!isEnglish && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>
      </div>
    );
  }

  // Default "desktop" variant
  return (
    <div
      className={cn(
        "flex items-center bg-secondary rounded-full p-1 gap-1 ml-1 xl:ml-2 relative overflow-hidden notranslate",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-label="Switch to English"
        className={cn(
          "w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-sm xl:text-base font-medium transition-colors relative z-10 cursor-pointer notranslate",
          isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
        {isEnglish && (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 bg-[#1da824] rounded-full shadow-md -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("fr")}
        aria-label="Passer au Français"
        className={cn(
          "w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-sm xl:text-base font-medium transition-colors relative z-10 cursor-pointer notranslate",
          !isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
        )}
      >
        FR
        {!isEnglish && (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 bg-[#1da824] rounded-full shadow-md -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
      </button>
    </div>
  );
}
