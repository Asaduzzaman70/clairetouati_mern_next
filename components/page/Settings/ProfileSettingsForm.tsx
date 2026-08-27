"use client";

import React, { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setAvatarSrc(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full bg-white border border-gray-100 rounded-2xl md:rounded-4xl p-4 sm:p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <h2 className="text-lg sm:text-[20px] font-semibold mb-4 sm:mb-6 text-gray-900">Personal Info</h2>

            <div className="h-px w-full bg-gray-100 mb-6 sm:mb-8" />

            {/* Avatar */}
            <div className="mb-6 sm:mb-8">
                <div className="relative w-18 h-18 sm:w-22.5 sm:h-22.5">
                    <div className="w-18 h-18 sm:w-22.5 sm:h-22.5 rounded-full overflow-hidden bg-gray-200 border border-gray-200">
                        {avatarSrc ? (
                            <img
                                src={avatarSrc}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xl sm:text-2xl font-semibold select-none">
                                U
                            </div>
                        )}
                    </div>
                    {/* Edit Icon Badge */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-6 h-6 sm:w-6.5 sm:h-6.5 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        aria-label="Change profile photo"
                    >
                        <Pencil size={12} strokeWidth={2.5} className="text-gray-600" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                </div>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name + Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Full Name */}
                    <div>
                        <label className="text-sm sm:text-base font-medium text-[#4B5563]">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl md:rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 mt-2 text-sm sm:text-base"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm sm:text-base font-medium text-[#4B5563]">Email</label>
                        <input
                            type="email"
                            defaultValue="r.g.rhodes@aol.com"
                            className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl md:rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 mt-2 text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="text-sm sm:text-base block font-medium text-[#4B5563]">Address</label>
                    <input
                        type="text"
                        defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486"
                        className="w-full md:w-2/3 lg:w-1/2 px-4 sm:px-5 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl md:rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 mt-2 text-sm sm:text-base"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-3 sm:pt-4">
                    <Button
                        className="w-full sm:w-auto bg-black text-white hover:bg-gray-900 px-8 sm:px-10 h-12 sm:h-14 rounded-full text-base sm:text-lg font-bold transition-all shadow-none border-none cursor-pointer"
                        type="submit"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}