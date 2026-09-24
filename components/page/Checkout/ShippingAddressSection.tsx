"use client";

import { User, MapPin, Building2, Globe, Truck } from "lucide-react";
import { CheckoutFormData } from "./types";

interface ShippingAddressSectionProps {
    formData: CheckoutFormData;
    onChange: (updates: Partial<CheckoutFormData>) => void;
}

export function ShippingAddressSection({ formData, onChange }: ShippingAddressSectionProps) {
    return (
        <div className="bg-[#F9FAFB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200/80 shadow-xs space-y-6">
            {/* Step Heading with Brand Theme Color */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#064228] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    2
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2937]">
                        Delivery Address
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500">
                        Where should we dispatch your handcrafted Turrim wooden kit?
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 pt-1">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                            First Name
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                required
                                placeholder="Claire"
                                value={formData.firstName}
                                onChange={(e) => onChange({ firstName: e.target.value })}
                                className="w-full h-13 sm:h-14 pl-12 sm:pl-14 pr-5 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                            Last Name
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                required
                                placeholder="Touati"
                                value={formData.lastName}
                                onChange={(e) => onChange({ lastName: e.target.value })}
                                className="w-full h-13 sm:h-14 pl-12 sm:pl-14 pr-5 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Street Address */}
                <div className="space-y-1.5">
                    <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                        Street Address & House Number
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            required
                            placeholder="14 Avenue de l'Opéra, Apt 3B"
                            value={formData.address}
                            onChange={(e) => onChange({ address: e.target.value })}
                            className="w-full h-13 sm:h-14 pl-12 sm:pl-14 pr-5 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                        />
                    </div>
                </div>

                {/* City, Postal Code, Country */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                            Postal Code
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                placeholder="75001"
                                value={formData.postalCode}
                                onChange={(e) => onChange({ postalCode: e.target.value })}
                                className="w-full h-13 sm:h-14 px-4 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                            City
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                required
                                placeholder="Paris"
                                value={formData.city}
                                onChange={(e) => onChange({ city: e.target.value })}
                                className="w-full h-13 sm:h-14 pl-10 pr-4 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base placeholder:text-zinc-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs sm:text-[14px] font-semibold text-[#374151] ml-1 block">
                            Country
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#064228] transition-colors pointer-events-none">
                                <Globe className="w-4 h-4" />
                            </div>
                            <select
                                value={formData.country}
                                onChange={(e) => onChange({ country: e.target.value })}
                                className="w-full h-13 sm:h-14 pl-10 pr-4 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-[#1F2937] text-base font-medium cursor-pointer"
                            >
                                <option value="France">France</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Canada">Canada</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Germany">Germany</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Free Tracked Shipping Highlight Banner */}
                <div className="bg-[#E8F0EA] border border-[#064228]/10 rounded-2xl p-4 flex items-center gap-3.5 mt-2">
                    <div className="w-9 h-9 rounded-full bg-[#064228] text-white flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm text-[#064228]">
                        <span className="font-bold">Complimentary Express Shipping:</span> Delivered in 2–4 business days with carbon-neutral tracked delivery.
                    </div>
                </div>
            </div>
        </div>
    );
}
