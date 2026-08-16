"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { markLeadAsRead } from "@/lib/admin/leadActions";

type MarkLeadReadButtonProps = {
  id: string;
};

export default function MarkLeadReadButton({ id }: MarkLeadReadButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onMark() {
    setError(null);
    startTransition(async () => {
      const result = await markLeadAsRead(id);
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
        onClick={onMark}
        disabled={pending}
        className="border border-white/10 px-3 py-1.5 text-xs text-base-100 transition hover:border-accent-400 disabled:opacity-50"
      >
        {pending ? "…" : "Marquer lu"}
      </button>
      {error ? (
        <span className="text-xs text-cta-400" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
