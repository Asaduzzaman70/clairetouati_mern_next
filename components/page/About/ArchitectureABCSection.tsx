import Image from "next/image";
import abImg1 from "@/assets/ab_img_1.png";
import abImg2 from "@/assets/ab_img_2.png";
import abImg3 from "@/assets/ab_img_3.png";

export function ArchitectureABCSection() {
    return (
        <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
            <div className="container mx-auto space-y-12">

                {/* Title */}
                <h2 className="text-3xl md:text-4xl text-center font-normal text-[#2D2D2D] leading-tight">
                    Before Turrim, there was — <br className="hidden md:block" />
                    the ABCs of architecture
                </h2>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50">
                        <Image
                            src={abImg1}
                            alt="The ABCs of architecture kit"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            placeholder="blur"
                        />
                    </div>
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50">
                        <Image
                            src={abImg2}
                            alt="Wooden architecture letters"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            placeholder="blur"
                        />
                    </div>
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50">
                        <Image
                            src={abImg3}
                            alt="Building structures with letters"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            placeholder="blur"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
