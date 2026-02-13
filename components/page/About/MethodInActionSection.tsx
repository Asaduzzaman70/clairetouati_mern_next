export function MethodInActionSection() {
    const cards = [
        {
            borderTopColor: "border-t-[#FFD600]", // Yellow
            title: "At school",
            description: "Cooperating, solving problems, and focusing through play."
        },
        {
            borderTopColor: "border-t-[#0056D2]", // Blue
            title: "At home",
            description: "Rediscovering the joy of being together and understanding."
        },
        {
            borderTopColor: "border-t-[#007F3E]", // Green
            title: "In rehabilitation",
            description: "Movement, confidence and motivation through simple, tactile gestures."
        }
    ];

    return (
        <section className="w-full bg-[#FAFAFA] py-24 px-6 md:px-12 lg:px-24">
            <div className="container mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-6">
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
                        THE METHOD IN ACTION
                    </span>
                    <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A2E]">
                        From discovery to reconstruction
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border-t-8 ${card.borderTopColor} h-64 flex flex-col justify-start space-y-4`}
                        >
                            <h3 className="text-xl font-bold text-[#1A1A2E]">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
