"use client";

import { Mail, Phone } from "lucide-react";
import { CheckoutFormData } from "./types";

interface ContactInfoSectionProps {
    formData: CheckoutFormData;
    onChange: (updates: Partial<CheckoutFormData>) => void;
}

export function ContactInfoSection({ formData, onChange }: ContactInfoSectionProps) {
    return (
        <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200/80 shadow-xs space-y-6">
            {/* Step Heading with Brand Theme Color */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#064228] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    1
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937]">
                        Contact Information
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500">
                        We will send your order confirmation and dispatch receipt here.
                    </p>
                </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                    <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                        Email Address
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="claire@example.com"
                            value={formData.email}
                            onChange={(e) => onChange({ email: e.target.value })}
                            className="w-full h-13 sm:h-14 pl-12 sm:pl-14 pr-5 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                        Phone Number (for courier SMS updates)
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                            <Phone className="w-5 h-5" />
                        </div>
                        <input
                            type="tel"
                            required
                            placeholder="+33 6 12 34 56 78"
                            value={formData.phone}
                            onChange={(e) => onChange({ phone: e.target.value })}
                            className="w-full h-13 sm:h-14 pl-12 sm:pl-14 pr-5 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
