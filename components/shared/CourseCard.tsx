"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, BookOpen, Play, MessageCircle, Presentation, Download, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface CourseCardProps {
    course: {
        id: string | number
        title: string
        description: string
        category: string
        rating: number
        reviews?: number | string
        image: string
        // Public specific
        price?: number
        // Dashboard specific
        progress?: number
        duration?: string
        lessons?: string
    }
    variant?: 'public' | 'dashboard'
    index?: number
}

const CourseCard = ({ course, variant = 'public', index = 0 }: CourseCardProps) => {
    const isDashboard = variant === 'dashboard'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "rounded-[2rem] p-6 border shadow-sm flex flex-col gap-5 h-full transition-all duration-300",
                isDashboard ? "bg-white border-slate-100" : "bg-[#FBF9F7] border-border/40"
            )}
        >
            {/* Image Container */}
            <div className={cn(
                "relative w-full overflow-hidden group rounded-2xl",
                isDashboard ? "aspect-[4/3]" : "aspect-[16/9]"
            )}>
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Category and Rating */}
            <div className="flex items-center justify-between">
                <span className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-full",
                    isDashboard ? "bg-[#E8F0EA] text-[#064228]" : "bg-[#dffada] text-foreground"
                )}>
                    {course.category}
                </span>
                <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-slate-900 font-bold">
                        ({course.rating} {isDashboard ? (course.reviews || 'Reviews') : 'Reviews'})
                    </span>
                </div>
            </div>

            {/* Title and Description */}
            <div className="flex flex-col gap-2">
                <h3 className={cn(
                    "font-bold text-slate-900 leading-tight tracking-tight",
                    isDashboard ? "text-2xl" : "text-xl font-medium"
                )}>
                    {course.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {course.description}
                </p>
            </div>

            {/* Middle Section: Progress (Dashboard) or Perks (Public) */}
            {isDashboard ? (
                <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-900 font-bold">Progress</span>
                            <span className="text-slate-900 font-bold">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
                                className="h-full bg-green-500 rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-slate-50 pt-4">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Clock className="w-5 h-5" />
                            <span className="text-sm font-medium">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <BookOpen className="w-5 h-5" />
                            <span className="text-sm font-medium">{course.lessons}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-2">
                    <PerkItem icon={MessageCircle} label="Expert Guidance" />
                    <PerkItem icon={BookOpen} label="Interactive Lessons" />
                    <PerkItem icon={Presentation} label="Real Classroom" />
                    <PerkItem icon={Download} label="Resources" />
                </div>
            )}

            {/* Action Section */}
            <div className="mt-auto pt-4">
                {isDashboard ? (
                    <button className="w-full bg-[#0a0a0a] text-white py-4 rounded-full flex items-center justify-center gap-3 hover:bg-black/90 transition-all duration-300 group">
                        <div className="w-6 h-6 flex items-center justify-center border border-white/20 rounded-sm">
                            <Play className="w-3.5 h-3.5 fill-white" />
                        </div>
                        <span className="text-lg font-medium">Continue Learning</span>
                    </button>
                ) : (
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-semibold text-[#1da824]">${course.price}</span>
                            <span className="text-sm font-medium text-muted-foreground">/m</span>
                        </div>
                        <Link href={`/course/${course.id}`} className="flex-1">
                            <Button className="rounded-full bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/90 px-6 py-6 gap-3 text-base font-semibold shadow-xl w-full">
                                Enrol Now
                                <div className="bg-white p-1 rounded-full">
                                    <ArrowUpRight className="w-4 h-4 text-[#0a0a0a]" />
                                </div>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

const PerkItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className="flex items-start gap-2.5 text-foreground/70">
        <div className="bg-secondary/50 p-1.5 rounded-lg shrink-0">
            <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm truncate">{label}</span>
    </div>
)

export default CourseCard
