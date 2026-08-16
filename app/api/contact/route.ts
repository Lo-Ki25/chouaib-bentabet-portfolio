import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  NEED_TYPE_EMAIL_LABELS,
  PREFERRED_TIME_EMAIL_LABELS,
  serverContactSchema,
} from "@/lib/contactSchema";
import { escapeHtml } from "@/lib/escapeHtml";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = serverContactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, message, needType, preferredTime } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          code: "EMAIL_NOT_CONFIGURED",
          error:
            "Email service is not configured. Set RESEND_API_KEY in .env.local.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? "bentabet.chouaib25@gmail.com";
    const from =
      process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

    const needLabel = NEED_TYPE_EMAIL_LABELS[needType];
    const timeLabel = PREFERRED_TIME_EMAIL_LABELS[preferredTime];

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeNeed = escapeHtml(needLabel);
    const safeTime = escapeHtml(timeLabel);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `Need: ${needLabel}\nPreferred time: ${timeLabel}\n\n${message}\n\n— ${name} (${email})`,
      html: `
        <p><strong>Need:</strong> ${safeNeed}</p>
        <p><strong>Preferred time:</strong> ${safeTime}</p>
        <p>${safeMessage}</p>
        <hr />
        <p><strong>${safeName}</strong> &lt;${safeEmail}&gt;</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
