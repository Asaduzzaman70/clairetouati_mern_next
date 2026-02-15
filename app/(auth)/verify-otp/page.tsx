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
        <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[#F9FAFB] rounded-[32px] p-10 md:p-14 text-center"
            >
                <div className="mb-12 text-left">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[40px] font-bold tracking-tight text-[#1F2937] leading-tight mb-3"
                    >
                        Verify Your Code
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-lg"
                    >
                        Enter the 6-digit code sent to your email.
                    </motion.p>
                </div>

                <div className="flex justify-center gap-3 mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { (inputRefs.current[index] = el) }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-16 h-16 md:w-20 md:h-20 text-center text-2xl font-bold bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1F2937]/5 focus:border-[#1F2937] transition-all text-[#1F2937]"
                        />
                    ))}
                </div>

                <div className="mb-12 text-center text-[16px] text-zinc-500">
                    Didn&apos;t receive the code?{' '}
                    <button className="font-bold text-[#1F2937] hover:underline underline-offset-4 decoration-2 transition-all ml-1">
                        Resend
                    </button>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <Button
                        onClick={() => router.push('/reset-password')}
                        className="w-full h-[64px] bg-[#1F2937] hover:bg-[#111827] text-white rounded-full text-xl font-bold transition-all border-none"
                    >
                        Verify Code
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default VerifyOtpPage
