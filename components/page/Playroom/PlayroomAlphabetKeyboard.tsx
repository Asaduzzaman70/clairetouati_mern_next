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
  const midPoint = Math.ceil(alphabetList.length / 2);
  const row1 = alphabetList.slice(0, midPoint);
  const row2 = alphabetList.slice(midPoint);

  const renderKey = (item: LetterItem) => {
    const isSelected = selectedLetter.letter === item.letter;
    const isMatchFilter = activeFilter === "All" || item.colorCategory === activeFilter;

    return (
      <motion.button
        key={item.letter || item.id}
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
      {/* Row 1 */}
      <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1 sm:gap-1.5 w-full">
        {row1.map(renderKey)}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1 sm:gap-1.5 w-full">
        {row2.map(renderKey)}
      </div>
    </div>
  );
}
