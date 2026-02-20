"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import bgImage from "@/assets/bg_image.jpg";
import { Roboto_Flex } from "next/font/google";

export function TurrimCTA({ content = "Recevoir Turrim" }: { content?: string }) {
    return (
        <section className="relative w-full py-40 md:py-64 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Turrim Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4">
                <button
                    className="bg-black text-white px-16 py-6 md:px-24 md:py-8 rounded-[8px] hover:bg-zinc-800 transition-colors duration-300 font-normal tracking-wide shadow-xl overflow-hidden group"
                    aria-label="Recevoir Turrim"
                >
                    <InteractiveText text={content} />
                </button>
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

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const update = () => {
            // Smoothly interpolate current cursor position towards target
            // Factor 0.1 for smooth, organic lag
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
                    const maxDist = 800; // Increased to cover more area
                    const intensity = Math.max(0, 1 - Math.min(distance, maxDist) / maxDist);

                    // Non-linear intensity for sharper focus near center
                    const easeIntensity = Math.pow(intensity, 2);

                    // Interpolate values
                    // Weight: 100 to 1000
                    const weight = 100 + (900 * easeIntensity);

                    // Width: 100 to 151 (Roboto Flex max width is usually 151)
                    const width = 100 + (51 * easeIntensity);

                    // Slant: Keep at 0 (no italic effect)
                    const slant = 0;

                    // Opacity: Always 1 for solid white
                    const opacity = 1;

                    charSpan.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}, 'slnt' ${slant}`;
                    charSpan.style.opacity = opacity.toString();
                });
            }

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener("mousemove", handleMouseMove);
        update();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className={`${robotoFlex.className} flex justify-center items-center text-xl md:text-8xl text-white`}>
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
