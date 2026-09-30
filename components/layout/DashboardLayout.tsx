"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, GraduationCap, Settings, LogOut, Bell, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.png'
import userAvatar from '@/assets/user.jpg'
import LanguageToggle from '@/components/shared/LanguageToggle'

// --- Types & Constants ---

const sidebarLinks = [
    {
        name: 'Dashboard',
        href: '/dashboard/overview',
        icon: LayoutDashboard,
    },
    // Course feature commented out for this version
    // {
    //     name: 'My Courses',
    //     href: '/dashboard/my-courses',
    //     icon: GraduationCap,
    // },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
    },
]

const headerContent: Record<string, { title: string; description: string }> = {
    '/dashboard/overview': {
        title: 'Dashboard Overview',
        description: "Access all the courses you've joined and continue your learning journey at your own pace."
    },
    '/dashboard/my-courses': {
        title: 'My Courses',
        description: "Keep track of your progress and manage your enrolled courses."
    },
    '/dashboard/settings': {
        title: 'Account Settings',
        description: "Manage your profile, preferences, and account security."
    },
    '/dashboard/notifications': {
        title: 'Notification',
        description: "Stay updated with the latest activity and announcements."
    }
}

// --- Sub-Components ---

const SidebarItem = ({
    link,
    isActive,
    index,
    onClick
}: {
    link: typeof sidebarLinks[0];
    isActive: boolean;
    index: number;
    onClick?: () => void;
}) => {
    const Icon = link.icon
    return (
        <Link href={link.href} onClick={onClick} className="relative">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={cn(
                    "flex items-center gap-3.5 px-4 py-3 rounded-xl transition-colors duration-200 z-10 relative group",
                    isActive
                        ? "text-[#064228] font-semibold"
                        : "text-white/80 hover:text-white"
                )}
                whileTap={{ scale: 0.98 }}
            >
                <Icon className={cn(
                    "w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-colors duration-200",
                    isActive ? "text-[#064228]" : "text-white/60 group-hover:text-white"
                )} />
                <span className="text-base sm:text-lg lg:text-xl font-medium tracking-wide">
                    {link.name}
                </span>

                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                )}
            </motion.div>
        </Link>
    )
}

const SidebarContent = ({
    pathname,
    onLinkClick,
    showCloseButton,
    onClose
}: {
    pathname: string;
    onLinkClick?: () => void;
    showCloseButton?: boolean;
    onClose?: () => void;
}) => {
    return (
        <div className="h-full w-full flex flex-col justify-between bg-[#064228] text-white select-none">
            <div>
                {/* Logo Section */}
                <div className="px-6 py-5 sm:py-6 flex items-center justify-between">
                    <Link
                        href="/dashboard/overview"
                        onClick={onLinkClick}
                        className="flex items-center gap-2.5 sm:gap-3 group"
                    >
                        <motion.div
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0"
                        >
                            <Image
                                src={logo}
                                alt="Turrim Logo"
                                width={44}
                                height={44}
                                priority
                                className="object-contain"
                            />
                        </motion.div>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-none">
                            turrim
                        </span>
                    </Link>

                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer lg:hidden"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-white/10" />

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1.5 px-4 py-6">
                    {sidebarLinks.map((link, index) => (
                        <SidebarItem
                            key={link.name}
                            link={link}
                            isActive={pathname.startsWith(link.href)}
                            index={index}
                            onClick={onLinkClick}
                        />
                    ))}
                </nav>
            </div>

            {/* Authentication / Logout Button - Commented out for this version */}
            {/*
            <div className="p-4 border-t border-white/10">
                <button
                    className="w-full flex items-center justify-start gap-3.5 px-4 py-3 rounded-xl bg-black/15 hover:bg-black/30 transition-all duration-300 group border border-white/5 cursor-pointer"
                >
                    <LogOut className="w-5 h-5 text-[#ef4444] transition-transform group-hover:-translate-x-1" />
                    <span className="text-base sm:text-lg font-medium tracking-wide text-[#ef4444]">
                        Logout
                    </span>
                </button>
            </div>
            */}
        </div>
    )
}

const Header = ({
    pathname,
    onMenuClick
}: {
    pathname: string;
    onMenuClick: () => void;
}) => {
    const currentHeader = headerContent[pathname] || {
        title: sidebarLinks.find(l => pathname.startsWith(l.href))?.name || 'Dashboard',
        description: 'Welcome back to your learning space.'
    }

    return (
        <header className="px-6 md:px-8 py-4 sm:py-5 flex items-center justify-between bg-white border-b border-zinc-100 sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Mobile Hamburger Toggle Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer shrink-0"
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="flex flex-col">
                    <motion.h1
                        key={`title-${pathname}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 tracking-tight"
                    >
                        {currentHeader.title}
                    </motion.h1>
                    <motion.p
                        key={`desc-${pathname}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-xs sm:text-sm md:text-base hidden sm:block truncate max-w-md lg:max-w-xl"
                    >
                        {currentHeader.description}
                    </motion.p>
                </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4">
                <LanguageToggle variant="mobile" />
                <Link href="/dashboard/notifications">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#064228] transition-colors cursor-pointer border border-slate-200/60"
                        aria-label="Notifications"
                    >
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 border-2 border-white rounded-full" />
                    </motion.button>
                </Link>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-100 shadow-sm overflow-hidden cursor-pointer shrink-0"
                >
                    <Image
                        src={userAvatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
        </header>
    )
}

// --- Main Layout ---

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    // Close mobile drawer on route change
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileOpen])

    return (
        <div className="flex h-screen w-full bg-[#f8f9fa] overflow-hidden">
            {/* Desktop Fixed Sidebar */}
            <aside className="hidden lg:flex w-72 xl:w-80 h-full shrink-0 z-20 border-r border-black/5">
                <SidebarContent pathname={pathname} />
            </aside>

            {/* Mobile Off-Canvas Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
                            aria-hidden="true"
                        />

                        {/* Sliding Sidebar */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 280 }}
                            className="fixed top-0 bottom-0 left-0 w-72 sm:w-80 h-full z-50 shadow-2xl lg:hidden flex flex-col"
                        >
                            <SidebarContent
                                pathname={pathname}
                                onLinkClick={() => setMobileOpen(false)}
                                showCloseButton={true}
                                onClose={() => setMobileOpen(false)}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main data-lenis-prevent className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-[#f8f9fa] flex flex-col min-w-0">
                <Header pathname={pathname} onMenuClick={() => setMobileOpen(true)} />

                {/* Page Content */}
                <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}