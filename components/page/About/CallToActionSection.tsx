import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CallToActionSection() {
    return (
        <section className="w-full bg-[#0056D2] py-24 px-6 md:px-12 lg:px-24 text-center text-white">
            <div className="container mx-auto flex flex-col items-center space-y-10">

                <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-80">
                    CALL TO ACTION
                </span>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Ready to rediscover your sense of wonder?
                </h2>

                <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl leading-relaxed">
                    Discover our kits and join the Turrim community: where learning and
                    rebuilding intertwine.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <Button
                        asChild
                        variant="secondary"
                        className="h-14 px-8 text-lg font-semibold rounded-md bg-[#E5E5E5] text-[#1A1A2E] hover:bg-white"
                    >
                        <Link href="/products">
                            Explore our universe
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="h-14 px-8 text-lg font-semibold rounded-md border-white/30 text-white hover:bg-white/10 bg-transparent"
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
