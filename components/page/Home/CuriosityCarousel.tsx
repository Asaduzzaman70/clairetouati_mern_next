"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const curiosityItems = [
    {
        title: "ATTENTIVE",
        description: "The gentleness that sees what others miss. Observing, listening, adjusting. Every gesture counts: a guiding hand, a reassuring gaze, an object that helps to understand differently. At Turrim, attention is never passive—it is active, vibrant, and creates connections.",
        letter: "A",
        color: "#FFCE00",
        background: "linear-gradient(359deg, rgba(255, 206, 0, 0.00) 40.91%, #DCA500 93.29%), #FFCE00",
    },
    {
        title: "BRAVE",
        description: "Curiosity is a silent courage. Daring to learn differently, thinking outside the box, doing things differently. Every exploration, however small, opens a path. Play then becomes an adventure where confidence grows by progressing step by step.",
        letter: "B",
        color: "#EB5E28",
        background: "linear-gradient(359deg, rgba(235, 94, 40, 0.00) 40.91%, #C84B19 93.29%), #E85D04",
    },
    {
        title: "CREATIVE",
        description: "Imagination transforms the everyday into wonder. Free exploration, inventing games, and reimagining the world together fosters resilience, flexibility, and endless joy.",
        letter: "C",
        color: "#8B0D1B",
        background: "linear-gradient(359deg, rgba(139, 13, 27, 0.00) 40.91%, #6B0813 93.29%), #8B0D1B",
    },
    {
        title: "DYNAMIC",
        description: "Growth thrives in purposeful movement. Action, energy, and experimentation give curiosity its playful momentum to connect minds and spark shared discovery.",
        letter: "D",
        color: "#4C259D",
        background: "linear-gradient(359deg, rgba(76, 37, 157, 0.00) 40.91%, #351575 93.29%), #4C259D",
    },
    {
        title: "EMPATHETIC",
        description: "True connection begins with heartfelt understanding. Celebrating diversity, listening with open hearts, and nurturing supportive bonds that embrace every child.",
        letter: "E",
        color: "#FFCE00",
        background: "linear-gradient(359deg, rgba(255, 206, 0, 0.00) 40.91%, #DCA500 93.29%), #FFCE00",
    },
];

export function CuriosityCarousel() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white overflow-hidden">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] mb-3 md:mb-4 tracking-tight">
                        Where curiosity connects worlds
                    </h2>
                    <p className="text-[#64748b] max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                        Making playful intelligence a joyful force for children, parents, educators and all those who never stop learning.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative group/carousel">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: true,
                            dragFree: true,
                        }}
                        className="w-full relative px-0 md:px-8 lg:px-10"
                    >
                        <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-5 lg:-ml-6">
                            {curiosityItems.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-3 sm:pl-4 md:pl-5 lg:pl-6 basis-[84%] sm:basis-[62%] md:basis-[48%] lg:basis-[35%] xl:basis-[30%] 2xl:basis-[30%] select-none"
                                >
                                    <div
                                        className="relative overflow-hidden rounded-xl md:rounded-2xl min-h-95 sm:min-h-102.5 md:min-h-112.5 lg:min-h-120 h-full p-6 sm:p-7 md:p-8 lg:p-9 xl:p-10 flex flex-col justify-start gap-4 md:gap-6 transition-transform duration-300 shadow-sm"
                                        style={{ background: item.background }}
                                    >
                                        {/* Background Letter */}
                                        <span className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 md:-bottom-12 md:-right-8 lg:-bottom-16 lg:-right-10 text-[200px] sm:text-[260px] md:text-[340px] lg:text-[400px] xl:text-[460px] font-black text-white opacity-10 leading-none select-none pointer-events-none group-hover:opacity-15 transition-all duration-700">
                                            {item.letter}
                                        </span>

                                        <div className="relative z-10">
                                            <h3 className="text-xl sm:text-2xl font-bold tracking-wide uppercase mb-3 sm:mb-4 md:mb-5 text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm sm:text-base lg:text-[17px] leading-[1.65] font-normal italic text-white/95">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Laptop & Desktop Side Arrows */}
                        <button
                            type="button"
                            onClick={() => api?.scrollPrev()}
                            className="hidden md:flex absolute -left-5 md:-left-8 lg:-left-12 xl:-left-14 top-1/2 -translate-y-1/2 text-[#FFCE00] hover:text-[#DCA500] bg-transparent border-none p-2 cursor-pointer z-20 transition-all duration-200 hover:scale-110 active:scale-95 items-center justify-center focus:outline-none"
                            aria-label="Previous slide"
                        >
                            <svg
                                className="w-9 h-11 sm:w-11 sm:h-13 md:w-12 md:h-15 lg:w-14 lg:h-17 transition-transform drop-shadow-[0_2px_8px_rgba(255,206,0,0.25)]"
                                viewBox="0 0 24 28"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 3L3 14L22 25Z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => api?.scrollNext()}
                            className="hidden md:flex absolute -right-5 md:-right-8 lg:-right-12 xl:-right-14 top-1/2 -translate-y-1/2 text-[#FFCE00] hover:text-[#DCA500] bg-transparent border-none p-2 cursor-pointer z-20 transition-all duration-200 hover:scale-110 active:scale-95 items-center justify-center focus:outline-none"
                            aria-label="Next slide"
                        >
                            <svg
                                className="w-9 h-11 sm:w-11 sm:h-13 md:w-12 md:h-15 lg:w-14 lg:h-17 transition-transform drop-shadow-[0_2px_8px_rgba(255,206,0,0.25)]"
                                viewBox="0 0 24 28"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 3L21 14L2 25Z" />
                            </svg>
                        </button>
                    </Carousel>

                    {/* Mobile Navigation Controls (Below the Cards) */}
                    <div className="flex md:hidden items-center justify-center gap-6 mt-6">
                        <button
                            type="button"
                            onClick={() => api?.scrollPrev()}
                            className="p-2 text-[#FFCE00] hover:text-[#DCA500] hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-none"
                            aria-label="Previous slide"
                        >
                            <svg
                                className="w-7 h-9 transition-transform"
                                viewBox="0 0 24 28"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 3L3 14L22 25Z" />
                            </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300 cursor-pointer",
                                        current === index
                                            ? "w-6 bg-[#FFCE00]"
                                            : "w-2 bg-zinc-300 hover:bg-zinc-400"
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => api?.scrollNext()}
                            className="p-2 text-[#FFCE00] hover:text-[#DCA500] hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-none"
                            aria-label="Next slide"
                        >
                            <svg
                                className="w-7 h-9 transition-transform"
                                viewBox="0 0 24 28"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 3L21 14L2 25Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
