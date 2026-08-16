"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

type IntroContextValue = { showIntro: boolean };

const IntroContext = createContext<IntroContextValue>({ showIntro: false });

export function useIntro() {
  return useContext(IntroContext);
}

let introPlayed = false;

export default function BrandIntro({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(() => pathname === "/" && !introPlayed);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion === null) return;

    const alreadySeen =
      typeof window !== "undefined" && sessionStorage.getItem("cb-intro") === "1";

    if (introPlayed || alreadySeen || pathname !== "/" || prefersReducedMotion) {
      setShowIntro(false);
      introPlayed = true;
      return;
    }

    setShowIntro(true);
    introPlayed = true;

    const finish = () => {
      sessionStorage.setItem("cb-intro", "1");
      setShowIntro(false);
    };

    const hide = window.setTimeout(finish, 720);
    const failSafe = window.setTimeout(finish, 1400);

    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(failSafe);
    };
  }, [pathname, prefersReducedMotion]);

  return (
    <IntroContext.Provider value={{ showIntro }}>
      <AnimatePresence>
        {showIntro ? (
          mounted ? (
            <motion.div
              key="brand-intro"
              className="fixed inset-0 z-[200] flex items-center justify-center bg-base-900"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              <motion.span
                layoutId="brand-monogram"
                className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-violet font-display text-3xl font-bold text-white shadow-glow"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 1.08, 1], opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {profile.initials}
              </motion.span>
            </motion.div>
          ) : (
            <div
              key="brand-intro-static"
              className="fixed inset-0 z-[200] flex items-center justify-center bg-base-900"
              aria-hidden
            >
              <span className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-violet font-display text-3xl font-bold text-white shadow-glow">
                {profile.initials}
              </span>
            </div>
          )
        ) : null}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}
