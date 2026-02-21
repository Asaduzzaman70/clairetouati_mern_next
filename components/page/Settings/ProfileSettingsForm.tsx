"use client";

import React, { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        <div className="w-full bg-white border border-gray-100 rounded-[20px] p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <h2 className="text-[20px] font-semibold mb-6 text-gray-900">Personal Info</h2>

            <div className="h-px w-full bg-gray-100 mb-8" />

            {/* Avatar */}
            <div className="mb-8">
                <div className="relative w-[72px] h-[72px]">
                    <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-200 border border-gray-200">
                        {avatarSrc ? (
                            <img
                                src={avatarSrc}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-2xl font-semibold select-none">
                                U
                            </div>
                        )}
                    </div>
                    {/* Edit Icon Badge */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-[22px] h-[22px] bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="Change profile photo"
                    >
                        <Pencil size={11} strokeWidth={2.5} className="text-gray-600" />
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

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name + Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2.5">
                        <label className="text-xl font-medium text-[#4B5563]">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 mt-3"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2.5">
                        <label className="text-xl font-medium text-[#4B5563]">Email</label>
                        <input
                            type="email"
                            defaultValue="r.g.rhodes@aol.com"
                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 mt-3"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2.5">
                    <label className="text-xl block font-medium text-[#4B5563]">Address</label>
                    <input
                        type="text"
                        defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486"
                        className="w-full md:w-1/2 px-5 py-3.5 bg-white border border-gray-200 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 mt-3"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <Button
                        className="bg-black text-white hover:bg-gray-900 px-10 h-14 rounded-full text-lg font-bold transition-all shadow-none border-none"
                        type="submit"
                    >
                        Save Change
                    </Button>
                </div>
            </form>
        </div>
    );
}