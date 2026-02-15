"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import owner from '@/assets/owner.jpg'

const ContactPage = () => {
    return (
        <div className="min-h-screen w-full bg-white font-sans py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="mb-12 md:mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[40px] md:text-[48px] font-bold tracking-tight text-[#1F2937] mb-3"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-slate-500 text-lg md:text-xl"
                    >
                        Need help? Send us a message anytime.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
                    {/* Left Section: Form Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#F9FAFB] rounded-[32px] p-8 md:p-14 border border-zinc-50"
                    >
                        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-[15px] font-semibold text-slate-700 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="enter your full name"
                                    className="w-full h-[54px] px-5 bg-white border border-zinc-200 rounded-[12px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-base placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[15px] font-semibold text-slate-700 ml-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="enter your email"
                                    className="w-full h-[54px] px-5 bg-white border border-zinc-200 rounded-[12px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-base placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[15px] font-semibold text-slate-700 ml-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="enter your subject"
                                    className="w-full h-[54px] px-5 bg-white border border-zinc-200 rounded-[12px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-base placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[15px] font-semibold text-slate-700 ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="type your message"
                                    className="w-full p-5 bg-white border border-zinc-200 rounded-[12px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-base placeholder:text-slate-400 resize-none min-h-[140px]"
                                ></textarea>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="pt-6"
                            >
                                <Button
                                    className="w-full h-[60px] bg-[#1F2937] hover:bg-[#111827] text-white rounded-[14px] text-lg font-bold transition-all border-none"
                                >
                                    Submit
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>

                    {/* Right Section: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative aspect-square md:aspect-5/6 w-full max-w-[600px] mx-auto rounded-[40px] overflow-hidden shadow-sm"
                    >
                        <Image
                            src={owner}
                            alt="Get In Touch"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
