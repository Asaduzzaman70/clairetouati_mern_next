"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, PackageCheck, Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckoutFormData } from "./types";
import { CheckoutHeader } from "./CheckoutHeader";
import { ContactInfoSection } from "./ContactInfoSection";
import { ShippingAddressSection } from "./ShippingAddressSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { OrderSuccessSection } from "./OrderSuccessSection";
import { useGetProduct } from "@/hooks/api/products";
import { useCreateOrder } from "@/hooks/api/orders";
import { useCreateCheckoutSession } from "@/hooks/api/payments";
import { getApiErrorMessage } from "@/lib/api-error";

function CheckoutContent() {
    const searchParams = useSearchParams();

    // Query params checking for post-checkout redirection
    const isSuccess = searchParams.get("success") === "true" || Boolean(searchParams.get("session_id"));
    const isCanceled = searchParams.get("canceled") === "true";
    const returnedOrderId = searchParams.get("order_id") || "TRM-" + Math.floor(100000 + Math.random() * 900000);
    const returnedEmail = searchParams.get("email") || "";
    const returnedTotal = Number(searchParams.get("total")) || 0;
    const returnedQty = Number(searchParams.get("qty")) || 1;

    // Live Product from backend
    const { data: product, isLoading: isProductLoading, isError: isProductError } = useGetProduct();

    // Mutations for Order & Stripe Payment Session
    const createOrderMutation = useCreateOrder();
    const createCheckoutSessionMutation = useCreateCheckoutSession();

    const [quantity, setQuantity] = useState(1);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canceledNoticeDismissed, setCanceledNoticeDismissed] = useState(false);

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

    // Populate initial saved info from localStorage if available
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("turrim_checkout_info");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setFormData((prev) => ({ ...prev, ...parsed }));
                }
            } catch {
                // Ignore parse errors
            }
        }
    }, []);

    // Pricing calculation
    const unitPrice = product?.price ?? 89;
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
            toast.success("Voucher applied! €15 discount added.");
        } else {
            toast.error("Invalid voucher code. Use 'TURRIM15' for a €15 voucher!");
        }
    };

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Basic validation
        if (!formData.email.trim()) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (!formData.phone.trim()) {
            toast.error("Please enter your contact phone number");
            return;
        }
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            toast.error("Please enter your full recipient name");
            return;
        }
        if (!formData.address.trim()) {
            toast.error("Please provide your delivery street address");
            return;
        }
        if (!formData.city.trim() || !formData.postalCode.trim()) {
            toast.error("Please enter your city and postal code");
            return;
        }

        // Save delivery info if opted in
        if (formData.saveInfo && typeof window !== "undefined") {
            try {
                localStorage.setItem(
                    "turrim_checkout_info",
                    JSON.stringify({
                        email: formData.email,
                        phone: formData.phone,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        address: formData.address,
                        apartment: formData.apartment,
                        postalCode: formData.postalCode,
                        city: formData.city,
                        country: formData.country,
                    })
                );
            } catch {
                // Ignore storage error
            }
        }

        setIsSubmitting(true);

        try {
            // 2. Create order in MongoDB backend
            const orderPayload = {
                productId: product?.id,
                quantity,
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                street: formData.address.trim(),
                apartment: formData.apartment.trim() || undefined,
                city: formData.city.trim(),
                postalCode: formData.postalCode.trim(),
                country: formData.country.trim(),
            };

            const order = await createOrderMutation.mutateAsync(orderPayload);
            const orderId = order.id || (order as any)._id;

            if (!orderId) {
                throw new Error("Order creation failed to return an order reference");
            }

            // 3. Request Stripe hosted checkout session
            const origin = typeof window !== "undefined" ? window.location.origin : "";
            const session = await createCheckoutSessionMutation.mutateAsync({
                orderId,
                successUrl: `${origin}/checkout?success=true&order_id=${order.orderNumber || orderId}&email=${encodeURIComponent(formData.email)}&total=${total}&qty=${quantity}`,
                cancelUrl: `${origin}/checkout?canceled=true`,
            });

            if (session?.checkoutUrl) {
                toast.success("Order registered! Redirecting to Stripe secure checkout...");
                window.location.href = session.checkoutUrl;
            } else {
                throw new Error("Stripe did not return a valid payment redirection URL");
            }
        } catch (err) {
            console.error("Checkout process error:", err);
            toast.error(getApiErrorMessage(err) || "Failed to initiate payment session. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-[#1F2937] pt-4 sm:pt-6 pb-12 sm:pb-16">
            <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 max-w-6xl">
                {/* Atelier Brand Header */}
                <CheckoutHeader />

                {/* Canceled Notice Banner */}
                {isCanceled && !canceledNoticeDismissed && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start justify-between gap-3 text-sm shadow-xs"
                    >
                        <div className="flex items-start gap-2.5">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <strong className="font-semibold">Checkout not completed:</strong> Your payment was canceled or interrupted. Your items remain saved in your order summary below so you can try again.
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setCanceledNoticeDismissed(true)}
                            className="text-amber-700 hover:text-amber-900 font-bold text-xs underline cursor-pointer shrink-0"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                )}

                {/* Show Order Success if payment completed via Stripe */}
                {isSuccess ? (
                    <OrderSuccessSection
                        email={returnedEmail || formData.email}
                        quantity={returnedQty || quantity}
                        total={returnedTotal || total}
                        orderNumber={returnedOrderId}
                        productTitle={product?.title || "Turrim™ Wooden Alphabet"}
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
                                    <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.01 }} whileTap={{ scale: isSubmitting ? 1 : 0.99 }}>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || isProductLoading}
                                            className="w-full h-14 sm:h-16 rounded-full bg-[#064228] hover:bg-[#042f1c] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#064228]/25 cursor-pointer transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Connecting to Stripe Checkout...
                                                </span>
                                            ) : isProductLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Loading Product Details...
                                                </span>
                                            ) : (
                                                `Proceed to Payment • €${total.toFixed(2)}`
                                            )}
                                        </Button>
                                    </motion.div>

                                    {/* Stripe Checkout notice */}
                                    <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                                        <Lock className="w-3.5 h-3.5 text-[#064228]" />
                                        <span>Payment is processed through official <strong>Stripe Checkout</strong></span>
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
                                            <span>256-Bit Encrypted</span>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Order Summary Card (Sticky) */}
                        <div className="lg:col-span-5 relative">
                            <div className="lg:sticky lg:top-20 xl:top-24">
                                <OrderSummarySection
                                    product={product}
                                    isLoading={isProductLoading}
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

export default function Checkout() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#064228]/20 border-t-[#064228] rounded-full animate-spin" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
