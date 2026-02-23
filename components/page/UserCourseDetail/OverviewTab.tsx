import { CircleCheck } from "lucide-react";

export default function OverviewTab() {
    const learningPoints = [
        "Inclusive classroom techniques",
        "Behavior management strategies",
        "Lesson adaptation methods",
        "Student engagement approaches"
    ];

    return (
        <div className="bg-[#F4F4F4] p-5 rounded-[20px] shadow-sm border border-gray-100/50">
            <h2 className="text-2xl font-bold text-[#111111] mb-6 tracking-tight">Course Description</h2>

            <p className="text-[#6B7280] text-[15px] leading-relaxed mb-8">
                Teaching students with special needs requires patience, adaptability, and the right instructional techniques.
                This course is designed to help educators develop inclusive teaching strategies, improve classroom confidence,
                and effectively support diverse learners.
            </p>

            <h3 className="text-xl font-bold text-[#111111] mb-5 tracking-tight">What you&apos;ll learn in this course?</h3>

            <p className="text-[#6B7280] text-[15px] leading-relaxed mb-6">
                Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.
            </p>

            <ul className="space-y-4 mb-8">
                {learningPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 text-[#4CAF50] font-semibold text-[15px]">
                        <CircleCheck className="w-6 h-6 fill-[#4CAF50] text-white stroke-[2.5px]" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>

            <p className="text-[#6B7280] text-[15px] leading-relaxed">
                Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan. Dorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magn.
            </p>
        </div>
    );
}

