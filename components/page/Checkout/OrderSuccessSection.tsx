"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, PackageCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderSuccessSectionProps {
    email: string;
    quantity: number;
    total: number;
}

export function OrderSuccessSection({ email, quantity, total }: OrderSuccessSectionProps) {
    const orderNumber = "TRM-784291";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-[#F9FAFB] rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-zinc-200/80 space-y-6"
        >
            {/* Top Seal Badge */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#E8F0EA] text-[#064228] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10 sm:w-11 sm:h-11" />
            </div>

            <div className="space-y-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#064228] bg-[#E8F0EA] px-3 py-1 rounded-full inline-block">
                    ORDER CONFIRMED • ATELIER DISPATCH
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1F2937]">
                    Thank you for your order!
                </h1>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                    Your order <strong className="text-[#1F2937] font-bold">#{orderNumber}</strong> has been received by our atelier. A confirmation receipt has been dispatched to{" "}
                    <span className="font-semibold text-[#1F2937]">{email || "your email"}</span>.
                </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white rounded-2xl p-5 text-left border border-zinc-200/80 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Kit Ordered</span>
                    <span className="font-semibold text-[#1F2937]">Turrim™ Wooden Alphabet (x{quantity})</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Dispatch Speed</span>
                    <span className="font-semibold text-[#047857]">Free Express Tracked (2–4 Days)</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2.5 border-t border-zinc-100">
                    <span className="text-zinc-700 font-semibold">Total Paid</span>
                    <span className="text-xl font-black text-[#1F2937]">€{total.toFixed(2)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/playroom" className="flex-1">
                    <Button className="w-full h-12 rounded-full bg-[#1F2937] hover:bg-black text-white font-semibold cursor-pointer shadow-sm">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Explore Playroom
                    </Button>
                </Link>
                <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full h-12 rounded-full font-semibold cursor-pointer border-zinc-300">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
