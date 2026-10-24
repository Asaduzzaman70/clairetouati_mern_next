"use client";

import { ScienceOfPlaySectionData } from "@/hooks/api/cms";
import { TextReveal, FadeIn, StaggerContainer, StaggerItem } from "@/components/animated";

interface ScienceOfPlaySectionProps {
  data?: ScienceOfPlaySectionData;
}

const DEFAULT_CARDS = [
  {
    title: "Cognitive development",
    description: "Understanding through movement.",
  },
  {
    title: "Emotional balance",
    description: "Touch reduces stress and creates calm.",
  },
  {
    title: "Creative expression",
    description: "To give form to ideas without constraint.",
  },
  {
    title: "Link & community",
    description: "Learning together, giving further.",
  },
];

export function ScienceOfPlaySection({ data }: ScienceOfPlaySectionProps) {
  const badge = data?.badge || "The Science of Play";
  const title =
    data?.title ||
    "Curiosity is not a childish impulse — \nit's a superpower of the brain.";
  const description =
    data?.description ||
    "Turrim creates simple tools that transform curiosity into connection. From the classroom to the rehabilitation clinic, our objects invite everyone to explore, build, and marvel.";
  const bgColor = data?.bgColor || "#FFD600";
  const cards = data?.cards && data.cards.length > 0 ? data.cards : DEFAULT_CARDS;

  return (
    <section
      style={{ backgroundColor: bgColor }}
      className="w-full py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-24 text-[#1A1A2E] overflow-hidden"
    >
      <div className="container mx-auto flex flex-col items-center text-center space-y-12 sm:space-y-16">
        {/* Header Content */}
        <div className="space-y-6 max-w-4xl">
          <FadeIn direction="down" delay={0.1} duration={0.5}>
            <span className="text-sm font-medium tracking-widest uppercase opacity-80">
              {badge}
            </span>
          </FadeIn>

          <TextReveal
            as="h2"
            text={title}
            mode="words"
            duration={0.6}
            className="text-3xl md:text-5xl lg:text-5xl font-normal leading-tight whitespace-pre-line justify-center"
          />

          <FadeIn direction="up" delay={0.25} duration={0.6} distance={20}>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto opacity-90">
              {description}
            </p>
          </FadeIn>
        </div>

        {/* Cards Grid with Stagger */}
        <StaggerContainer
          staggerDelay={0.1}
          delayChildren={0.25}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {cards.map((card, index) => (
            <StaggerItem key={index} yOffset={24} duration={0.6} className="h-full">
              <div className="bg-white rounded-3xl md:rounded-4xl p-6 sm:p-8 text-left h-full flex flex-col justify-start space-y-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-black">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-snug">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
