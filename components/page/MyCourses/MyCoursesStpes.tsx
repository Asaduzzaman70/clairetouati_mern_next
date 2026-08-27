"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import EnrolledCourses from "./EnrolledCourses";
import ActiveCourses from "./ActiveCourses";
import CompletedCourses from "./CompletedCourses";

const tabs = [
    { id: "enrolled", label: "Enrolled Courses" },
    { id: "active", label: "Active Courses" },
    { id: "completed", label: "Completed Courses" },
];

export default function MyCoursesStpes() {
    const [activeTab, setActiveTab] = useState("active");

    let content;
    switch (activeTab) {
        case "enrolled":
            content = <EnrolledCourses />;
            break;
        case "active":
            content = <ActiveCourses />;
            break;
        case "completed":
            content = <CompletedCourses />;
            break;
    }

    return (
        <section className="w-full">
            {/* Tabs Header */}
            <div className="relative border-b-2 sm:border-b-4 border-[#2D5A43]/10 overflow-x-auto overflow-y-hidden">
                <div className="flex items-center gap-3 sm:gap-6 md:gap-8 min-w-max sm:min-w-0 -mb-[2px]">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative pb-3 sm:pb-4 px-3 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg font-medium transition-colors whitespace-nowrap outline-none cursor-pointer",
                                    isActive ? "text-[#2D5A43] font-semibold" : "text-[#7E7E80] hover:text-[#4A7A61]"
                                )}
                            >
                                <span>{tab.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 sm:h-1 bg-[#2D5A43] rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Section */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="py-6 sm:py-8 md:py-10"
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
