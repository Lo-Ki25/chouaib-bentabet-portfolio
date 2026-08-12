"use client";

import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-300 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400 animate-pulse-glow motion-reduce:animate-none" />
        <span className="truncate">{eyebrow}</span>
      </span>
      <h2 className="mt-4 font-display text-[1.75rem] font-bold leading-[1.15] text-white sm:mt-5 sm:text-4xl md:text-5xl balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-[15px] leading-relaxed text-muted sm:mt-4 sm:text-lg">{subtitle}</p>
      ) : null}
    </AnimatedSection>
  );
}
