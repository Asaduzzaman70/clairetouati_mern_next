"use client";

import { TextReveal, FadeIn, ScaleIn } from "@/components/animated";

export function CommunityInclusionSection() {
  return (
    <section className="w-full bg-[#6930C3] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 text-white overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10">
        <FadeIn direction="down" delay={0.1} duration={0.5}>
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-80">
            COMMUNITY & INCLUSION
          </span>
        </FadeIn>

        <TextReveal
          as="h2"
          text="Color outside the lines"
          mode="words"
          duration={0.6}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-tight justify-center"
        />

        <FadeIn direction="up" delay={0.2} duration={0.6} distance={20}>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-3xl leading-relaxed opacity-90">
            Turrim is a living ecosystem where freedom, structure, imagination, and
            science meet. Tools children freely assemble play knows no boundaries.
          </p>
        </FadeIn>

        <ScaleIn delay={0.3} duration={0.6} className="w-full max-w-2xl">
          <div className="w-full bg-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 backdrop-blur-sm mt-4 sm:mt-6 md:mt-8 border border-white/15 shadow-sm">
            <blockquote className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
                &ldquo;It&apos;s not just about learning. It&apos;s about
                rediscovering the feeling of being capable.&rdquo;
              </p>
              <footer className="text-xs sm:text-sm md:text-base lg:text-lg opacity-80 font-light">
                — User, occupational therapist
              </footer>
            </blockquote>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
