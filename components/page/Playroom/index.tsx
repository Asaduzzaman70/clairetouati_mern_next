"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  ALPHABET_DATA,
  ColorCategory,
  LetterItem,
} from "./playroomData";
const Playroom3DViewer = dynamic(() => import("./Playroom3DViewer"), {
  ssr: false,
});
import PlayroomAlphabetKeyboard from "./PlayroomAlphabetKeyboard";
import PlayroomLetterInfo from "./PlayroomLetterInfo";
import PlayroomWordCard from "./PlayroomWordCard";
import PlayroomColorFilters from "./PlayroomColorFilters";
import PlayroomTipAndActions from "./PlayroomTipAndActions";

export default function Playroom() {
  const [selectedLetter, setSelectedLetter] = useState<LetterItem>(ALPHABET_DATA[0]);
  const [activeFilter, setActiveFilter] = useState<"All" | ColorCategory>("All");

  const handleSelectLetter = useCallback((letter: LetterItem) => {
    setSelectedLetter(letter);
  }, []);

  const handleFilterChange = useCallback(
    (filterId: "All" | ColorCategory) => {
      setActiveFilter(filterId);
      if (filterId !== "All") {
        // If currently selected letter doesn't belong to selected filter,
        // automatically switch to the first matching letter
        if (selectedLetter.colorCategory !== filterId) {
          const firstMatch = ALPHABET_DATA.find(
            (item) => item.colorCategory === filterId
          );
          if (firstMatch) {
            setSelectedLetter(firstMatch);
          }
        }
      }
    },
    [selectedLetter.colorCategory]
  );

  const handleRandom = useCallback(() => {
    const candidates =
      activeFilter === "All"
        ? ALPHABET_DATA
        : ALPHABET_DATA.filter((item) => item.colorCategory === activeFilter);

    if (candidates.length === 0) return;

    if (candidates.length === 1) {
      setSelectedLetter(candidates[0]);
      return;
    }

    // Pick a different letter than current if possible
    const otherCandidates = candidates.filter(
      (c) => c.letter !== selectedLetter.letter
    );
    const pool = otherCandidates.length > 0 ? otherCandidates : candidates;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setSelectedLetter(pool[randomIndex]);
  }, [activeFilter, selectedLetter.letter]);

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-white py-8 sm:py-12 md:py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: 3D Model Display & Alphabet Keyboard */}
          <div className="flex flex-col items-center w-full mx-auto">
            {/* 3D Model Viewer Card */}
            <div className="w-full aspect-square bg-[#EFEFEF] rounded-3xl md:rounded-[2.5rem] relative overflow-hidden flex items-center justify-center shadow-xs">
              <Playroom3DViewer currentLetter={selectedLetter} />
            </div>

            {/* Alphabet Keyboard */}
            <PlayroomAlphabetKeyboard
              selectedLetter={selectedLetter}
              activeFilter={activeFilter}
              onSelectLetter={handleSelectLetter}
            />
          </div>

          {/* Right Column: Details, Word Example, Filter, Actions */}
          <div className="flex flex-col justify-center gap-6 sm:gap-7 w-full mx-auto lg:mx-0">
            {/* Header info (Square Letter Badge, Cases, Sound, Color name) */}
            <PlayroomLetterInfo currentLetter={selectedLetter} />

            {/* Example Word Card */}
            <PlayroomWordCard currentLetter={selectedLetter} />

            {/* Color Filter Pill Buttons */}
            <PlayroomColorFilters
              activeFilter={activeFilter}
              onSelectFilter={handleFilterChange}
            />

            {/* Random Button & Tip Callout */}
            <PlayroomTipAndActions onRandom={handleRandom} />
          </div>
        </div>
      </div>
    </section>
  );
}