"use client";

import { useEffect, useRef, useState } from "react";

const DOT_SIZE = 8;
const RING_SIZE = 36;

export default function SmoothCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, rx: -100, ry: -100, hovering: false, visible: false });
  const rafRef = useRef(0);
  const labelElRef = useRef<HTMLDivElement>(null);
  const hoverTextRef = useRef<string | null>(null);

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
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      pos.current.visible = true;
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      pos.current.hovering = Boolean(target.closest("a, button, [data-cursor-hover]"));
      const textTarget = target.closest("[data-cursor-text]") as HTMLElement | null;
      hoverTextRef.current = textTarget?.getAttribute("data-cursor-text") ?? null;
    };

    const leave = () => {
      pos.current.visible = false;
    };

    const tick = () => {
      if (!document.hidden) {
        const p = pos.current;
        p.rx += (p.x - p.rx) * 0.18;
        p.ry += (p.y - p.ry) * 0.18;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (dot) {
          dot.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
          dot.style.opacity = p.visible ? "1" : "0";
        }
        if (ring) {
          const scale = p.hovering ? 1.6 : 1;
          ring.style.transform = `translate3d(${p.rx}px, ${p.ry}px, 0) scale(${scale})`;
          ring.style.opacity = p.visible ? "1" : "0";
          ring.style.backgroundColor = p.hovering ? "rgba(59,107,255,0.12)" : "rgba(59,107,255,0)";
        }

        const label = labelElRef.current;
        if (label) {
          const text = hoverTextRef.current;
          if (text) {
            if (label.textContent !== text) label.textContent = text;
            label.style.opacity = p.visible ? "1" : "0";
          } else {
            label.style.opacity = "0";
          }
          label.style.transform = `translate3d(${p.rx + 24}px, ${p.ry + 24}px, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-accent-400"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
          borderColor: "rgba(59,107,255,0.55)",
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0)",
          transition: "background-color 0.25s ease-out",
        }}
      />
      <div
        ref={labelElRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] select-none whitespace-nowrap rounded-full bg-accent-500 px-3 py-1 text-[11px] font-semibold text-white opacity-0 shadow-glow-sm transition-opacity duration-150"
        style={{ willChange: "transform", transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
