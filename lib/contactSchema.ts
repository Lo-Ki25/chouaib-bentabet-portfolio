import { z } from "zod";

export type ContactFormMessages = {
  errorName: string;
  errorEmail: string;
  errorMessage: string;
};

export function createContactSchema(messages: ContactFormMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.errorName).max(100),
    email: z.string().trim().email(messages.errorEmail).max(254),
    message: z.string().trim().min(10, messages.errorMessage).max(5000),
  });
}

/** Server-side schema — identical rules, generic error messages. */
export const serverContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export type ContactFormData = z.infer<typeof serverContactSchema>;
