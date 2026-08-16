"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

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
 * Entrance wrapper that is always visible on SSR / first paint.
 * Animations only attach after client mount when motion is allowed —
 * never leave content stuck at opacity: 0 (no whileInView dependency).
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 32,
  once: _once = true,
  as = "div",
  tilt3d = false,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const Tag = as === "section" ? "section" : "div";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fail-safe: visible until hydrated, and always when reduced motion is on
  if (!mounted || prefersReducedMotion) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  const Component = as === "section" ? motion.section : motion.div;
  const variants = getVariants(direction, distance);
  const tiltVariants = tilt3d
    ? {
        hidden: { ...variants.hidden, rotateX: 6 },
        visible: { ...variants.visible, rotateX: 0 },
      }
    : variants;

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={tiltVariants}
      style={tilt3d ? { transformPerspective: 800 } : undefined}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
