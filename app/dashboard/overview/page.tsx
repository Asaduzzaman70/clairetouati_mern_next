"use client"

// Course feature commented out for this version
// import ProgressCourses from '@/components/page/Overview/ProgressCourses'
import SearchBar from '@/components/shared/SearchBar'
import { StatsSection } from '@/components/page/Overview/StatsSection'

export default function OverviewPage() {
    return (
        <section className="w-full space-y-8">
            <SearchBar />
            <StatsSection />
            {/* Course feature commented out for this version */}
            {/* <ProgressCourses /> */}
        </section>
    )
}