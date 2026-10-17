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
import { CallToActionSection } from "@/components/page/About/CallToActionSection";
import { TurrimCTA } from "@/components/shared/TurrimCTA";
import { PlayroomSection } from "@/components/shared/PlayroomSection";
import ContactSection from "@/components/shared/ContactSection";

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white">
            <AboutSection />
            <BioTextSection />
            <FoundersLetterSection />
            <ArchitectureABCSection />
            <ScienceOfPlaySection />
            <LearningHumanSection />
            <OurValuesSection />
            <OurApproachSection />
            <CommunityInclusionSection />
            <ScienceDesignSection />
            <MethodInActionSection />
            <PlayroomSection />
            {/* <CallToActionSection /> */}
            <ContactSection />
            <TurrimCTA />
        </main>
    );
}
