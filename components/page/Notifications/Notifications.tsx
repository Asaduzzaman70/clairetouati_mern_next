"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    type NotificationItem,
    groupNotifications,
    formatRelativeTime
} from "@/utils/notification-utils";

// Flat data
const notifications: NotificationItem[] = [
    {
        id: "1",
        title: "New Lesson Added",
        description: "Discover the latest lesson on understanding different types of special needs.",
        createdAt: new Date().toISOString(), // Today
    },
    {
        id: "2",
        title: "New Assignment Available",
        description: "Case study assignment is now open for submission.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4h ago (Today)
    },
    {
        id: "3",
        title: "New Assignment Available",
        description: "Case study assignment is now open for submission.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4h ago (Today)
    },
    {
        id: "4",
        title: "Appointment with Dr. Lector",
        description: "Your appointment is 30min from now",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // 25h ago (Yesterday)
    },
    {
        id: "5",
        title: "Course Completion",
        description: "Congratulations! Download your certificate for completing the course.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 28h ago (Yesterday)
    },
    {
        id: "6",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
    {
        id: "7",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
    {
        id: "8",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
    {
        id: "9",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
    {
        id: "10",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
    {
        id: "11",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
    {
        id: "12",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
    {
        id: "13",
        title: "Upcoming Live Session",
        description: "Join the live session on strategies for special needs learners.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1w ago (Earlier)
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export default function Notifications() {
    const groupedNotifications = useMemo(() => groupNotifications(notifications), []);

    return (
        <section className="w-full">
            <header className="mb-5 sm:mb-8">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
                >
                    Notification
                </motion.h1>
            </header>

            <div className="space-y-8 sm:space-y-10 md:space-y-12">
                <AnimatePresence mode="popLayout">
                    {groupedNotifications.map((group) => (
                        <motion.div
                            key={group.category}
                            layout
                            initial="hidden"
                            whileInView="show"
                            exit={{ opacity: 0, scale: 0.95 }}
                            viewport={{ once: true, margin: "-40px" }}
                            variants={containerVariants}
                            className="space-y-3.5 sm:space-y-5"
                        >
                            <motion.h2
                                layout="position"
                                className="text-base sm:text-lg md:text-xl font-semibold text-foreground flex items-center gap-2"
                            >
                                {group.category}
                                <span className="text-muted-foreground font-normal text-sm sm:text-base">({group.items.length})</span>
                            </motion.h2>

                            <div className="space-y-2.5 sm:space-y-3.5">
                                {group.items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        variants={itemVariants}
                                        whileTap={{ scale: 0.99 }}
                                        className={cn(
                                            "bg-[#F3F4F6] hover:bg-slate-100/90 transition-all duration-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 cursor-pointer border border-transparent hover:border-gray-200/50 shadow-xs",
                                            "dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:hover:border-slate-800"
                                        )}
                                    >
                                        <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                                            <h3 className="font-semibold text-foreground text-base sm:text-lg md:text-xl leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                                                {item.description}
                                            </p>
                                        </div>
                                        <span className="text-muted-foreground text-[11px] sm:text-xs md:text-sm whitespace-nowrap self-start sm:self-auto font-medium shrink-0 pt-0.5 sm:pt-0">
                                            {formatRelativeTime(item.createdAt)}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}