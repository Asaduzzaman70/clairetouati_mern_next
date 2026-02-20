import CourseMainDetails from "@/components/page/CourseDetails/CourseMainDetails";
import BreadCrumb from "@/components/shared/BreadCrumb";

export default function CourseDetail() {
    return (
        <div className="container mx-auto px-4 py-4 min-h-screen">
            <BreadCrumb />
            <CourseMainDetails />
        </div>
    )
}