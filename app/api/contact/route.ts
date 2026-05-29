import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Controleer de ingevulde gegevens." },
      { status: 422 }
    );
  }

  const { name, email, phone, projectType, message, company } = parsed.data;

  // Honeypot tripped - silently accept without sending.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ontbreekt - e-mail niet verzonden.");
    return NextResponse.json(
      { error: "De e-mailservice is nog niet geconfigureerd. Bel of mail ons gerust direct." },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  // The "from" address must be on a domain verified in Resend.
  const from = process.env.CONTACT_FROM_EMAIL || "AL Design <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nieuwe offerteaanvraag - ${projectType} (${name})`,
      text: [
        `Naam: ${name}`,
        `E-mail: ${email}`,
        `Telefoon: ${phone || "-"}`,
        `Type project: ${projectType}`,
        "",
        "Bericht:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
          <h2 style="color:#4f46e5">Nieuwe offerteaanvraag</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#64748b">Naam</td><td style="padding:6px 0"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">E-mail</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Telefoon</td><td style="padding:6px 0">${escapeHtml(phone || "-")}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Type project</td><td style="padding:6px 0">${escapeHtml(projectType)}</td></tr>
          </table>
          <p style="margin-top:16px;color:#64748b">Bericht</p>
          <p style="white-space:pre-wrap;background:#f8fafc;border-radius:8px;padding:16px">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Versturen mislukt. Probeer het later opnieuw of bel ons direct." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
