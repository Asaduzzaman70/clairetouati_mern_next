"use client";

import { useState } from "react";
import { X, ChevronDown, Play, Square, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
    {
        id: 1,
        title: "Section 1: Introduction",
        stats: "0/16 6hr 25min",
        videos: [
            { id: 1, title: "Introduction", duration: "31min", completed: true, active: true },
            { id: 2, title: "Introduction to workspace", duration: "21min", completed: false },
            { id: 3, title: "Importing basics", duration: "6min", completed: false },
            { id: 4, title: "Project panel", duration: "14min", completed: false },
            { id: 5, title: "Source panel", duration: "23min", completed: false },
            { id: 6, title: "Timeline panel", duration: "39min", completed: false },
            { id: 7, title: "Introduction", duration: "31min", completed: false },
            { id: 8, title: "Creating new sequence and program monitor", duration: "31min", completed: false },
            { id: 9, title: "Selection tool and move forward & backward tool", duration: "31min", completed: false },
            { id: 10, title: "Ripple edit, rolling edit tool and rate stretch tool", duration: "31min", completed: false },
            { id: 11, title: "Introduction", duration: "31min", completed: false },
            { id: 12, title: "Pen tool & shape tools", duration: "31min", completed: false },
        ]
    },
    {
        id: 2,
        title: "Section 2: Practical Exercises",
        stats: "0/16 6hr 25min",
        videos: [
            { id: 1, title: "Introduction", duration: "31min", completed: true, active: false },
            { id: 2, title: "Introduction to workspace", duration: "21min", completed: false },
            { id: 3, title: "Importing basics", duration: "6min", completed: false },
            { id: 4, title: "Project panel", duration: "14min", completed: false },
            { id: 5, title: "Source panel", duration: "23min", completed: false },
            { id: 6, title: "Timeline panel", duration: "39min", completed: false },
            { id: 7, title: "Introduction", duration: "31min", completed: false },
            { id: 8, title: "Creating new sequence and program monitor", duration: "31min", completed: false },
            { id: 9, title: "Selection tool and move forward & backward tool", duration: "31min", completed: false },
            { id: 10, title: "Ripple edit, rolling edit tool and rate stretch tool", duration: "31min", completed: false },
            { id: 11, title: "Introduction", duration: "31min", completed: false },
            { id: 12, title: "Pen tool & shape tools", duration: "31min", completed: false },
        ]
    }
];

export default function CourseVideoList() {
    const [openSections, setOpenSections] = useState<number[]>([1]);

    const toggleSection = (id: number) => {
        setOpenSections(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-[#F4F4F4] rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden flex flex-col h-fit border border-gray-200/50 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
                <div className="relative pt-3.5 pb-2.5 sm:pt-4 sm:pb-3">
                    <span className="text-[#0D4D36] font-semibold text-xs sm:text-sm cursor-pointer">Course content</span>
                    <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#0D4D36] rounded-full" />
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer" aria-label="Close panel">
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            {/* Scrollable List Area */}
            <div data-lenis-prevent className="max-h-[420px] sm:max-h-[500px] lg:max-h-[calc(100vh-200px)] overflow-y-auto">
                {sections.map((section) => (
                    <div key={section.id} className="flex flex-col border-b border-gray-200/50 last:border-0">
                        {/* Section Header */}
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex items-center justify-between p-4 sm:p-5 md:p-6 bg-white hover:bg-gray-50 transition-colors text-left cursor-pointer"
                        >
                            <div>
                                <h3 className="text-[#111111] font-bold text-sm sm:text-[15px] tracking-tight">{section.title}</h3>
                                <p className="text-[#6B7280] text-[11px] sm:text-xs mt-0.5 sm:mt-1 font-semibold">{section.stats}</p>
                            </div>
                            <motion.div
                                animate={{ rotate: openSections.includes(section.id) ? 180 : 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            </motion.div>
                        </button>

                        {/* Video List with Smooth Transition */}
                        <AnimatePresence initial={false}>
                            {openSections.includes(section.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="overflow-hidden bg-[#F4F4F4]"
                                >
                                    {section.videos.map((video, index) => (
                                        <div
                                            key={video.id}
                                            className={cn(
                                                "group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 px-4 sm:px-6 transition-all duration-200 cursor-pointer",
                                                video.active ? "bg-[#E5E5E5]" : "hover:bg-gray-100/40"
                                            )}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {video.completed ? (
                                                    <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111] fill-transparent" />
                                                ) : (
                                                    <Square className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className={cn(
                                                    "text-xs sm:text-sm font-medium leading-snug truncate",
                                                    video.active ? "text-[#111111] font-semibold" : "text-[#6B7280]"
                                                )}>
                                                    {index + 1}. {video.title}
                                                </h4>
                                                <div className="flex items-center gap-1.5 mt-1.5 text-[#6B7280]">
                                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center rounded-full border border-gray-300">
                                                        <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current ml-0.5" />
                                                    </div>
                                                    <span className="text-[10px] sm:text-[11px] font-semibold">{video.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
