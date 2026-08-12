"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/types";
import ProjectDetailContent from "./ProjectDetailContent";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { dict } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  const overlayTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.2 };
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 32 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={panelTransition}
            onClick={(e) => e.stopPropagation()}
            className="glass card-border relative flex h-[100dvh] w-full max-w-3xl flex-col overflow-hidden rounded-none shadow-card safe-x sm:h-auto sm:max-h-[88vh] sm:rounded-3xl"
            style={{
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-end border-b border-white/10 bg-base-900/80 px-3 py-2 backdrop-blur-md sm:absolute sm:right-4 sm:top-4 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
              <button
                onClick={onClose}
                data-cursor-hover
                aria-label={dict.projects.close}
                className="touch-target inline-flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/55 active:bg-black/60 sm:h-10 sm:w-10 sm:min-h-0 sm:min-w-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div id="project-modal-title" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <ProjectDetailContent project={project} variant="modal" />
            </div>

            <div className="shrink-0 border-t border-white/10 px-page py-4 sm:px-8 sm:pb-8 sm:pt-6">
              <Link
                href={`/projects/${project.slug}`}
                data-cursor-hover
                className="touch-target inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 px-4 text-sm font-semibold text-accent-300 transition-colors hover:border-accent-400/40 hover:text-accent-200 active:bg-white/5 sm:w-auto sm:justify-start sm:border-0 sm:px-0"
              >
                {dict.projects.viewFullPage}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
