"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
        return;
      }

      router.push(result.url || "/admin");
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Réessaie.");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-80"
      />
      <div className="relative w-full max-w-md">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Admin
        </p>
        <h1 className="font-display text-4xl text-base-50">Connexion</h1>
        <p className="mt-2 text-sm text-muted">
          Accès réservé à l&apos;administration du portfolio.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <label className="block space-y-2">
            <span className="text-sm text-base-100">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/10 bg-surface/80 px-4 py-3 text-base-50 outline-none transition focus:border-accent-400"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-base-100">Mot de passe</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/10 bg-surface/80 px-4 py-3 text-base-50 outline-none transition focus:border-accent-400"
            />
          </label>

          {error ? (
            <p className="text-sm text-cta-400" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-500 px-4 py-3 font-medium text-white transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
