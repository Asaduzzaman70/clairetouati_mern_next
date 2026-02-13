export function CommunityInclusionSection() {
    return (
        <section className="w-full bg-[#6930C3] py-24 px-6 md:px-12 lg:px-24 text-white">
            <div className="container mx-auto flex flex-col items-center text-center space-y-12">

                <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-80">
                    COMMUNITY & INCLUSION
                </span>

                <h2 className="text-4xl md:text-5xl font-normal">
                    Color outside the lines
                </h2>

                <p className="text-lg md:text-xl font-light max-w-3xl leading-relaxed opacity-90">
                    Turrim is a living ecosystem where freedom, structure, imagination, and
                    science meet. Tools children freely assemble play knows no boundaries.
                </p>

                <div className="w-full max-w-2xl bg-white/10 rounded-2xl p-10 md:p-14 backdrop-blur-sm mt-8 border border-white/10">
                    <blockquote className="space-y-6">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed">
                            “It's not just about learning. It's about
                            rediscovering the feeling of being capable.”
                        </p>
                        <footer className="text-base md:text-lg opacity-80">
                            — User, occupational therapist
                        </footer>
                    </blockquote>
                </div>

            </div>
        </section>
    );
}
