"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

interface BreadCrumbProps {
    courseTitle?: string
}

const BreadCrumb = ({ courseTitle }: BreadCrumbProps) => {
    const router = useRouter()
    const params = useParams()

    // Extract courseId from URL and format it if no explicit title is provided
    // e.g. "mastering-special-needs" -> "Mastering Special Needs"
    const displayTitle = courseTitle || (typeof params?.courseId === 'string'
        ? params.courseId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "Course Details")

    return (
        <div className="flex items-center gap-4 py-8">
            <button
                onClick={() => router.back()}
                className="p-1 hover:bg-secondary rounded-full transition-colors group"
                aria-label="Go back"
            >
                <ArrowLeft className="w-6 h-6 text-foreground/70 group-hover:text-foreground" />
            </button>
            <div className="flex items-center gap-2 text-lg text-muted-foreground/80 font-medium tracking-tight">
                <Link href="/course" className="hover:text-foreground transition-colors">
                    Course
                </Link>
                <span className="text-muted-foreground/40 font-light">/</span>
                <span className="text-foreground font-semibold">
                    {displayTitle}
                </span>
            </div>
        </div>
    )
}

export default BreadCrumb
