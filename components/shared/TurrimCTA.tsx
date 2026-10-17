import Image from "next/image";
import Link from "next/link";
import bgImage from "@/assets/bg_image.jpg";

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
            <div className="relative z-10 px-4 max-w-full text-center">
                <Link href="/checkout" className="inline-block">
                    <button
                        className="group relative overflow-hidden bg-black text-white px-8 py-4 sm:px-12 sm:py-5 md:px-16 md:py-6 lg:px-20 lg:py-7 rounded-xl md:rounded-2xl hover:bg-zinc-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-normal tracking-wide shadow-2xl hover:shadow-black/50 cursor-pointer text-xl sm:text-2xl md:text-3xl lg:text-4xl select-none"
                        aria-label={content}
                    >
                        {/* Shimmer Glow Sweep (Left to Right) */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 -left-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12 transition-transform duration-1000 ease-out group-hover:translate-x-[200%]"
                        />
                        <span className="relative z-10">{content}</span>
                    </button>
                </Link>
            </div>
        </section>
    );
}
