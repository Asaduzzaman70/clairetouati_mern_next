"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import owner from "@/assets/owner.jpg";

export function ContactSection() {
    return (
        <section className="min-h-screen w-full bg-white font-sans py-10 sm:py-14 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Header Section */}
                <div className="mb-8 sm:mb-12 md:mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold tracking-tight text-[#1F2937] leading-tight mb-2 sm:mb-3"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl"
                    >
                        Need help? Send us a message anytime.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
                    {/* Left Section: Form Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl md:rounded-[32px] p-5 sm:p-8 md:p-10 lg:p-14 border border-zinc-100/80 shadow-sm"
                    >
                        <form className="space-y-4 sm:space-y-6 md:space-y-7" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full h-12 sm:h-13 md:h-13.5 px-4 sm:px-5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-12 sm:h-13 md:h-13.5 px-4 sm:px-5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Enter your subject"
                                    className="w-full h-12 sm:h-13 md:h-13.5 px-4 sm:px-5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Type your message"
                                    className="w-full p-4 sm:p-5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400 resize-none min-h-30 sm:min-h-35"
                                ></textarea>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="pt-2 sm:pt-4"
                            >
                                <Button
                                    className="w-full h-12 sm:h-13 md:h-15 bg-[#1F2937] hover:bg-[#111827] text-white rounded-xl sm:rounded-[14px] text-base sm:text-lg font-bold transition-all border-none shadow-sm cursor-pointer"
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
                        className="relative aspect-4/3 sm:aspect-square md:aspect-5/6 w-full max-w-150 mx-auto rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-sm"
                    >
                        <Image
                            src={owner}
                            alt="Get In Touch"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
