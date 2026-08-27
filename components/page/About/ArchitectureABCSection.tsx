import Image from "next/image";
import abImg1 from "@/assets/ab_img_1.png";
import abImg2 from "@/assets/ab_img_2.png";
import abImg3 from "@/assets/ab_img_3.png";

export function ArchitectureABCSection() {
    return (
        <section className="w-full bg-white py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="container mx-auto space-y-8 sm:space-y-10 md:space-y-12">

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-normal text-[#2D2D2D] leading-snug sm:leading-tight tracking-tight px-2">
                    Before Turrim, there was — <br className="hidden sm:inline" />
                    the ABCs of architecture
                </h2>

                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-sm sm:max-w-none mx-auto">
                    <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gray-50 shadow-sm group">
                        <Image
                            src={abImg1}
                            alt="The ABCs of architecture kit"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            placeholder="blur"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                    </div>
                    <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gray-50 shadow-sm group">
                        <Image
                            src={abImg2}
                            alt="Wooden architecture letters"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            placeholder="blur"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                    </div>
                    <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gray-50 shadow-sm group sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none md:w-full">
                        <Image
                            src={abImg3}
                            alt="Building structures with letters"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            placeholder="blur"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
