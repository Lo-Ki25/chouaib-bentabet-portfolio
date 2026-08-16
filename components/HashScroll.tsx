"use client";

import { useEffect } from "react";
import { useLenisInstance } from "@/components/SmoothScrollProvider";

/**
 * Scrolls to the URL hash target after client navigation
 * (e.g. from /projects/[slug] → /#contact).
 */
export default function HashScroll() {
  const lenis = useLenisInstance();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    const timer = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 });
        return;
      }
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
}
