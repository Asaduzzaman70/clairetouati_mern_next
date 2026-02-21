"use client"

import ProgressCourses from '@/components/page/Overview/ProgressCourses'
import SearchBar from '@/components/page/Overview/SearchBar'
import { StatsSection } from '@/components/page/Overview/StatsSection'

export default function OverviewPage() {
    return (
        <section className="w-full space-y-8">
            <SearchBar />
            <StatsSection />
            <ProgressCourses />
        </section>
    )
}