"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { FadeIn, TextReveal } from "@/components/animated";
import user from "@/assets/user.jpg";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        image: user,
        quote:
            "“Turrím is an exceptional game that I have relied on extensively to help the children I care for. Its use goes beyond learning to write, as it offers a truly developmental approach. Non-constructive play, sensory, and movement activities go hand in hand, allowing children to develop confidence and joy of learning.”",
        name: "Baptiste Mauro",
        role: "Psychomotor Therapist",
    },
    {
        image: user,
        quote:
            "“Turrím is an exceptional game that I have relied on extensively to help the children I care for. Its use goes beyond learning to write, as it offers a truly developmental approach. Non-constructive play, sensory, and movement activities go hand in hand, allowing children to develop confidence and joy of learning.”",
        name: "Baptiste Mauro",
        role: "Psychomotor Therapist",
    },
    {
        image: user,
        quote:
            "“Turrím is an exceptional game that I have relied on extensively to help the children I care for. Its use goes beyond learning to write, as it offers a truly developmental approach. Non-constructive play, sensory, and movement activities go hand in hand, allowing children to develop confidence and joy of learning.”",
        name: "Baptiste Mauro",
        role: "Psychomotor Therapist",
    },
];

export function Testimonials() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
                <TextReveal
                    as="h2"
                    text="THEIR DAILY LIVES, THEIR WORDS, THEIR RESULTS"
                    mode="words"
                    className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center text-[#2F312F] uppercase mb-8 sm:mb-10 md:mb-14 lg:mb-16 tracking-tight px-2 justify-center"
                />

                <FadeIn direction="up" delay={0.2} duration={0.6} distance={30} className="relative max-w-5xl lg:max-w-6xl mx-auto">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        className="w-full relative px-0 md:px-8 lg:px-10"
                    >
                        <CarouselContent>
                            {testimonials.map((item, index) => (
                                <CarouselItem key={index}>
                                    <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-8 lg:gap-14 px-2 sm:px-4 md:px-0">
                                        {/* Image Side */}
                                        <div className="w-full md:w-5/12 lg:w-1/2 flex justify-center md:justify-end">
                                            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-none aspect-4/3 rounded-2xl overflow-hidden bg-[#7EA16B] shadow-sm">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 50vw"
                                                />
                                            </div>
                                        </div>

                                        {/* Text Side */}
                                        <div className="w-full md:w-7/12 lg:w-1/2 text-left space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-6">
                                            <p className="text-[#555555] text-sm sm:text-base md:text-[16px] lg:text-xl xl:text-2xl leading-relaxed font-normal">
                                                {item.quote}
                                            </p>
                                            <div className="border-t border-zinc-100 pt-3 sm:pt-4">
                                                <h4 className="font-bold text-[#1e293b] text-base sm:text-lg md:text-lg lg:text-xl">
                                                    {item.name}
                                                </h4>
                                                <p className="text-[#64748b] text-xs sm:text-sm md:text-sm lg:text-base">
                                                    {item.role}
                                                </p>
                                            </div>
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
                                className="w-9 h-11 sm:w-11 sm:h-13 md:w-12 md:h-15 lg:w-14 lg:h-17 rotate-12 hover:rotate-0 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(255,206,0,0.25)]"
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
                                className="w-9 h-11 sm:w-11 sm:h-13 md:w-12 md:h-15 lg:w-14 lg:h-17 rotate-14 hover:rotate-0 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(255,206,0,0.25)]"
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

                        {/* Navigation Controls / Dots */}
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-10">
                            <button
                                type="button"
                                onClick={() => api?.scrollPrev()}
                                className="flex md:hidden p-2 text-[#FFCE00] hover:text-[#DCA500] hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-none"
                                aria-label="Previous testimonial"
                            >
                                <svg
                                    className="w-7 h-9 rotate-12 hover:rotate-0 transition-transform duration-300 drop-shadow-[0_2px_6px_rgba(255,206,0,0.25)]"
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
                                className="flex md:hidden p-2 text-[#FFCE00] hover:text-[#DCA500] hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-none"
                                aria-label="Next testimonial"
                            >
                                <svg
                                    className="w-7 h-9 rotate-14 hover:rotate-0 transition-transform duration-300 drop-shadow-[0_2px_6px_rgba(255,206,0,0.25)]"
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
                    </Carousel>
                </FadeIn>
            </div>
        </section>
    );
}
