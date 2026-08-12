"use client";

import { useEffect } from "react";

/**
 * Scrolls to the URL hash target after client navigation
 * (e.g. from /projects/[slug] → /#contact).
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
