"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, EyeOff, Eye, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

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
                        Welcome Back
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-lg"
                    >
                        Log in to continue your journey.
                    </motion.p>
                </div>

                <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2.5">
                        <label className="text-[15px] font-semibold text-[#374151] ml-1">Email</label>
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#1F2937] transition-colors">
                                <Mail size={22} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-[60px] pl-[60px] pr-6 bg-white border border-zinc-200 rounded-[18px] focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937] text-lg placeholder:text-zinc-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[15px] font-semibold text-[#374151] ml-1">Password</label>
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

                    <div className="flex items-center justify-between pt-1">
                        <div
                            onClick={() => setRememberMe(!rememberMe)}
                            className="flex items-center gap-3 cursor-pointer group select-none"
                        >
                            <div
                                className={cn(
                                    "w-[22px] h-[22px] rounded-md border transition-all flex items-center justify-center",
                                    rememberMe
                                        ? "bg-[#22C55E] border-[#22C55E] text-white shadow-lg shadow-green-500/20"
                                        : "bg-white border-zinc-300 group-hover:border-zinc-400"
                                )}
                            >
                                {rememberMe && <Check size={16} strokeWidth={3} />}
                            </div>
                            <span className="text-[15px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">Remember Me</span>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-[15px] font-bold text-[#F59E0B] hover:text-[#D97706] transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.01, y: 0 }}
                        whileTap={{ scale: 0.99, y: 0 }}
                        className="pt-4"
                    >
                        <Button
                            className="w-full h-[64px] bg-[#1F2937] hover:bg-[#111827] text-white rounded-full text-xl font-bold transition-all border-none"
                        >
                            Sign In
                        </Button>
                    </motion.div>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[16px] text-zinc-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/sign-up" className="font-bold text-[#1F2937] hover:underline underline-offset-4 decoration-2 transition-all ml-1">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default SignInPage
