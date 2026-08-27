"use client";

import Image from "next/image";
import { Star, Clock, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export interface Course {
    id: number;
    title: string;
    category: string;
    rating: number;
    reviews: number;
    description: string;
    progress: number;
    duration: string;
    lessons: string;
    image: string;
}

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <motion.div
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl sm:rounded-[2rem] p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-3.5 sm:gap-4 group hover:shadow-md transition-shadow duration-300"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-video sm:aspect-4/2 rounded-xl sm:rounded-[0.8rem] overflow-hidden group">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            {/* Category & Rating */}
            <div className="flex items-center justify-between gap-2">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#dffada] text-[#064228] text-xs sm:text-sm font-medium rounded-full truncate">
                    {course.category}
                </span>
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs sm:text-sm text-foreground font-medium">({course.rating} Reviews)</span>
                </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground leading-snug tracking-tight">
                    {course.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed line-clamp-2 font-normal">
                    {course.description}
                </p>
            </div>

            {/* Progress Section */}
            <div className="flex flex-col gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-[#242628] font-medium">Progress</span>
                    <span className="text-slate-900 font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full h-2 sm:h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-[#4CAF50] rounded-full"
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-2 sm:mb-4 pt-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#7E7E80]">
                    <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#7E7E80]">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#7E7E80]">
                    <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#7E7E80]">{course.lessons}</span>
                </div>
            </div>

            {/* Action Button */}
            <Link href={`/dashboard/my-courses/${course.id}`} className="w-full">
                <Button
                    size="lg"
                    className="w-full bg-[#0F0F0F] hover:bg-black text-white rounded-full gap-2.5 font-medium transition-all active:scale-[0.98] h-11 sm:h-12 text-sm sm:text-base shadow-sm cursor-pointer"
                >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white stroke-white" />
                    Continue Learning
                </Button>
            </Link>
        </motion.div>
    );
}
