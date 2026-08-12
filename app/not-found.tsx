import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[70vh] items-center justify-center px-page py-section pt-28 sm:pt-32">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-display text-6xl font-bold text-gradient">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            Page introuvable
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Cette page n&apos;existe pas ou a été déplacée. Retournez à
            l&apos;accueil pour explorer le portfolio.
          </p>
          <Link
            href="/"
            data-cursor-hover
            className="touch-target mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-accent-500 to-violet px-6 py-3.5 text-sm font-semibold text-white shadow-glow-sm transition-transform hover:scale-105 sm:w-auto"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
