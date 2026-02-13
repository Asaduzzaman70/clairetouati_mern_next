"use client";

export function PlayroomSection() {
    return (
        <section className="w-full bg-white py-20 md:py-32">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    {/* Left Column - Large Letter A */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-12 md:p-20">
                        <div className="relative">
                            <svg
                                viewBox="0 0 400 400"
                                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <text
                                    x="50%"
                                    y="50%"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    className="fill-[#9B8B2E] font-bold"
                                    style={{
                                        fontSize: "520px",
                                        fontFamily: "system-ui, -apple-system, sans-serif",
                                        fontWeight: 900,
                                    }}
                                >
                                    A
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="flex flex-col space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                            DISCOVER OUR THREE
                            <br />
                            DIMENSIONAL GAME ROOM
                        </h2>

                        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                            Before you get your hands on Turrim, here's a first glimpse of our three
                            dimensional alphabet. A space to explore, manipulate with your eyes, understand
                            how a shape becomes a gesture and how a gesture powers the way of learning.
                            The Playroom is a gateway: a testing ground where you begin to feel what makes
                            Turrim so different, so vibrant, so intuitive.
                        </p>

                        <div className="pt-4">
                            <button className="bg-gray-200 hover:bg-gray-300 text-black px-8 py-3 rounded-md transition-colors duration-300 font-medium text-sm md:text-base">
                                Enter the playroom
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
