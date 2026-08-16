"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useInViewport } from "@/hooks/useInViewport";

type ChapterProps = {
  id: string;
  backgroundSrc: string;
  eyebrow: string;
  title: string;
  body?: string;
  pills?: string[];
  children?: ReactNode;
};

export default function Chapter({
  id,
  backgroundSrc,
  eyebrow,
  title,
  body,
  pills,
  children,
}: ChapterProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLHeadingElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !prefersReducedMotion;

  return (
    <section id={id} className="relative flex min-h-[80vh] w-full items-center overflow-hidden">
      <Image
        src={backgroundSrc}
        alt={title}
        fill
        priority={false}
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-base-900/80 via-base-900/40 to-base-900/80"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-page py-section">
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-300 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400 animate-pulse-glow motion-reduce:animate-none" />
          <span className="truncate">{eyebrow}</span>
        </span>

        <motion.h2
          ref={ref}
          {...(canAnimate
            ? {
                initial: { opacity: 0, y: 28 },
                animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
              }
            : {})}
          className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white balance sm:mt-6 sm:text-6xl"
        >
          {title}
        </motion.h2>

        {body ? (
          <motion.p
            {...(canAnimate
              ? {
                  initial: { opacity: 0, y: 16 },
                  animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
                  transition: { duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const },
                }
              : {})}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:mt-6 sm:text-lg"
          >
            {body}
          </motion.p>
        ) : null}

        {pills && pills.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
            {pills.map((pill, i) => (
              <motion.span
                key={pill}
                {...(canAnimate
                  ? {
                      initial: { opacity: 0, y: 8 },
                      animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
                      transition: {
                        duration: 0.4,
                        delay: 0.12 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1] as const,
                      },
                    }
                  : {})}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-accent-100 sm:px-4"
              >
                {pill}
              </motion.span>
            ))}
          </div>
        ) : null}

        {children ? <div className="mt-8 sm:mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
