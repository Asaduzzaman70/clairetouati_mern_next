"use client";

import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { LetterItem } from "./playroomData";
import { motion } from "framer-motion";

interface PlayroomWordCardProps {
  currentLetter: LetterItem;
}

export default function PlayroomWordCard({ currentLetter }: PlayroomWordCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeakWord = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentLetter.phoneticWord);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

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
    <motion.div
      key={currentLetter.letter}
      initial={{ opacity: 0.8, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-[#EAEAEA] rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-7 relative"
    >
      <div className="flex flex-col gap-1">
        {/* Label */}
        <span className="text-xs sm:text-sm text-gray-500 font-normal">
          Example word:
        </span>

        {/* Word and Sound Button Row */}
        <div className="flex items-center gap-4 mt-0.5">
          <div
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: currentLetter.colorHex }}
          >
            {currentLetter.exampleWordDisplay}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleSpeakWord}
            type="button"
            aria-label={`Pronounce example word ${currentLetter.exampleWord}`}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 flex items-center justify-center cursor-pointer transition-transform shadow-xs shrink-0"
          >
            <Volume2
              className={`w-4 h-4 text-neutral-800 ${
                isPlaying ? "animate-pulse text-neutral-900" : ""
              }`}
            />
          </motion.button>
        </div>

        {/* Translation / Subtitle */}
        <span className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
          {currentLetter.translation}
        </span>
      </div>
    </motion.div>
  );
}
