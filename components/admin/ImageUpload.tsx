"use client";

import { useId, useState } from "react";
import { upload } from "@vercel/blob/client";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileChange(file: File | null) {
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const pathname = `projects/${file.name.replace(/\s+/g, "-").toLowerCase()}`;
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob",
        contentType: file.type || undefined,
      });
      onChange(blob.url);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Échec de l’upload";
      setError(
        message.includes("BLOB_READ_WRITE_TOKEN") ||
          message.includes("503") ||
          message.toLowerCase().includes("token")
          ? `${message} — tu peux coller une URL d’image en fallback ci-dessous.`
          : message,
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={inputId}
          className="cursor-pointer border border-white/10 bg-surface/80 px-4 py-2.5 text-sm text-base-100 transition hover:border-accent-400"
        >
          {uploading ? "Upload…" : "Choisir une image"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          disabled={uploading}
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        <span className="text-xs text-muted">
          JPEG / PNG / WebP / GIF — max 8 Mo (Vercel Blob)
        </span>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-base-100">
          URL image{" "}
          <span className="text-muted">(upload ou collage manuel)</span>
        </span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… ou /images/projects/…"
          className="w-full border border-white/10 bg-surface/80 px-4 py-3 text-base-50 outline-none transition focus:border-accent-400"
        />
      </label>

      {error ? (
        <p className="text-sm text-cta-400" role="alert">
          {error}
        </p>
      ) : null}

      {value ? (
        <div className="overflow-hidden border border-white/10 bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Aperçu du projet"
            className="max-h-56 w-full object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
