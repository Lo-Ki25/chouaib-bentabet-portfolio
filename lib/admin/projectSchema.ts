import { z } from "zod";

export const PROJECT_CATEGORIES = [
  "EdTech",
  "Platforms",
  "Branding",
  "Innovation",
] as const;

const localizedRequired = z.object({
  fr: z.string().trim().min(1, "Texte FR requis"),
  en: z.string().trim().min(1, "Texte EN requis"),
});

const localizedOptional = z
  .object({
    fr: z.string().trim(),
    en: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    const hasFr = val.fr.length > 0;
    const hasEn = val.en.length > 0;
    if (hasFr !== hasEn) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Remplir FR et EN, ou laisser les deux vides",
      });
    }
  })
  .transform((val) => {
    if (!val.fr && !val.en) return undefined;
    return { fr: val.fr, en: val.en };
  });

const metricSchema = z.object({
  value: z.string().trim().min(1),
  label: localizedRequired,
});

export const projectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug requis")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug: minuscules, chiffres et tirets uniquement",
    ),
  title: z.string().trim().min(1, "Titre requis"),
  category: z.enum(PROJECT_CATEGORIES, {
    errorMap: () => ({ message: "Catégorie invalide" }),
  }),
  year: z.string().trim().min(1, "Année requise"),
  client: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  personal: z.boolean().optional(),
  summary: localizedRequired,
  challenge: localizedOptional,
  solution: localizedOptional,
  impact: localizedOptional,
  metrics: z.array(metricSchema).default([]),
  recognitions: z.array(z.string().trim().min(1)).default([]),
  tech: z
    .array(z.string().trim().min(1))
    .min(1, "Au moins une techno requise"),
  tags: z.array(z.string().trim().min(1)).default([]),
  featured: z.boolean().optional(),
  image: z.string().trim().min(1, "Image requise (upload ou URL)"),
  demoUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  repoUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

/** Valeurs brutes du formulaire client (avant parse Zod). */
export type ProjectFormState = {
  slug: string;
  title: string;
  category: (typeof PROJECT_CATEGORIES)[number] | "";
  year: string;
  client: string;
  personal: boolean;
  summaryFr: string;
  summaryEn: string;
  challengeFr: string;
  challengeEn: string;
  solutionFr: string;
  solutionEn: string;
  impactFr: string;
  impactEn: string;
  /** Une techno / tag / recognition par ligne ou séparée par virgule. */
  tech: string;
  tags: string;
  recognitions: string;
  featured: boolean;
  image: string;
  demoUrl: string;
  repoUrl: string;
  metrics: Array<{ value: string; labelFr: string; labelEn: string }>;
};

export function emptyProjectFormState(): ProjectFormState {
  return {
    slug: "",
    title: "",
    category: "",
    year: "",
    client: "",
    personal: false,
    summaryFr: "",
    summaryEn: "",
    challengeFr: "",
    challengeEn: "",
    solutionFr: "",
    solutionEn: "",
    impactFr: "",
    impactEn: "",
    tech: "",
    tags: "",
    recognitions: "",
    featured: false,
    image: "",
    demoUrl: "",
    repoUrl: "",
    metrics: [],
  };
}

export function splitList(raw: string): string[] {
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function formStateToInput(state: ProjectFormState): unknown {
  return {
    slug: state.slug,
    title: state.title,
    category: state.category,
    year: state.year,
    client: state.client,
    personal: state.personal,
    summary: { fr: state.summaryFr, en: state.summaryEn },
    challenge: { fr: state.challengeFr, en: state.challengeEn },
    solution: { fr: state.solutionFr, en: state.solutionEn },
    impact: { fr: state.impactFr, en: state.impactEn },
    metrics: state.metrics
      .filter((m) => m.value.trim() || m.labelFr.trim() || m.labelEn.trim())
      .map((m) => ({
        value: m.value,
        label: { fr: m.labelFr, en: m.labelEn },
      })),
    recognitions: splitList(state.recognitions),
    tech: splitList(state.tech),
    tags: splitList(state.tags),
    featured: state.featured,
    image: state.image,
    demoUrl: state.demoUrl,
    repoUrl: state.repoUrl,
  };
}
