"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewportOptions = IntersectionObserverInit & {
  /** Une fois visible, reste `true` pour toujours (défaut). Passer `false` pour suivre l'état en continu. */
  once?: boolean;
};

/** Détecte quand un élément entre dans le viewport (IntersectionObserver). */
export function useInViewport<T extends HTMLElement>(options?: UseInViewportOptions) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.2,
        rootMargin: options?.rootMargin ?? "100px",
        root: options?.root ?? null,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return { ref, inView } as const;
}
