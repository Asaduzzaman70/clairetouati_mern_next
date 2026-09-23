import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CallToActionSection() {
    return (
        <section className="w-full bg-[#0056D2] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 text-center text-white">
            <div className="container max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10">

                <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-80">
                    CALL TO ACTION
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight px-2">
                    Ready to rediscover your sense of wonder?
                </h2>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light opacity-90 max-w-2xl leading-relaxed px-2">
                    Discover our kits and join the Turrim community: where learning and
                    rebuilding intertwine.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4 w-full sm:w-auto">
                    <Button
                        asChild
                        variant="secondary"
                        className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl bg-[#E5E5E5] text-[#1A1A2E] hover:bg-white w-full sm:w-auto"
                    >
                        <Link href="/playroom">
                            Explore our universe
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl border-white/30 text-white hover:bg-white/10 bg-transparent w-full sm:w-auto"
                    >
                        <Link href="/contact">
                            Contact us
                        </Link>
                    </Button>
                </div>

            </div>
        </section>
    );
}
