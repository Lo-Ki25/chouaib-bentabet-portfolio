"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  Github,
  Lightbulb,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/types";
import { CATEGORY_STYLES } from "./categoryStyles";
import ProjectCover from "./ProjectCover";

type ProjectDetailContentProps = {
  project: Project;
  variant?: "modal" | "page";
};

export default function ProjectDetailContent({ project, variant = "page" }: ProjectDetailContentProps) {
  const { dict, lang } = useLanguage();
  const style = CATEGORY_STYLES[project.category];
  const headerHeight = variant === "modal" ? "h-32 sm:h-40" : "h-44 sm:h-56";

  return (
    <article>
      <motion.div
        layoutId={variant === "modal" ? `project-${project.slug}` : undefined}
        className="relative w-full overflow-hidden"
      >
        <ProjectCover
          title={project.title}
          lang={lang}
          image={project.image}
          gradient={style.gradient}
          className={`w-full ${headerHeight}`}
          initialsClassName={
            variant === "modal" ? "text-5xl sm:text-6xl" : "text-6xl sm:text-7xl"
          }
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <span className="absolute bottom-3 left-4 z-10 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md sm:bottom-4 sm:left-6">
            {project.category}
          </span>
        </ProjectCover>
      </motion.div>

      <div className={variant === "modal" ? "p-4 sm:p-8" : "py-6 sm:py-10"}>
        {variant === "page" ? (
          <Link
            href="/#projects"
            data-cursor-hover
            className="touch-target mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent-300 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.projects.backToProjects}
          </Link>
        ) : null}

        <h1 className="font-display text-xl font-bold text-white sm:text-3xl lg:text-4xl">{project.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-accent-400" aria-hidden />
            {project.year}
          </span>
          {project.client ? (
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-accent-400" aria-hidden />
              {project.client}
            </span>
          ) : project.personal ? (
            <span className="rounded-full bg-accent-500/15 px-2.5 py-0.5 text-xs font-semibold text-accent-300">
              {dict.projects.personal}
            </span>
          ) : null}
        </div>

        {project.demoUrl || project.repoUrl ? (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-violet px-5 py-3 text-sm font-semibold text-white shadow-glow-sm transition-transform hover:scale-105 focus-visible:scale-105 active:scale-[0.99] sm:w-auto"
              >
                {dict.projects.viewDemo}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent-400/50 hover:bg-white/5 active:bg-white/5 sm:w-auto"
              >
                {dict.projects.viewCode}
                <Github className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </div>
        ) : null}

        <p className="mt-5 text-base leading-relaxed text-muted sm:text-[15px]">{project.summary[lang]}</p>

        {project.metrics ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label.en} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                <p className="font-display text-lg font-bold text-gradient sm:text-xl">{m.value}</p>
                <p className="mt-1 text-[11px] leading-tight text-muted sm:text-xs">{m.label[lang]}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-8 space-y-6">
          {project.challenge ? (
            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Target className="h-4 w-4 text-accent-400" aria-hidden />
                {dict.projects.challenge}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{project.challenge[lang]}</p>
            </section>
          ) : null}

          {project.solution ? (
            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Lightbulb className="h-4 w-4 text-accent-400" aria-hidden />
                {dict.projects.solution}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{project.solution[lang]}</p>
            </section>
          ) : null}

          {project.impact ? (
            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <TrendingUp className="h-4 w-4 text-accent-400" aria-hidden />
                {dict.projects.impact}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{project.impact[lang]}</p>
            </section>
          ) : null}

          {project.recognitions ? (
            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Trophy className="h-4 w-4 text-accent-400" aria-hidden />
                {dict.projects.recognitions}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.recognitions.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/85"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{dict.projects.tech}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
