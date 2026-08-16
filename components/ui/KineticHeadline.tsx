"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type KineticHeadlineProps = {
  text: string;
  backdrop: "scene3d" | "image" | "video";
  className?: string;
};

const backdropClass: Record<KineticHeadlineProps["backdrop"], string> = {
  scene3d: "z-[1] mix-blend-overlay",
  image: "z-[1] mix-blend-soft-light",
  video: "z-[1] mix-blend-lighten",
};

export default function KineticHeadline({ text, backdrop, className }: KineticHeadlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <div
      ref={ref}
      data-backdrop={backdrop}
      className={cn(
        "pointer-events-none absolute inset-0 flex items-end overflow-hidden px-page pb-8 sm:pb-12",
        backdropClass[backdrop],
        className,
      )}
    >
      <motion.p
        aria-hidden
        style={prefersReducedMotion ? undefined : { y }}
        className="w-full min-w-0 max-w-full break-words [overflow-wrap:anywhere] text-center font-display text-[clamp(2rem,12vw,10rem)] font-extrabold uppercase leading-[0.9] tracking-tighter text-white/90 sm:text-[clamp(3rem,11vw,10rem)]"
      >
        {text}
      </motion.p>
    </div>
  );
}
