import type { ProjectCategory } from "@/types";

type CategoryStyle = {
  gradient: string;
  badge: string;
};

export const CATEGORY_STYLES: Record<ProjectCategory, CategoryStyle> = {
  EdTech: {
    gradient: "from-teal-400 via-cyan to-teal-600",
    badge: "bg-cta/15 text-cta border-cta/40",
  },
  Platforms: {
    gradient: "from-indigo-700 via-accent-700 to-indigo-950",
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/40",
  },
  Branding: {
    gradient: "from-fuchsia-500 via-pink-500 to-fuchsia-600",
    badge: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40",
  },
  Innovation: {
    gradient: "from-amber-400 via-amber-500 to-orange-600",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  },
};
