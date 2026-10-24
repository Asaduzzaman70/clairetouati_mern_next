"use client";

import { TextReveal, FadeIn, StaggerContainer, StaggerItem } from "@/components/animated";

export function MethodInActionSection() {
  const cards = [
    {
      borderTopColor: "border-t-[#FFD600]", // Yellow
      title: "At school",
      description: "Cooperating, solving problems, and focusing through play.",
    },
    {
      borderTopColor: "border-t-[#0056D2]", // Blue
      title: "At home",
      description: "Rediscovering the joy of being together and understanding.",
    },
    {
      borderTopColor: "border-t-[#007F3E]", // Green
      title: "In rehabilitation",
      description: "Movement, confidence and motivation through simple, tactile gestures.",
    },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="container mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
          <FadeIn direction="down" delay={0.1} duration={0.5}>
            <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
              THE METHOD IN ACTION
            </span>
          </FadeIn>
          <TextReveal
            as="h2"
            text="From discovery to reconstruction"
            mode="words"
            duration={0.6}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1A1A2E] tracking-tight leading-tight px-2 justify-center"
          />
        </div>

        {/* Cards Grid with Stagger */}
        <StaggerContainer
          staggerDelay={0.15}
          delayChildren={0.2}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-md md:max-w-none mx-auto"
        >
          {cards.map((card, index) => (
            <StaggerItem key={index} yOffset={24} duration={0.6}>
              <div
                className={`bg-white rounded-2xl p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 border-t-8 ${card.borderTopColor} min-h-40 md:h-64 flex flex-col justify-start space-y-3 sm:space-y-4`}
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1A2E]">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal sm:font-light">
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
