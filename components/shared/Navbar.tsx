"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Navbar = () => {
    const [isEnglish, setIsEnglish] = useState(true)

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 left-0 right-0 z-50 w-full bg-background/50 backdrop-blur-xl border-b border-border/50"
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-6">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/about">
                            <Button variant="secondary" className="font-semibold text-lg">
                                Who are we?
                            </Button>
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="secondary" className="font-semibold text-lg">
                            Who It&apos;s for?
                        </Button>
                    </motion.div>
                </div>

                {/* Center Section (Logo) */}
                <Link href="/" className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                    <div className="w-14 h-14 flex items-center justify-center relative">
                        <Image
                            src="/assets/logo.png"
                            alt="Turrim Logo"
                            width={56}
                            height={56}
                            priority
                            className="object-contain"
                        />
                    </div>
                    <span className="text-4xl font-bold tracking-tighter text-foreground">turrim</span>
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="secondary" className="font-semibold text-lg">
                            Enter the playroom
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="font-semibold text-lg">
                            Get Turim
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="default" className="font-semibold text-lg">
                            Sign Up
                        </Button>
                    </motion.div>

                    {/* Language Switcher */}
                    <div className="flex items-center bg-secondary rounded-full p-1 gap-1 ml-2 relative overflow-hidden">
                        <button
                            onClick={() => setIsEnglish(true)}
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-base transition-colors relative z-10",
                                isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            EN
                            {isEnglish && (
                                <motion.div
                                    layoutId="lang-bg"
                                    className="absolute inset-0 bg-[#1da824] rounded-full shadow-md -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setIsEnglish(false)}
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-base transition-colors relative z-10",
                                !isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            FR
                            {!isEnglish && (
                                <motion.div
                                    layoutId="lang-bg"
                                    className="absolute inset-0 bg-[#1da824] rounded-full shadow-md -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar
