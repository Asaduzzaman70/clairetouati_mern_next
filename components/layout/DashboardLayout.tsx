"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, GraduationCap, Settings, LogOut, Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.png'
import userAvatar from '@/assets/user.jpg'

// --- Types & Constants ---

const sidebarLinks = [
    {
        name: 'Dashboard',
        href: '/dashboard/overview',
        icon: LayoutDashboard,
    },
    {
        name: 'My Courses',
        href: '/dashboard/my-courses',
        icon: GraduationCap,
    },
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

const SidebarItem = ({ link, isActive, index }: { link: typeof sidebarLinks[0], isActive: boolean, index: number }) => {
    const Icon = link.icon
    return (
        <Link href={link.href} className="relative">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 z-10 relative group",
                    isActive
                        ? "text-[#064228]"
                        : "text-white/80 hover:text-white"
                )}
                whileTap={{ scale: 0.98 }}
            >
                <Icon className={cn(
                    "w-6 h-6 shrink-0 transition-colors duration-200",
                    isActive ? "text-[#064228]" : "text-white/40 group-hover:text-white"
                )} />
                <span className="text-xl font-medium tracking-wide">
                    {link.name}
                </span>

                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white rounded-lg shadow-lg shadow-black/20 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
            </motion.div>
        </Link>
    )
}

const Sidebar = ({ pathname }: { pathname: string }) => {
    return (
        <aside className="w-80 h-full flex flex-col bg-[#064228] text-white overflow-hidden shadow-2xl">
            {/* Logo Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-8 py-6 flex justify-center items-center"
            >
                <Link href="/dashboard/overview" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="w-12 h-12 flex items-center justify-center"
                    >
                        <Image
                            src={logo}
                            alt="Turrim Logo"
                            width={48}
                            height={48}
                            priority
                            className="object-contain"
                        />
                    </motion.div>
                    <span className="text-5xl font-medium tracking-tight text-white leading-none">turrim</span>
                </Link>
            </motion.div>

            {/* Divider Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="h-px w-full bg-white/10"
            />

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col gap-2 px-4 py-8">
                {sidebarLinks.map((link, index) => (
                    <SidebarItem
                        key={link.name}
                        link={link}
                        isActive={pathname.startsWith(link.href)}
                        index={index}
                    />
                ))}
            </nav>

            {/* Logout Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto px-4 py-6 border-t border-white/5"
            >
                <motion.button
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-start gap-4 px-4 py-3 rounded-lg bg-black/10 transition-all duration-300 group border border-white/5"
                >
                    <LogOut className="w-6 h-6 text-[#ef4444] transition-transform group-hover:-translate-x-1" />
                    <span className="text-xl font-medium tracking-wide text-[#ef4444]">
                        Logout
                    </span>
                </motion.button>
            </motion.div>
        </aside>
    )
}

const Header = ({ pathname }: { pathname: string }) => {
    const currentHeader = headerContent[pathname] || {
        title: sidebarLinks.find(l => l.href === pathname)?.name || 'Dashboard',
        description: 'Welcome back to your learning space.'
    }

    return (
        <header className="px-8 py-5 flex items-center justify-between bg-white sticky top-0 z-50">
            <div className="flex flex-col gap-1">
                <motion.h1
                    key={`title-${pathname}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-medium text-slate-900 tracking-tight"
                >
                    {currentHeader.title}
                </motion.h1>
                <motion.p
                    key={`desc-${pathname}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 text-lg"
                >
                    {currentHeader.description}
                </motion.p>
            </div>

            <div className="flex items-center gap-5">
                <Link href="/dashboard/notifications">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-[#064228] transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
                    </motion.button>
                </Link>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden cursor-pointer"
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

    return (
        <div className="flex h-screen w-full bg-[#f8f9fa]">
            <Sidebar pathname={pathname} />

            <main data-lenis-prevent className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-[#f8f9fa] flex flex-col">
                <Header pathname={pathname} />

                {/* Page Content */}
                <div className="px-8 pt-5 pb-12 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}