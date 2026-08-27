"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
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
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center text-[#2F312F] uppercase mb-8 sm:mb-10 md:mb-14 lg:mb-16 tracking-tight px-2">
                    THEIR DAILY LIVES, THEIR WORDS, THEIR RESULTS
                </h2>

                <div className="relative max-w-5xl lg:max-w-6xl mx-auto">
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

                        {/* Tablet & Desktop Side Arrows */}
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

                        {/* Mobile Navigation Controls / Dots */}
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-10">
                            <button
                                onClick={() => api?.scrollPrev()}
                                className="flex md:hidden p-2 text-[#996300] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                                aria-label="Previous testimonial"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 5L6 12L18 19V5Z" />
                                </svg>
                            </button>

                            {/* Dots Indicator */}
                            <div className="flex items-center gap-2">
                                {Array.from({ length: count }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => api?.scrollTo(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                        className={cn(
                                            "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                                            current === index
                                                ? "w-7 bg-[#996300]"
                                                : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                                        )}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => api?.scrollNext()}
                                className="flex md:hidden p-2 text-[#996300] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                                aria-label="Next testimonial"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 5L18 12L6 19V5Z" />
                                </svg>
                            </button>
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
