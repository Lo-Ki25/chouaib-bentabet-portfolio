import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { LeadType, Prisma } from "@prisma/client";
import MarkLeadReadButton from "@/components/admin/MarkLeadReadButton";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Leads",
  robots: { index: false, follow: false },
};

type SearchParams = {
  type?: string;
  read?: string;
};

function buildLeadsHref(params: { type?: string; read?: string }) {
  const sp = new URLSearchParams();
  if (params.type) sp.set("type", params.type);
  if (params.read) sp.set("read", params.read);
  const q = sp.toString();
  return q ? `/admin/leads?${q}` : "/admin/leads";
}

function filterClass(active: boolean) {
  return active
    ? "bg-accent-500 px-3 py-1.5 text-xs font-medium text-white"
    : "border border-white/10 px-3 py-1.5 text-xs text-base-100 transition hover:border-accent-400";
}

function formatDate(date: Date) {
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TypeBadge({ type }: { type: LeadType }) {
  if (type === "rdv") {
    return (
      <span className="inline-block border border-accent-400/50 bg-accent-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-300">
        Demande de RDV
      </span>
    );
  }
  return (
    <span className="inline-block border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
      Message
    </span>
  );
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const typeFilter =
    searchParams.type === "message" || searchParams.type === "rdv"
      ? searchParams.type
      : undefined;
  const readFilter =
    searchParams.read === "true"
      ? true
      : searchParams.read === "false"
        ? false
        : undefined;

  const where: Prisma.LeadWhereInput = {};
  if (typeFilter) where.type = typeFilter;
  if (readFilter !== undefined) where.read = readFilter;

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = await prisma.lead.count({ where: { read: false } });

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
            <h1 className="mt-2 font-display text-4xl text-base-50">Leads</h1>
            <p className="mt-2 text-sm text-muted">
              {leads.length} résultat{leads.length === 1 ? "" : "s"}
              {unreadCount > 0 ? (
                <>
                  {" "}
                  ·{" "}
                  <span className="text-accent-300">
                    {unreadCount} non lu{unreadCount === 1 ? "" : "s"}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <Link
            href="/admin"
            className="border border-white/10 px-4 py-2.5 text-sm text-base-100 transition hover:border-accent-400"
          >
            Dashboard
          </Link>
        </header>

        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Type
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildLeadsHref({
                  read:
                    readFilter === undefined
                      ? undefined
                      : String(readFilter),
                })}
                className={filterClass(!typeFilter)}
              >
                Tous
              </Link>
              <Link
                href={buildLeadsHref({
                  type: "message",
                  read:
                    readFilter === undefined
                      ? undefined
                      : String(readFilter),
                })}
                className={filterClass(typeFilter === "message")}
              >
                Messages
              </Link>
              <Link
                href={buildLeadsHref({
                  type: "rdv",
                  read:
                    readFilter === undefined
                      ? undefined
                      : String(readFilter),
                })}
                className={filterClass(typeFilter === "rdv")}
              >
                RDV
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Statut
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildLeadsHref({ type: typeFilter })}
                className={filterClass(readFilter === undefined)}
              >
                Tous
              </Link>
              <Link
                href={buildLeadsHref({ type: typeFilter, read: "false" })}
                className={filterClass(readFilter === false)}
              >
                Non lus
              </Link>
              <Link
                href={buildLeadsHref({ type: typeFilter, read: "true" })}
                className={filterClass(readFilter === true)}
              >
                Lus
              </Link>
            </div>
          </div>
        </div>

        {leads.length === 0 ? (
          <p className="border border-white/10 bg-surface/40 px-5 py-8 text-sm text-muted">
            Aucun lead pour ces filtres.
          </p>
        ) : (
          <ul className="space-y-3">
            {leads.map((lead) => (
              <li
                key={lead.id}
                className={
                  lead.read
                    ? "border border-white/10 bg-surface/30 px-4 py-4 sm:px-5"
                    : "border border-white/10 border-l-2 border-l-accent-400 bg-surface/50 px-4 py-4 font-medium sm:px-5"
                }
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <TypeBadge type={lead.type} />
                      {!lead.read ? (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent-300">
                          Non lu
                        </span>
                      ) : null}
                      <time
                        dateTime={lead.createdAt.toISOString()}
                        className="font-mono text-[11px] text-muted"
                      >
                        {formatDate(lead.createdAt)}
                      </time>
                    </div>

                    <p
                      className={
                        lead.read
                          ? "text-base text-base-100"
                          : "text-base text-base-50"
                      }
                    >
                      {lead.name}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-accent-300 transition hover:text-accent-200"
                      >
                        {lead.email}
                      </a>
                      {lead.phone ? (
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                          className="text-accent-300 transition hover:text-accent-200"
                        >
                          {lead.phone}
                        </a>
                      ) : null}
                    </div>

                    {lead.preferredSlot ? (
                      <p className="text-sm text-muted">
                        Créneau souhaité :{" "}
                        <span className="text-base-100">
                          {lead.preferredSlot}
                        </span>
                      </p>
                    ) : null}

                    <p
                      className={
                        lead.read
                          ? "whitespace-pre-wrap text-sm font-normal text-muted"
                          : "whitespace-pre-wrap text-sm font-normal text-base-100/90"
                      }
                    >
                      {lead.message}
                    </p>
                  </div>

                  {!lead.read ? <MarkLeadReadButton id={lead.id} /> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
