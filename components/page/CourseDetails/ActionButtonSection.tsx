"use client"

import { motion } from 'framer-motion'
import { MessageCircle, FileEdit, BookOpen, BarChart3, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ActionButtonSection = () => {
    const perks = [
        { icon: MessageCircle, text: "Expert Support" },
        { icon: FileEdit, text: "Practical Teaching Strategies" },
        { icon: BookOpen, text: "60+ Video Lessons" },
        { icon: BarChart3, text: "Progress Tracking" },
    ]

    return (
        <div className="bg-[#f0f0f0] p-5 rounded-[20px] flex flex-col gap-6 sticky top-28 mb-14">
            {/* Price section */}
            <div className="bg-[#618d5e] p-5 rounded-[16px] text-white flex flex-col gap-3">
                <p className="text-lg font-semibold opacity-90">This Course Fee</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-[40px] font-semibold">$ 25</span>
                </div>
            </div>

            {/* Perks section */}
            <div className="bg-white p-5 rounded-[16px] flex flex-col gap-6">
                {perks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-4 text-foreground/80">
                        <perk.icon className="w-6 h-6 stroke-[1.5]" />
                        <span className="text-base leading-tight">{perk.text}</span>
                    </div>
                ))}
            </div>

            {/* Button Section */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-black text-white hover:bg-black/90 rounded-full h-auto py-3.5 text-lg font-semibold flex items-center group">
                    <span>Start Learning</span>
                    <div className="bg-white p-2 rounded-full transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="w-6 h-6 text-black" />
                    </div>
                </Button>
            </motion.div>
        </div>
    )
}

export default ActionButtonSection