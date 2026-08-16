import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  NEED_TYPE_EMAIL_LABELS,
  PREFERRED_TIME_EMAIL_LABELS,
  serverContactSchema,
  type ContactFormData,
} from "@/lib/contactSchema";
import { escapeHtml } from "@/lib/escapeHtml";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

/** Max contact submissions per IP per sliding window (in-memory; see lib/rateLimit.ts). */
const CONTACT_RATE_LIMIT = 3;
const CONTACT_RATE_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`contact:${ip}`, {
      limit: CONTACT_RATE_LIMIT,
      windowMs: CONTACT_RATE_WINDOW_MS,
    });
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      );
    }

    const body: unknown = await request.json();
    const parsed = serverContactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Honeypot: look like success, skip Lead + email (do not tip off bots).
    if (data.website && data.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const preferredSlot =
      data.type === "rdv" ? data.preferredSlot.trim() : null;
    const message = data.message ?? "";

    const [dbResult, emailResult] = await Promise.allSettled([
      persistLead({
        name: data.name,
        email: data.email,
        message,
        type: data.type,
        preferredSlot,
      }),
      sendContactEmail(data, message, preferredSlot),
    ]);

    if (dbResult.status === "rejected") {
      console.error("Lead DB write failed:", dbResult.reason);
      if (emailResult.status === "rejected") {
        console.error("Resend also failed:", emailResult.reason);
      }
      return NextResponse.json(
        { error: "Failed to save inquiry" },
        { status: 500 },
      );
    }

    if (emailResult.status === "rejected") {
      console.error("Resend failed after lead save:", emailResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}

async function persistLead(input: {
  name: string;
  email: string;
  message: string;
  type: ContactFormData["type"];
  preferredSlot: string | null;
}) {
  const { prisma } = await import("@/lib/prisma");
  return prisma.lead.create({
    data: {
      name: input.name,
      email: input.email,
      message: input.message,
      type: input.type,
      preferredSlot: input.preferredSlot,
      read: false,
    },
  });
}

async function sendContactEmail(
  data: ContactFormData,
  message: string,
  preferredSlot: string | null,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const needLabel = NEED_TYPE_EMAIL_LABELS[data.needType];
  const timeLabel = PREFERRED_TIME_EMAIL_LABELS[data.preferredTime];
  const typeLabel = data.type === "rdv" ? "RDV" : "Message";
  const messageBody = message.trim() ? message : "(aucun message)";

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeNeed = escapeHtml(needLabel);
  const safeTime = escapeHtml(timeLabel);
  const safeType = escapeHtml(typeLabel);
  const safeSlot = preferredSlot ? escapeHtml(preferredSlot) : "";
  const safeMessage = escapeHtml(messageBody).replace(/\n/g, "<br />");

  const slotText = preferredSlot
    ? `Preferred slot: ${preferredSlot}\n`
    : "";
  const slotHtml = preferredSlot
    ? `<p><strong>Créneau souhaité:</strong> ${safeSlot}</p>`
    : "";

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `Portfolio ${typeLabel} — ${data.name}`,
    text: `Type: ${typeLabel}\nNeed: ${needLabel}\nPreferred time: ${timeLabel}\n${slotText}\n${messageBody}\n\n— ${data.name} (${data.email})`,
    html: `
        <p><strong>Type:</strong> ${safeType}</p>
        <p><strong>Need:</strong> ${safeNeed}</p>
        <p><strong>Preferred time:</strong> ${safeTime}</p>
        ${slotHtml}
        <p>${safeMessage}</p>
        <hr />
        <p><strong>${safeName}</strong> &lt;${safeEmail}&gt;</p>
      `,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send email");
  }
}
