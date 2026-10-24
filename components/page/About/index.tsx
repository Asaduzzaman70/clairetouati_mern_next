"use client";

import { useState, useEffect } from "react";
import { AboutSection } from "@/components/page/About/AboutSection";
import { BioTextSection } from "@/components/page/About/BioTextSection";
import { ArchitectureABCSection } from "@/components/page/About/ArchitectureABCSection";
import { ScienceOfPlaySection } from "@/components/page/About/ScienceOfPlaySection";
import { FoundersLetterSection } from "@/components/page/About/FoundersLetterSection";
import { LearningHumanSection } from "@/components/page/About/LearningHumanSection";
import { OurValuesSection } from "@/components/page/About/OurValuesSection";
import { OurApproachSection } from "@/components/page/About/OurApproachSection";
import { CommunityInclusionSection } from "@/components/page/About/CommunityInclusionSection";
import { ScienceDesignSection } from "@/components/page/About/ScienceDesignSection";
import { MethodInActionSection } from "@/components/page/About/MethodInActionSection";
import { TurrimCTA } from "@/components/shared/TurrimCTA";
import { PlayroomSection } from "@/components/shared/PlayroomSection";
import ContactSection from "@/components/shared/ContactSection";
import { useGetAboutCms } from "@/hooks/api/cms";
import { GlobalLoadingScreen } from "@/components/shared/GlobalLoadingScreen";

export default function AboutPageContent() {
  const { data: cmsData, isLoading } = useGetAboutCms();
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

  const content = cmsData?.content;

  return (
    <main className="w-full bg-white font-sans flex flex-col">
      {/* 1 & 2. About Story & Bio */}
      <AboutSection data={content?.story} />
      <BioTextSection data={content?.story} />

      {/* 3 & 4. Sticky Pair 1: Founders Letter (Blue) -> Architecture ABC slides over it */}
      <div className="relative w-full">
        <div
          className="sticky top-0 z-10 w-full"
          style={{ top: "min(0px, calc(100vh - 100%))" }}
        >
          <FoundersLetterSection data={content?.letter} />
        </div>
        <div className="relative z-20 w-full bg-white rounded-t-3xl md:rounded-t-[2.5rem] overflow-hidden">
          <ArchitectureABCSection data={content?.architecture} />
        </div>
      </div>

      {/* 5 & 6. Sticky Pair 2: Science of Play (Yellow) -> Learning Human slides over it */}
      <div className="relative w-full">
        <div
          className="sticky top-0 z-10 w-full"
          style={{ top: "min(0px, calc(100vh - 100%))" }}
        >
          <ScienceOfPlaySection data={content?.scienceOfPlay} />
        </div>
        <div className="relative z-20 w-full bg-white rounded-t-3xl md:rounded-t-[2.5rem] overflow-hidden">
          <LearningHumanSection />
        </div>
      </div>

      {/* 7 & 8. Our Values & Our Approach */}
      <OurValuesSection data={content?.values} />
      <OurApproachSection data={content?.approach} />

      {/* 9 & 10. Sticky Pair 3: Community & Inclusion (Purple) -> Science Design slides over it */}
      <div className="relative w-full">
        <div
          className="sticky top-0 z-10 w-full"
          style={{ top: "min(0px, calc(100vh - 100%))" }}
        >
          <CommunityInclusionSection />
        </div>
        <div className="relative z-20 w-full bg-white rounded-t-3xl md:rounded-t-[2.5rem] overflow-hidden">
          <ScienceDesignSection />
        </div>
      </div>

      {/* 11, 12, 13, 14. Remaining sections */}
      <MethodInActionSection />
      <PlayroomSection />
      <ContactSection />
      <TurrimCTA />
    </main>
  );
}
