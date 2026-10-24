"use client";

import { FoundersLetterSectionData } from "@/hooks/api/cms";
import { TextReveal, FadeIn } from "@/components/animated";

interface FoundersLetterSectionProps {
  data?: FoundersLetterSectionData;
}

export function FoundersLetterSection({ data }: FoundersLetterSectionProps) {
  const title = data?.title || "Claire's Letter, Founder";
  const quote = data?.quote || "“I created Turrim because curiosity saved me.”";
  const letterBody =
    data?.letterBody ||
    "It is curiosity that helps us rebuild ourselves after failure, reconnect after fear, and learn without apprehension. Whether we discover as children or relearn as adults, nurturing our curiosity means regaining our ability to move forward.";
  const signature = data?.signature || "Claire, founder of Turrim";
  const bgColor = data?.bgColor || "#0056b3";

  return (
    <section
      style={{ backgroundColor: bgColor }}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-24 flex justify-center text-white overflow-hidden"
    >
      <div className="container max-w-4xl flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10">
        <TextReveal
          as="h2"
          text={title}
          mode="words"
          duration={0.6}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal font-sans tracking-tight leading-tight justify-center"
        />

        <FadeIn direction="up" delay={0.2} duration={0.6} distance={20}>
          <p className="text-lg sm:text-xl md:text-2xl italic font-light opacity-95">
            {quote}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.35} duration={0.6} distance={20}>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl opacity-90">
            {letterBody}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.45} duration={0.5} distance={15}>
          <div className="pt-2 sm:pt-4">
            <p className="text-sm sm:text-base md:text-lg font-light opacity-80">
              {signature}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
