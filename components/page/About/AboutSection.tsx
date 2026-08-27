import Image from "next/image";
import ownerImage from "@/assets/owner.jpg";

export function AboutSection() {
    return (
        <section className="w-full bg-white flex items-center justify-center py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center">
                {/* Left Column - Image */}
                <div className="relative w-full aspect-4/3 sm:aspect-square md:aspect-square lg:aspect-4/3 rounded-2xl md:rounded-3xl overflow-hidden shadow-md">
                    <Image
                        src={ownerImage}
                        alt="Claire"
                        fill
                        className="object-cover"
                        priority
                        placeholder="blur"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Right Column - Text Content */}
                <div className="space-y-4 sm:space-y-6 flex flex-col justify-center text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] tracking-tight leading-[1.15]">
                        Claire, inventive
                    </h1>

                    <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
                        <p>
                            Claire always introduces herself in the same way:
                        </p>
                        <p>
                            She is an inventor. Since childhood, she has moved forward this way,
                            imagining paths where none yet exist.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
