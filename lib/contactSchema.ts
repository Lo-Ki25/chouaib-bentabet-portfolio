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

export const CONTACT_TYPES = ["message", "rdv"] as const;

export type NeedType = (typeof NEED_TYPES)[number];
export type PreferredTime = (typeof PREFERRED_TIMES)[number];
export type ContactType = (typeof CONTACT_TYPES)[number];

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
  errorPreferredSlot: string;
};

function contactFields(messages: ContactFormMessages) {
  return {
    name: z.string().trim().min(2, messages.errorName).max(100),
    email: z.string().trim().email(messages.errorEmail).max(254),
    needType: z.enum(NEED_TYPES, {
      errorMap: () => ({ message: messages.errorNeedType }),
    }),
    preferredTime: z.enum(PREFERRED_TIMES, {
      errorMap: () => ({ message: messages.errorPreferredTime }),
    }),
    /** Honeypot — must stay empty; bots that fill it are silently dropped server-side. */
    website: z.string().max(200).optional().default(""),
  };
}

export function createContactSchema(messages: ContactFormMessages) {
  const shared = contactFields(messages);

  return z.discriminatedUnion("type", [
    z.object({
      type: z.literal("message"),
      ...shared,
      message: z.string().trim().min(10, messages.errorMessage).max(5000),
      preferredSlot: z.string().optional(),
    }),
    z.object({
      type: z.literal("rdv"),
      ...shared,
      preferredSlot: z
        .string()
        .trim()
        .min(1, messages.errorPreferredSlot)
        .max(200),
      message: z.string().trim().max(5000).optional().default(""),
    }),
  ]);
}

/** Server-side schema — identical rules, generic error messages. */
export const serverContactSchema = createContactSchema({
  errorName: "Name must be at least 2 characters",
  errorEmail: "Invalid email address",
  errorMessage: "Message must be at least 10 characters",
  errorNeedType: "Please select a type of need",
  errorPreferredTime: "Please select a preferred time",
  errorPreferredSlot: "Please indicate a preferred time slot",
});

export type ContactFormData = z.infer<typeof serverContactSchema>;
