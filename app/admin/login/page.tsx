import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export const metadata = {
  title: "Admin — Connexion",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center text-muted">
          Chargement…
        </main>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
