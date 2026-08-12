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
import { useLanguage } from "@/context/LanguageContext";
import { skillGroups, marqueeSkills } from "@/lib/data";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";

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
  const loopedSkills = [...marqueeSkills, ...marqueeSkills];

  return (
    <section id="skills" className="relative overflow-x-clip py-section">
      <div className="mx-auto max-w-6xl px-page">
        <SectionHeading eyebrow={dict.skills.eyebrow} title={dict.skills.title} subtitle={dict.skills.subtitle} />
      </div>

      <AnimatedSection delay={0.15} className="relative mt-10 overflow-hidden sm:mt-14">
        <div
          className="flex w-max gap-3 animate-marquee motion-reduce:animate-none sm:gap-4"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {loopedSkills.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80 sm:px-5 sm:py-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              {skill}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 px-page sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = iconMap[group.icon] ?? LayoutTemplate;
          return (
            <AnimatedSection
              key={group.title.en}
              delay={0.05 * i}
              className="group min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-accent-500/30 hover:bg-white/[0.04] sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-300 transition-colors group-hover:bg-accent-500/20 group-focus-within:bg-accent-500/20">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white sm:text-lg">
                {group.title[lang]}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
