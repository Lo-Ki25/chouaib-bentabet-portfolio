import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/admin/projectActions";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Admin — Nouveau projet",
  robots: { index: false, follow: false },
};

export default async function AdminNewProjectPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

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
            <h1 className="font-display text-4xl text-base-50">
              Nouveau projet
            </h1>
            <Link
              href="/admin/projects"
              className="border border-white/10 px-4 py-2.5 text-sm text-base-100 transition hover:border-accent-400"
            >
              Retour liste
            </Link>
          </div>
        </header>

        <ProjectForm submitLabel="Créer le projet" onSubmit={createProject} />
      </div>
    </main>
  );
}
