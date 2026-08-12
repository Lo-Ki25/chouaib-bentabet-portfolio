"use client";

import { ArrowUp, Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/data";
import { getActiveSocials } from "@/lib/socials";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
} as const;

export default function Footer() {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = getActiveSocials(profile.socials).filter(
    ([key]) => key in socialIcons
  ) as [keyof typeof socialIcons, string][];

  return (
    <footer className="relative border-t border-white/10 py-8 safe-bottom sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-page text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-white">
            {profile.name}
            <span className="text-accent-400">.</span>
          </p>
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted">{dict.footer.tagline}</p>
          {socials.length > 0 ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {socials.map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    aria-label={key}
                    className="touch-target inline-flex items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-accent-500/40 hover:text-accent-300 active:bg-white/5"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-xs text-muted">
            © {year} {profile.name}. {dict.footer.rights}
          </p>
          <button
            onClick={scrollTop}
            data-cursor-hover
            aria-label={dict.footer.backToTop}
            className="touch-target inline-flex items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-accent-500/40 hover:text-accent-300 active:bg-white/5"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
