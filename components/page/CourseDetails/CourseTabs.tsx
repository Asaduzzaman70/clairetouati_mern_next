"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const CourseTabs = () => {
    const [activeTab, setActiveTab] = useState('Overview')
    const tabs = ['Overview', 'Resource']

    return (
        <div className="flex items-center gap-3 py-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "relative px-7 py-2.5 rounded-full text-base font-semibold transition-all duration-300",
                        activeTab === tab
                            ? "bg-[#dffada] text-foreground"
                            : "bg-[#F9F9F9] text-foreground/80 hover:bg-secondary/40"
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
    )
}

export default CourseTabs
