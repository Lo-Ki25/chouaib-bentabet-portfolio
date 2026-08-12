"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DOT_SIZE = 8;
const RING_SIZE = 36;

export default function SmoothCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 320, mass: 0.4 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsDesktop(mq.matches && !motionMq.matches);
    update();
    mq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest("a, button, [data-cursor-hover]")));
    };

    const leave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-accent-400"
        style={{
          x: cursorX,
          y: cursorY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
          opacity: isVisible ? 1 : 0,
          borderColor: "rgba(59,107,255,0.55)",
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          backgroundColor: isHovering ? "rgba(59,107,255,0.12)" : "rgba(59,107,255,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
