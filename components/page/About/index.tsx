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
    <main className="flex min-h-screen flex-col items-center justify-between bg-white font-sans">
      <AboutSection data={content?.story} />
      <BioTextSection data={content?.story} />
      <FoundersLetterSection data={content?.letter} />
      <ArchitectureABCSection data={content?.architecture} />
      <ScienceOfPlaySection data={content?.scienceOfPlay} />
      <LearningHumanSection />
      <OurValuesSection data={content?.values} />
      <OurApproachSection data={content?.approach} />
      <CommunityInclusionSection />
      <ScienceDesignSection />
      <MethodInActionSection />
      <PlayroomSection />
      <ContactSection />
      <TurrimCTA />
    </main>
  );
}
