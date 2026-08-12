"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/types";
import { translations, type Dictionary } from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  dict: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
      return;
    }
    const browserLang = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "fr";
    setLangState(browserLang.startsWith("fr") ? "fr" : "en");
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggleLang,
      setLang,
      dict: translations[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
