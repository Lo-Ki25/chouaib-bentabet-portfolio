"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profile, stats } from "@/lib/data";
import Counter from "./ui/Counter";

const codeLines = [
  { indent: 0, text: "const developer = {" },
  { indent: 1, text: 'name: "Chouaib Bentabet",' },
  { indent: 1, text: 'role: "Full-Stack Developer",' },
  { indent: 1, text: "stack: [Next.js, TypeScript, Tailwind]," },
  { indent: 1, text: 'based: "Morocco 🇲🇦",' },
  { indent: 1, text: "loves: buildingThingsThatMatter," },
  { indent: 0, text: "};" },
];

export default function Hero() {
  const { dict, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate only after mount — first paint stays fully visible (same pattern as Navbar)
  const canAnimate = mounted && !prefersReducedMotion;

  const fadeUp = (delay = 0) =>
    canAnimate
      ? {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay },
        }
      : {};

  const floatLoop = (y: number[], delay = 0) =>
    canAnimate
      ? {
          animate: { y },
          transition: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" as const, delay },
        }
      : {};

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 md:pb-24 md:pt-36"
    >
      {/* Decorative gradient blobs — contained so they don't cause horizontal scroll; softer on mobile */}
      <div className="pointer-events-none absolute -left-24 -top-32 h-[220px] w-[220px] rounded-full bg-accent-500/20 blur-[80px] animate-blob motion-reduce:animate-none sm:h-[420px] sm:w-[420px] sm:bg-accent-500/25 sm:blur-[120px]" />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[180px] w-[180px] rounded-full bg-violet/15 blur-[80px] animate-blob motion-reduce:animate-none sm:h-[380px] sm:w-[380px] sm:bg-violet/20 sm:blur-[120px]"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 hidden h-[300px] w-[300px] rounded-full bg-cyan/10 blur-[120px] animate-blob motion-reduce:animate-none sm:block"
        style={{ animationDelay: "8s" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-page lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <motion.div
              {...(canAnimate
                ? {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                  }
                : {})}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-300 sm:px-4 sm:text-xs sm:tracking-[0.2em]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{dict.hero.eyebrow}</span>
            </motion.div>

            <motion.div
              {...(canAnimate
                ? {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.05 },
                  }
                : {})}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-medium text-emerald-300 sm:text-xs"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse-glow motion-reduce:animate-none" />
              <span className="truncate">{dict.hero.available}</span>
            </motion.div>
          </div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-5 font-display font-bold leading-[1.08] text-white balance sm:mt-6"
            style={{ fontSize: "clamp(1.875rem, 7vw + 0.5rem, 3.75rem)" }}
          >
            {dict.hero.title1}{" "}
            <span className="text-gradient">{dict.hero.title2}</span>{" "}
            {dict.hero.title3}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-4 flex items-center gap-1.5 text-sm text-muted"
          >
            <MapPin className="h-4 w-4 shrink-0 text-accent-400" />
            {profile.location}
          </motion.div>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <button
              onClick={() => scrollTo("projects")}
              data-cursor-hover
              className="group touch-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-violet px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 focus-visible:scale-105 sm:w-auto"
            >
              {dict.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              data-cursor-hover
              className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent-400/50 hover:bg-white/5 sm:w-auto"
            >
              {dict.hero.ctaSecondary}
            </button>
          </motion.div>

          <motion.div
            {...fadeUp(0.5)}
            className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.label.en} className="min-w-0">
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                  {stat.label[lang]}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating code panel */}
        <motion.div
          {...(canAnimate
            ? {
                initial: { opacity: 0, scale: 0.9, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.3 },
              }
            : {})}
          className="relative hidden lg:block"
        >
          <motion.div
            {...floatLoop([0, -16, 0], 0)}
            className="glass card-border relative overflow-hidden rounded-2xl shadow-card"
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 text-xs text-muted">profile.ts</span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-relaxed">
              {codeLines.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${line.indent * 16}px` }}>
                  <span className="text-muted/60 select-none">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ml-4 text-accent-100">{line.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...floatLoop([0, 12, 0], 0.5)}
            className="glass card-border absolute -bottom-6 -left-10 rounded-xl px-4 py-3 shadow-card"
          >
            <p className="font-display text-lg font-bold text-white">
              <Counter value={stats[0].value} suffix={stats[0].suffix} />
            </p>
            <p className="text-[11px] text-muted">{stats[0].label[lang]}</p>
          </motion.div>

          <motion.div
            {...floatLoop([0, -10, 0], 1)}
            className="glass card-border absolute -right-6 -top-6 flex items-center gap-2 rounded-xl px-3.5 py-2.5 shadow-card"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-glow motion-reduce:animate-none" />
            <span className="text-xs font-medium text-white">Next.js · TypeScript</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        data-cursor-hover
        {...(canAnimate
          ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.6, delay: 1 },
            }
          : {})}
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted safe-bottom sm:bottom-8 sm:gap-2 sm:text-xs"
      >
        {dict.hero.scroll}
        <motion.span
          {...(canAnimate
            ? {
                animate: { y: [0, 6, 0] },
                transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
              }
            : {})}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
