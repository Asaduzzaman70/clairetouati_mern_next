export function ScienceDesignSection() {
    return (
        <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 text-center">
            <div className="container mx-auto flex flex-col items-center space-y-8">

                <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
                    SCIENCE & DESIGN
                </span>

                <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A2E]">
                    Wonder, scientifically organized
                </h2>

                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    Our creations are tested and refined with professionals in the field.
                    Each object follows the essential principles of neuroscience and
                    development.
                </p>

                {/* Bullet Points */}
                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-12 py-8">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#FFD600]" />
                        <span className="text-gray-700 font-medium">From curiosity to motor skills</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#FF8A50]" />
                        <span className="text-gray-700 font-medium">From play to trust</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#0056D2]" />
                        <span className="text-gray-700 font-medium">From exploration towards autonomy</span>
                    </div>
                </div>

                <p className="text-2xl md:text-3xl text-[#1A1A2E] font-normal pt-4">
                    Science becomes accessible and a source of wonder.
                </p>

            </div>
        </section>
    );
}
