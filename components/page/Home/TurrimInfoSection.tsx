"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { FadeIn, TextReveal, StaggerContainer, StaggerItem } from "@/components/animated";
import imageBg from "@/assets/image_bg.png";
import imageBg2 from "@/assets/image_bg_2.png";
import imageBg3 from "@/assets/image_bg_3.png";
import imageBg4 from "@/assets/image_bg_4.png";

import { useGetHomeCms } from "@/hooks/api/cms";

interface SectionData {
    id: number;
    image: StaticImageData;
    bgColor: string;
    title: string;
    description: string;
    letters: string[];
    rotations: number[];
}

const defaultRotations: number[][] = [
    [-18, 14, -22, 6],
    [-15, 18, -20, -6],
    [-20, -12, -24, 0],
    [-16, 15, -22, 8],
];

const SECTIONS: SectionData[] = [
    {
        id: 1,
        image: imageBg,
        bgColor: "#007a33",
        title: "Turrim, much more than a wooden game",
        description: "Turrim is a simple object that you pick up, touch, intuitive wooden toy that invites exploration. Built from basic shapes, Turrim is a method based on movement, curiosity, and experimentation. A tool that supports learning, rehabilitation, and confidence at any age.",
        letters: ["F", "L", "X", "R"],
        rotations: [-18, 14, -22, 6],
    },
    {
        id: 2,
        image: imageBg2,
        bgColor: "#0056b3",
        title: "THE BODY LEARNS BEFORE THE MIND",
        description: "Before words, there are gestures. Touching, stacking, moving objects helps shape the way we understand motion, balance, and relation. Turrim creates motion as a tool for action, not reflection, and profoundly human learning ground.",
        letters: ["E", "k", "W", "Q"],
        rotations: [-15, 18, -20, -6],
    },
    {
        id: 3,
        image: imageBg3,
        bgColor: "#6930C3",
        title: "SECURITY UNLEASHES CURIOSITY",
        description: "We explore best when we feel confident. Our products are designed to create a clear setting, reassuring shapes and materials where exploration happens naturally, without fear of mistakes. When stress disappears, curiosity thrives.",
        letters: ["D", "J", "V", "P"],
        rotations: [-20, -12, -24, 0], // Matches screenshot exactly
    },
    {
        id: 4,
        image: imageBg4,
        bgColor: "#FF5722", // Vibrant orange
        title: "WONDER MAKES YOU GROW",
        description: "Learning isn't about ticking boxes, it's about being surprised. A moment of wonder, a small success, a feeling of \"I can do it\" transforms the entire experience. A sense of wonder then becomes driving force, a gentle strength that leads to autonomy.",
        letters: ["B", "H", "T", "N"],
        rotations: [-16, 15, -22, 8],
    },
];

function RotatedLetter({
    letter,
    imageSrc,
    rotation,
}: {
    letter: string;
    imageSrc: string;
    rotation: number;
}) {
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const span = spanRef.current;
        if (!span) return;

        let rafId: number;

        const updatePosition = () => {
            if (!span) return;
            const rect = span.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            // Distance from center of the span to the center of the viewport
            const screenOffsetX = vw / 2 - (rect.left + rect.width / 2);
            const screenOffsetY = vh / 2 - (rect.top + rect.height / 2);

            // Project screen-space offset into the rotated coordinate system of the span
            const rad = (rotation * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);

            const localX = screenOffsetX * cos + screenOffsetY * sin;
            const localY = -screenOffsetX * sin + screenOffsetY * cos;

            // Viewport cover dimensions (16:9 aspect ratio standard for hero images)
            const coverWidth = Math.max(vw, (vh * 16) / 9);
            const coverHeight = Math.max(vh, (vw * 9) / 16);

            span.style.backgroundSize = `${coverWidth}px ${coverHeight}px`;
            span.style.backgroundPosition = `calc(50% + ${localX}px) calc(50% + ${localY}px)`;
        };

        const onScrollOrResize = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updatePosition);
        };

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize, { passive: true });

        // Initial paint
        updatePosition();

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            cancelAnimationFrame(rafId);
        };
    }, [rotation]);

    return (
        <div className="flex items-center justify-center">
            <span
                ref={spanRef}
                className="inline-block font-mirrut text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] font-light bg-clip-text text-transparent bg-no-repeat [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:1.5px_white] select-none text-center origin-center leading-none"
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                {letter}
            </span>
        </div>
    );
}

export function TurrimInfoSection() {
    const { data: homeCms } = useGetHomeCms();
    const cmsSections = homeCms?.content?.turrimInfo?.sections;

    const sections =
        cmsSections && cmsSections.length > 0
            ? cmsSections.map((sec, idx) => {
                  const fallback = SECTIONS[idx % SECTIONS.length];
                  const fallbackRotations = defaultRotations[idx % defaultRotations.length];
                  const imageSrc = sec.imageUrl || fallback.image.src;
                  return {
                      id: sec.id || idx + 1,
                      title: sec.title || fallback.title,
                      description: sec.description || fallback.description,
                      bgColor: sec.bgColor || fallback.bgColor,
                      letters: sec.letters && sec.letters.length > 0 ? sec.letters : fallback.letters,
                      rotations:
                          sec.rotations && sec.rotations.length > 0
                              ? sec.rotations
                              : fallbackRotations,
                      imageSrc,
                  };
              })
            : SECTIONS.map((sec, idx) => ({
                  ...sec,
                  imageSrc: sec.image.src,
              }));

    return (
        <div className="w-full flex flex-col">
            {sections.map((section) => (
                <section key={section.id} className="w-full relative">
                    {/* Top Image Section - Sticky */}
                    <div className="sticky top-0 z-0 w-full h-70 sm:h-95 md:h-120 lg:h-150">
                        <Image
                            src={section.imageSrc}
                            alt={section.title}
                            fill
                            className="object-cover"
                            unoptimized={typeof section.imageSrc === "string" && section.imageSrc.startsWith("http")}
                        />
                    </div>

                    {/* Bottom Content Section - Relative to cover the sticky image */}
                    <div
                        className="relative z-10 w-full text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20"
                        style={{ backgroundColor: section.bgColor }}
                    >
                        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
                            {/* Left Text Content */}
                            <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-2xl text-white">
                                <TextReveal
                                    key={section.title}
                                    as="h2"
                                    text={section.title}
                                    mode="words"
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans uppercase tracking-tight"
                                />
                                <FadeIn direction="up" delay={0.25} duration={0.6}>
                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-95 font-light">
                                        {section.description}
                                    </p>
                                </FadeIn>
                            </div>

                            {/* Right Outline Letters */}
                            <div className="relative w-full flex items-center justify-center lg:justify-end py-4 sm:py-6 lg:py-0">
                                <StaggerContainer
                                    staggerDelay={0.12}
                                    delayChildren={0.15}
                                    className="grid grid-cols-2 w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl gap-x-16 sm:gap-x-24 md:gap-x-32 lg:gap-x-40 xl:gap-x-48 gap-y-8 sm:gap-y-12 md:gap-y-14 lg:gap-y-16"
                                >
                                    {section.letters.map((letter, i) => (
                                        <StaggerItem key={i} yOffset={24} duration={0.6}>
                                            <RotatedLetter
                                                letter={letter}
                                                imageSrc={section.imageSrc}
                                                rotation={section.rotations[i] ?? 0}
                                            />
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
