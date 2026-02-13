"use client";

import Image, { StaticImageData } from "next/image";
import imageBg from "@/assets/image_bg.png";
import imageBg2 from "@/assets/image_bg_2.png";
import imageBg3 from "@/assets/image_bg_3.png";
import imageBg4 from "@/assets/image_bg_4.png";

interface SectionData {
    id: number;
    image: StaticImageData;
    bgColor: string;
    title: string;
    description: string;
    letters: string[];
}

const SECTIONS: SectionData[] = [
    {
        id: 1,
        image: imageBg,
        bgColor: "#007a33",
        title: "Turrim, much more than a wooden game",
        description: "Turrim is a simple object that you pick up, touch, intuitive wooden toy that invites exploration. Built from basic shapes, Turrim is a method based on movement, curiosity, and experimentation. A tool that supports learning, rehabilitation, and confidence at any age.",
        letters: ["F", "L", "X", "R"],
    },
    {
        id: 2,
        image: imageBg2,
        bgColor: "#0056b3",
        title: "THE BODY LEARNS BEFORE THE MIND",
        description: "Before words, there are gestures. Touching, stacking, moving objects helps shape the way we understand motion, balance, and relation. Turrim creates motion as a tool for action, not reflection, and profoundly human learning ground.",
        letters: ["E", "k", "W", "Q"],
    },
    {
        id: 3,
        image: imageBg3,
        bgColor: "#6930C3",
        title: "SECURITY UNLEASHES CURIOSITY",
        description: "We explore best when we feel confident. Our products are designed to create a clear setting, reassuring shapes and materials where exploration happens naturally, without fear of mistakes. When stress disappears, curiosity thrives.",
        letters: ["D", "J", "V", "P"],
    },
    {
        id: 4,
        image: imageBg4,
        bgColor: "#FF5722", // Vibrant orange
        title: "WONDER MAKES YOU GROW",
        description: "Learning isn't about ticking boxes, it's about being surprised. A moment of wonder, a small success, a feeling of \"I can do it\" transforms the entire experience. A sense of wonder then becomes driving force, a gentle strength that leads to autonomy.",
        letters: ["B", "H", "T", "N"],
    },
];

export function TurrimInfoSection() {
    return (
        <div className="w-full flex flex-col">
            {SECTIONS.map((section) => (
                <section key={section.id} className="w-full relative">
                    {/* Top Image Section - Sticky */}
                    <div className="sticky top-0 z-0 w-full h-[400px] md:h-[600px]">
                        <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                            placeholder="blur"
                        />
                    </div>

                    {/* Bottom Content Section - Relative to cover the sticky image */}
                    <div
                        className="relative z-10 w-full text-white py-20 px-6 md:px-12 lg:px-24"
                        style={{ backgroundColor: section.bgColor }}
                    >
                        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            {/* Left Text Content */}
                            <div className="space-y-8 max-w-2xl text-white">
                                <h2 className="text-3xl md:text-5xl font-bold leading-tight font-sans uppercase">
                                    {section.title}
                                </h2>
                                <p className="text-base md:text-lg leading-relaxed opacity-95 font-light">
                                    {section.description}
                                </p>
                            </div>

                            {/* Right Outline Letters */}
                            <div className="relative w-full flex items-center justify-center lg:justify-end py-8 lg:py-0">
                                <div className="grid grid-cols-2 gap-x-24 gap-y-16">
                                    {section.letters.map((letter, i) => (
                                        <span
                                            key={i}
                                            className="block font-sans text-8xl md:text-9xl font-light bg-clip-text text-transparent bg-fixed bg-center bg-cover [-webkit-text-stroke:1px_white] select-none"
                                            style={{
                                                backgroundImage: `url(${section.image.src})`
                                            }}
                                        >
                                            {letter}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
