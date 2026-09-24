"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Minus, Tag, Check, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import abImg1 from "@/assets/ab_img_1.png";

interface OrderSummarySectionProps {
    quantity: number;
    unitPrice: number;
    subtotal: number;
    discount: number;
    total: number;
    promoCode: string;
    promoApplied: boolean;
    onQuantityChange: (qty: number) => void;
    onPromoCodeChange: (code: string) => void;
    onApplyPromo: (e: React.FormEvent) => void;
}

export function OrderSummarySection({
    quantity,
    unitPrice,
    subtotal,
    discount,
    total,
    promoCode,
    promoApplied,
    onQuantityChange,
    onPromoCodeChange,
    onApplyPromo,
}: OrderSummarySectionProps) {
    return (
        <div className="space-y-4">
            {/* Main Order Card */}
            <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#1F2937]">
                    Order Summary
                </h2>

                {/* Product Item Preview */}
                <div className="flex gap-3.5 items-start pb-4 border-b border-zinc-200/70">
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-white shrink-0 border border-zinc-200/80 shadow-xs">
                        <Image
                            src={abImg1}
                            alt="Turrim Tactile Wooden Alphabet"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1.5 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-[#E8F0EA] text-[#064228] text-[10px] font-bold">
                                Beechwood
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#FEF08A] text-[#1A1A2E] text-[10px] font-bold">
                                Montessori
                            </span>
                        </div>

                        <h3 className="font-bold text-base text-[#1F2937] leading-snug">
                            Turrim™ Tactile Kit
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                            26 tactile blocks, sensory cards & guidebook.
                        </p>

                        {/* Quantity Counter with Theme Colors */}
                        <div className="flex items-center justify-between mt-2.5 pt-0.5">
                            <div className="flex items-center border border-zinc-200 rounded-full px-2 py-0.5 bg-white shadow-xs">
                                <button
                                    type="button"
                                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#E8F0EA] hover:text-[#064228] transition-colors cursor-pointer text-zinc-600 active:scale-95"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 text-xs sm:text-sm font-bold text-[#1F2937]">{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => onQuantityChange(quantity + 1)}
                                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#E8F0EA] hover:text-[#064228] transition-colors cursor-pointer text-zinc-600 active:scale-95"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>

                            <span className="text-base font-black text-[#064228]">
                                €{(unitPrice * quantity).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Promo Code Input with Brand Green Button */}
                <form onSubmit={onApplyPromo} className="flex gap-2">
                    <div className="relative flex-1 group">
                        <input
                            type="text"
                            placeholder="Promo code (e.g. TURRIM15)"
                            value={promoCode}
                            onChange={(e) => onPromoCodeChange(e.target.value)}
                            className="w-full h-10 pl-9 pr-3 rounded-full bg-white border border-zinc-200 focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] text-xs uppercase font-semibold transition-all"
                        />
                        <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#064228]" />
                    </div>
                    <Button
                        type="submit"
                        className="h-10 px-4 rounded-full bg-[#064228] hover:bg-[#042f1c] text-white font-semibold text-xs cursor-pointer shadow-xs"
                    >
                        Apply
                    </Button>
                </form>

                {promoApplied && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 rounded-xl bg-[#E8F0EA] border border-[#064228]/20 text-[#064228] text-xs font-semibold flex items-center justify-between"
                    >
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#064228]" />
                            Promo applied: €15.00 discount!
                        </span>
                        <Check className="w-3.5 h-3.5 text-[#064228]" />
                    </motion.div>
                )}

                {/* Price Calculation Rows */}
                <div className="space-y-2 pt-1 text-xs sm:text-sm">
                    <div className="flex justify-between text-zinc-600">
                        <span>Subtotal ({quantity} {quantity === 1 ? "kit" : "kits"})</span>
                        <span className="font-semibold text-[#1F2937]">€{subtotal.toFixed(2)}</span>
                    </div>

                    {promoApplied && (
                        <div className="flex justify-between text-[#064228] font-semibold">
                            <span>Special Promo Discount</span>
                            <span>-€{discount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-zinc-600">
                        <span>Express Delivery</span>
                        <span className="text-[#064228] font-bold">FREE</span>
                    </div>

                    <div className="flex justify-between text-zinc-600">
                        <span>VAT (20% Included)</span>
                        <span className="font-medium text-zinc-700">€{(total * 0.2).toFixed(2)}</span>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline">
                        <div>
                            <span className="text-base font-bold text-[#1F2937]">Total</span>
                            <p className="text-[10px] text-zinc-400">All taxes & duty free</p>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-black text-[#064228] tracking-tight">
                                €{total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Atelier Craftsmanship Callout (The Turrim Philosophy in #064228) */}
            <div className="bg-[#064228] text-white rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>The Turrim Philosophy</span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                    Every Turrim kit is crafted from sustainable solid European beechwood, treated with non-toxic natural plant oils and organic mineral pigments. Built to endure generations of playful discovery.
                </p>
            </div>
        </div>
    );
}
