import CourseVideo from "@/components/page/UserCourseDetail/CourseVideo";
import CourseVideoList from "@/components/page/UserCourseDetail/CourseVideoList";

export default function UserCourseDetailPage() {
    return (
        <section className="w-full space-y-8">
            <div className="flex gap-8">
                <div className="flex-3">
                    <CourseVideo />
                </div>
                <div className="flex-2">
                    <CourseVideoList />
                </div>
            </div>
        </section>
    );
}