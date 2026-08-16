"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  formStateToInput,
  projectInputSchema,
  type ProjectFormState,
  type ProjectInput,
} from "@/lib/admin/projectSchema";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Non autorisé");
  }
  return session;
}

function toPrismaData(input: ProjectInput) {
  return {
    slug: input.slug,
    title: input.title,
    category: input.category,
    year: input.year,
    client: input.client ?? null,
    personal: input.personal ?? null,
    summary: input.summary,
    challenge: input.challenge ?? null,
    solution: input.solution ?? null,
    impact: input.impact ?? null,
    metrics: input.metrics,
    recognitions: input.recognitions,
    tech: input.tech,
    tags: input.tags,
    featured: input.featured ?? null,
    image: input.image,
    demoUrl: input.demoUrl ?? null,
    repoUrl: input.repoUrl ?? null,
  };
}

function parseForm(
  state: ProjectFormState,
): { ok: false; error: string } | { ok: true; data: ProjectInput } {
  const parsed = projectInputSchema.safeParse(formStateToInput(state));
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      ok: false,
      error: first?.message ?? "Données invalides",
    };
  }
  return { ok: true, data: parsed.data };
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  if (slug) {
    revalidatePath(`/projects/${slug}`);
  }
}

export async function createProject(
  state: ProjectFormState,
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseForm(state);
  if (!parsed.ok) return parsed;

  const existing = await prisma.project.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Le slug « ${parsed.data.slug} » existe déjà` };
  }

  try {
    await prisma.project.create({
      data: toPrismaData(parsed.data),
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return { ok: false, error: "Slug déjà utilisé" };
    }
    console.error("createProject", err);
    return { ok: false, error: "Échec de la création" };
  }

  revalidateProjectPaths(parsed.data.slug);
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  state: ProjectFormState,
): Promise<ActionResult> {
  await requireAdmin();

  if (!id) {
    return { ok: false, error: "ID manquant" };
  }

  const parsed = parseForm(state);
  if (!parsed.ok) return parsed;

  const existing = await prisma.project.findUnique({
    where: { id },
    select: { slug: true },
  });
  if (!existing) {
    return { ok: false, error: "Projet introuvable" };
  }

  const slugTaken = await prisma.project.findFirst({
    where: {
      slug: parsed.data.slug,
      NOT: { id },
    },
    select: { id: true },
  });
  if (slugTaken) {
    return { ok: false, error: `Le slug « ${parsed.data.slug} » existe déjà` };
  }

  try {
    await prisma.project.update({
      where: { id },
      data: toPrismaData(parsed.data),
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { ok: false, error: "Projet introuvable" };
    }
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return { ok: false, error: "Slug déjà utilisé" };
    }
    console.error("updateProject", err);
    return { ok: false, error: "Échec de la mise à jour" };
  }

  revalidateProjectPaths(parsed.data.slug);
  if (existing.slug !== parsed.data.slug) {
    revalidatePath(`/projects/${existing.slug}`);
  }
  revalidatePath(`/admin/projects/${id}/edit`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAdmin();

  if (!id) {
    return { ok: false, error: "ID manquant" };
  }

  const existing = await prisma.project.findUnique({
    where: { id },
    select: { slug: true },
  });
  if (!existing) {
    return { ok: false, error: "Projet introuvable" };
  }

  try {
    await prisma.project.delete({ where: { id } });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return { ok: false, error: "Projet introuvable" };
    }
    console.error("deleteProject", err);
    return { ok: false, error: "Échec de la suppression" };
  }

  revalidateProjectPaths(existing.slug);
  return { ok: true };
}
