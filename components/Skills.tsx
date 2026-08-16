"use client";

import {
  LayoutTemplate,
  BrainCircuit,
  ShieldCheck,
  Database,
  Palette,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { skillGroups, marqueeSkills } from "@/lib/data";
import { useInViewport } from "@/hooks/useInViewport";
import AmbientVideo from "./ui/AmbientVideo";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const iconMap: Record<string, LucideIcon> = {
  LayoutTemplate,
  BrainCircuit,
  ShieldCheck,
  Database,
  Palette,
  Users,
};

export default function Skills() {
  const { dict, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const loopedSkills = [...marqueeSkills, ...marqueeSkills];
  const marquee = useInViewport({ once: false, threshold: 0.15 });

  return (
    <section id="skills" className="relative overflow-x-clip py-section">
      <AmbientVideo
        src="/videos/skills-ambient.mp4"
        poster="/images/skills-poster.jpg"
        className="absolute inset-0 opacity-[0.28] mix-blend-screen"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base-900/90 via-base-900/72 to-base-900"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base-900/80 via-transparent to-base-900/70"
      />

      <div className="relative mx-auto max-w-6xl px-page">
        <SectionHeading eyebrow={dict.skills.eyebrow} title={dict.skills.title} subtitle={dict.skills.subtitle} />
      </div>

      <AnimatedSection delay={0.08} className="relative mt-10 overflow-hidden sm:mt-14">
        <div
          ref={marquee.ref}
          className="flex w-max gap-3 animate-marquee will-change-transform motion-reduce:animate-none sm:gap-4"
          style={{
            animationPlayState: marquee.inView && !prefersReducedMotion ? "running" : "paused",
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {loopedSkills.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm sm:px-5 sm:py-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              {skill}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-4 px-page sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = iconMap[group.icon] ?? LayoutTemplate;
          return (
            <AnimatedSection
              key={group.title.en}
              delay={0.05 * i}
              className="group min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-accent-500/30 hover:bg-white/[0.06] sm:p-6"
            >
              <TiltCard maxTilt={6}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-300 transition-colors group-hover:bg-accent-500/20 group-focus-within:bg-accent-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-white sm:text-lg">
                  {group.title[lang]}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.35, delay: 0.04 * si, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
