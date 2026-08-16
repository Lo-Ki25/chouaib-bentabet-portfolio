"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseMove?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLButtonElement>) => void;
  "aria-label"?: string;
};

export default function MagneticButton({
  children,
  className,
  disabled,
  onMouseMove,
  onMouseLeave,
  type = "button",
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const magnetic = finePointer && !prefersReducedMotion && !disabled;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      data-cursor-hover
      className={cn(className)}
      style={{
        x: magnetic ? springX : 0,
        y: magnetic ? springY : 0,
        willChange: active && magnetic ? "transform" : "auto",
      }}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        if (!magnetic || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const radius = 40 + Math.max(rect.width, rect.height) / 2;
        if (Math.hypot(dx, dy) < radius) {
          x.set(dx * 0.28);
          y.set(dy * 0.28);
          setActive(true);
        }
      }}
      onClick={onClick}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        x.set(0);
        y.set(0);
        setActive(false);
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
