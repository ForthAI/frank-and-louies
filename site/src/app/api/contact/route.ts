import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import { topicLabel, validateContact } from "@/lib/contact";

// Always run at request time (this handler sends email).
export const dynamic = "force-dynamic";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Pretend success.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const { firstName, lastName, email, phone, topic, businessName, street, city, state, zip, locationType, message } =
    result.data;
  const fullName = `${firstName} ${lastName}`;

  // Assemble the mailing address (only the parts provided).
  const cityLine = [city, [state, zip].filter(Boolean).join(" ").trim()]
    .filter(Boolean)
    .join(", ");
  const addressLines = [street, cityLine].filter(Boolean);
  const addressText = addressLines.length ? addressLines.join("\n") : "—";
  const locationLabel = locationType
    ? locationType === "business"
      ? "Business"
      : "Residence"
    : businessName
      ? "Business"
      : "—";

  const subject = `[F&L Website] ${topicLabel(topic)} — ${fullName}`;
  const text = [
    `Topic: ${topicLabel(topic)}`,
    `Name: ${fullName}`,
    ...(businessName ? [`Business: ${businessName}`] : []),
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Address type: ${locationLabel}`,
    `Mailing address:`,
    addressText,
    "",
    message ?? "(no message)",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  // Defaults are safe to ship; override via env once the domain is verified.
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Frank & Louie's <onboarding@resend.dev>";

  // Not configured yet (no API key). Don't lose the message in dev; surface
  // an honest error in production so nothing silently disappears.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set — submission (dev only):\n", text);
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 12px">New website inquiry</h2>
        <p><strong>Topic:</strong> ${escapeHtml(topicLabel(topic))}</p>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        ${businessName ? `<p><strong>Business:</strong> ${escapeHtml(businessName)}</p>` : ""}
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Address type:</strong> ${escapeHtml(locationLabel)}</p>
        <p><strong>Mailing address:</strong><br>${escapeHtml(addressText).replace(/\n/g, "<br>")}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message ?? "(no message)")}</p>
      </div>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
