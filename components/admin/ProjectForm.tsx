"use client";

import { FormEvent, useState, useTransition } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  PROJECT_CATEGORIES,
  emptyProjectFormState,
  type ProjectFormState,
} from "@/lib/admin/projectSchema";
import type { ActionResult } from "@/lib/admin/projectActions";

const fieldClass =
  "w-full border border-white/10 bg-surface/80 px-4 py-3 text-base-50 outline-none transition focus:border-accent-400";
const labelClass = "block space-y-2";
const labelTextClass = "text-sm text-base-100";

type ProjectFormProps = {
  initial?: ProjectFormState;
  submitLabel: string;
  onSubmit: (state: ProjectFormState) => Promise<ActionResult>;
};

export default function ProjectForm({
  initial,
  submitLabel,
  onSubmit,
}: ProjectFormProps) {
  const [state, setState] = useState<ProjectFormState>(
    initial ?? emptyProjectFormState(),
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function patch<K extends keyof ProjectFormState>(
    key: K,
    value: ProjectFormState[K],
  ) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await onSubmit(state);
      // redirect() throws NEXT_REDIRECT — treated as success by the action caller
      if (result && !result.ok) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Identité
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            <span className={labelTextClass}>Titre *</span>
            <input
              required
              value={state.title}
              onChange={(e) => patch("title", e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Slug * (unique)</span>
            <input
              required
              value={state.slug}
              onChange={(e) =>
                patch(
                  "slug",
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, "-")
                    .replace(/-+/g, "-"),
                )
              }
              className={fieldClass}
              placeholder="mon-projet"
            />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Catégorie *</span>
            <select
              required
              value={state.category}
              onChange={(e) =>
                patch(
                  "category",
                  e.target.value as ProjectFormState["category"],
                )
              }
              className={fieldClass}
            >
              <option value="" disabled>
                Choisir…
              </option>
              {PROJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Année *</span>
            <input
              required
              value={state.year}
              onChange={(e) => patch("year", e.target.value)}
              className={fieldClass}
              placeholder="2025"
            />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Client</span>
            <input
              value={state.client}
              onChange={(e) => patch("client", e.target.value)}
              className={fieldClass}
            />
          </label>
          <div className="flex flex-wrap items-end gap-6 pb-1">
            <label className="flex items-center gap-2 text-sm text-base-100">
              <input
                type="checkbox"
                checked={state.featured}
                onChange={(e) => patch("featured", e.target.checked)}
                className="size-4 accent-accent-500"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-base-100">
              <input
                type="checkbox"
                checked={state.personal}
                onChange={(e) => patch("personal", e.target.checked)}
                className="size-4 accent-accent-500"
              />
              Projet perso
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Image *
        </h2>
        <ImageUpload
          value={state.image}
          onChange={(url) => patch("image", url)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Résumé * (FR / EN)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            <span className={labelTextClass}>FR</span>
            <textarea
              required
              rows={4}
              value={state.summaryFr}
              onChange={(e) => patch("summaryFr", e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>EN</span>
            <textarea
              required
              rows={4}
              value={state.summaryEn}
              onChange={(e) => patch("summaryEn", e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      </section>

      {(
        [
          ["Challenge", "challengeFr", "challengeEn"],
          ["Solution", "solutionFr", "solutionEn"],
          ["Impact", "impactFr", "impactEn"],
        ] as const
      ).map(([label, frKey, enKey]) => (
        <section key={label} className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
            {label} (FR / EN)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              <span className={labelTextClass}>FR</span>
              <textarea
                rows={3}
                value={state[frKey]}
                onChange={(e) => patch(frKey, e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className={labelClass}>
              <span className={labelTextClass}>EN</span>
              <textarea
                rows={3}
                value={state[enKey]}
                onChange={(e) => patch(enKey, e.target.value)}
                className={fieldClass}
              />
            </label>
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Tech & tags
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            <span className={labelTextClass}>
              Tech * (virgules ou lignes)
            </span>
            <textarea
              required
              rows={3}
              value={state.tech}
              onChange={(e) => patch("tech", e.target.value)}
              className={fieldClass}
              placeholder="Next.js, TypeScript, Prisma"
            />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Tags</span>
            <textarea
              rows={3}
              value={state.tags}
              onChange={(e) => patch("tags", e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            <span className={labelTextClass}>Reconnaissances</span>
            <textarea
              rows={2}
              value={state.recognitions}
              onChange={(e) => patch("recognitions", e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
            Métriques
          </h2>
          <button
            type="button"
            onClick={() =>
              patch("metrics", [
                ...state.metrics,
                { value: "", labelFr: "", labelEn: "" },
              ])
            }
            className="border border-white/10 px-3 py-1.5 text-xs text-base-100 transition hover:border-accent-400"
          >
            + Métrique
          </button>
        </div>
        {state.metrics.length === 0 ? (
          <p className="text-sm text-muted">Aucune métrique.</p>
        ) : (
          <ul className="space-y-4">
            {state.metrics.map((metric, index) => (
              <li
                key={index}
                className="grid gap-3 border border-white/5 p-4 sm:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <label className={labelClass}>
                  <span className={labelTextClass}>Valeur</span>
                  <input
                    value={metric.value}
                    onChange={(e) => {
                      const next = [...state.metrics];
                      next[index] = { ...metric, value: e.target.value };
                      patch("metrics", next);
                    }}
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  <span className={labelTextClass}>Label FR</span>
                  <input
                    value={metric.labelFr}
                    onChange={(e) => {
                      const next = [...state.metrics];
                      next[index] = { ...metric, labelFr: e.target.value };
                      patch("metrics", next);
                    }}
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  <span className={labelTextClass}>Label EN</span>
                  <input
                    value={metric.labelEn}
                    onChange={(e) => {
                      const next = [...state.metrics];
                      next[index] = { ...metric, labelEn: e.target.value };
                      patch("metrics", next);
                    }}
                    className={fieldClass}
                  />
                </label>
                <button
                  type="button"
                  onClick={() =>
                    patch(
                      "metrics",
                      state.metrics.filter((_, i) => i !== index),
                    )
                  }
                  className="self-end border border-white/10 px-3 py-3 text-xs text-muted transition hover:border-cta-400 hover:text-cta-400"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Liens
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            <span className={labelTextClass}>Demo URL</span>
            <input
              type="url"
              value={state.demoUrl}
              onChange={(e) => patch("demoUrl", e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Repo URL</span>
            <input
              type="url"
              value={state.repoUrl}
              onChange={(e) => patch("repoUrl", e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>
      </section>

      {error ? (
        <p className="text-sm text-cta-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-accent-500 px-6 py-3 font-medium text-white transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : submitLabel}
      </button>
    </form>
  );
}
