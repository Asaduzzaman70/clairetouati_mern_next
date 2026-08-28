"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Video from "./Vidoe";
import { cn } from "@/lib/utils";
import ResourceTab from "./ResourceTab";
import OverviewTab from "./OverviewTab";

export default function CourseVideo() {
    const [activeTab, setActiveTab] = useState('Overview')
    const tabs = ['Overview', 'Resource']

    let content;

    switch (activeTab) {
        case "Overview":
            content = <OverviewTab />;
            break;
        case "Resource":
            content = <ResourceTab />;
            break;
    }

    return (
        <div className="space-y-6 sm:space-y-8 w-full">
            <Video />

            <div className="flex flex-col gap-4 sm:gap-6">
                {/* Tabs Header */}
                <div className="flex items-center gap-2.5 sm:gap-3 py-2 sm:py-4 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "relative px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 z-10 cursor-pointer whitespace-nowrap",
                                activeTab === tab
                                    ? "bg-[#FFF9F4] text-foreground font-bold"
                                    : "bg-[#FFF9F4] text-foreground/80 hover:bg-[#FFF9F4]/60"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeVideoTab"
                                    className="absolute inset-0 rounded-full bg-[#dffada] -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-25">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                        >
                            {content}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
