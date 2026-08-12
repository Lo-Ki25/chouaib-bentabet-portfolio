"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactSchema } from "@/lib/contactSchema";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/data";
import { getActiveSocials } from "@/lib/socials";
import AnimatedSection from "./ui/AnimatedSection";
import SectionHeading from "./ui/SectionHeading";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
} as const;

export default function Contact() {
  const { dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      createContactSchema({
        errorName: dict.contact.errorName,
        errorEmail: dict.contact.errorEmail,
        errorMessage: dict.contact.errorMessage,
      }),
    [dict]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactForm) => {
    setSubmitError(null);
    setSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; code?: string }
        | null;

      if (!response.ok) {
        if (payload?.code === "EMAIL_NOT_CONFIGURED" || response.status === 503) {
          setSubmitError(dict.contact.serviceUnavailable);
          return;
        }
        setSubmitError(payload?.error ?? dict.contact.errorSend);
        return;
      }

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitError(dict.contact.errorSend);
    }
  };

  const socials = getActiveSocials(profile.socials).filter(
    ([key]) => key in socialIcons
  ) as [keyof typeof socialIcons, string][];

  return (
    <section id="contact" className="relative py-section">
      <div className="mx-auto max-w-6xl px-page">
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          subtitle={dict.contact.subtitle}
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <AnimatedSection direction="right" className="min-w-0 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {dict.contact.direct}
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor-hover
                  className="touch-target flex items-center gap-3 rounded-xl px-1 text-sm text-white/90 transition-colors hover:text-accent-300 active:bg-white/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 break-all">{profile.email}</span>
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  data-cursor-hover
                  className="touch-target flex items-center gap-3 rounded-xl px-1 text-sm text-white/90 transition-colors hover:text-accent-300 active:bg-white/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-300">
                    <Phone className="h-4 w-4" />
                  </span>
                  {profile.phone}
                </a>
                <div className="touch-target flex items-center gap-3 px-1 text-sm text-white/90">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-300">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {profile.location}
                </div>
              </div>

              {socials.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                  {socials.map(([key, url]) => {
                    const Icon = socialIcons[key];
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        aria-label={key}
                        className="touch-target inline-flex items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-accent-500/40 hover:text-accent-300 active:bg-white/5"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-accent-500/20 bg-accent-500/5 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-white/80">
                {dict.contact.agencyBlurb}
              </p>
              <a
                href={profile.agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="touch-target mt-2 inline-flex items-center text-sm font-semibold text-accent-300 hover:underline"
              >
                netnook.solutions →
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.1}
            className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
                >
                  {dict.contact.name}
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder={dict.contact.namePlaceholder}
                  {...register("name")}
                  className="min-h-[48px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent-500/50 focus-visible:ring-2 focus-visible:ring-accent-500/40"
                />
                {errors.name ? (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
                >
                  {dict.contact.email}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={dict.contact.emailPlaceholder}
                  {...register("email")}
                  className="min-h-[48px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent-500/50 focus-visible:ring-2 focus-visible:ring-accent-500/40"
                />
                {errors.email ? (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
                >
                  {dict.contact.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={dict.contact.messagePlaceholder}
                  {...register("message")}
                  className="min-h-[140px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent-500/50 focus-visible:ring-2 focus-visible:ring-accent-500/40"
                />
                {errors.message ? (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor-hover
                className="group touch-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-violet px-6 py-3.5 text-sm font-semibold text-white shadow-glow-sm transition-transform hover:scale-[1.02] focus-visible:scale-[1.02] active:scale-[0.99] disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? dict.contact.sending : dict.contact.send}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {submitted ? (
                <p className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  {dict.contact.success}
                </p>
              ) : null}

              {submitError ? (
                <p className="text-sm text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}

              <p className="text-xs text-muted">{dict.contact.privacyNote}</p>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
