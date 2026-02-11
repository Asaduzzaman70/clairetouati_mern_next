"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
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
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4 tracking-tight">
                        Where curiosity connects worlds
                    </h2>
                    <p className="text-[#64748b] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
                        Making playful intelligence a joyful force for children, parents, educators and all those who never stop learning.
                    </p>
                </div>

                <div className="relative group/carousel">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            dragFree: true,
                        }}
                        className="w-full relative px-10"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {curiosityItems.map((item, index) => (
                                <CarouselItem key={index} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-[28%] select-none">
                                    <div
                                        className="relative overflow-hidden rounded-[2rem] min-h-[480px] h-full p-10 flex flex-col justify-start gap-8 transition-transform duration-500 group"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        {/* Background Letter - Matching image positioning */}
                                        <span className="absolute -bottom-16 -right-12 text-[480px] font-black text-white opacity-10 leading-none select-none pointer-events-none group-hover:opacity-15 transition-all duration-700">
                                            {item.letter}
                                        </span>

                                        <div className="relative z-10">
                                            <h3 className={cn("text-xl font-bold tracking-wider uppercase mb-8",
                                                item.color === "#DC9F12" && "text-foreground",
                                                item.color === "#FF7E4D" && "text-white",
                                                item.color === "#8B0D1B" && "text-white",
                                                item.color === "#4C259D" && "text-white",
                                            )}>
                                                {item.title}
                                            </h3>
                                            <p className={cn("text-lg leading-[1.6] font-medium opacity-95",
                                                item.color === "#DC9F12" && "text-foreground",
                                                item.color === "#FF7E4D" && "text-white",
                                                item.color === "#8B0D1B" && "text-white",
                                                item.color === "#4C259D" && "text-white",
                                            )}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Arrows - Solid Triangles like the image */}
                        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 border-none text-[#996300]">
                            <svg className="size-20" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 5L6 12L18 19V5Z" />
                            </svg>
                        </CarouselPrevious>
                        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 border-none text-[#996300]">
                            <svg className="size-20" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 5L18 12L6 19V5Z" />
                            </svg>
                        </CarouselNext>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
