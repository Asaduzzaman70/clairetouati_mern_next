"use client";

import { AboutStorySectionData } from "@/hooks/api/cms";
import { RichTextViewer } from "@/components/shared/RichTextViewer";
import { FadeIn } from "@/components/animated";

interface BioTextSectionProps {
  data?: AboutStorySectionData;
}

const DEFAULT_BIO_HTML = `
  <p>With triple nationality and a diverse and ever-changing educational path—American public school, French public school, private school, Montessori, CNED—she grew up immersed in several cultures, languages, and learning styles. At three, she taught herself to read. From then on, everything changed: she abandoned toys, immersed herself in books, and developed a profound fascination with words, translation, and writing. At recess, she would read on the swings while the others played soccer. She didn't yet understand why she felt out of place. She only knew that the others wanted to play, and she wanted to read.</p>
  <p>Turrim was born from this disconnect. From this desire to create a bridge between two worlds that don't communicate: the world of play and the world of words, the world of movement and that of abstraction, the world of the child who reads too early and that of children playing together. To invent a bridge that doesn't yet exist, to build a form that connects what seemed separate. This is how Turrim was born, an object so unique that you have to see it to believe it.</p>
  <p>Today, Claire is still inventing: not isolated objects, but tools that connect. Creations that give form to curiosity, that accompany learning and rebuilding, that help everyone—child, parent, therapist, adult in rehabilitation—to rediscover their ability to move forward. For her, inventing means making connection possible, even when nothing seems to promise it.</p>
`;

export function BioTextSection({ data }: BioTextSectionProps) {
  return (
    <section className="w-full bg-white py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-24 flex justify-center overflow-hidden">
      <FadeIn direction="up" delay={0.2} duration={0.7} distance={24} className="w-full">
        <RichTextViewer
          content={data?.bioText}
          fallback={DEFAULT_BIO_HTML}
          className="container max-w-4xl mx-auto text-center text-base sm:text-lg md:text-xl leading-relaxed sm:leading-[1.8] font-normal sm:font-light [&_p]:mb-6 sm:[&_p]:mb-8 md:[&_p]:mb-10 [&_ul]:inline-block [&_ul]:text-left [&_ol]:inline-block [&_ol]:text-left [&_blockquote]:text-left"
        />
      </FadeIn>
    </section>
  );
}
