"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/page/Home/Hero";
import { CuriosityCarousel } from "@/components/page/Home/CuriosityCarousel";
import { Testimonials } from "@/components/page/Home/Testimonials";
import { TurrimCTA } from "@/components/shared/TurrimCTA";
import { PlayroomSection } from "@/components/shared/PlayroomSection";
import { TurrimInfoSection } from "@/components/page/Home/TurrimInfoSection";
import { useGetHomeCms } from "@/hooks/api/cms";
import { GlobalLoadingScreen } from "@/components/shared/GlobalLoadingScreen";

export default function HomePage() {
  const { isLoading } = useGetHomeCms();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Ensure the loading animation runs for at least 4 seconds (full animation cycle)
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const showLoader = isLoading || !minTimeElapsed;

  if (showLoader) {
    return <GlobalLoadingScreen />;
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

