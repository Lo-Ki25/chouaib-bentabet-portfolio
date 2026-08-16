"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useInViewport } from "@/hooks/useInViewport";
import { projects } from "@/lib/data";
import { truncateText } from "@/lib/truncateText";
import type { Project, ProjectCategory } from "@/types";
import { CATEGORY_STYLES } from "./categoryStyles";
import FeaturedProjectsCarousel from "./FeaturedProjectsCarousel";
import ProjectCover from "./ProjectCover";
import ProjectModal from "./ProjectModal";
import AmbientVideo from "./ui/AmbientVideo";
import PillButton from "./ui/PillButton";
import SectionHeading from "./ui/SectionHeading";
import { cn } from "@/lib/utils";

const SUMMARY_MAX_LENGTH = 140;

/** Matches PillButton outline, sized for chips (not a button — the card already is). */
const tagPillClassName =
  "pointer-events-none rounded-full border border-white/25 bg-transparent px-2.5 py-0.5 text-[11px] font-semibold text-white";

function latestYear(year: string) {
  const matches = year.match(/\d{4}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

export default function Projects() {
  const { dict, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const { ref: gridRef, inView } = useInViewport<HTMLDivElement>({
    threshold: 0,
    rootMargin: "160px",
  });
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !prefersReducedMotion;

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => latestYear(b.year) - latestYear(a.year)),
    [],
  );

  const categories = useMemo<(ProjectCategory | "All")[]>(() => {
    const set = new Set<ProjectCategory>(sortedProjects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [sortedProjects]);

  const filtered =
    active === "All" ? sortedProjects : sortedProjects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative overflow-hidden py-section">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] overflow-hidden sm:h-[320px]">
        <AmbientVideo
          src="/videos/projects-ambient.mp4"
          poster="/images/projects-poster.jpg"
          className="absolute inset-0 opacity-[0.2] mix-blend-screen"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-base-900/75 via-base-900/55 to-base-900"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dict.projects.eyebrow}
            title={dict.projects.title}
            subtitle={dict.projects.subtitle}
            className="max-w-2xl"
          />
        </div>

        <FeaturedProjectsCarousel />

        <div className="-mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar sm:mt-10 sm:flex-wrap sm:overflow-visible">
          {categories.map((cat) => (
            <PillButton
              key={cat}
              variant={active === cat ? "solid" : "outline"}
              onClick={() => setActive(cat)}
              className="shrink-0 px-4 py-2.5 transition-transform duration-300"
            >
              {cat === "All" ? dict.projects.all : cat}
            </PillButton>
          ))}
        </div>

        <motion.div
          ref={gridRef}
          layout={canAnimate}
          className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const style = CATEGORY_STYLES[project.category];
              const chips = project.tech.length > 0 ? project.tech : project.tags;
              const firstMetric = project.metrics?.[0];
              const cardMotion = canAnimate
                ? {
                    layout: true as const,
                    initial: { opacity: 0, y: 20 },
                    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
                    exit: { opacity: 0, scale: 0.96, y: 8 },
                    transition: {
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1] as const,
                      delay: inView ? Math.min(index, 8) * 0.04 : 0,
                    },
                  }
                : {};

              return (
                <motion.article
                  key={project.slug}
                  {...cardMotion}
                  onClick={() => setSelected(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  data-cursor-hover
                  className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent-500/30 hover:bg-white/[0.04] hover:shadow-glow-sm active:border-accent-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 motion-reduce:transition-colors motion-reduce:hover:translate-y-0"
                >
                  <ProjectCover
                    title={project.title}
                    lang={lang}
                    image={project.image}
                    gradient={style.gradient}
                    className="h-40 w-full sm:h-36"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-grid opacity-30 transition-opacity group-hover:opacity-50" />
                    {project.featured ? (
                      <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                        <Sparkles className="h-3 w-3" />
                        {dict.projects.featured}
                      </span>
                    ) : null}
                    <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                      {project.year}
                    </span>
                  </ProjectCover>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span
                      className={cn(
                        "w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        style.badge,
                      )}
                    >
                      {project.category}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold text-white">{project.title}</h3>
                    {project.client ? (
                      <p className="mt-0.5 text-xs font-medium tracking-wide text-muted">{project.client}</p>
                    ) : null}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {truncateText(project.summary[lang], SUMMARY_MAX_LENGTH)}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {firstMetric ? (
                        <span className="rounded-full border border-accent-500/30 bg-accent-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent-300">
                          {firstMetric.value} {firstMetric.label[lang]}
                        </span>
                      ) : null}
                      {chips.slice(0, 3).map((t) => (
                        <span key={t} className={tagPillClassName}>
                          {t}
                        </span>
                      ))}
                      {chips.length > 3 ? (
                        <span className={tagPillClassName}>+{chips.length - 3}</span>
                      ) : null}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      data-cursor-hover
                      className="touch-target mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200 active:text-accent-200 sm:mt-5"
                    >
                      {dict.projects.viewProject}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">{dict.projects.emptyFilter}</p>
        ) : null}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
