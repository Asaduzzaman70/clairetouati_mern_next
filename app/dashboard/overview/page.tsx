"use client"

import ProgressCourses from '@/components/page/Overview/ProgressCourses'
import { StatsSection } from '@/components/page/Overview/StatsSection'

export default function OverviewPage() {
    return (
        <section className="w-full space-y-8">
            <StatsSection />
            <ProgressCourses />
        </section>
    )
}