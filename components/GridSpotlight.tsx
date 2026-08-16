"use client";

import { useEffect } from "react";

export default function GridSpotlight() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const canSpot = () => fine.matches && !motionMq.matches;

    const syncClass = () => {
      document.documentElement.classList.toggle("has-grid-spotlight", canSpot());
    };

    const onMove = (e: MouseEvent) => {
      if (!canSpot()) return;
      document.documentElement.style.setProperty("--spot-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--spot-y", `${e.clientY}px`);
    };

    const onVisibility = () => {
      document.documentElement.classList.toggle("anims-paused", document.hidden);
    };

    syncClass();
    onVisibility();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    fine.addEventListener("change", syncClass);
    motionMq.addEventListener("change", syncClass);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      fine.removeEventListener("change", syncClass);
      motionMq.removeEventListener("change", syncClass);
      document.documentElement.classList.remove("has-grid-spotlight", "anims-paused");
    };
  }, []);

  return null;
}
