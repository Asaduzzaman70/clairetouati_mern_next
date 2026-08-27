"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ProfileSettingsForm from "./ProfileSettingsForm";
import PasswordSettingsForm from "./PasswordSettingsForm";

const tabs = [
    { id: "profile", label: "Profile Settings" },
    { id: "password", label: "Password Settings" },
];

export default function SettingsTabSection() {
    const [activeTab, setActiveTab] = useState("profile");

    let content;

    switch (activeTab) {
        case "profile":
            content = <ProfileSettingsForm />;
            break;
        case "password":
            content = <PasswordSettingsForm />;
            break;
    }

    return (
        <section className="w-full">
            <header className="mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
            </header>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-1 sm:px-2 overflow-x-auto overflow-y-hidden">
                <div className="flex items-center min-w-max sm:min-w-0">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative py-2.5 sm:py-3.5 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 outline-none cursor-pointer whitespace-nowrap",
                                    isActive
                                        ? "text-[#2D5A43] font-semibold"
                                        : "text-[#7E7E80] hover:text-[#4A7A61]"
                                )}
                            >
                                <span className="relative z-10">{tab.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSettingsTab"
                                        className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#2D5A43] rounded-full"
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
                    className="py-4 sm:py-6 md:py-9"
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}