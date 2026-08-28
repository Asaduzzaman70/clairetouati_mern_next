"use client";

import React from "react";
import { COLOR_FILTERS, ColorCategory } from "./playroomData";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlayroomColorFiltersProps {
  activeFilter: "All" | ColorCategory;
  onSelectFilter: (filterId: "All" | ColorCategory) => void;
}

export default function PlayroomColorFilters({
  activeFilter,
  onSelectFilter,
}: PlayroomColorFiltersProps) {
  return (
    <div className="w-full flex flex-col gap-2.5">
      <span className="text-xs sm:text-sm font-normal text-gray-700">
        Filter By Color
      </span>

      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {COLOR_FILTERS.map((filter) => {
          const isSelected = activeFilter === filter.id;

          if (filter.id === "All") {
            return (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => onSelectFilter("All")}
                className={cn(
                  "px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-2xs",
                  isSelected
                    ? "bg-[#222222] text-white border border-[#222222]"
                    : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                )}
              >
                {filter.label}
              </motion.button>
            );
          }

          return (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => onSelectFilter(filter.id as ColorCategory)}
              className={cn(
                "px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-2xs",
                isSelected
                  ? "ring-2 ring-neutral-900 ring-offset-2 scale-105"
                  : "hover:brightness-105"
              )}
              style={{
                backgroundColor: filter.colorHex,
                color: filter.textColor || "#FFFFFF",
              }}
            >
              {filter.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
