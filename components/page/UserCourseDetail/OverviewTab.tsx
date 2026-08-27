import { CircleCheck } from "lucide-react";

export default function OverviewTab() {
    const learningPoints = [
        "Inclusive classroom techniques",
        "Behavior management strategies",
        "Lesson adaptation methods",
        "Student engagement approaches"
    ];

    return (
        <div className="bg-[#F4F4F4] p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-4xl shadow-sm border border-gray-100/50 w-full overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#111111] mb-3 sm:mb-5 tracking-tight">Course Description</h2>

            <p className="text-[#6B7280] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-5 sm:mb-6">
                Teaching students with special needs requires patience, adaptability, and the right instructional techniques.
                This course is designed to help educators develop inclusive teaching strategies, improve classroom confidence,
                and effectively support diverse learners.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#111111] mb-3 sm:mb-4 tracking-tight">What you&apos;ll learn in this course?</h3>

            <p className="text-[#6B7280] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-4 sm:mb-5">
                Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.
            </p>

            <ul className="space-y-2.5 sm:space-y-3.5 mb-5 sm:mb-6">
                {learningPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-2.5 sm:gap-3 text-[#4CAF50] font-semibold text-xs sm:text-sm md:text-[15px]">
                        <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-[#4CAF50] text-white stroke-[2.5px] shrink-0" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>

            <p className="text-[#6B7280] text-xs sm:text-sm md:text-[15px] leading-relaxed">
                Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan. Dorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magn.
            </p>
        </div>
    );
}
