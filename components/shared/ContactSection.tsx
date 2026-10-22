"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateContact } from "@/hooks/api/contact";
import owner from "@/assets/owner.jpg";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const createContactMutation = useCreateContact();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length > 100) {
            newErrors.name = "Name must not exceed 100 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        } else if (formData.subject.trim().length > 200) {
            newErrors.subject = "Subject must not exceed 200 characters";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length > 5000) {
            newErrors.message = "Message must not exceed 5000 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createContactMutation.mutateAsync({
                name: formData.name.trim(),
                email: formData.email.trim(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
            });

            toast.success("Message Sent Successfully!", {
                description:
                    "Thank you for contacting us. We will get back to you soon!",
            });

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            setErrors({});
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            const errorMessage =
                err.response?.data?.message ||
                "Failed to send your message. Please try again later.";

            toast.error("Submission Failed", {
                description: errorMessage,
            });
        }
    };

    const isSubmitting = createContactMutation.isPending;

    return (
        <section className="min-h-screen w-full bg-white font-sans py-10 sm:py-14 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Header Section */}
                <div className="mb-8 sm:mb-12 md:mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold tracking-tight text-[#1F2937] leading-tight mb-2 sm:mb-3"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl"
                    >
                        Need help? Send us a message anytime.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
                    {/* Left Section: Form Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl md:rounded-[32px] p-5 sm:p-8 md:p-10 lg:p-14 border border-zinc-100/80 shadow-sm"
                    >
                        <form className="space-y-4 sm:space-y-6 md:space-y-7" onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    placeholder="Enter your full name"
                                    className={`w-full h-12 sm:h-13 md:h-13.5 px-4 sm:px-5 bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed ${
                                        errors.name
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-zinc-200 focus:border-[#1F2937] focus:ring-[#1F2937]/5"
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 ml-1 mt-1 font-medium">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    placeholder="Enter your email"
                                    className={`w-full h-12 sm:h-13 md:h-13.5 px-4 sm:px-5 bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed ${
                                        errors.email
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-zinc-200 focus:border-[#1F2937] focus:ring-[#1F2937]/5"
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 ml-1 mt-1 font-medium">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Subject Input */}
                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    placeholder="Enter your subject"
                                    className={`w-full h-12 sm:h-13 md:h-13.5 px-4 sm:px-5 bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed ${
                                        errors.subject
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-zinc-200 focus:border-[#1F2937] focus:ring-[#1F2937]/5"
                                    }`}
                                />
                                {errors.subject && (
                                    <p className="text-xs text-red-500 ml-1 mt-1 font-medium">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            {/* Message Textarea */}
                            <div className="space-y-2">
                                <label className="text-xs sm:text-[14px] md:text-[15px] font-semibold text-slate-700 ml-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    placeholder="Type your message"
                                    className={`w-full p-4 sm:p-5 bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all text-slate-900 text-sm sm:text-base placeholder:text-slate-400 resize-none min-h-30 sm:min-h-35 disabled:opacity-60 disabled:cursor-not-allowed ${
                                        errors.message
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-zinc-200 focus:border-[#1F2937] focus:ring-[#1F2937]/5"
                                    }`}
                                ></textarea>
                                {errors.message && (
                                    <p className="text-xs text-red-500 ml-1 mt-1 font-medium">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.div
                                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                                className="pt-2 sm:pt-4"
                            >
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 sm:h-13 md:h-15 bg-[#1F2937] hover:bg-[#111827] text-white rounded-xl sm:rounded-[14px] text-base sm:text-lg font-bold transition-all border-none shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="size-5 animate-spin" />
                                            <span>Sending message...</span>
                                        </>
                                    ) : (
                                        <span>Submit</span>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>

                    {/* Right Section: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative aspect-4/3 sm:aspect-square md:aspect-5/6 w-full max-w-150 mx-auto rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-sm"
                    >
                        <Image
                            src={owner}
                            alt="Get In Touch"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
