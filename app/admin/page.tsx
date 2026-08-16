import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-80"
      />
      <div className="relative w-full max-w-lg space-y-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Dashboard
        </p>
        <h1 className="font-display text-4xl text-base-50">Admin OK</h1>
        <p className="text-muted">
          Connecté en tant que{" "}
          <span className="text-base-100">{session.user?.email}</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/admin/projects"
            className="bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-400"
          >
            Gérer les projets
          </Link>
          <Link
            href="/admin/leads"
            className="bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-400"
          >
            Leads / Messages
          </Link>
          <Link
            href="/"
            className="border border-white/10 px-5 py-2.5 text-sm text-base-100 transition hover:border-accent-400"
          >
            Retour au site
          </Link>
        </div>
      </div>
    </main>
  );
}
