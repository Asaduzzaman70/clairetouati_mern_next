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
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
            </header>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2">
                <div className="flex items-center">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative py-3.5 px-8 text-lg font-medium transition-all duration-300 outline-none",
                                    isActive
                                        ? "text-[#2D5A43]"
                                        : "text-[#7E7E80] hover:text-[#4A7A61]"
                                )}
                            >
                                <span className="relative z-10">{tab.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSettingsTab"
                                        className="absolute -bottom-0.5 left-0 right-0 h-1 bg-[#2D5A43]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="py-9"
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}