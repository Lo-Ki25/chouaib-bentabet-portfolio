"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profile, missionStatement, values, CAREER_START_YEAR } from "@/lib/data";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useTabVisible } from "@/hooks/useTabVisible";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";

export default function About() {
  const { dict, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const tabVisible = useTabVisible();
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const glassRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: glassRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !prefersReducedMotion;
  const canFloat = canAnimate && tabVisible && finePointer;

  const showAvatar = Boolean(profile.avatar) && !avatarFailed;

  const quickFacts = [
    { label: lang === "fr" ? "Basé à" : "Based in", value: profile.location },
    { label: lang === "fr" ? "Freelance depuis" : "Freelancing since", value: CAREER_START_YEAR },
    { label: lang === "fr" ? "Fondateur depuis" : "Founder since", value: "2023" },
    { label: lang === "fr" ? "Langues" : "Languages", value: "AR · FR · EN" },
  ];

  return (
    <section id="about" className="relative py-section">
      <div className="mx-auto max-w-6xl px-page">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              eyebrow={dict.about.eyebrow}
              title={dict.about.title}
              emphasize={lang === "fr" ? "pour de vrai" : "genuinely"}
            />

            <AnimatedSection delay={0.1} className="mt-6 space-y-4">
              <p className="text-[15px] leading-relaxed text-muted sm:text-lg">{dict.about.body}</p>
              <p className="text-[15px] leading-relaxed text-muted sm:text-lg">{dict.about.body2}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative mt-8 rounded-2xl border border-accent-500/20 bg-accent-500/5 p-5 sm:p-6">
              <Quote className="h-6 w-6 text-accent-400/60" />
              <p className="mt-3 font-display text-base italic leading-relaxed text-white/90 balance sm:text-lg">
                {missionStatement[lang]}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {dict.about.valuesTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {values.map((v) => (
                  <span
                    key={v.en}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-accent-100 sm:px-4"
                  >
                    {v[lang]}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right" delay={0.15} className="relative min-w-0">
            <motion.div
              ref={glassRef}
              style={canAnimate ? { y: parallaxY } : undefined}
              className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 shadow-card"
            >
              <motion.div
                {...(canFloat
                  ? {
                      animate: { y: [0, -14, 0] },
                      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
                    }
                  : {})}
                className="relative aspect-square will-change-transform"
              >
                {/* Rendu uniquement après montage : même mismatch d'hydratation
                    que pour l'image du Hero (next/image + fill). Purement
                    décoratif (alt vide), retarder d'un tick est invisible. */}
                {mounted ? (
                  <Image
                    src="/images/about-glass.png"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-base-900/70 via-transparent to-base-900/20" />
              </motion.div>
            </motion.div>

            <div className="glass card-border relative overflow-hidden rounded-3xl p-5 shadow-card sm:p-8 lg:-mt-16">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
              <div className="relative flex flex-col items-center text-center">
                {/*
                  Profile photo: set profile.avatar in lib/data.ts after dropping
                  the image at public/avatar.jpg (square crop, ≥112×112).
                  Falls back to /logo-cb.png, then to CB initials if that fails.
                */}
                <motion.div
                  {...(canAnimate
                    ? {
                        initial: { scale: 0.85, opacity: 0 },
                        whileInView: { scale: 1, opacity: 1 },
                        viewport: { once: true, amount: 0.4 },
                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
                      }
                    : {})}
                  className="relative h-28 w-28 shrink-0"
                >
                  {showAvatar && profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      width={112}
                      height={112}
                      className="h-28 w-28 rounded-full object-cover shadow-glow"
                      priority
                      onError={() => setAvatarFailed(true)}
                    />
                  ) : !logoFailed ? (
                    <Image
                      src="/logo-cb.png"
                      alt={profile.name}
                      width={112}
                      height={112}
                      className="h-28 w-28 rounded-full object-cover shadow-glow"
                      onError={() => setLogoFailed(true)}
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 via-accent-500 to-violet font-display text-4xl font-bold text-white shadow-glow">
                      {profile.initials}
                    </div>
                  )}
                </motion.div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{profile.name}</h3>
                <p className="mt-1 text-sm text-accent-300">{profile.title[lang]}</p>
              </div>

              <div className="relative mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                {quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="min-w-0 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:p-4"
                  >
                    <p className="text-[11px] uppercase tracking-wide text-muted">{fact.label}</p>
                    <p className="mt-1 break-words font-display text-sm font-semibold text-white sm:text-base">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
