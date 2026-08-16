"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
};

/**
 * Léger effet de profondeur 3D au survol (desktop uniquement) : le contenu
 * suit la souris avec une rotation en perspective subtile. Respecte
 * prefers-reduced-motion et ne s'active que sur pointeur fin (souris),
 * même pattern que MagneticButton.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 8,
  onMouseMove,
  onMouseLeave,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const rotateY = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const tiltEnabled = finePointer && !prefersReducedMotion;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawY.set(px * maxTilt * 2);
    rawX.set(-py * maxTilt * 2);
  };

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        tiltEnabled
          ? { rotateX, rotateY, transformPerspective: 800, willChange: "transform" }
          : undefined
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
