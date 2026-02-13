import Image from "next/image";
import ownerImage from "@/assets/owner.jpg";

export function AboutSection() {
    return (
        <section className="w-full bg-white flex items-center justify-center py-20 px-6 md:px-12 lg:px-24">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Left Column - Image */}
                <div className="relative w-full aspect-4/3 md:aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src={ownerImage}
                        alt="Claire"
                        fill
                        className="object-cover"
                        priority
                        placeholder="blur"
                    />
                </div>

                {/* Right Column - Text Content */}
                <div className="space-y-6 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] tracking-tight">
                        Claire, inventive
                    </h1>

                    <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
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
