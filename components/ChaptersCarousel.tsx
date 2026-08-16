"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useLenisInstance } from "@/components/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const CHAPTER_NAV_KEYS = ["transformation", "cybersecurity", "marketDesign"] as const;

type ChaptersCarouselProps = {
  children: ReactNode;
};

/**
 * Carrousel vertical « pinned » : chaque chapitre reste sticky plein écran
 * le temps d’un runway de scroll, puis cède la place au suivant.
 * Sous prefers-reduced-motion : empilement classique, sans pin ni indicateurs.
 */
export default function ChaptersCarousel({ children }: ChaptersCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const { dict, lang } = useLanguage();
  const lenis = useLenisInstance();
  const items = Children.toArray(children);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const navLabel = lang === "fr" ? "Chapitres" : "Chapters";
  const regionLabel =
    lang === "fr" ? "Carrousel de chapitres" : "Chapters carousel";

  useEffect(() => {
    if (prefersReducedMotion) return;

    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!panels.length) return;

    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }
        let bestIndex = 0;
        let bestRatio = -1;
        panels.forEach((panel, i) => {
          const ratio = ratios.get(panel) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = i;
          }
        });
        setActive(bestIndex);
      },
      {
        threshold: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1],
        rootMargin: "-12% 0px -12% 0px",
      }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [prefersReducedMotion, items.length]);

  const goTo = useCallback(
    (index: number) => {
      const el = panelRefs.current[index];
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goTo(Math.min(active + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(Math.max(active - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(items.length - 1);
      }
    },
    [active, goTo, items.length]
  );

  if (prefersReducedMotion) {
    return <div className="contents">{children}</div>;
  }

  return (
    <div
      className="relative outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <nav
        aria-label={navLabel}
        className="pointer-events-none absolute inset-y-0 right-3 z-30 sm:right-5"
      >
        <div className="sticky top-1/2 flex -translate-y-1/2 flex-col items-center gap-2.5 sm:gap-3">
          {items.map((_, i) => {
            const navKey = CHAPTER_NAV_KEYS[i] ?? CHAPTER_NAV_KEYS[0];
            const label = dict.nav[navKey];
            const isActive = active === i;
            return (
              <button
                key={navKey}
                type="button"
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  "pointer-events-auto h-2.5 w-2.5 rounded-full transition-[transform,background-color,box-shadow] duration-300",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
                  isActive
                    ? "scale-125 bg-cta shadow-[0_0_10px_rgba(255,138,61,0.45)]"
                    : "bg-white/25 hover:bg-white/50"
                )}
              />
            );
          })}
        </div>
      </nav>

      {items.map((child, i) => (
        <div
          key={CHAPTER_NAV_KEYS[i] ?? i}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          className="relative h-[145vh] sm:h-[165vh] lg:h-[180vh]"
        >
          <div className="sticky top-0 flex h-[100svh] max-h-[100svh] w-full items-stretch overflow-hidden">
            <div className="h-full w-full [&_section]:flex [&_section]:h-full [&_section]:min-h-full [&_section]:items-center">
              {child}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
