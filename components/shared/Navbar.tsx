"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Navbar = () => {
    const [isEnglish, setIsEnglish] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsScrolled(scrollY.get() > 10);
    }, [scrollY]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150 && !mobileMenuOpen) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsScrolled(latest > 10);
    });

    // Close mobile menu on resize to desktop breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent background scroll when mobile drawer is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { label: isEnglish ? "Who are we?" : "Qui sommes-nous ?", href: "/about" },
        // Course feature commented out for this version
        // { label: isEnglish ? "Who It's for?" : "Pour qui ?", href: "/course" },
    ];

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: "-100%", opacity: 0 },
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className={cn(
                    "sticky top-0 left-0 right-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b transition-colors duration-300",
                    isScrolled
                        ? "border-black/4 dark:border-white/8"
                        : "border-transparent"
                )}
            >
                <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4 lg:py-5">
                    {/* Desktop Left Section */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                        {navLinks.map((link) => (
                            <motion.div key={link.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link href={link.href}>
                                    <Button variant="secondary" className="font-semibold text-base xl:text-lg h-11 px-4 xl:px-5 rounded-full cursor-pointer">
                                        {link.label}
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Left: Hamburger Button + Logo */}
                    <div className="flex lg:hidden items-center gap-3">
                        <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() => setMobileMenuOpen(true)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-foreground hover:bg-zinc-200 transition-colors focus:outline-none cursor-pointer"
                            aria-label="Open navigation menu"
                        >
                            <Menu className="w-5 h-5" />
                        </motion.button>

                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                        >
                            <div className="w-9 h-9 flex items-center justify-center relative">
                                <Image
                                    src={logo}
                                    alt="Turrim Logo"
                                    width={36}
                                    height={36}
                                    priority
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tighter text-foreground">
                                turrim
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Center Section (Logo) */}
                    <Link
                        href="/"
                        className="hidden lg:flex items-center gap-2.5 md:gap-3 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative">
                            <Image
                                src={logo}
                                alt="Turrim Logo"
                                width={48}
                                height={48}
                                priority
                                className="object-contain"
                            />
                        </div>
                        <span className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                            turrim
                        </span>
                    </Link>

                    {/* Desktop Right Section */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/playroom">
                                <Button variant="secondary" className="font-semibold text-base xl:text-lg h-11 px-4 xl:px-5 rounded-full cursor-pointer">
                                    Enter the playroom
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Get Turrim CTA Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/checkout">
                                <Button variant="outline" className="font-semibold text-base xl:text-lg h-11 px-4 xl:px-5 rounded-full cursor-pointer">
                                    {isEnglish ? "Get Turrim" : "Obtenir Turrim"}
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Sign Up commented out for this version */}
                        {/*
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/sign-up">
                                <Button variant="default" className="font-semibold text-base xl:text-lg h-11 px-5 xl:px-6 rounded-full shadow-sm cursor-pointer">
                                    Sign Up
                                </Button>
                            </Link>
                        </motion.div>
                        */}

                        {/* Language Switcher */}
                        <div className="flex items-center bg-secondary rounded-full p-1 gap-1 ml-1 xl:ml-2 relative overflow-hidden">
                            <button
                                onClick={() => setIsEnglish(true)}
                                className={cn(
                                    "w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-sm xl:text-base font-medium transition-colors relative z-10 cursor-pointer",
                                    isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                EN
                                {isEnglish && (
                                    <motion.div
                                        layoutId="lang-bg-desktop"
                                        className="absolute inset-0 bg-[#1da824] rounded-full shadow-md -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setIsEnglish(false)}
                                className={cn(
                                    "w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-sm xl:text-base font-medium transition-colors relative z-10 cursor-pointer",
                                    !isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                FR
                                {!isEnglish && (
                                    <motion.div
                                        layoutId="lang-bg-desktop"
                                        className="absolute inset-0 bg-[#1da824] rounded-full shadow-md -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Right: Quick Language Switcher */}
                    <div className="flex lg:hidden items-center gap-2">
                        <div className="flex items-center bg-secondary rounded-full p-0.5 gap-0.5 relative overflow-hidden">
                            <button
                                onClick={() => setIsEnglish(true)}
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors relative z-10 cursor-pointer",
                                    isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                EN
                                {isEnglish && (
                                    <motion.div
                                        layoutId="lang-bg-mobile-bar"
                                        className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setIsEnglish(false)}
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors relative z-10 cursor-pointer",
                                    !isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                FR
                                {!isEnglish && (
                                    <motion.div
                                        layoutId="lang-bg-mobile-bar"
                                        className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Left Slide-in Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden flex">
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Slide-in Left Drawer Panel */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 260 }}
                            data-lenis-prevent
                            className="relative w-[85%] max-w-85 sm:max-w-95 h-full bg-white dark:bg-zinc-950 text-foreground shadow-2xl flex flex-col justify-between z-10 overflow-hidden border-r border-border"
                        >
                            {/* Drawer Top Header */}
                            <div className="p-5 border-b border-border/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2.5"
                                >
                                    <div className="w-9 h-9 flex items-center justify-center relative">
                                        <Image
                                            src={logo}
                                            alt="Turrim Logo"
                                            width={36}
                                            height={36}
                                            priority
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tighter text-foreground">
                                        turrim
                                    </span>
                                </Link>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-9 h-9 rounded-full flex items-center justify-center bg-zinc-200/80 dark:bg-zinc-800 text-foreground hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* Drawer Navigation Links */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
                                        Menu
                                    </p>

                                    <Link
                                        href="/about"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-all group"
                                    >
                                        <span className="text-base font-semibold text-foreground">
                                            {isEnglish ? "Who are we?" : "Qui sommes-nous ?"}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                                    </Link>

                                    {/* Course feature commented out for this version */}
                                    {/*
                                    <Link
                                        href="/course"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-all group"
                                    >
                                        <span className="text-base font-semibold text-foreground">
                                            {isEnglish ? "Who It's for?" : "Pour qui ?"}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                                    </Link>
                                    */}

                                    <Link
                                        href="/playroom"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-all group text-left w-full cursor-pointer"
                                    >
                                        <span className="text-base font-semibold text-foreground">
                                            {isEnglish ? "Enter the playroom" : "Entrer dans la salle de jeu"}
                                        </span>
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                    </Link>
                                </div>

                                <div className="h-px w-full bg-border" />

                                <div className="space-y-3">
                                    <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                                        <Button variant="outline" className="w-full h-12 rounded-xl text-base font-semibold border-zinc-300 dark:border-zinc-700">
                                            {isEnglish ? "Get Turrim" : "Obtenir Turrim"}
                                        </Button>
                                    </Link>
                                    {/* Sign Up commented out for this version */}
                                    {/*
                                    <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                                        <Button variant="default" className="w-full h-12 rounded-xl text-base font-semibold bg-[#1F2937] hover:bg-black text-white shadow-md">
                                            {isEnglish ? "Sign Up" : "S'inscrire"}
                                        </Button>
                                    </Link>
                                    */}
                                </div>
                            </div>

                            {/* Drawer Bottom Language & Info */}
                            <div className="p-5 border-t border-border bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Globe className="w-4 h-4" />
                                    <span>Language</span>
                                </div>

                                <div className="flex items-center bg-zinc-200 dark:bg-zinc-800 rounded-full p-1 gap-1 relative overflow-hidden">
                                    <button
                                        onClick={() => setIsEnglish(true)}
                                        className={cn(
                                            "w-9 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors relative z-10 cursor-pointer",
                                            isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        EN
                                        {isEnglish && (
                                            <motion.div
                                                layoutId="lang-bg-drawer"
                                                className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setIsEnglish(false)}
                                        className={cn(
                                            "w-9 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors relative z-10 cursor-pointer",
                                            !isEnglish ? "text-white" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        FR
                                        {!isEnglish && (
                                            <motion.div
                                                layoutId="lang-bg-drawer"
                                                className="absolute inset-0 bg-[#1da824] rounded-full shadow-sm -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
