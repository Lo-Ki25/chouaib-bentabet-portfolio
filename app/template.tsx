"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Route Template Next.js : une nouvelle instance est montée à chaque
 * navigation, ce qui donne une entrée en fondu douce sur chaque page
 * (notamment "/" → "/projects/[slug]"). Volontairement simple (fade +
 * translateY à l'entrée, pas de transition de sortie coordonnée entre
 * pages) pour rester fiable avec l'App Router.
 *
 * Toujours le même wrapper `<div>` (motion.div) : brancher sur
 * useReducedMotion() (null côté SSR, true/false au premier paint client)
 * remplaçait ce div par un fragment et cassait l'hydratation
 * ("Did not expect server HTML to contain a <div> in <div>").
 * MotionConfig reducedMotion="user" désactive déjà l'animation.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
