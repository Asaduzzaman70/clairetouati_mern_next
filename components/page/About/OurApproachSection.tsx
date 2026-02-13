export function OurApproachSection() {
    return (
        <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24">
            <div className="container mx-auto flex flex-col items-center text-center space-y-20">

                {/* Header */}
                <div className="space-y-6 max-w-3xl">
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
                        OUR APPROACH
                    </span>
                    <h2 className="text-4xl md:text-5xl font-normal text-[#2D2D2D]">
                        Where curiosity meets structure
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        An invisible architecture guides every decision: how we learn, move, and change.
                        Turrim combines play, science, and design to create a robust and vibrant
                        framework.
                    </p>
                </div>

                {/* Principles */}
                <div className="w-full space-y-12">
                    <h3 className="text-xl font-normal text-[#2D2D2D]">
                        Our three principles
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {/* Principle 1 */}
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-24 h-24 rounded-full bg-[#0056D2] flex items-center justify-center text-white text-5xl font-light">
                                1
                            </div>
                            <p className="text-gray-600 font-medium max-w-xs">
                                The body learns before the mind.
                            </p>
                        </div>

                        {/* Principle 2 */}
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-24 h-24 rounded-full bg-[#6930C3] flex items-center justify-center text-white text-5xl font-light">
                                2
                            </div>
                            <p className="text-gray-600 font-medium max-w-xs">
                                The body learns before the mind.
                            </p>
                        </div>

                        {/* Principle 3 */}
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-24 h-24 rounded-full bg-[#007F3E] flex items-center justify-center text-white text-5xl font-light">
                                3
                            </div>
                            <p className="text-gray-600 font-medium max-w-xs">
                                The body learns before the mind.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
