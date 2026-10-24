"use client";

import { OurApproachSectionData, PrincipleItem } from "@/hooks/api/cms";
import { TextReveal, FadeIn, StaggerContainer, StaggerItem } from "@/components/animated";

interface OurApproachSectionProps {
  data?: OurApproachSectionData;
}

const DEFAULT_PRINCIPLES: PrincipleItem[] = [
  {
    id: 1,
    number: "1",
    title: "Embodied Learning",
    description: "The body learns before the mind.",
  },
  {
    id: 2,
    number: "2",
    title: "Serious Play",
    description: "Play is serious business for curiosity.",
  },
  {
    id: 3,
    number: "3",
    title: "Inviting Beauty",
    description: "Objects designed to inspire and last.",
  },
];

const PRINCIPLE_COLORS = ["#0056D2", "#6930C3", "#007F3E", "#FF8A50"];

export function OurApproachSection({ data }: OurApproachSectionProps) {
  const badge = data?.badge || "OUR APPROACH";
  const title = data?.title || "Where curiosity meets structure";
  const subtitle =
    data?.subtitle ||
    "An invisible architecture guides every decision: how we learn, move, and change. Turrim combines play, science, and design to create a robust and vibrant framework.";
  const principles =
    data?.principles && data.principles.length > 0
      ? data.principles
      : DEFAULT_PRINCIPLES;

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center space-y-10 sm:space-y-14 md:space-y-18">
        {/* Header */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-3xl">
          <FadeIn direction="down" delay={0.1} duration={0.5}>
            <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
              {badge}
            </span>
          </FadeIn>
          <TextReveal
            as="h2"
            text={title}
            mode="words"
            duration={0.6}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#2D2D2D] tracking-tight leading-tight justify-center"
          />
          <FadeIn direction="up" delay={0.2} duration={0.6} distance={20}>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Principles */}
        <div className="w-full space-y-8 sm:space-y-10 md:space-y-12">
          <FadeIn direction="up" delay={0.25} duration={0.5}>
            <h3 className="text-lg sm:text-xl font-normal text-[#2D2D2D]">
              Our three principles
            </h3>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.12}
            delayChildren={0.25}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8 max-w-md sm:max-w-none mx-auto"
          >
            {principles.map((item, index) => {
              const circleColor =
                PRINCIPLE_COLORS[index % PRINCIPLE_COLORS.length];
              const displayNumber = item.number || String(index + 1);

              return (
                <StaggerItem key={item.id ?? index} yOffset={24} duration={0.6}>
                  <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
                    <div
                      style={{ backgroundColor: circleColor }}
                      className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-light shadow-sm transition-transform hover:scale-105 duration-300"
                    >
                      {displayNumber}
                    </div>
                    {item.title && (
                      <h4 className="text-[#1A1A2E] font-semibold text-base sm:text-lg">
                        {item.title}
                      </h4>
                    )}
                    <p className="text-gray-600 font-medium text-sm sm:text-base max-w-xs">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
