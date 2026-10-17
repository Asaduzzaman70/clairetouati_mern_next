"use client";

import ThreeModelViewer from "@/components/shared/ThreeModelViewer";
import { useRouter } from "next/navigation";
import { FadeIn, ScaleIn, TextReveal, HoverScale } from "@/components/animated";

export function PlayroomSection() {
    const router = useRouter();
    return (
        <section className="w-full bg-white py-14 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-14 lg:gap-20 items-center">
                    {/* Left Column - 3D Interactive Model */}
                    <ScaleIn
                        initialScale={0.93}
                        type="spring"
                        delay={0.1}
                        className="w-full h-80 sm:h-95 md:h-115 lg:h-130 flex items-center justify-center bg-[#F9FAFB] rounded-2xl md:rounded-[2rem] border-none relative overflow-hidden group"
                    >
                        <ThreeModelViewer />
                    </ScaleIn>

                    {/* Right Column - Content */}
                    <div className="flex flex-col space-y-4 sm:space-y-6">
                        <TextReveal
                            as="h2"
                            text="DISCOVER OUR THREE DIMENSIONAL GAME ROOM"
                            mode="words"
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] leading-[1.15] tracking-tight uppercase"
                        />

                        <FadeIn direction="up" delay={0.25} duration={0.6}>
                            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                                Before you get your hands on Turrim, here&apos;s a first glimpse of our three
                                dimensional alphabet. A space to explore, manipulate with your eyes, understand
                                how a shape becomes a gesture and how a gesture powers the way of learning.
                                The Playroom is a gateway: a testing ground where you begin to feel what makes
                                Turrim so different, so vibrant, so intuitive.
                            </p>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.35} duration={0.5}>
                            <div className="pt-2 sm:pt-4">
                                <HoverScale scale={1.03} lift={-2} className="inline-block w-full sm:w-auto">
                                    <button
                                        onClick={() => router.push('/playroom')}
                                        className="w-full sm:w-auto bg-[#E8E8E8] hover:bg-zinc-300 active:scale-95 text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 font-semibold text-sm sm:text-base cursor-pointer shadow-sm text-center"
                                    >
                                        Enter the playroom
                                    </button>
                                </HoverScale>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
