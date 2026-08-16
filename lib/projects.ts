import type { Project as PrismaProject } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { LocalizedText, Project, ProjectCategory } from "@/types";

const PROJECT_CATEGORIES = new Set<ProjectCategory>([
  "EdTech",
  "Platforms",
  "Branding",
  "Innovation",
]);

function toLocalized(
  value: { fr: string; en: string } | null | undefined,
): LocalizedText | undefined {
  if (!value) return undefined;
  return { fr: value.fr, en: value.en };
}

function toCategory(value: string): ProjectCategory {
  if (PROJECT_CATEGORIES.has(value as ProjectCategory)) {
    return value as ProjectCategory;
  }
  // Fallback sûr pour données admin hors enum UI
  return "Platforms";
}

/** Mappe un document Prisma → type UI `Project`. */
export function toProject(dto: PrismaProject): Project {
  const challenge = toLocalized(dto.challenge);
  const solution = toLocalized(dto.solution);
  const impact = toLocalized(dto.impact);
  const summary = toLocalized(dto.summary) ?? { fr: "", en: "" };

  return {
    slug: dto.slug,
    title: dto.title,
    category: toCategory(dto.category),
    year: dto.year,
    ...(dto.client ? { client: dto.client } : {}),
    ...(dto.personal != null ? { personal: dto.personal } : {}),
    summary,
    ...(challenge ? { challenge } : {}),
    ...(solution ? { solution } : {}),
    ...(impact ? { impact } : {}),
    ...(dto.metrics.length > 0
      ? {
          metrics: dto.metrics.map((m) => ({
            value: m.value,
            label: { fr: m.label.fr, en: m.label.en },
          })),
        }
      : {}),
    ...(dto.recognitions.length > 0 ? { recognitions: dto.recognitions } : {}),
    tech: dto.tech,
    tags: dto.tags,
    ...(dto.featured != null ? { featured: dto.featured } : {}),
    ...(dto.image ? { image: dto.image } : {}),
    ...(dto.demoUrl ? { demoUrl: dto.demoUrl } : {}),
    ...(dto.repoUrl ? { repoUrl: dto.repoUrl } : {}),
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    orderBy: { slug: "asc" },
  });
  return rows.map(toProject);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({ where: { slug } });
  return row ? toProject(row) : undefined;
}

export async function getProjectSlugs(): Promise<string[]> {
  const rows = await prisma.project.findMany({
    select: { slug: true },
    orderBy: { slug: "asc" },
  });
  return rows.map((r) => r.slug);
}

export async function getProjectsCount(): Promise<number> {
  return prisma.project.count();
}
