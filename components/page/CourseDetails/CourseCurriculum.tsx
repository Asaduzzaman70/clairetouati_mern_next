"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Lesson {
    id: number
    title: string
}

interface Section {
    id: number
    title: string
    lessonCount: string
    lessons: Lesson[]
}

const curriculumData: Section[] = [
    {
        id: 1,
        title: "Section One - Foundations",
        lessonCount: "11/11",
        lessons: [
            { id: 1, title: "Introduction to Special Needs Education" },
            { id: 2, title: "Understanding Diverse Learning Needs" },
            { id: 3, title: "Types of Learning Differences" },
            { id: 4, title: "Recognizing Student Challenges" },
            { id: 5, title: "Classroom Barriers & Solutions" },
            { id: 6, title: "Role of an Inclusive Educator" },
            { id: 7, title: "Student Behavior Fundamentals" },
            { id: 8, title: "Building Supportive Learning Environments" },
            { id: 9, title: "Communication & Engagement Basics" },
            { id: 10, title: "Student Support Strategies" },
            { id: 11, title: "Foundations of Inclusive Teaching" },
        ]
    },
    {
        id: 2,
        title: "Section Two - Inclusive Teaching",
        lessonCount: "19/19",
        lessons: []
    },
    {
        id: 3,
        title: "Section Three - Behavior Support",
        lessonCount: "14/14",
        lessons: []
    },
    {
        id: 4,
        title: "Section Four - Student Engagement",
        lessonCount: "07/07",
        lessons: []
    },
    {
        id: 5,
        title: "Section Five - Practical Applications",
        lessonCount: "19/19",
        lessons: []
    },
    {
        id: 6,
        title: "Section Six - Teaching Resources",
        lessonCount: "09/09",
        lessons: []
    },
    {
        id: 7,
        title: "Section Seven - Professional Growth",
        lessonCount: "18/18",
        lessons: []
    }
]

const CourseCurriculum = () => {
    const [openSection, setOpenSection] = useState<number | null>(1)

    const toggleSection = (id: number) => {
        setOpenSection(openSection === id ? null : id)
    }

    return (
        <div className="flex flex-col gap-4 mt-8 pb-10">
            {curriculumData.map((section) => (
                <div
                    key={section.id}
                    className="bg-[#F8F8F8] rounded-[20px] overflow-hidden transition-all duration-300 border border-transparent hover:border-black/5"
                >
                    {/* Section Header */}
                    <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-5 md:py-6 md:px-6 text-left"
                    >
                        <h3 className="text-base md:text-xl font-semibold text-[#1E3A5F] tracking-tight">
                            {section.title}
                        </h3>
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-medium text-foreground/60">
                                {section.lessonCount}
                            </span>
                            {openSection === section.id ? (
                                <ChevronUp className="w-6 h-6 text-foreground/40" />
                            ) : (
                                <ChevronRight className="w-6 h-6 text-foreground/40" />
                            )}
                        </div>
                    </button>

                    {/* Lessons List */}
                    <AnimatePresence>
                        {openSection === section.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 md:px-6 pb-6 space-y-3">
                                    {section.lessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-start gap-3 group cursor-pointer"
                                        >
                                            <span className="text-sm text-muted-foreground min-w-[20px] pt-0.5">
                                                {lesson.id}.
                                            </span>
                                            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                                                {lesson.title}
                                            </span>
                                        </div>
                                    ))}
                                    {section.lessons.length === 0 && (
                                        <p className="text-sm text-muted-foreground italic">
                                            Lessons coming soon...
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

export default CourseCurriculum
