"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const sections: { id: string; key: "home" | "about" | "skills" | "experience" | "projects" | "contact" }[] = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "experience", key: "experience" },
  { id: "projects", key: "projects" },
  { id: "contact", key: "contact" },
];

export default function Navbar() {
  const { dict, lang, toggleLang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Body scroll lock + Escape when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close menu when switching to desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleNavigate = (id: string) => {
    setOpen(false);

    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const navLinkClass = (id: string, mobile = false) =>
    cn(
      mobile
        ? "touch-target flex w-full items-center rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors"
        : "rounded-full px-4 py-2 text-sm font-medium transition-colors",
      isHome && activeSection === id
        ? "bg-accent-500/15 text-white"
        : "text-muted hover:bg-white/5 hover:text-white"
    );

  const headerMotion =
    mounted && !prefersReducedMotion
      ? {
          initial: { y: -80, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {};

  return (
    <motion.header
      {...headerMotion}
      className={cn(
        "fixed inset-x-0 top-0 z-50 safe-top transition-all duration-300",
        scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      )}
    >
      <div className="mx-auto max-w-6xl px-page">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-4 sm:py-3",
            scrolled
              ? "glass card-border shadow-card"
              : "border-transparent bg-transparent"
          )}
        >
          <button
            onClick={() => handleNavigate("home")}
            data-cursor-hover
            className="touch-target flex min-w-0 items-center gap-2 font-display text-lg font-bold text-white sm:gap-2.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-violet text-sm font-bold text-white shadow-glow-sm">
              {profile.initials}
            </span>
            <span className="hidden truncate sm:inline">
              Chouaib<span className="text-accent-400">.</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {sections.map((s) => (
              <button
                key={s.id}
                data-cursor-hover
                onClick={() => handleNavigate(s.id)}
                className={navLinkClass(s.id)}
              >
                {dict.nav[s.key]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              data-cursor-hover
              aria-label={lang === "fr" ? "Passer en anglais" : "Switch to French"}
              className="touch-target inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:border-accent-500/40 hover:text-white active:bg-white/5 sm:px-3"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "fr" ? "FR" : "EN"}
            </button>

            <button
              onClick={() => handleNavigate("contact")}
              data-cursor-hover
              className="hidden rounded-full bg-gradient-to-r from-accent-500 to-violet px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-transform hover:scale-105 active:scale-[0.98] sm:inline-flex"
            >
              {dict.nav.cta}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor-hover
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={
                open
                  ? lang === "fr"
                    ? "Fermer le menu"
                    : "Close menu"
                  : lang === "fr"
                    ? "Ouvrir le menu"
                    : "Open menu"
              }
              className="touch-target inline-flex items-center justify-center rounded-full border border-white/10 text-white active:bg-white/5 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "fr" ? "Menu de navigation" : "Navigation menu"}
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.2 },
                })}
            className="fixed inset-0 z-[55] flex flex-col bg-base-900/95 backdrop-blur-xl lg:hidden"
            style={{
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <div className="flex items-center justify-between px-page py-3">
              <button
                onClick={() => handleNavigate("home")}
                data-cursor-hover
                className="touch-target flex items-center gap-2.5 font-display text-lg font-bold text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-violet text-sm font-bold text-white shadow-glow-sm">
                  {profile.initials}
                </span>
                <span>
                  Chouaib<span className="text-accent-400">.</span>
                </span>
              </button>
              <button
                onClick={() => setOpen(false)}
                data-cursor-hover
                aria-label={lang === "fr" ? "Fermer le menu" : "Close menu"}
                className="touch-target inline-flex items-center justify-center rounded-full border border-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-page py-6">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, x: -12 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.04 * i, duration: 0.25 },
                      })}
                  onClick={() => handleNavigate(s.id)}
                  className={navLinkClass(s.id, true)}
                >
                  {dict.nav[s.key]}
                </motion.button>
              ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-white/10 px-page py-5">
              <button
                onClick={toggleLang}
                data-cursor-hover
                aria-label={lang === "fr" ? "Passer en anglais" : "Switch to French"}
                className="touch-target inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:border-accent-500/40 hover:text-white"
              >
                <Languages className="h-4 w-4" />
                {lang === "fr" ? "FR → EN" : "EN → FR"}
              </button>
              <button
                onClick={() => handleNavigate("contact")}
                data-cursor-hover
                className="touch-target inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-accent-500 to-violet px-6 text-sm font-semibold text-white shadow-glow-sm"
              >
                {dict.nav.cta}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
