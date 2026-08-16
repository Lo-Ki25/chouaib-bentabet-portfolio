"use client";

import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useInViewport } from "@/hooks/useInViewport";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const PARTNERS = [
  "FICRA CONSEIL",
  "ECOP Morocco",
  "RAMO CONSULTING SARL",
  "Ed Manar",
  "UIB Innovation",
  "AFRIC EDUC",
  "MT180 Maroc",
  "Association Marocaine des Petits Débrouillards",
] as const;

export default function Partners() {
  const { dict } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const loopedPartners = [...PARTNERS, ...PARTNERS];
  const marquee = useInViewport<HTMLDivElement>({ once: false, threshold: 0.15 });

  return (
    <section id="partners" className="relative overflow-x-clip py-section">
      <div className="mx-auto max-w-6xl px-page">
        <SectionHeading eyebrow={dict.partners.eyebrow} title={dict.partners.title} />
      </div>

      <AnimatedSection delay={0.08} className="relative mt-10 overflow-hidden sm:mt-14">
        <div
          ref={marquee.ref}
          className="flex w-max gap-3 animate-marquee will-change-transform motion-reduce:animate-none sm:gap-4"
          style={{
            animationPlayState: marquee.inView && !prefersReducedMotion ? "running" : "paused",
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {loopedPartners.map((name, i) => (
            <TiltCard key={`${name}-${i}`} maxTilt={5} className="shrink-0">
              <span className="flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/85 sm:px-5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                {name}
              </span>
            </TiltCard>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
