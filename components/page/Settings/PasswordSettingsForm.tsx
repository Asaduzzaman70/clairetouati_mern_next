"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PasswordSettingsForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-full bg-white border border-gray-100 rounded-2xl md:rounded-4xl p-4 sm:p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <h2 className="text-lg sm:text-[20px] font-semibold mb-4 sm:mb-6 text-gray-900">Password Settings</h2>

            <div className="h-px w-full bg-gray-100 mb-6 sm:mb-8" />

            <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Old Password */}
                <div className="space-y-2">
                    <label className="text-sm sm:text-base font-medium text-[#4B5563]">Old Password</label>
                    <div className="relative group mt-2">
                        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-700 transition-colors">
                            <Lock size={18} strokeWidth={2} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-11 sm:pl-13 pr-11 sm:pr-14 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl md:rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 text-sm sm:text-base"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {!showPassword ? (
                                <EyeOff size={18} strokeWidth={2} />
                            ) : (
                                <Eye size={18} strokeWidth={2} />
                            )}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="text-sm sm:text-base font-medium text-[#4B5563]">New Password</label>
                    <div className="relative group mt-2">
                        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-700 transition-colors">
                            <Lock size={18} strokeWidth={2} />
                        </div>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-11 sm:pl-13 pr-11 sm:pr-14 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl md:rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 text-sm sm:text-base"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                        >
                            {!showNewPassword ? (
                                <EyeOff size={18} strokeWidth={2} />
                            ) : (
                                <Eye size={18} strokeWidth={2} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                    <label className="text-sm sm:text-base font-medium text-[#4B5563]">Confirm New Password</label>
                    <div className="relative group mt-2">
                        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-700 transition-colors">
                            <Lock size={18} strokeWidth={2} />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full pl-11 sm:pl-13 pr-11 sm:pr-14 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl md:rounded-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all placeholder:text-gray-300 text-gray-800 text-sm sm:text-base"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {!showConfirmPassword ? (
                                <EyeOff size={18} strokeWidth={2} />
                            ) : (
                                <Eye size={18} strokeWidth={2} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-3 sm:pt-4">
                    <Button
                        className="w-full sm:w-auto bg-black text-white hover:bg-gray-900 px-8 sm:px-10 h-12 sm:h-14 rounded-full text-base sm:text-lg font-bold transition-all shadow-none border-none cursor-pointer"
                        type="submit"
                    >
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
}
