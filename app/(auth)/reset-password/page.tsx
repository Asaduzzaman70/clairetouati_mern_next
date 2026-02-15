"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, EyeOff, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[#F9FAFB] rounded-[32px] p-10 md:p-14"
            >
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[40px] font-bold tracking-tight text-[#1F2937] leading-tight mb-3"
                    >
                        Set a New Password
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-lg"
                    >
                        Secure your account with a strong password.
                    </motion.p>
                </div>

                <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2.5">
                        <label className="text-[15px] font-semibold text-[#374151] ml-1">New Password</label>
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#1F2937] transition-colors">
                                <Lock size={22} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full h-[60px] pl-[60px] pr-14 bg-white border border-zinc-200 rounded-[18px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937] text-lg placeholder:text-zinc-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#1F2937] transition-colors"
                            >
                                {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[15px] font-semibold text-[#374151] ml-1">Confirm Password</label>
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#1F2937] transition-colors">
                                <Lock size={22} />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full h-[60px] pl-[60px] pr-14 bg-white border border-zinc-200 rounded-[18px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937] text-lg placeholder:text-zinc-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#1F2937] transition-colors"
                            >
                                {showConfirmPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                            </button>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="pt-4"
                    >
                        <Button
                            className="w-full h-[64px] bg-[#1F2937] hover:bg-[#111827] text-white rounded-full text-xl font-bold transition-all border-none"
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
