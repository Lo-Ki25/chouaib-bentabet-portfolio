import { z } from "zod";

export const NEED_TYPES = [
  "digitalPresence",
  "cybersecurity",
  "projectDev",
  "marketAnalysis",
  "design",
] as const;

export const PREFERRED_TIMES = [
  "morning",
  "afternoon",
  "anytime",
] as const;

export type NeedType = (typeof NEED_TYPES)[number];
export type PreferredTime = (typeof PREFERRED_TIMES)[number];

/** Bilingual labels for the notification email (language-agnostic payload keys). */
export const NEED_TYPE_EMAIL_LABELS: Record<NeedType, string> = {
  digitalPresence: "Présence digitale / Digital presence",
  cybersecurity: "Cybersécurité / Cybersecurity",
  projectDev: "Développement de projet / Project development",
  marketAnalysis: "Analyse de marché / Market analysis",
  design: "Design",
};

export const PREFERRED_TIME_EMAIL_LABELS: Record<PreferredTime, string> = {
  morning: "Matin / Morning",
  afternoon: "Après-midi / Afternoon",
  anytime: "Peu importe / No preference",
};

export type ContactFormMessages = {
  errorName: string;
  errorEmail: string;
  errorMessage: string;
  errorNeedType: string;
  errorPreferredTime: string;
};

export function createContactSchema(messages: ContactFormMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.errorName).max(100),
    email: z.string().trim().email(messages.errorEmail).max(254),
    needType: z.enum(NEED_TYPES, {
      errorMap: () => ({ message: messages.errorNeedType }),
    }),
    preferredTime: z.enum(PREFERRED_TIMES, {
      errorMap: () => ({ message: messages.errorPreferredTime }),
    }),
    message: z.string().trim().min(10, messages.errorMessage).max(5000),
  });
}

/** Server-side schema — identical rules, generic error messages. */
export const serverContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  needType: z.enum(NEED_TYPES, {
    errorMap: () => ({ message: "Please select a type of need" }),
  }),
  preferredTime: z.enum(PREFERRED_TIMES, {
    errorMap: () => ({ message: "Please select a preferred time" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export type ContactFormData = z.infer<typeof serverContactSchema>;
