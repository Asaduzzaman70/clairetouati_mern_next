import CourseDescription from "./CourseDescription";
import CourseDetailsHero from "./CourseDetailsHero";
import CourseTabs from "./CourseTabs";
import CourseCurriculum from "./CourseCurriculum";

export default function CourseMainDetails() {
    return (
        <div className="flex flex-col gap-2">
            <CourseDetailsHero />
            <CourseTabs />
            <CourseDescription />
            <CourseCurriculum />
        </div>
    )
}