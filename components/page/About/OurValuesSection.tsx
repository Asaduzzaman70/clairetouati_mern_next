export function OurValuesSection() {
    const values = [
        {
            bgColor: "bg-[#FFD600]", // Yellow
            title: "Remarkable simplicity",
            description: "Structuring complexity into clarity.",
            textColor: "text-[#1A1A2E]"
        },
        {
            bgColor: "bg-[#FF8A50]", // Orange
            title: "Playful intelligence",
            description: "Learning by doing, not by force.",
            textColor: "text-[#1A1A2E]"
        },
        {
            bgColor: "bg-[#C8102E]", // Red
            title: "Kindness and integrity",
            description: "Respect and care at every step.",
            textColor: "text-white"
        },
        {
            bgColor: "bg-[#6930C3]", // Purple
            title: "Inclusion and accessibility",
            description: "Made for every body and mind.",
            textColor: "text-white"
        },
        {
            bgColor: "bg-[#0056D2]", // Blue
            title: "Transmission",
            description: "Knowledge shared, embodied, and transformed.",
            textColor: "text-white"
        },
        {
            bgColor: "bg-[#007F3E]", // Green
            title: "Joyful sustainability",
            description: "Objects designed to last, to be repaired and reused.",
            textColor: "text-white"
        }
    ];

    return (
        <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24">
            <div className="container mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
                        OUR VALUES
                    </span>
                    <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A2E]">
                        Our world in color
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((item, index) => (
                        <div
                            key={index}
                            className={`rounded-[20px] p-8 h-48 md:h-56 flex flex-col justify-end space-y-2 ${item.bgColor} ${item.textColor} transition-transform hover:scale-[1.02] duration-300`}
                        >
                            <h3 className="text-xl md:text-2xl font-bold">
                                {item.title}
                            </h3>
                            <p className="text-sm md:text-base opacity-90 font-medium">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
