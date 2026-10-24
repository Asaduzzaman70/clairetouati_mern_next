"use client";

import Hero from "@/components/page/Home/Hero";
import { CuriosityCarousel } from "@/components/page/Home/CuriosityCarousel";
import { Testimonials } from "@/components/page/Home/Testimonials";
import { TurrimCTA } from "@/components/shared/TurrimCTA";
import { PlayroomSection } from "@/components/shared/PlayroomSection";
import { TurrimInfoSection } from "@/components/page/Home/TurrimInfoSection";
import { useGetHomeCms } from "@/hooks/api/cms";
import { GlobalLoadingScreen } from "@/components/shared/GlobalLoadingScreen";
import { AnimatePresence } from "framer-motion";

export default function HomePage() {
  const { isLoading } = useGetHomeCms();

  if (!isLoading) {
    return (
      <AnimatePresence>
        <GlobalLoadingScreen />
      </AnimatePresence>
    );
  }

  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <CuriosityCarousel />
      <PlayroomSection />
      <TurrimInfoSection />
      <Testimonials />
      <TurrimCTA />
    </div>
  );
}
