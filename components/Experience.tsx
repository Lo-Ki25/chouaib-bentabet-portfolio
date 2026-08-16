"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  BookOpen,
  ChevronRight,
  Code2,
  Handshake,
  Languages as LanguagesIcon,
  Rocket,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { experience, languages, certifications, associations } from "@/lib/data";
import type { ExperienceItem } from "@/types";
import { useInViewport } from "@/hooks/useInViewport";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

function experienceIcon(item: ExperienceItem): LucideIcon {
  switch (item.org) {
    case "Netnook":
      return Rocket;
    case "ECOP Morocco":
      return Waves;
    case "Mohammed V University":
      return BookOpen;
    case "Freelance":
      return item.role.en.startsWith("Mentor") ? Users : Code2;
    default:
      return Code2;
  }
}

/** Netnook / ECOP / Full-Stack: bullets only. Mentor & Student Entrepreneur stay as short descriptions. */
function hasVisibleBullets(item: ExperienceItem): boolean {
  if (!item.bullets?.length) return false;
  if (item.org === "Mohammed V University") return false;
  if (item.org === "Freelance" && item.role.en.startsWith("Mentor")) return false;
  return true;
}

export default function Experience() {
  const { dict, lang } = useLanguage();
  const firstCurrentIndex = experience.findIndex((item) => item.current);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { ref: languagesRef, inView: languagesInView } = useInViewport<HTMLDivElement>();

  // Fill grows as the timeline scrolls through the viewport center (5 entries).
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-section">
      <div className="mx-auto max-w-6xl px-page">
        <SectionHeading
          eyebrow={dict.experience.eyebrow}
          title={dict.experience.title}
          subtitle={dict.experience.subtitle}
          emphasize={lang === "fr" ? "professionnel" : "professional"}
        />

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-12">
          {/* Timeline */}
          <div ref={timelineRef} className="relative min-w-0 pl-6 sm:pl-8">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-1 left-0 top-1 w-px bg-white/10"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-cta-400 via-cta to-cta-600/50"
              style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: lineScaleY }}
            />

            <div className="space-y-8 sm:space-y-10">
              {experience.map((item, i) => {
                const Icon = experienceIcon(item);
                const showBullets = hasVisibleBullets(item);

                return (
                  <AnimatedSection key={`${item.org}-${i}`} delay={Math.min(0.04 * i, 0.12)} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[38px] top-0 flex h-7 w-7 items-center justify-center sm:-left-[46px]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-base-900 ring-4 ring-base-900">
                        <Icon className="h-3.5 w-3.5 text-accent-300" strokeWidth={1.75} />
                      </span>
                      <span className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-400 ring-2 ring-base-900" />
                    </span>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                        {item.role[lang]}
                      </h3>
                      {item.current ? (
                        i === firstCurrentIndex ? (
                          <span className="rounded-full bg-accent-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-300">
                            {dict.experience.present}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400/90">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                            {dict.experience.present}
                          </span>
                        )
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent-300">
                      {item.org} · {item.location}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-muted">{item.period[lang]}</p>

                    {!showBullets ? (
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                        {item.description[lang]}
                      </p>
                    ) : null}

                    {showBullets && item.bullets ? (
                      <ul className="mt-3 space-y-1.5">
                        {item.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-sm text-muted">
                            <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-400/70" />
                            <span>{b[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </AnimatedSection>
                );
              })}
            </div>
          </div>

          {/* Sidebar: languages banner + certifications / associations cards — sticky only on lg+ */}
          <div className="min-w-0 space-y-5 sm:space-y-6 lg:sticky lg:top-[100px] lg:self-start">
            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex items-center gap-2">
                <LanguagesIcon className="h-4 w-4 text-accent-300" aria-hidden />
                <h3 className="font-display text-sm font-semibold text-white">
                  {dict.experience.languagesTitle}
                </h3>
              </div>
              <div ref={languagesRef} className="mt-3 space-y-2.5">
                {languages.map((l, i) => (
                  <div key={l.name.en} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                    <span className="text-sm font-medium text-white">{l.name[lang]}</span>
                    <div className="h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-500 to-cta"
                        initial={false}
                        animate={{
                          width:
                            prefersReducedMotion || languagesInView ? `${l.fluency}%` : "0%",
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.08 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                    <span className="text-[11px] text-muted">{l.level[lang]}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <TiltCard maxTilt={5}>
                <div className="flex items-center gap-2.5">
                  <Award className="h-5 w-5 text-accent-300" />
                  <h3 className="font-display text-base font-semibold text-white">
                    {dict.experience.certificationsTitle}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {certifications.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/80"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <TiltCard maxTilt={5}>
                <div className="flex items-center gap-2.5">
                  <Handshake className="h-5 w-5 text-accent-300" />
                  <h3 className="font-display text-base font-semibold text-white">
                    {dict.experience.associationsTitle}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {associations.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/80"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
