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
        <div className="space-y-8">
            <Video />

            <div className="flex flex-col gap-6">
                {/* Tabs Header */}
                <div className="flex items-center gap-3 py-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "relative px-7 py-3 rounded-full text-lg font-semibold transition-all duration-300 z-10",
                                activeTab === tab
                                    ? "bg-[#FFF9F4] text-foreground"
                                    : "bg-[#FFF9F4] text-foreground/80 hover:bg-[#FFF9F4]/40"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-full bg-[#dffada] -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-2 min-h-[100px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {content}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
