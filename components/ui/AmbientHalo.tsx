"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const HALO_CLASS = "pointer-events-none fixed inset-0 -z-10 bg-radial-fade";

/**
 * Halo radial bleu-violet du fond global.
 * Léger drift + variation d'intensité au scroll document (GPU: transform/opacity).
 * Désactivé entièrement sous prefers-reduced-motion.
 */
export default function AmbientHalo() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Plages étroites : perceptible au défilement long, jamais distrayant
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "1.6%", "-1.2%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "3.5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 1, 0.72]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.045]);

  if (prefersReducedMotion) {
    return <div aria-hidden className={HALO_CLASS} />;
  }

  return (
    <motion.div
      aria-hidden
      className={HALO_CLASS}
      style={{ x, y, opacity, scale }}
    />
  );
}
