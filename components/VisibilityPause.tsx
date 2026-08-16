"use client";

import { useEffect } from "react";

/** Pauses CSS background animations while the tab is hidden. */
export default function VisibilityPause() {
  useEffect(() => {
    const onChange = () => {
      document.documentElement.classList.toggle("tab-hidden", document.hidden);
    };
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      document.documentElement.classList.remove("tab-hidden");
    };
  }, []);

  return null;
}
