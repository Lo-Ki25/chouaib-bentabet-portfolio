"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function ScrollProgress() {
  const { dict } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 safe-top"
        aria-hidden
      >
        <div
          className="h-full bg-gradient-to-r from-accent-500 via-violet to-cyan transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={scrollTop}
        data-cursor-hover
        aria-label={dict.footer.backToTop}
        className={cn(
          "safe-fab fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-violet text-white shadow-glow-sm transition-all duration-300 hover:scale-105 active:scale-95",
          showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
