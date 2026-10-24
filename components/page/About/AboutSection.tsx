"use client";

import Image from "next/image";
import ownerImage from "@/assets/owner.jpg";
import { AboutStorySectionData } from "@/hooks/api/cms";
import { RichTextViewer } from "@/components/shared/RichTextViewer";
import { TextReveal, FadeIn, ScaleIn } from "@/components/animated";

interface AboutSectionProps {
  data?: AboutStorySectionData;
}

const DEFAULT_INTRO_HTML = `
  <p>Claire always introduces herself in the same way:</p>
  <p>She is an inventor. Since childhood, she has moved forward this way, imagining paths where none yet exist. An endless curiosity drives her to create tools that connect play, science, and learning.</p>
`;

export function AboutSection({ data }: AboutSectionProps) {
  const title = data?.title || "Claire, inventive";

  return (
    <section className="w-full bg-white flex justify-center py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="container mx-auto">
        {/* Title */}
        <TextReveal
          as="h1"
          text={title}
          mode="words"
          duration={0.6}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] tracking-tight leading-[1.15] mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        />

        {/* Content Grid: Left Image, Right Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Column - Image */}
          <ScaleIn
            delay={0.2}
            duration={0.7}
            className="relative w-full aspect-4/3 rounded-2xl md:rounded-3xl overflow-hidden shadow-md"
          >
            {data?.image ? (
              <Image
                src={data.image}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            ) : (
              <Image
                src={ownerImage}
                alt="Claire"
                fill
                className="object-cover"
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </ScaleIn>

          {/* Right Column - Description with reusable RichTextViewer */}
          <FadeIn direction="up" delay={0.3} duration={0.6} distance={20}>
            <RichTextViewer
              content={data?.introText}
              fallback={DEFAULT_INTRO_HTML}
              className="text-base sm:text-lg md:text-xl max-w-xl"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
