import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function CourseDescription() {
    const learningPoints = [
        "Inclusive classroom techniques",
        "Behavior management strategies",
        "Lesson adaptation methods",
        "Student engagement approaches"
    ]

    return (
        <div className="bg-[#F8F8F8] rounded-[2rem] p-8 md:p-5 space-y-4">
            {/* Section 1: Course Description */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground tracking-tight">
                    Course Description
                </h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-5xl">
                    Teaching students with special needs requires patience, adaptability, and the right instructional techniques. This course is designed to help educators develop inclusive teaching strategies, improve classroom confidence, and effectively support diverse learners.
                </p>
            </div>

            {/* Section 2: What you'll learn */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground tracking-tight">
                    What you&apos;ll learn in this course?
                </h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-5xl">
                    Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.
                </p>

                {/* Checklist */}
                <div className="flex flex-col gap-4 pt-2">
                    {learningPoints.map((point, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-[#42A547] fill-[#42A547]/10" />
                            <span className="text-sm text-[#42A547]">
                                {point}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 3: Extra Info */}
            <div className="pt-2">
                <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-5xl">
                    Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn.
                </p>
            </div>
        </div>
    )
}