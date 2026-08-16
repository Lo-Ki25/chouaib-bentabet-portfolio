import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Projets",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { year: "desc" }, { title: "asc" }],
  });

  return (
    <main className="relative min-h-screen px-6 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-80"
      />
      <div className="relative mx-auto w-full max-w-5xl space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
              Admin
            </p>
            <h1 className="mt-2 font-display text-4xl text-base-50">
              Projets
            </h1>
            <p className="mt-2 text-sm text-muted">
              {projects.length} projet{projects.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="border border-white/10 px-4 py-2.5 text-sm text-base-100 transition hover:border-accent-400"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/projects/new"
              className="bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-400"
            >
              Nouveau projet
            </Link>
          </div>
        </header>

        {projects.length === 0 ? (
          <p className="border border-white/10 bg-surface/40 px-5 py-8 text-sm text-muted">
            Aucun projet en base.{" "}
            <Link href="/admin/projects/new" className="text-accent-300">
              Créer le premier
            </Link>
            .
          </p>
        ) : (
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-white/10 bg-surface/60 font-mono text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-normal">Titre</th>
                  <th className="px-4 py-3 font-normal">Slug</th>
                  <th className="px-4 py-3 font-normal">Cat.</th>
                  <th className="px-4 py-3 font-normal">Année</th>
                  <th className="px-4 py-3 font-normal">Feat.</th>
                  <th className="px-4 py-3 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-4 py-3 text-base-50">{project.title}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">
                      {project.slug}
                    </td>
                    <td className="px-4 py-3 text-muted">{project.category}</td>
                    <td className="px-4 py-3 text-muted">{project.year}</td>
                    <td className="px-4 py-3 text-muted">
                      {project.featured ? "Oui" : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="border border-white/10 px-3 py-1.5 text-xs text-base-100 transition hover:border-accent-400"
                        >
                          Éditer
                        </Link>
                        <DeleteProjectButton
                          id={project.id}
                          title={project.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
