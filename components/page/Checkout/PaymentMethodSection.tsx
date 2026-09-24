"use client";

import { CreditCard, Calendar, Lock, User, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckoutFormData, PaymentMethod } from "./types";

interface PaymentMethodSectionProps {
    paymentMethod: PaymentMethod;
    onSelectMethod: (method: PaymentMethod) => void;
    formData: CheckoutFormData;
    onChange: (updates: Partial<CheckoutFormData>) => void;
}

export function PaymentMethodSection({
    paymentMethod,
    onSelectMethod,
    formData,
    onChange,
}: PaymentMethodSectionProps) {
    const paymentOptions: { id: PaymentMethod; label: string; icon: string }[] = [
        { id: "card", label: "Credit Card", icon: "card" },
        { id: "apple", label: "Apple / G Pay", icon: "pay" },
        { id: "paypal", label: "PayPal", icon: "paypal" },
    ];

    return (
        <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200/80 shadow-xs space-y-6">
            {/* Step Heading with Brand Deep Green Badge */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#064228] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    3
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937]">
                        Payment Method
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500">
                        All transactions are secure and encrypted.
                    </p>
                </div>
            </div>

            {/* Tactile Pill Toggle Selector with Turrim Brand Green */}
            <div className="flex items-center bg-zinc-200/70 p-1.5 rounded-full gap-1 relative overflow-hidden">
                {paymentOptions.map((opt) => {
                    const isActive = paymentMethod === opt.id;
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onSelectMethod(opt.id)}
                            className={cn(
                                "flex-1 py-2.5 sm:py-3 px-3 rounded-full text-xs sm:text-sm font-semibold transition-colors relative z-10 cursor-pointer flex items-center justify-center gap-2",
                                isActive ? "text-white" : "text-zinc-600 hover:text-[#064228]"
                            )}
                        >
                            {opt.id === "card" && <CreditCard className="w-4 h-4" />}
                            <span>{opt.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="payment-pill-bg"
                                    className="absolute inset-0 bg-[#064228] rounded-full shadow-md -z-10"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Card Inputs */}
            {paymentMethod === "card" ? (
                <div className="space-y-4 pt-1">
                    {/* Card Number */}
                    <div className="space-y-1.5">
                        <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                            Card Number
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                required
                                maxLength={19}
                                placeholder="4532 •••• •••• 8892"
                                value={formData.cardNumber}
                                onChange={(e) => onChange({ cardNumber: e.target.value })}
                                className="w-full h-13 sm:h-14 pl-12 sm:pl-14 pr-16 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base font-mono placeholder:text-zinc-400 font-medium"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                <span className="px-1.5 py-0.5 rounded bg-[#E8F0EA] border border-[#064228]/20 text-[10px] font-bold text-[#064228]">
                                    VISA
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-[#E8F0EA] border border-[#064228]/20 text-[10px] font-bold text-[#064228]">
                                    MC
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Expiry & CVC */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                                Expiration Date
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    maxLength={5}
                                    placeholder="MM/YY"
                                    value={formData.cardExp}
                                    onChange={(e) => onChange({ cardExp: e.target.value })}
                                    className="w-full h-13 sm:h-14 pl-10 pr-4 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base font-mono placeholder:text-zinc-400 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                                Security Code (CVC)
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    maxLength={4}
                                    placeholder="•••"
                                    value={formData.cardCvc}
                                    onChange={(e) => onChange({ cardCvc: e.target.value })}
                                    className="w-full h-13 sm:h-14 pl-10 pr-4 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base font-mono placeholder:text-zinc-400 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cardholder Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                            Name on Card
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                required
                                placeholder="Claire Touati"
                                value={formData.cardName}
                                onChange={(e) => onChange({ cardName: e.target.value })}
                                className="w-full h-13 sm:h-14 pl-12 sm:pl-14 pr-5 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-8 rounded-2xl bg-white border border-[#064228]/20 text-center space-y-3">
                    <ShieldCheck className="w-8 h-8 text-[#064228] mx-auto" />
                    <h3 className="font-bold text-base text-[#1F2937]">
                        Fast & Direct Checkout with {paymentMethod === "apple" ? "Apple / Google Pay" : "PayPal"}
                    </h3>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                        You will be securely redirected to finalize your payment and authorize your delivery.
                    </p>
                </div>
            )}
        </div>
    );
}
