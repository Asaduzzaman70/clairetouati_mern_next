"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ForgotPasswordPage = () => {
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push('/verify-otp')
    }

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
                        Forgot Your Password
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-lg"
                    >
                        Enter your email to reset your password.
                    </motion.p>
                </div>

                <form className="space-y-10" onSubmit={handleSubmit}>
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

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <Button
                            type="submit"
                            className="w-full h-[64px] bg-[#1F2937] hover:bg-[#111827] text-white rounded-full text-xl font-bold transition-all border-none"
                        >
                            Sent OTP
                        </Button>
                    </motion.div>
                </form>

                <div className="mt-8 flex justify-end">
                    <Link href="/sign-in" className="text-[16px] font-bold text-[#1F2937] hover:underline underline-offset-4 decoration-2 transition-all">
                        Go back to sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default ForgotPasswordPage
