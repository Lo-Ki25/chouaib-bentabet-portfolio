import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/lib/admin/projectActions";
import {
  emptyProjectFormState,
  type ProjectFormState,
} from "@/lib/admin/projectSchema";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Éditer projet",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: { id: string };
};

function joinList(values: string[] | undefined): string {
  return (values ?? []).join(", ");
}

export default async function AdminEditProjectPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  let project;
  try {
    project = await prisma.project.findUnique({
      where: { id: params.id },
    });
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const initial: ProjectFormState = {
    ...emptyProjectFormState(),
    slug: project.slug,
    title: project.title,
    category: (project.category as ProjectFormState["category"]) || "",
    year: project.year,
    client: project.client ?? "",
    personal: project.personal ?? false,
    summaryFr: project.summary.fr,
    summaryEn: project.summary.en,
    challengeFr: project.challenge?.fr ?? "",
    challengeEn: project.challenge?.en ?? "",
    solutionFr: project.solution?.fr ?? "",
    solutionEn: project.solution?.en ?? "",
    impactFr: project.impact?.fr ?? "",
    impactEn: project.impact?.en ?? "",
    tech: joinList(project.tech),
    tags: joinList(project.tags),
    recognitions: joinList(project.recognitions),
    featured: project.featured ?? false,
    image: project.image ?? "",
    demoUrl: project.demoUrl ?? "",
    repoUrl: project.repoUrl ?? "",
    metrics: (project.metrics ?? []).map((m) => ({
      value: m.value,
      labelFr: m.label.fr,
      labelEn: m.label.en,
    })),
  };

  const save = updateProject.bind(null, project.id);

  return (
    <main className="relative min-h-screen px-6 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-80"
      />
      <div className="relative mx-auto w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
            Admin
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl text-base-50">
                Éditer le projet
              </h1>
              <p className="mt-2 text-sm text-muted">{project.title}</p>
            </div>
            <Link
              href="/admin/projects"
              className="border border-white/10 px-4 py-2.5 text-sm text-base-100 transition hover:border-accent-400"
            >
              Retour liste
            </Link>
          </div>
        </header>

        <ProjectForm
          initial={initial}
          submitLabel="Enregistrer"
          onSubmit={save}
        />
      </div>
    </main>
  );
}
