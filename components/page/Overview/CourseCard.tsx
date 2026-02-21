"use client";

import Image from "next/image";
import { Star, Clock, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
            className="bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-4 group"
        >
            {/* Image Section */}
            {/* Image Container */}
            <div className="relative w-full aspect-4/2 rounded-[0.8rem] overflow-hidden group">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Category & Rating */}
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

            {/* Progress Section */}
            <div className="flex flex-col gap-2.5 mt-1">
                <div className="flex items-center justify-between text-xl">
                    <span className="text-[#242628] text-xl tracking-wider">Progress</span>
                    <span className="text-slate-900 text-xl">{course.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-[#4CAF50] rounded-full"
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-[#7E7E80]">
                    <Clock className="size-5" />
                    <span className="text-base text-[#7E7E80]">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-[#7E7E80]">
                    <BookOpen className="size-5" />
                    <span className="text-base text-[#7E7E80]">{course.lessons}</span>
                </div>
            </div>

            {/* Action Button */}
            <Button
                size="lg"
                className="w-full bg-[#0F0F0F] hover:bg-black text-white rounded-full gap-3 font-normal transition-all active:scale-[0.97] h-12! text-base"
            >
                <Play className="size-4 stroke-white text-white ml-0.5" />
                Continue Learning
            </Button>
        </motion.div>
    );
}
