"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const curiosityItems = [
    {
        title: "ATTENTIVE",
        description: "The present moment is where learning happens. Observing, listening, and attuning deeply to others is what allows us to adjust the play experience, and create meaningful, inclusive and supportive interactions.",
        letter: "A",
        color: "#DC9F12", // Gold
    },
    {
        title: "ATTENTIVE",
        description: "The present moment is where learning happens. Observing, listening, and attuning deeply to others is what allows us to adjust the play experience, and create meaningful, inclusive and supportive interactions.",
        letter: "B",
        color: "#FF7E4D", // Coral/Orange
    },
    {
        title: "ATTENTIVE",
        description: "The present moment is where learning happens. Observing, listening, and attuning deeply to others is what allows us to adjust the play experience, and create meaningful, inclusive and supportive interactions.",
        letter: "C",
        color: "#8B0D1B", // Deep Red
    },
    {
        title: "ATTENTIVE",
        description: "The present moment is where learning happens. Observing, listening, and attuning deeply to others is what allows us to adjust the play experience, and create meaningful, inclusive and supportive interactions.",
        letter: "D",
        color: "#4C259D", // Deep Purple
    },
    {
        title: "ATTENTIVE",
        description: "The present moment is where learning happens. Observing, listening, and attuning deeply to others is what allows us to adjust the play experience, and create meaningful, inclusive and supportive interactions.",
        letter: "E",
        color: "#DC9F12", // Gold
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
                                        className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] min-h-95 sm:min-h-102.5 md:min-h-112.5 lg:min-h-120 h-full p-6 sm:p-7 md:p-8 lg:p-9 xl:p-10 flex flex-col justify-start gap-5 md:gap-7 lg:gap-8 transition-transform duration-300 shadow-sm"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        {/* Background Letter */}
                                        <span className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 md:-bottom-12 md:-right-8 lg:-bottom-16 lg:-right-10 text-[200px] sm:text-[260px] md:text-[340px] lg:text-[400px] xl:text-[460px] font-black text-white opacity-10 leading-none select-none pointer-events-none group-hover:opacity-15 transition-all duration-700">
                                            {item.letter}
                                        </span>

                                        <div className="relative z-10">
                                            <h3
                                                className={cn(
                                                    "text-lg sm:text-xl lg:text-xl font-bold tracking-wider uppercase mb-3 sm:mb-4 md:mb-6 lg:mb-8",
                                                    item.color === "#DC9F12" && "text-foreground",
                                                    item.color === "#FF7E4D" && "text-white",
                                                    item.color === "#8B0D1B" && "text-white",
                                                    item.color === "#4C259D" && "text-white"
                                                )}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className={cn(
                                                    "text-sm sm:text-base lg:text-[16px] xl:text-lg leading-[1.6] lg:leading-[1.65] font-medium opacity-95",
                                                    item.color === "#DC9F12" && "text-foreground",
                                                    item.color === "#FF7E4D" && "text-white",
                                                    item.color === "#8B0D1B" && "text-white",
                                                    item.color === "#4C259D" && "text-white"
                                                )}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Laptop & Desktop Side Arrows */}
                        <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-6 xl:-left-8 top-1/2 -translate-y-1/2 border-none text-[#996300] bg-transparent hover:bg-transparent shadow-none w-9 h-9 lg:w-11 lg:h-11 cursor-pointer z-20 transition-transform hover:scale-110 active:scale-95">
                            <svg className="w-7 h-7 lg:w-9 lg:h-9" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 5L6 12L18 19V5Z" />
                            </svg>
                        </CarouselPrevious>
                        <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-6 xl:-right-8 top-1/2 -translate-y-1/2 border-none text-[#996300] bg-transparent hover:bg-transparent shadow-none w-9 h-9 lg:w-11 lg:h-11 cursor-pointer z-20 transition-transform hover:scale-110 active:scale-95">
                            <svg className="w-7 h-7 lg:w-9 lg:h-9" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 5L18 12L6 19V5Z" />
                            </svg>
                        </CarouselNext>
                    </Carousel>

                    {/* Mobile Navigation Controls (Below the Cards) */}
                    <div className="flex md:hidden items-center justify-center gap-6 mt-6">
                        <button
                            onClick={() => api?.scrollPrev()}
                            className="p-2 text-[#996300] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 5L6 12L18 19V5Z" />
                            </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300 cursor-pointer",
                                        current === index
                                            ? "w-6 bg-[#996300]"
                                            : "w-2 bg-zinc-300 hover:bg-zinc-400"
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => api?.scrollNext()}
                            className="p-2 text-[#996300] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                            aria-label="Next slide"
                        >
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 5L18 12L6 19V5Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
