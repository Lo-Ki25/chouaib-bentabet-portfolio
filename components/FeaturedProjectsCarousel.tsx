"use client";

import {
  useCallback,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { truncateText } from "@/lib/truncateText";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { CATEGORY_STYLES } from "./categoryStyles";
import ProjectCover from "./ProjectCover";

const SUMMARY_MAX_LENGTH = 180;
const DRAG_THRESHOLD = 60;
const VELOCITY_THRESHOLD = 400;

/** Matches PillButton outline, sized for chips (same as Projects.tsx). */
const tagPillClassName =
  "pointer-events-none rounded-full border border-white/25 bg-transparent px-2.5 py-0.5 text-[11px] font-semibold text-white";

type FeaturedProjectsCarouselProps = {
  projects: Project[];
};

export default function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  const { dict, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const featured = useMemo(
    () => projects.filter((p) => p.featured === true),
    [projects],
  );

  const count = featured.length;
  const project = featured[index];

  const goTo = useCallback(
    (next: number, dir?: number) => {
      if (count === 0) return;
      const wrapped = ((next % count) + count) % count;
      setDirection(dir ?? (wrapped > index ? 1 : -1));
      setIndex(wrapped);
    },
    [count, index],
  );

  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext],
  );

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset, velocity } = info;
      if (offset.x < -DRAG_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
        goNext();
      } else if (offset.x > DRAG_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  if (!project || count === 0) return null;

  const style = CATEGORY_STYLES[project.category];
  const chips = (project.tech.length > 0 ? project.tech : project.tags).slice(0, 3);
  const prevLabel = lang === "fr" ? "Projet précédent" : "Previous project";
  const nextLabel = lang === "fr" ? "Projet suivant" : "Next project";
  const regionLabel =
    lang === "fr" ? "Projets à la une" : "Featured projects";
  const slideLabel = (i: number) =>
    lang === "fr"
      ? `Aller au projet ${i + 1} : ${featured[i].title}`
      : `Go to project ${i + 1}: ${featured[i].title}`;

  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (d: number) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -48 : 48, opacity: 0 }),
      };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:mt-12"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent-300" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-300">
            {dict.projects.featured}
          </p>
          <span className="text-xs text-muted" aria-live="polite">
            {index + 1} / {count}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={prevLabel}
            onClick={goPrev}
            className="touch-target inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent-500/40 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={goNext}
            className="touch-target inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent-500/40 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={project.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${count} — ${project.title}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="group grid cursor-grab touch-pan-y active:cursor-grabbing sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
          >
            <ProjectCover
              title={project.title}
              lang={lang}
              image={project.image}
              gradient={style.gradient}
              className="h-52 w-full sm:h-full sm:min-h-[280px]"
              imgClassName="transition-transform duration-500 group-hover:scale-105"
              initialsClassName="text-6xl sm:text-7xl"
              draggable={false}
            >
              <div className="absolute inset-0 bg-grid opacity-30 transition-opacity group-hover:opacity-50" />
              <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                <Sparkles className="h-3 w-3" />
                {dict.projects.featured}
              </span>
              <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                {project.year}
              </span>
            </ProjectCover>

            <div className="flex flex-col p-5 sm:p-6 lg:p-8">
              <span
                className={cn(
                  "w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  style.badge,
                )}
              >
                {project.category}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">
                {project.title}
              </h3>
              {project.client ? (
                <p className="mt-1 text-sm font-medium tracking-wide text-muted">
                  {project.client}
                </p>
              ) : null}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[15px]">
                {truncateText(project.summary[lang], SUMMARY_MAX_LENGTH)}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-1.5">
                {chips.map((t) => (
                  <span key={t} className={tagPillClassName}>
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                data-cursor-hover
                className="touch-target mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200 active:text-accent-200"
              >
                {dict.projects.viewProject}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div
        role="tablist"
        aria-label={regionLabel}
        className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3"
      >
        {featured.map((p, i) => {
          const isActive = i === index;
          return (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={slideLabel(i)}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-300",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",
                isActive ? "w-6 bg-accent-400" : "w-2 bg-white/25 hover:bg-white/50",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
