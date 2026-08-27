"use client"

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const VerifyOtpPage = () => {
    const router = useRouter()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1)
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center py-8 px-4 sm:p-6 md:p-8 font-sans bg-white sm:bg-transparent">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[#F9FAFB] rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-10 md:p-14 text-center border border-zinc-100/80 shadow-sm"
            >
                <div className="mb-8 sm:mb-12 text-left">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-2xl sm:text-3xl md:text-[40px] font-bold tracking-tight text-[#1F2937] leading-tight mb-2 sm:mb-3"
                    >
                        Verify Your Code
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-zinc-500 text-sm sm:text-base md:text-lg"
                    >
                        Enter the 6-digit code sent to your email.
                    </motion.p>
                </div>

                {/* Responsive OTP Inputs Grid */}
                <div className="flex justify-center gap-1.5 sm:gap-2.5 md:gap-3 mb-6 sm:mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { (inputRefs.current[index] = el) }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-11 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 text-center text-lg sm:text-2xl font-bold bg-white border border-zinc-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937]"
                        />
                    ))}
                </div>

                <div className="mb-8 sm:mb-12 text-center text-xs sm:text-sm md:text-[16px] text-zinc-500">
                    Didn&apos;t receive the code?{' '}
                    <button className="font-bold text-[#1F2937] hover:underline underline-offset-4 decoration-2 transition-all ml-1 cursor-pointer">
                        Resend
                    </button>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <Button
                        onClick={() => router.push('/reset-password')}
                        className="w-full h-13 sm:h-15 md:h-16 bg-[#1F2937] hover:bg-[#111827] text-white rounded-full text-base sm:text-lg md:text-xl font-bold transition-all border-none shadow-sm cursor-pointer"
                    >
                        Verify Code
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default VerifyOtpPage
