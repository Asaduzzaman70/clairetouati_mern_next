import CourseVideo from "@/components/page/UserCourseDetail/CourseVideo";
import CourseVideoList from "@/components/page/UserCourseDetail/CourseVideoList";

export default function UserCourseDetailPage() {
    return (
        <section className="w-full space-y-6 sm:space-y-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                <div className="w-full lg:flex-3 min-w-0">
                    <CourseVideo />
                </div>
                <div className="w-full lg:flex-2 min-w-0">
                    <CourseVideoList />
                </div>
            </div>
        </section>
    );
}