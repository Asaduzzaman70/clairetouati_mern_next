"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import bgImage from "@/assets/bg_image.jpg";
import { Roboto_Flex } from "next/font/google";

export function TurrimCTA({ content = "Recevoir Turrim" }: { content?: string }) {
    return (
        <section className="relative w-full py-20 sm:py-28 md:py-40 lg:py-56 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Turrim Background"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 max-w-full">
                <Link href="/checkout" className="inline-block">
                    <button
                        className="bg-black text-white px-6 py-4 sm:px-10 sm:py-5 md:px-16 md:py-6 lg:px-24 lg:py-8 rounded-xl md:rounded-2xl hover:bg-zinc-900 transition-all duration-300 font-normal tracking-wide shadow-2xl overflow-hidden group cursor-pointer max-w-[94vw] sm:max-w-none"
                        aria-label={content}
                    >
                        <InteractiveText text={content} />
                    </button>
                </Link>
            </div>
        </section>
    );
}

const robotoFlex = Roboto_Flex({
    subsets: ["latin"],
    axes: ["wdth", "slnt", "GRAD", "XTRA", "YOPQ", "YTLC", "YTUC", "YTAS", "YTDE", "YTFI"],
    display: "swap",
});

function InteractiveText({ text }: { text: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId: number;
        // Target cursor position
        let targetX = -9999;
        let targetY = -9999;
        // Smooth cursor position (lerped)
        let currentX = -9999;
        let currentY = -9999;

        const handleMouseMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                targetX = e.touches[0].clientX;
                targetY = e.touches[0].clientY;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                targetX = e.touches[0].clientX;
                targetY = e.touches[0].clientY;
            }
        };

        const handleTouchEnd = () => {
            targetX = -9999;
            targetY = -9999;
        };

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const update = () => {
            // Smoothly interpolate current cursor position towards target
            if (currentX === -9999) {
                currentX = targetX;
                currentY = targetY;
            } else {
                currentX = lerp(currentX, targetX, 0.1);
                currentY = lerp(currentY, targetY, 0.1);
            }

            if (targetX !== -9999) {
                charsRef.current.forEach((charSpan) => {
                    if (!charSpan) return;

                    const rect = charSpan.getBoundingClientRect();
                    const charCenterX = rect.left + rect.width / 2;
                    const charCenterY = rect.top + rect.height / 2;

                    const distX = currentX - charCenterX;
                    const distY = currentY - charCenterY;
                    const distance = Math.sqrt(distX * distX + distY * distY);

                    // Max distance of influence
                    const maxDist = 600;
                    const intensity = Math.max(0, 1 - Math.min(distance, maxDist) / maxDist);

                    // Non-linear intensity for sharper focus near center
                    const easeIntensity = Math.pow(intensity, 2);

                    // Interpolate values
                    const weight = 100 + (900 * easeIntensity);
                    const width = 100 + (51 * easeIntensity);
                    const slant = 0;

                    charSpan.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}, 'slnt' ${slant}`;
                });
            }

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        update();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className={`${robotoFlex.className} flex justify-center items-center text-[17px] sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-white select-none whitespace-nowrap`}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    ref={(el) => { charsRef.current[index] = el; }}
                    className="inline-block transition-transform duration-75 will-change-[font-variation-settings]"
                    style={{
                        fontVariationSettings: "'wght' 100, 'wdth' 100, 'slnt' 0",
                        opacity: 1,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
}
