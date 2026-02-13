export function ScienceOfPlaySection() {
    const cards = [
        {
            title: "Cognitive development",
            description: "Understanding through movement."
        },
        {
            title: "Emotional balance",
            description: "Touch reduces stress and creates calm."
        },
        {
            title: "Creative expression",
            description: "To give form to ideas without constraint."
        },
        {
            title: "Link & community",
            description: "Learning together, giving further."
        }
    ];

    return (
        <section className="w-full bg-[#FFD600] py-24 px-6 md:px-12 lg:px-24 text-[#1A1A2E]">
            <div className="container mx-auto flex flex-col items-center text-center space-y-16">

                {/* Header Content */}
                <div className="space-y-6 max-w-4xl">
                    <span className="text-sm font-medium tracking-widest uppercase opacity-80">
                        The Science of Play
                    </span>

                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-normal leading-tight">
                        Curiosity is not a childish impulse — <br className="hidden md:block" />
                        it's a superpower of the brain.
                    </h2>

                    <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto opacity-90">
                        Turrim creates simple tools that transform curiosity into connection. From the
                        classroom to the rehabilitation clinic, our objects invite everyone to explore, build,
                        and marvel.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[20px] p-8 text-left h-full flex flex-col justify-start space-y-3 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-bold text-black">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 text-base leading-snug">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
