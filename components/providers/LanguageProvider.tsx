"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type SupportedLanguage = "en" | "fr";

interface LanguageContextType {
  language: SupportedLanguage;
  isEnglish: boolean;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const PREFERRED_LANG_KEY = "preferredLanguage";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const pathname = usePathname();
  const scriptLoadedRef = useRef(false);

  // Helper to trigger Google Translate via hidden .goog-te-combo
  const triggerGoogleTranslate = useCallback((langCode: SupportedLanguage) => {
    const googleLang = langCode === "fr" ? "fr" : "en";

    // Set cookies so translations persist across page reloads and navigations
    try {
      document.cookie = `googtrans=/en/${googleLang}; path=/`;
      if (typeof window !== "undefined" && window.location.hostname) {
        document.cookie = `googtrans=/en/${googleLang}; domain=${window.location.hostname}; path=/`;
      }
      if (googleLang === "en") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (typeof window !== "undefined" && window.location.hostname) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
        }
      }
    } catch {
      // Ignore cookie errors if any
    }

    const applyTranslate = (select: HTMLSelectElement) => {
      const hasOption = Array.from(select.options).some(
        (opt) => opt.value === googleLang
      );
      if (hasOption) {
        select.value = googleLang;
      } else if (googleLang === "en") {
        select.value = "";
      } else {
        select.value = googleLang;
      }
      select.dispatchEvent(new Event("change"));
    };

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      applyTranslate(select);
    } else {
      // Retry in intervals until Google Translate script finishes initializing
      let attempts = 0;
      const retryInterval = setInterval(() => {
        attempts++;
        const retrySelect = document.querySelector(
          ".goog-te-combo"
        ) as HTMLSelectElement | null;
        if (retrySelect) {
          clearInterval(retryInterval);
          applyTranslate(retrySelect);
        } else if (attempts > 25) {
          clearInterval(retryInterval);
        }
      }, 250);
    }
  }, []);

  // Set language function exposed to components
  const setLanguage = useCallback(
    (newLang: SupportedLanguage) => {
      setLanguageState(newLang);
      try {
        localStorage.setItem(PREFERRED_LANG_KEY, newLang);
      } catch {
        // Ignore localStorage errors
      }
      triggerGoogleTranslate(newLang);
    },
    [triggerGoogleTranslate]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "fr" : "en");
  }, [language, setLanguage]);

  // Load Google Translate script and manage observer to hide unwanted UI
  useEffect(() => {
    const addGoogleTranslate = () => {
      if (document.getElementById("google-translate-script")) {
        scriptLoadedRef.current = true;
        return;
      }

      // Define init function before script loads
      (window as any).googleTranslateElementInit = () => {
        if ((window as any).google?.translate?.TranslateElement) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fr",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    };

    addGoogleTranslate();

    // Hide unwanted Google Translate banners, tooltips, frames & fix body styling
    const hideUnwantedElements = () => {
      const unwantedSelectors = [
        ".goog-te-banner-frame",
        ".goog-te-balloon-frame",
        ".goog-tooltip",
        ".goog-te-spinner-pos",
        ".goog-te-combo",
        "#goog-gt-tt",
        ".goog-text-highlight",
        ".skiptranslate",
        "#goog-gt-banner",
        ".goog-te-banner",
      ];

      unwantedSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el: any) => {
          el.style.display = "none";
          el.style.visibility = "hidden";
          el.style.height = "0";
          el.style.width = "0";
          el.style.opacity = "0";
          el.style.position = "absolute";
          el.style.pointerEvents = "none";
        });
      });

      if (document.body.style.top !== "0px" && document.body.style.top !== "0") {
        document.body.style.top = "0";
      }
      if (document.body.style.position !== "static") {
        document.body.style.position = "static";
      }
    };

    const observer = new MutationObserver(hideUnwantedElements);
    observer.observe(document.body, { childList: true, subtree: true });
    hideUnwantedElements();

    const interval = setInterval(hideUnwantedElements, 1000);

    // Restore saved language preference on mount
    try {
      const savedLang = localStorage.getItem(PREFERRED_LANG_KEY) as SupportedLanguage | null;
      if (savedLang === "en" || savedLang === "fr") {
        setLanguageState(savedLang);
        setTimeout(() => {
          triggerGoogleTranslate(savedLang);
        }, 1200);
      }
    } catch {
      // Ignore localStorage errors
    }

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [triggerGoogleTranslate]);

  // Re-trigger translation when Next.js navigates if current language is not English
  useEffect(() => {
    if (language !== "en") {
      const timeout = setTimeout(() => {
        triggerGoogleTranslate(language);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [pathname, language, triggerGoogleTranslate]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        isEnglish: language === "en",
        setLanguage,
        toggleLanguage,
      }}
    >
      {/* Hidden container required by Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
