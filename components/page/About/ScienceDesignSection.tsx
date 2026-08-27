export function ScienceDesignSection() {
    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 text-center">
            <div className="container max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8">

                <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
                    SCIENCE & DESIGN
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1A1A2E] tracking-tight leading-tight px-2">
                    Wonder, scientifically organized
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed px-2">
                    Our creations are tested and refined with professionals in the field.
                    Each object follows the essential principles of neuroscience and
                    development.
                </p>

                {/* Feature Points */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 py-4 sm:py-6 md:py-8 w-full">
                    <div className="flex items-center gap-2.5 sm:gap-3 bg-zinc-50 sm:bg-transparent px-4 py-2.5 sm:p-0 rounded-full sm:rounded-none">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FFD600] shrink-0" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">From curiosity to motor skills</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 bg-zinc-50 sm:bg-transparent px-4 py-2.5 sm:p-0 rounded-full sm:rounded-none">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FF8A50] shrink-0" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">From play to trust</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 bg-zinc-50 sm:bg-transparent px-4 py-2.5 sm:p-0 rounded-full sm:rounded-none">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0056D2] shrink-0" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">From exploration towards autonomy</span>
                    </div>
                </div>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#1A1A2E] font-normal pt-2 sm:pt-4 max-w-2xl px-2">
                    Science becomes accessible and a source of wonder.
                </p>

            </div>
        </section>
    );
}
