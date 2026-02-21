"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
            <div className="relative border-b-4 border-[#2D5A43]/10">
                <div className="flex items-center gap-12 overflow-x-auto no-scrollbar -mb-[3px]">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative pb-4 text-base md:text-lg font-medium transition-colors whitespace-nowrap outline-none px-20",
                                    isActive ? "text-[#2D5A43]" : "text-[#7E7E80] hover:text-[#4A7A61]"
                                )}
                            >
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute -bottom-px left-0 right-0 h-1 bg-[#2D5A43]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Placeholder */}
            <motion.div
                key={activeTab}
                className="py-10"
            >
                <div>
                    {content}
                </div>
            </motion.div>
        </section>
    );
}
