"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";

export function CheckoutHeader() {
    return (
        <div className="space-y-3 mb-6 sm:mb-8">
            {/* Top Bar with Return button & Trust Seal */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-zinc-600 hover:text-[#064228] transition-colors group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Turrim</span>
                </Link>

                <div className="flex items-center gap-2 bg-[#E8F0EA] text-[#064228] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#064228]" />
                    <span>Official Atelier Checkout • 256-Bit SSL</span>
                </div>
            </div>

            {/* Atelier Brand Banner Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
                        ACQUIRE TURRIM • ATELIER EDITION
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1F2937] leading-tight">
                        Complete Your Order
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
                        Handcrafted solid beechwood alphabet blocks, designed to turn gestures into understanding.
                    </p>
                </div>

                <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200/60 shrink-0">
                    <Image src={logo} alt="Turrim Logo" width={24} height={24} className="object-contain" />
                    <span className="text-base font-bold tracking-tighter text-[#1F2937]">turrim</span>
                </div>
            </div>
        </div>
    );
}
