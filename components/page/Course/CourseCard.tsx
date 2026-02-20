"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, MessageCircle, BookOpen, Presentation, Download, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CourseCardProps {
    course: {
        id: string
        title: string
        description: string
        category: string
        rating: number
        reviews: number
        price: number
        image: string
    }
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ transition: { duration: 0.2 } }}
            className="bg-[#FBF9F7] rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/40 flex flex-col gap-4 h-full"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-4/2 rounded-[0.8rem] overflow-hidden group">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Category and Rating */}
            <div className="flex items-center justify-between">
                <span className="px-4 py-2 bg-[#dffada] text-foreground text-[1em] rounded-full">
                    {course.category}
                </span>
                <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-[1em] text-foreground">({course.rating} Reviews)</span>
                </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
                <h3 className="text-xl font-medium text-foreground leading-[1.2] tracking-tight">
                    {course.title}
                </h3>
                <p className="text-[1em] text-muted-foreground/80 leading-relaxed line-clamp-2">
                    {course.description}
                </p>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                <div className="flex items-start gap-2.5 text-foreground/70">
                    <div className="bg-secondary/50 p-1.5 rounded-lg">
                        <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[1em]">Expert Guidance</span>
                </div>
                <div className="flex items-start gap-2.5 text-foreground/70">
                    <div className="bg-secondary/50 p-1.5 rounded-lg">
                        <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-[1em]">Interactive Lessons</span>
                </div>
                <div className="flex items-start gap-2.5 text-foreground/70">
                    <div className="bg-secondary/50 p-1.5 rounded-lg">
                        <Presentation className="w-4 h-4" />
                    </div>
                    <span className="text-[1em]">Real Classroom Scenarios</span>
                </div>
                <div className="flex items-start gap-2.5 text-foreground/70">
                    <div className="bg-secondary/50 p-1.5 rounded-lg">
                        <Download className="w-4 h-4" />
                    </div>
                    <span className="text-[1em]">Downloadable Resources</span>
                </div>
            </div>

            {/* Footer: Price and Button */}
            <div className="flex items-center justify-between gap-10 mt-auto pt-4">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-[#1da824]">${course.price}</span>
                    <span className="text-sm font-medium text-muted-foreground">/m</span>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                    <Link href={`/course/${course.id}`}>
                        <Button className="rounded-full bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/90 px-6 py-6 gap-3 text-base font-semibold shadow-xl w-full">
                            Enrol Now
                            <div className="bg-white p-1 rounded-full">
                                <ArrowUpRight className="w-4 h-4 text-[#0a0a0a]" />
                            </div>
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default CourseCard
