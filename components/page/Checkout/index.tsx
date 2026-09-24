"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, PackageCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutFormData } from "./types";
import { CheckoutHeader } from "./CheckoutHeader";
import { ContactInfoSection } from "./ContactInfoSection";
import { ShippingAddressSection } from "./ShippingAddressSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { OrderSuccessSection } from "./OrderSuccessSection";

export default function Checkout() {
    const [quantity, setQuantity] = useState(1);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const [formData, setFormData] = useState<CheckoutFormData>({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        postalCode: "",
        city: "",
        country: "France",
        saveInfo: true,
    });

    const unitPrice = 89;
    const discount = promoApplied ? 15 : 0;
    const subtotal = unitPrice * quantity;
    const shipping = 0; // Free express delivery
    const total = Math.max(0, subtotal - discount + shipping);

    const handleFormUpdate = (updates: Partial<CheckoutFormData>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        const code = promoCode.trim().toLowerCase();
        if (code === "turrim15" || code === "wonder") {
            setPromoApplied(true);
        } else {
            alert("Invalid code. Enter 'TURRIM15' for a €15 voucher!");
        }
    };

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsOrderPlaced(true);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-white text-[#1F2937] pt-4 sm:pt-6 pb-12 sm:pb-16">
            <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-6xl">
                {/* Atelier Brand Header */}
                <CheckoutHeader />

                {isOrderPlaced ? (
                    <OrderSuccessSection
                        email={formData.email}
                        quantity={quantity}
                        total={total}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left Column: Multi-Step Checkout Form */}
                        <div className="lg:col-span-7 space-y-8">
                            <form onSubmit={handleSubmitOrder} className="space-y-8">
                                <ContactInfoSection
                                    formData={formData}
                                    onChange={handleFormUpdate}
                                />

                                <ShippingAddressSection
                                    formData={formData}
                                    onChange={handleFormUpdate}
                                />

                                {/* Proceed to Stripe Checkout CTA Button */}
                                <div className="space-y-4 pt-2">
                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-14 sm:h-16 rounded-full bg-[#064228] hover:bg-[#042f1c] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#064228]/25 cursor-pointer transition-all duration-200"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Redirecting to Stripe Checkout...
                                                </span>
                                            ) : (
                                                `Proceed to Payment • €${total.toFixed(2)}`
                                            )}
                                        </Button>
                                    </motion.div>

                                    {/* Stripe Checkout notice */}
                                    <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                                        <Lock className="w-3.5 h-3.5 text-[#064228]" />
                                        <span>Payment will be processed securely via <strong>Stripe Checkout</strong></span>
                                    </p>

                                    {/* Trust & Guarantee Badges */}
                                    <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-zinc-500 font-medium pt-1">
                                        <span className="flex items-center gap-1.5">
                                            <ShieldCheck className="w-4 h-4 text-[#047857]" />
                                            <span>30-Day Money Back</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Truck className="w-4 h-4 text-[#0056D2]" />
                                            <span>Free Express Shipping</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <PackageCheck className="w-4 h-4 text-[#C8102E]" />
                                            <span>FSC Solid Beechwood</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Lock className="w-3.5 h-3.5 text-zinc-600" />
                                            <span>Encrypted Checkout</span>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Order Summary Card (Sticky) */}
                        <div className="lg:col-span-5 relative">
                            <div className="lg:sticky lg:top-20 xl:top-24">
                                <OrderSummarySection
                                    quantity={quantity}
                                    unitPrice={unitPrice}
                                    subtotal={subtotal}
                                    discount={discount}
                                    total={total}
                                    promoCode={promoCode}
                                    promoApplied={promoApplied}
                                    onQuantityChange={setQuantity}
                                    onPromoCodeChange={setPromoCode}
                                    onApplyPromo={handleApplyPromo}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
