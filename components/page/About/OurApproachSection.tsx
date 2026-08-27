export function OurApproachSection() {
    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="container mx-auto flex flex-col items-center text-center space-y-10 sm:space-y-14 md:space-y-18">

                {/* Header */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-3xl">
                    <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
                        OUR APPROACH
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#2D2D2D] tracking-tight leading-tight">
                        Where curiosity meets structure
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        An invisible architecture guides every decision: how we learn, move, and change.
                        Turrim combines play, science, and design to create a robust and vibrant
                        framework.
                    </p>
                </div>

                {/* Principles */}
                <div className="w-full space-y-8 sm:space-y-10 md:space-y-12">
                    <h3 className="text-lg sm:text-xl font-normal text-[#2D2D2D]">
                        Our three principles
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8 max-w-md sm:max-w-none mx-auto">
                        {/* Principle 1 */}
                        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
                            <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#0056D2] flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-light shadow-sm transition-transform hover:scale-105 duration-300">
                                1
                            </div>
                            <p className="text-gray-600 font-medium text-sm sm:text-base max-w-xs">
                                The body learns before the mind.
                            </p>
                        </div>

                        {/* Principle 2 */}
                        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
                            <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#6930C3] flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-light shadow-sm transition-transform hover:scale-105 duration-300">
                                2
                            </div>
                            <p className="text-gray-600 font-medium text-sm sm:text-base max-w-xs">
                                The body learns before the mind.
                            </p>
                        </div>

                        {/* Principle 3 */}
                        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
                            <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#007F3E] flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-light shadow-sm transition-transform hover:scale-105 duration-300">
                                3
                            </div>
                            <p className="text-gray-600 font-medium text-sm sm:text-base max-w-xs">
                                The body learns before the mind.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
