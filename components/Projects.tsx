"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/lib/data";
import { truncateText } from "@/lib/truncateText";
import type { Project, ProjectCategory } from "@/types";
import { CATEGORY_STYLES } from "./categoryStyles";
import ProjectModal from "./ProjectModal";
import SectionHeading from "./ui/SectionHeading";
import { cn } from "@/lib/utils";

const SUMMARY_MAX_LENGTH = 140;

function projectInitials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function Projects() {
  const { dict, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !prefersReducedMotion;

  const categories = useMemo<(ProjectCategory | "All")[]>(() => {
    const set = new Set<ProjectCategory>(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-section">
      <div className="mx-auto max-w-6xl px-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dict.projects.eyebrow}
            title={dict.projects.title}
            subtitle={dict.projects.subtitle}
            className="max-w-2xl"
          />
        </div>

        <div className="-mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar sm:mt-10 sm:flex-wrap sm:overflow-visible">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              data-cursor-hover
              className={cn(
                "touch-target shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                active === cat
                  ? "border-accent-500/50 bg-accent-500/15 text-white"
                  : "border-white/10 bg-white/[0.02] text-muted hover:border-white/20 hover:text-white active:bg-white/5"
              )}
            >
              {cat === "All" ? dict.projects.all : cat}
            </button>
          ))}
        </div>

        <motion.div layout={canAnimate} className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const style = CATEGORY_STYLES[project.category];
              const cardMotion = canAnimate
                ? {
                    layout: true as const,
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.95 },
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
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
                  className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition-colors hover:border-accent-500/30 hover:bg-white/[0.04] active:border-accent-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  <div className={`relative h-40 w-full overflow-hidden bg-gradient-to-br sm:h-36 ${style.gradient}`}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-white/25 transition-transform duration-500 group-hover:scale-110">
                        {projectInitials(project.title)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-grid opacity-30 transition-opacity group-hover:opacity-50" />
                    {project.featured ? (
                      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                        <Sparkles className="h-3 w-3" />
                        {dict.projects.featured}
                      </span>
                    ) : null}
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span
                      className={cn(
                        "w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        style.badge
                      )}
                    >
                      {project.category}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {truncateText(project.summary[lang], SUMMARY_MAX_LENGTH)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/75">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 ? (
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/75">
                          +{project.tech.length - 3}
                        </span>
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
