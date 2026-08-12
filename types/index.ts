export type Lang = "fr" | "en";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type ProjectCategory = "EdTech" | "Platforms" | "Branding" | "Innovation";

export type ProjectMetric = {
  value: string;
  label: LocalizedText;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client?: string;
  personal?: boolean;
  summary: LocalizedText;
  challenge?: LocalizedText;
  solution?: LocalizedText;
  impact?: LocalizedText;
  metrics?: ProjectMetric[];
  recognitions?: string[];
  tech: string[];
  tags: string[];
  featured?: boolean;
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
};

export type SkillGroup = {
  title: LocalizedText;
  icon: string;
  skills: string[];
};

export type ExperienceItem = {
  role: LocalizedText;
  org: string;
  period: LocalizedText;
  location: string;
  description: LocalizedText;
  bullets?: LocalizedText[];
  tech?: string[];
  current?: boolean;
};

export type EducationItem = {
  degree: LocalizedText;
  school: string;
  period: LocalizedText;
  details: LocalizedText[];
};

export type LanguageItem = {
  name: LocalizedText;
  level: LocalizedText;
  fluency: number; // 0-100, used for the level bar
};

export type StatItem = {
  value: number;
  suffix?: string;
  label: LocalizedText;
};
