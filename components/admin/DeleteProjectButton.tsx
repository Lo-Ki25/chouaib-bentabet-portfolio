"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProject } from "@/lib/admin/projectActions";

type DeleteProjectButtonProps = {
  id: string;
  title: string;
};

export default function DeleteProjectButton({
  id,
  title,
}: DeleteProjectButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onDelete() {
    if (
      !window.confirm(
        `Supprimer le projet « ${title} » ? Cette action est irréversible.`,
      )
    ) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteProject(id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className="border border-cta-400/40 px-3 py-1.5 text-xs text-cta-400 transition hover:bg-cta-400/10 disabled:opacity-50"
      >
        {pending ? "…" : "Supprimer"}
      </button>
      {error ? (
        <span className="text-xs text-cta-400" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
