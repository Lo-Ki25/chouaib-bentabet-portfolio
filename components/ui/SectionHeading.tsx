"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewport } from "@/hooks/useInViewport";
import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Case-sensitive substring of `title` to highlight when the heading enters view. */
  emphasize?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  emphasize,
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLHeadingElement>();

  const matchIndex = emphasize ? title.indexOf(emphasize) : -1;
  const hasEmphasis = Boolean(emphasize) && matchIndex !== -1;
  const canAnimateEmphasis = hasEmphasis && !prefersReducedMotion;

  const before = hasEmphasis ? title.slice(0, matchIndex) : "";
  const after = hasEmphasis && emphasize ? title.slice(matchIndex + emphasize.length) : "";

  return (
    <AnimatedSection
      tilt3d
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-300 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400 animate-pulse-glow motion-reduce:animate-none" />
        <span className="truncate">{eyebrow}</span>
      </span>
      <h2
        ref={ref}
        className={cn(
          "mt-4 font-display text-[1.75rem] font-bold leading-[1.15] sm:mt-5 sm:text-4xl md:text-5xl balance",
          hasEmphasis ? "text-white/60" : "text-white",
        )}
      >
        {hasEmphasis && emphasize ? (
          <>
            {before}
            <motion.span
              className="inline-block text-white"
              {...(canAnimateEmphasis
                ? {
                    initial: { opacity: 0.4, y: 8 },
                    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 8 },
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
                  }
                : {})}
            >
              {emphasize}
            </motion.span>
            {after}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-[15px] leading-relaxed text-muted sm:mt-4 sm:text-lg">{subtitle}</p>
      ) : null}
    </AnimatedSection>
  );
}
