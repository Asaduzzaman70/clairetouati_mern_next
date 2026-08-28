"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { LetterItem } from "./playroomData";
import { motion } from "framer-motion";

interface PlayroomLetterInfoProps {
  currentLetter: LetterItem;
}

export default function PlayroomLetterInfo({ currentLetter }: PlayroomLetterInfoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeakLetter = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentLetter.phoneticLetter);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    // Prefer French voice if available or standard natural voice
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(
      (v) => v.lang.startsWith("fr") || v.lang.startsWith("en")
    );
    if (frVoice) utterance.voice = frVoice;

    setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
      {/* Big Color Letter Badge */}
      <motion.div
        key={currentLetter.letter}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 lg:w-28 lg:h-28 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
        style={{
          backgroundColor: currentLetter.colorHex,
          color: currentLetter.badgeTextColor,
        }}
      >
        <span className="text-4xl sm:text-5xl md:text-6xl font-bold select-none">
          {currentLetter.letter}
        </span>
      </motion.div>

      {/* Details (Capital, Minuscule, Audio, Color) */}
      <div className="flex flex-col justify-between self-stretch py-1">
        {/* Cases & Sound Button */}
        <div className="flex items-start gap-6 sm:gap-10">
          {/* Capital */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-semibold text-[#1F2937]">
              {currentLetter.letter}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 leading-tight mt-0.5 whitespace-nowrap">
              Capital<br className="sm:hidden" /> Letter
            </span>
          </div>

          {/* Minuscule / Tiny */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-semibold text-[#1F2937]">
              {currentLetter.lowercase}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 leading-tight mt-0.5">
              {currentLetter.lowercaseLabel || "minuscule"}
            </span>
          </div>

          {/* Sound button */}
          <div className="pt-0.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSpeakLetter}
              type="button"
              aria-label={`Pronounce letter ${currentLetter.letter}`}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EEEEEE] hover:bg-[#E2E2E2] text-neutral-800 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-neutral-900 animate-pulse" />
              ) : (
                <Volume2 className="w-5 h-5 text-neutral-800" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Color Label */}
        <div className="mt-3 text-sm sm:text-base font-normal text-gray-700">
          <span>Color : </span>
          <span
            className="font-medium capitalize"
            style={{ color: currentLetter.colorHex }}
          >
            {currentLetter.colorName}
          </span>
        </div>
      </div>
    </div>
  );
}
