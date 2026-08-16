"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /** When set, starts counting when true (e.g. parent `useInViewport`). */
  play?: boolean;
};

function isOnScreen(el: HTMLElement | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export default function Counter({
  value,
  suffix = "",
  duration = 1800,
  className,
  play,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "80px 0px 80px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const [forceStart, setForceStart] = useState(false);
  const settled = useRef(false);

  const shouldRun = play === true || inView || forceStart;

  useEffect(() => {
    if (value === 0) return;

    const kick = () => {
      if (settled.current) return;
      if (isOnScreen(ref.current)) setForceStart(true);
    };

    const t1 = window.setTimeout(kick, 300);
    const t2 = window.setTimeout(kick, 1200);
    const t3 = window.setTimeout(kick, 2500);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [value]);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      settled.current = true;
      return;
    }

    if (prefersReducedMotion) {
      setDisplay(value);
      settled.current = true;
      return;
    }

    if (!shouldRun) return;

    let start: number | null = null;
    let raf = 0;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(value);
        settled.current = true;
      }
    };

    raf = requestAnimationFrame(step);

    const failSafe = window.setTimeout(() => {
      if (settled.current) return;
      setDisplay(value);
      settled.current = true;
    }, duration + 800);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failSafe);
    };
  }, [shouldRun, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
