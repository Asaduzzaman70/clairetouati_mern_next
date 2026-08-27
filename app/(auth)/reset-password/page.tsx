"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, EyeOff, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="min-h-screen w-full flex items-center justify-center py-8 px-4 sm:p-6 md:p-8 font-sans bg-white sm:bg-transparent">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[#F9FAFB] rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-10 md:p-14 border border-zinc-100/80 shadow-sm"
            >
                <div className="mb-8 sm:mb-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-2xl sm:text-3xl md:text-[40px] font-bold tracking-tight text-[#1F2937] leading-tight mb-2 sm:mb-3"
                    >
                        Set a New Password
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-zinc-500 text-sm sm:text-base md:text-lg"
                    >
                        Secure your account with a strong password.
                    </motion.p>
                </div>

                <form className="space-y-4 sm:space-y-6 md:space-y-7" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-[#374151] ml-1">New Password</label>
                        <div className="relative group">
                            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#1F2937] transition-colors">
                                <Lock className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full h-13 sm:h-15 pl-12 sm:pl-15 pr-12 sm:pr-14 bg-white border border-zinc-200 rounded-xl sm:rounded-[18px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937] text-base sm:text-lg placeholder:text-zinc-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#1F2937] transition-colors cursor-pointer p-1"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <Eye className="w-5 h-5 sm:w-5.5 sm:h-5.5" /> : <EyeOff className="w-5 h-5 sm:w-5.5 sm:h-5.5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-[#374151] ml-1">Confirm Password</label>
                        <div className="relative group">
                            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#1F2937] transition-colors">
                                <Lock className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full h-13 sm:h-15 pl-12 sm:pl-15 pr-12 sm:pr-14 bg-white border border-zinc-200 rounded-xl sm:rounded-[18px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937] text-base sm:text-lg placeholder:text-zinc-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#1F2937] transition-colors cursor-pointer p-1"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <Eye className="w-5 h-5 sm:w-5.5 sm:h-5.5" /> : <EyeOff className="w-5 h-5 sm:w-5.5 sm:h-5.5" />}
                            </button>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="pt-2 sm:pt-4"
                    >
                        <Button
                            className="w-full h-13 sm:h-15 md:h-16 bg-[#1F2937] hover:bg-[#111827] text-white rounded-full text-base sm:text-lg md:text-xl font-bold transition-all border-none shadow-sm cursor-pointer"
                        >
                            Reset Password
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    )
}

export default ResetPasswordPage
