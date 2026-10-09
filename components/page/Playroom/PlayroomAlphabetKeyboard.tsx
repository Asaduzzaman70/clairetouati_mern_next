"use client";

import React from "react";
import { motion } from "framer-motion";
import { LetterItem } from "./playroomData";
import { cn } from "@/lib/utils";

interface PlayroomAlphabetKeyboardProps {
  alphabetList: LetterItem[];
  selectedLetter: LetterItem;
  activeFilter: string;
  onSelectLetter: (letter: LetterItem) => void;
}

export default function PlayroomAlphabetKeyboard({
  alphabetList,
  selectedLetter,
  activeFilter,
  onSelectLetter,
}: PlayroomAlphabetKeyboardProps) {
  const renderKey = (item: LetterItem) => {
    const isSelected = selectedLetter.letter === item.letter;
    const isMatchFilter = activeFilter === "All" || item.colorCategory === activeFilter;

    return (
      <motion.button
        key={item.id || item.letter}
        whileHover={{ scale: isMatchFilter ? 1.08 : 1.02, y: -1 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => onSelectLetter(item)}
        type="button"
        aria-label={`Select letter ${item.letter}`}
        className={cn(
          "w-9 h-9 sm:w-10 sm:h-10 rounded-md font-bold text-sm sm:text-base flex items-center justify-center transition-all duration-200 cursor-pointer select-none shrink-0",
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
    <div className="w-full flex flex-wrap items-center justify-start gap-2 sm:gap-2.5 mt-3 sm:mt-4">
      {alphabetList.map(renderKey)}
    </div>
  );
}
