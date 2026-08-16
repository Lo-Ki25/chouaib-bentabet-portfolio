"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMq.matches) return;

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    setLenis(instance);
    document.documentElement.classList.add("has-lenis");

    let raf = 0;
    let running = true;

    const loop = (time: number) => {
      if (!running) return;
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
        instance.stop();
      } else if (!motionMq.matches) {
        running = true;
        instance.start();
        raf = requestAnimationFrame(loop);
      }
    };

    const onMotionChange = () => {
      if (motionMq.matches) {
        running = false;
        cancelAnimationFrame(raf);
        instance.stop();
        document.documentElement.classList.remove("has-lenis");
        setLenis(null);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    motionMq.addEventListener("change", onMotionChange);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      motionMq.removeEventListener("change", onMotionChange);
      document.documentElement.classList.remove("has-lenis");
      setLenis(null);
      instance.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
