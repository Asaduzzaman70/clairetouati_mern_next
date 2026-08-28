"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PlayroomTipAndActionsProps {
  onRandom: () => void;
}

export default function PlayroomTipAndActions({ onRandom }: PlayroomTipAndActionsProps) {
  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 mt-2">
      {/* Random Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRandom}
        type="button"
        className="w-full bg-black hover:bg-neutral-900 active:bg-neutral-950 text-white font-medium py-3.5 sm:py-4 rounded-xl text-center shadow-sm cursor-pointer transition-all text-sm sm:text-base flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>Random</span>
      </motion.button>

      {/* Tip Banner */}
      <div className="w-full bg-[#FEFCE8] border border-[#FEF08A] rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-gray-800 shadow-2xs">
        <span className="font-bold text-gray-900">Tip: </span>
        <span className="text-gray-700">
          Slide the 3D letter to rotate it and explore all its sides!
        </span>
      </div>
    </div>
  );
}
