"use client";

import { GraduationCap, Languages as LanguagesIcon, Award, Handshake, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { experience, education, languages, certifications, associations } from "@/lib/data";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

export default function Experience() {
  const { dict, lang } = useLanguage();
  const firstCurrentIndex = experience.findIndex((item) => item.current);

  return (
    <section id="experience" className="relative py-section">
      <div className="mx-auto max-w-6xl px-page">
        <SectionHeading
          eyebrow={dict.experience.eyebrow}
          title={dict.experience.title}
          subtitle={dict.experience.subtitle}
        />

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-12">
          {/* Timeline */}
          <div className="relative min-w-0 space-y-8 border-l border-white/10 pl-6 sm:space-y-10 sm:pl-8">
            {experience.map((item, i) => (
              <AnimatedSection key={`${item.org}-${i}`} delay={0.06 * i} className="relative">
                <span className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-accent-400 ring-4 ring-accent-500/15 sm:-left-[38px]" />

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

                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                  {item.description[lang]}
                </p>

                {item.bullets ? (
                  <ul className="mt-3 space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm text-muted">
                        <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-400/70" />
                        <span>{b[lang]}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.tech ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </AnimatedSection>
            ))}
          </div>

          {/* Sidebar: education, languages, certifications — sticky only on lg+ */}
          <div className="min-w-0 space-y-5 sm:space-y-6 lg:sticky lg:top-[100px] lg:self-start">
            <AnimatedSection direction="right" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <TiltCard maxTilt={5}>
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="h-5 w-5 text-accent-300" />
                  <h3 className="font-display text-base font-semibold text-white">
                    {dict.experience.educationTitle}
                  </h3>
                </div>
                <div className="mt-5 space-y-5">
                  {education.map((edu) => (
                    <div key={edu.school}>
                      <p className="text-sm font-semibold text-white">{edu.degree[lang]}</p>
                      <p className="mt-0.5 text-xs text-accent-300">{edu.school}</p>
                      <p className="text-[11px] uppercase tracking-wide text-muted">{edu.period[lang]}</p>
                      <ul className="mt-2 space-y-1">
                        {edu.details.map((d, i) => (
                          <li key={i} className="text-xs leading-relaxed text-muted">
                            — {d[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <TiltCard maxTilt={5}>
                <div className="flex items-center gap-2.5">
                  <LanguagesIcon className="h-5 w-5 text-accent-300" />
                  <h3 className="font-display text-base font-semibold text-white">
                    {dict.experience.languagesTitle}
                  </h3>
                </div>
                <div className="mt-5 space-y-4">
                  {languages.map((l) => (
                    <div key={l.name.en}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-white">{l.name[lang]}</span>
                        <span className="text-xs text-muted">{l.level[lang]}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-cyan"
                          style={{ width: `${l.fluency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
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
