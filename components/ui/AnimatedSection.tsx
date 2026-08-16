"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useInViewport } from "@/hooks/useInViewport";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const EASE = [0.22, 1, 0.36, 1] as const;

const getVariants = (direction: Direction, distance: number): Variants => {
  const offset: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  return {
    hidden: { opacity: 0, ...offset[direction] },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  as?: "div" | "section";
  /** Léger effet de bascule 3D (rotateX) en plus du fade/translate, désactivé par défaut. */
  tilt3d?: boolean;
};

/**
 * Entrance wrapper that stays visible on SSR / first paint and when reduced
 * motion is on. After hydration, fades/slides in on viewport entry
 * (IntersectionObserver) — never on mount for below-the-fold content.
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 32,
  once = true,
  as = "div",
  tilt3d = false,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInViewport<HTMLDivElement>({
    once,
    threshold: 0.1,
    rootMargin: "80px 0px -40px 0px",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const Component = as === "section" ? motion.section : motion.div;
  const reduceMotion = !mounted || prefersReducedMotion;
  const variants = getVariants(direction, distance);
  const tiltVariants = tilt3d
    ? {
        hidden: { ...variants.hidden, rotateX: 6 },
        visible: { ...variants.visible, rotateX: 0 },
      }
    : variants;

  return (
    <Component
      ref={ref}
      className={cn(className)}
      {...(reduceMotion
        ? {}
        : {
            initial: "hidden" as const,
            animate: (inView ? "visible" : "hidden") as "hidden" | "visible",
            variants: tiltVariants,
            transition: { duration, delay, ease: EASE },
          })}
      style={tilt3d && !reduceMotion ? { transformPerspective: 800 } : undefined}
    >
      {children}
    </Component>
  );
}
