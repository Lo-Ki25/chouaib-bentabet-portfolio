/**
 * Seed idempotent des projets depuis lib/data.ts → MongoDB (Prisma).
 * Usage: npm run seed:projects
 *
 * Charge .env.local puis .env (Next.js convention). Prisma CLI lit .env seul —
 * garder DATABASE_URL synchronisée dans les deux fichiers.
 */
import { config as loadEnv } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";
import { projects } from "../lib/data";

loadEnv({ path: resolve(process.cwd(), ".env.local") });
loadEnv({ path: resolve(process.cwd(), ".env") });

const prisma = new PrismaClient();

function toLocalized(text: { fr: string; en: string } | undefined) {
  if (!text) return undefined;
  return { fr: text.fr, en: text.en };
}

async function main() {
  console.log(`Seeding ${projects.length} projects…`);

  for (const project of projects) {
    const data = {
      title: project.title,
      category: project.category,
      year: project.year,
      client: project.client ?? null,
      personal: project.personal ?? null,
      summary: { fr: project.summary.fr, en: project.summary.en },
      challenge: toLocalized(project.challenge) ?? null,
      solution: toLocalized(project.solution) ?? null,
      impact: toLocalized(project.impact) ?? null,
      metrics: (project.metrics ?? []).map((m) => ({
        value: m.value,
        label: { fr: m.label.fr, en: m.label.en },
      })),
      recognitions: project.recognitions ?? [],
      tech: project.tech,
      tags: project.tags,
      featured: project.featured ?? null,
      image: project.image ?? null,
      demoUrl: project.demoUrl ?? null,
      repoUrl: project.repoUrl ?? null,
    };

    await prisma.project.upsert({
      where: { slug: project.slug },
      create: { slug: project.slug, ...data },
      update: data,
    });

    console.log(`  ✓ ${project.slug}`);
  }

  const count = await prisma.project.count();
  const slugs = (
    await prisma.project.findMany({
      select: { slug: true },
      orderBy: { slug: "asc" },
    })
  ).map((p) => p.slug);

  console.log(`\nDone. ${count} project(s) in DB:`);
  for (const slug of slugs) {
    console.log(`  - ${slug}`);
  }
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
