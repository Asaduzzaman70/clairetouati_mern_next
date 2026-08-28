"use client";

import React from "react";
import { motion } from "framer-motion";
import { ALPHABET_DATA, ColorCategory, LetterItem } from "./playroomData";
import { cn } from "@/lib/utils";

interface PlayroomAlphabetKeyboardProps {
  selectedLetter: LetterItem;
  activeFilter: "All" | ColorCategory;
  onSelectLetter: (letter: LetterItem) => void;
}

export default function PlayroomAlphabetKeyboard({
  selectedLetter,
  activeFilter,
  onSelectLetter,
}: PlayroomAlphabetKeyboardProps) {
  const row1 = ALPHABET_DATA.slice(0, 13); // A to M
  const row2 = ALPHABET_DATA.slice(13, 26); // N to Z

  const renderKey = (item: LetterItem) => {
    const isSelected = selectedLetter.letter === item.letter;
    const isMatchFilter = activeFilter === "All" || item.colorCategory === activeFilter;

    return (
      <motion.button
        key={item.letter}
        whileHover={{ scale: isMatchFilter ? 1.08 : 1.02, y: -1 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => onSelectLetter(item)}
        type="button"
        aria-label={`Select letter ${item.letter}`}
        className={cn(
          "w-full aspect-square max-w-8 sm:max-w-9 md:max-w-9.5 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm md:text-base flex items-center justify-center transition-all duration-200 cursor-pointer select-none",
          isSelected
            ? "ring-2 ring-neutral-900 ring-offset-1 sm:ring-offset-2 scale-105 shadow-md z-10"
            : "hover:shadow-xs",
          !isMatchFilter && "opacity-30 saturate-50 hover:opacity-70 hover:saturate-100"
        )}
        style={{
          backgroundColor: item.colorHex,
          color: item.badgeTextColor,
        }}
      >
        {item.letter}
      </motion.button>
    );
  };

  return (
    <div className="w-full flex flex-col gap-1.5 sm:gap-2.5 mt-3 sm:mt-4">
      {/* Row 1: A to M */}
      <div className="grid grid-cols-13 gap-1 sm:gap-1.5 w-full">
        {row1.map(renderKey)}
      </div>

      {/* Row 2: N to Z */}
      <div className="grid grid-cols-13 gap-1 sm:gap-1.5 w-full">
        {row2.map(renderKey)}
      </div>
    </div>
  );
}
