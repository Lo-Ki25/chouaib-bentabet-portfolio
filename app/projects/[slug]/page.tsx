import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Projet introuvable" };
  }

  const siteUrl = getSiteUrl();
  const description = project.summary.fr;
  const descriptionEn = project.summary.en;

  return {
    title: `${project.title} — Chouaib Bentabet`,
    description,
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Chouaib Bentabet`,
      description,
      url: `${siteUrl}/projects/${project.slug}`,
      type: "article",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Chouaib Bentabet`,
      description: descriptionEn,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="relative py-section pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-page">
          <div className="glass card-border overflow-hidden rounded-2xl shadow-card sm:rounded-3xl">
            <ProjectDetailContent project={project} variant="page" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
