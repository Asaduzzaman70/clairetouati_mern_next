"use client";

import React, { useState, useRef, useEffect } from "react";
import { CheckCircle2, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, SupportedLanguage } from "@/components/providers/LanguageProvider";

interface LanguageDropdownProps {
  nav?: boolean;
}

const FlagGB = () => (
  <svg
    className="w-4 h-4 rounded-xs shrink-0"
    viewBox="0 0 640 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      d="m75 0 244 181L562 0h78v62L436 240l204 153v87h-78L320 299 78 480H0v-62l204-153L0 87V0h75z"
      fill="#FFF"
    />
    <path
      d="m424 281 216 163v36h-48L376 317v-36h48zm-208-82L0 36V0h48l216 163v36h-48zm256-199 168 126V90L520 0h-48zm-304 480L0 354v36l120 90h48z"
      fill="#C8102E"
    />
    <path d="M256 0h128v480H256zM0 176h640v128H0z" fill="#FFF" />
    <path d="M280 0h80v480h-80zM0 200h640v80H0z" fill="#C8102E" />
  </svg>
);

const FlagFR = () => (
  <svg
    className="w-4 h-4 rounded-xs shrink-0"
    viewBox="0 0 640 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#002654" d="M0 0h213.3v480H0z" />
    <path fill="#ECEFF4" d="M213.3 0h213.4v480H213.3z" />
    <path fill="#CE1126" d="M426.7 0H640v480H426.7z" />
  </svg>
);

const LanguageDropdown = ({ nav = false }: LanguageDropdownProps) => {
  const { language, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLanguageSelect = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setDropdownOpen(false);
  };

  return (
    <div className="relative notranslate" ref={containerRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        aria-label="Select language"
        className={cn(
          "inline-flex items-center justify-center gap-1.5 w-auto px-2 md:px-3 shrink-0 border border-border group transition-all ease-out duration-300 bg-background hover:bg-muted cursor-pointer",
          nav ? "py-1 md:py-1.5 rounded-full" : "py-1.5 rounded-xl"
        )}
      >
        {language === "fr" ? <FlagFR /> : <FlagGB />}
        <p className="text-foreground font-sans text-[11px] md:text-xs font-semibold uppercase notranslate">
          {language === "fr" ? "FR" : "EN"}
        </p>
        <ChevronDown
          className={cn(
            "w-3 h-3 text-muted-foreground transition-transform duration-200",
            dropdownOpen && "rotate-180"
          )}
        />
      </button>

      {dropdownOpen && (
        <div
          className={cn(
            "absolute z-50 left-0 min-w-28 py-1.5 bg-background border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto transition-all ease-in-out duration-300 notranslate",
            "top-[115%]"
          )}
        >
          {/* English */}
          <div
            onClick={() => handleLanguageSelect("en")}
            className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-muted rounded-lg mx-1 transition-colors"
          >
            <FlagGB />
            <p className="text-foreground uppercase font-sans text-[11px] md:text-xs font-medium notranslate flex-1">
              Eng
            </p>
            {language === "en" && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1da824] shrink-0" />
            )}
          </div>

          {/* French */}
          <div
            onClick={() => handleLanguageSelect("fr")}
            className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-muted rounded-lg mx-1 transition-colors"
          >
            <FlagFR />
            <p className="text-foreground uppercase font-sans text-[11px] md:text-xs font-medium notranslate flex-1">
              Fr
            </p>
            {language === "fr" && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1da824] shrink-0" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
