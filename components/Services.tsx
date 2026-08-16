"use client";

import Link from "next/link";
import {
  AppWindow,
  ArrowUpRight,
  Globe,
  GraduationCap,
  Palette,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { stats } from "@/lib/data";
import type { Dictionary } from "@/lib/translations";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const shimmerClassName =
  "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:60%_100%] bg-no-repeat animate-shimmer motion-reduce:hidden";

type ServiceKey = keyof Dictionary["services"]["items"];

const SERVICE_DEFS: {
  key: ServiceKey;
  icon: LucideIcon;
  slugs: readonly string[];
  showEfficiencyStat?: boolean;
}[] = [
  {
    key: "digitalPresence",
    icon: Globe,
    slugs: ["iris-software", "digital-ln-marketplace"],
  },
  {
    key: "brandIdentity",
    icon: Palette,
    slugs: ["uib-innovation-branding", "afric-educ-branding"],
  },
  {
    key: "platforms",
    icon: AppWindow,
    slugs: ["iris-software", "ecop-morocco"],
  },
  {
    key: "automation",
    icon: Zap,
    slugs: ["iris-software"],
    showEfficiencyStat: true,
  },
  {
    key: "socialImpact",
    icon: GraduationCap,
    slugs: ["africeduc", "ecop-morocco", "petits-debrouillards-maroc"],
  },
];

const efficiencyStat = stats.find((item) => item.value === 50 && item.suffix === "%");

type ServicesProps = {
  projects: Project[];
};

export default function Services({ projects }: ServicesProps) {
  const { dict, lang } = useLanguage();
  const projectTitleBySlug = new Map(
    projects.map((project) => [project.slug, project.title]),
  );

  return (
    <section id="services" className="relative py-section">
      <div className="mx-auto max-w-6xl px-page">
        <SectionHeading
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          subtitle={dict.services.subtitle}
          emphasize={lang === "fr" ? "déjà prouvé" : "already proven"}
        />

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {SERVICE_DEFS.map((service, i) => {
            const Icon = service.icon;
            const copy = dict.services.items[service.key];
            const proofs = service.slugs
              .map((slug) => {
                const title = projectTitleBySlug.get(slug);
                return title ? { slug, title } : null;
              })
              .filter((proof): proof is { slug: string; title: string } => proof !== null);

            return (
              <AnimatedSection
                key={service.key}
                delay={0.05 * i}
                className={cn("min-w-0 lg:col-span-2", i === 3 && "lg:col-start-2")}
              >
                <TiltCard
                  maxTilt={6}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-accent-500/30 hover:bg-white/[0.04] sm:p-6"
                >
                  <span aria-hidden className={shimmerClassName} />
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-300 transition-colors group-hover:bg-accent-500/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-white sm:text-lg">
                      {copy.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{copy.description}</p>
                    {service.showEfficiencyStat && efficiencyStat ? (
                      <p className="mt-4 inline-flex items-center rounded-lg border border-accent-400/30 bg-accent-500/10 px-2.5 py-1 text-xs font-semibold text-accent-100">
                        {efficiencyStat.value}
                        {efficiencyStat.suffix} {efficiencyStat.label[lang]}
                      </p>
                    ) : null}
                    {proofs.length > 0 ? (
                      <ul className={cn("flex flex-wrap gap-2", service.showEfficiencyStat ? "mt-2" : "mt-4")}>
                        {proofs.map((proof) => (
                          <li key={proof.slug}>
                            <Link
                              href={`/projects/${proof.slug}`}
                              data-cursor-hover
                              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-accent-200 transition-colors hover:border-accent-400/40 hover:text-white"
                            >
                              {proof.title}
                              <ArrowUpRight className="h-3 w-3" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </TiltCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
