"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { stats } from "@/lib/data";
import { useInViewport } from "@/hooks/useInViewport";
import Counter from "./ui/Counter";
import Eyebrow from "./ui/Eyebrow";

export default function ImpactBand() {
  const { dict, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLElement>({ threshold: 0, rootMargin: "160px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !prefersReducedMotion;

  const fadeUp = (delay = 0) =>
    canAnimate
      ? {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {};

  return (
    <section
      ref={ref}
      aria-labelledby="impact-title"
      className="relative overflow-hidden border-y border-white/10 bg-base-900"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent-500/10 via-transparent to-cyan/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-accent-500/15 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-cyan/10 blur-[80px]"
      />

      <div className="relative mx-auto max-w-6xl px-page py-section">
        <motion.div {...fadeUp(0)}>
          <Eyebrow>{dict.impact.eyebrow}</Eyebrow>
          <h2
            id="impact-title"
            className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl"
          >
            {dict.impact.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            {dict.impact.body}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label.en}
              {...fadeUp(0.12 + index * 0.08)}
              className="min-w-0 border-t border-accent-500/30 pt-5"
            >
              <p className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  play={inView}
                  className="text-gradient"
                />
              </p>
              <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">{stat.label[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
