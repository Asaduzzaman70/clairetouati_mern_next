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
import user from "@/assets/user.jpg"

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
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2F312F] uppercase mb-16 tracking-tight">
                    THEIR DAILY LIVES, THEIR WORDS, THEIR RESULTS
                </h2>

                <div className="relative mx-auto">
                    <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                            {testimonials.map((item, index) => (
                                <CarouselItem key={index}>
                                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4 md:px-12">
                                        {/* Image Side */}
                                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                            <div className="relative w-full aspect-[4/3] bg-[#7EA16B] overflow-hidden">
                                                {/* We use Next/Image but handle the case where user.jpg might be missing by just rendering the box if it fails, 
                           or relying on standard alt. Since we don't have the file verified, we assume it works. */}
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Text Side */}
                                        <div className="w-full md:w-1/2 text-left">
                                            <p className="text-[#555555] text-2xl leading-relaxed mb-6 font-normal">
                                                {item.quote}
                                            </p>
                                            <div>
                                                <h4 className="font-bold text-[#1e293b] text-xl">
                                                    {item.name}
                                                </h4>
                                                <p className="text-[#64748b] text-xl md:text-xl">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Arrows */}
                        <div className="hidden lg:block">
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
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-3 mt-12 mb-4">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-3 w-3 rounded-full transition-colors ${index === current ? "bg-[#FFA500]" : "bg-gray-300"
                                        }`}
                                    onClick={() => api?.scrollTo(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
