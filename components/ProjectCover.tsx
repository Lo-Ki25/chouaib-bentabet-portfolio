"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import type { Lang, LocalizedText } from "@/types";

/** Paths known missing under public/ — skip the network request to avoid any broken-image flash. */
export const KNOWN_MISSING_PROJECT_IMAGES = new Set<string>([
  "/images/projects/yedart.png",
  "/images/projects/choufon.png",
  "/images/projects/butconsult.png",
  "/images/projects/petits-debrouillards.png",
]);

const SMALL_WORDS = new Set([
  "a",
  "an",
  "the",
  "of",
  "and",
  "or",
  "for",
  "in",
  "on",
  "at",
  "to",
  "le",
  "la",
  "les",
  "des",
  "du",
  "de",
  "et",
  "en",
  "un",
  "une",
]);

function resolveTitle(title: string | LocalizedText, lang?: Lang): string {
  if (typeof title === "string") return title;
  return title[lang ?? "fr"] || title.en || title.fr;
}

/** Locale-aware initials from a project title (string or bilingual object). */
export function projectTitleInitials(
  title: string | LocalizedText,
  lang?: Lang,
): string {
  const raw = resolveTitle(title, lang)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const tokens = raw
    .split(/[\s—–/_-]+/)
    .flatMap((part) => {
      // Split CamelCase without lookbehind (ES2017-safe).
      const chunks: string[] = [];
      let buf = "";
      for (let i = 0; i < part.length; i++) {
        const ch = part[i];
        const prev = part[i - 1];
        const next = part[i + 1];
        const boundary =
          buf.length > 0 &&
          ((/[a-z]/.test(prev) && /[A-Z]/.test(ch)) ||
            (/[A-Z]/.test(prev) && /[A-Z]/.test(ch) && next !== undefined && /[a-z]/.test(next)));
        if (boundary) {
          chunks.push(buf);
          buf = ch;
        } else {
          buf += ch;
        }
      }
      if (buf) chunks.push(buf);
      return chunks;
    })
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);

  const significant = tokens.filter((w) => !SMALL_WORDS.has(w.toLowerCase()));
  const source = significant.length > 0 ? significant : tokens;

  if (source.length === 0) return "?";
  if (source.length === 1) return source[0].slice(0, 2).toUpperCase();
  return (source[0][0] + source[1][0]).toUpperCase();
}

type ProjectCoverProps = {
  title: string | LocalizedText;
  lang?: Lang;
  image?: string;
  gradient: string;
  className?: string;
  imgClassName?: string;
  initialsClassName?: string;
  /** Pass false in drag carousels so the browser doesn't steal the gesture. */
  draggable?: boolean;
  /** Extra overlays (year chip, featured badge, category, etc.) */
  children?: ReactNode;
};

/**
 * Project cover with category gradient + initials watermark fallback.
 * Modeled on Navbar logo onError: never leave a broken image visible.
 * Uses a native img (not next/image) so missing files 404 as HTML, not optimizer errors.
 */
export default function ProjectCover({
  title,
  lang,
  image,
  gradient,
  className,
  imgClassName,
  initialsClassName,
  draggable,
  children,
}: ProjectCoverProps) {
  const alt = resolveTitle(title, lang);
  const initials = projectTitleInitials(title, lang);
  const knownMissing = Boolean(image && KNOWN_MISSING_PROJECT_IMAGES.has(image));
  const [failed, setFailed] = useState(!image || knownMissing);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFailed(!image || knownMissing);
    setLoaded(false);
  }, [image, knownMissing]);

  const showImage = Boolean(image) && !failed;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        gradient,
        className,
      )}
    >
      {/* Watermark always under the photo so fallback / loading stay clean */}
      {!loaded || failed ? (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={cn(
              "select-none font-display font-bold uppercase tracking-tight text-white/20",
              initialsClassName ?? "text-5xl sm:text-6xl",
            )}
          >
            {initials}
          </span>
        </div>
      ) : null}

      {showImage ? (
        // Native img: next/image optimizer throws on missing files (HTML 404).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          draggable={draggable}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            !loaded && "opacity-0",
            imgClassName,
          )}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            setLoaded(false);
          }}
        />
      ) : null}

      {children}
    </div>
  );
}
