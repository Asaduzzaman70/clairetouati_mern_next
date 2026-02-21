"use client"

import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, CircleCheck } from 'lucide-react'

const stats = [
    {
        label: 'Enrolled Courses',
        value: '03',
        icon: GraduationCap,
    },
    {
        label: 'Active Courses',
        value: '01',
        icon: BookOpen,
    },
    {
        label: 'Completed Courses',
        value: '02',
        icon: CircleCheck,
    },
]

export const StatsSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-between"
                    >
                        {/* Icon Container */}
                        <div className="w-20 h-20 rounded-full bg-[#E8F0EA] flex items-center justify-center mb-10">
                            <Icon className="w-10 h-10 text-[#064228]" />
                        </div>

                        {/* Info Container */}
                        <div className="w-full flex items-end justify-between">
                            <span className="text-slate-500 text-lg font-medium">
                                {stat.label}
                            </span>
                            <span className="text-4xl font-bold text-[#1E293B] tabular-nums">
                                {stat.value}
                            </span>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
