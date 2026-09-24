import ActionButtonSection from "@/components/page/CourseDetails/ActionButtonSection";
import { TurrimCTA } from "@/components/shared/TurrimCTA";

export default function CourseDetailLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="flex gap-14 container mx-auto px-4">
                <div className="flex-7">
                    {children}
                </div>
                {/* Course feature commented out for this version */}
                {/*
                <div className="flex-3">
                    <ActionButtonSection />
                </div>
                */}
            </div>
            <TurrimCTA content="Randcandintheir Tinrrim" />
        </section>
    )
}