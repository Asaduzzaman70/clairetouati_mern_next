"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { ColorFilterOption, LetterItem } from "./playroomData";
const Playroom3DViewer = dynamic(() => import("./Playroom3DViewer"), {
  ssr: false,
});
import PlayroomAlphabetKeyboard from "./PlayroomAlphabetKeyboard";
import PlayroomLetterInfo from "./PlayroomLetterInfo";
import PlayroomWordCard from "./PlayroomWordCard";
import PlayroomColorFilters from "./PlayroomColorFilters";
import PlayroomTipAndActions from "./PlayroomTipAndActions";
import PlayroomSkeleton from "./PlayroomSkeleton";
import { useGetProducts3D } from "@/hooks/api/products-3d";

export default function Playroom() {
  const { data: apiProducts, isLoading, isError, refetch } = useGetProducts3D();

  const alphabetList: LetterItem[] = useMemo(() => {
    return apiProducts || [];
  }, [apiProducts]);

  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Keep selectedLetter in sync with loaded dynamic API data
  useEffect(() => {
    if (alphabetList.length > 0) {
      setSelectedLetter((prev) => {
        if (!prev) return alphabetList[0];
        const match = alphabetList.find(
          (item) => item.letter === prev.letter || (item.id && item.id === prev.id)
        );
        return match || alphabetList[0];
      });
    } else {
      setSelectedLetter(null);
    }
  }, [alphabetList]);

  // Dynamically extract available color filters from live backend data
  const colorFilters = useMemo<ColorFilterOption[]>(() => {
    const filters: ColorFilterOption[] = [{ id: "All", label: "All" }];
    const colorMap = new Map<string, { colorHex: string; textColor: string }>();

    alphabetList.forEach((item) => {
      if (item.colorCategory && !colorMap.has(item.colorCategory)) {
        colorMap.set(item.colorCategory, {
          colorHex: item.colorHex,
          textColor: item.badgeTextColor || "#FFFFFF",
        });
      }
    });

    colorMap.forEach((meta, category) => {
      filters.push({
        id: category,
        label: category,
        colorHex: meta.colorHex,
        textColor: meta.textColor,
      });
    });

    return filters;
  }, [alphabetList]);

  const handleSelectLetter = useCallback((letter: LetterItem) => {
    setSelectedLetter(letter);
  }, []);

  const handleFilterChange = useCallback(
    (filterId: string) => {
      setActiveFilter(filterId);
      if (filterId !== "All") {
        if (selectedLetter && selectedLetter.colorCategory !== filterId) {
          const firstMatch = alphabetList.find(
            (item) => item.colorCategory === filterId
          );
          if (firstMatch) {
            setSelectedLetter(firstMatch);
          }
        }
      }
    },
    [alphabetList, selectedLetter]
  );

  const handleRandom = useCallback(() => {
    const candidates =
      activeFilter === "All"
        ? alphabetList
        : alphabetList.filter((item) => item.colorCategory === activeFilter);

    if (candidates.length === 0) return;

    if (candidates.length === 1) {
      setSelectedLetter(candidates[0]);
      return;
    }

    const otherCandidates = candidates.filter(
      (c) => c.letter !== selectedLetter?.letter
    );
    const pool = otherCandidates.length > 0 ? otherCandidates : candidates;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setSelectedLetter(pool[randomIndex]);
  }, [activeFilter, alphabetList, selectedLetter]);

  if (isLoading) {
    return <PlayroomSkeleton />;
  }

  if (isError) {
    return (
      <section className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-lg font-semibold text-red-500">Failed to load playroom products from server.</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Retry
        </button>
      </section>
    );
  }

  if (!alphabetList.length || !selectedLetter) {
    return (
      <section className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-lg font-medium text-gray-500">No 3D alphabet products available right now.</p>
      </section>
    );
  }

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
              alphabetList={alphabetList}
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
              filters={colorFilters}
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