"use client"
import MyCoursesStpes from "@/components/page/MyCourses/MyCoursesStpes";
import SearchBar from "@/components/shared/SearchBar";

export default function MyCoursesPage() {
    return (
        <section className="w-full space-y-8">
            <SearchBar />
            {/* Course feature commented out for this version */}
            {/* <MyCoursesStpes /> */}
        </section>
    );
}