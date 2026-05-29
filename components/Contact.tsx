"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { site, projectTypes } from "@/lib/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ defaultValues: { projectType: "" } });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    setServerError(null);

    // Client-side validation mirrors the server schema.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setStatus("error");
      setServerError("Controleer de ingevulde gegevens.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Versturen mislukt");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Er ging iets mis. Probeer het later opnieuw."
      );
    }
  };

  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 shadow-sm outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-ink-50" />
      <div className="absolute -top-24 left-1/4 -z-10 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl" />

      <div className="container-px mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: pitch + contact details */}
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
              Klaar voor een website die werkt?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-ink-600">
              Vraag vrijblijvend een offerte aan. Vertel kort over je project en we nemen snel
              contact met je op — meestal binnen één werkdag.
            </p>
          </Reveal>

          <div className="mt-8 space-y-3">
            <Reveal delay={0.15}>
              <a
                href={`tel:${site.phoneIntl}`}
                className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 shadow-soft transition-all hover:border-brand-200 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-ink-500">Bel direct</span>
                  <span className="font-semibold text-ink-900">{site.phone}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 shadow-soft transition-all hover:border-brand-200 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-ink-500">Mail ons</span>
                  <span className="font-semibold text-ink-900">{site.email}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-ink-500">Werkgebied</span>
                  <span className="font-semibold text-ink-900">Heel {site.region}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-ink-200 bg-white p-6 shadow-lift md:p-8"
        >
          {status === "success" ? (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-14 w-14 text-brand-600" />
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Bedankt!</h3>
              <p className="mt-2 max-w-sm text-ink-600">
                Je aanvraag is verstuurd. We nemen zo snel mogelijk contact met je op.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Nog een aanvraag versturen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Bedrijf
                  <input tabIndex={-1} autoComplete="off" {...register("company")} />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
                    Naam *
                  </label>
                  <input
                    id="name"
                    className={inputClass}
                    placeholder="Je naam"
                    {...register("name", { required: "Vul je naam in" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    placeholder="naam@voorbeeld.nl"
                    {...register("email", { required: "Vul je e-mailadres in" })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
                    Telefoon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={inputClass}
                    placeholder="Optioneel"
                    {...register("phone")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="projectType"
                    className="mb-1.5 block text-sm font-medium text-ink-700"
                  >
                    Type project *
                  </label>
                  <select
                    id="projectType"
                    className={inputClass}
                    defaultValue=""
                    {...register("projectType", { required: "Kies een projecttype" })}
                  >
                    <option value="" disabled>
                      Maak een keuze
                    </option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={inputClass}
                  placeholder="Vertel kort over je project, wensen en eventueel budget…"
                  {...register("message", { required: "Vertel kort waar we je mee kunnen helpen" })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {status === "error" && serverError && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{serverError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lift transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Versturen…
                  </>
                ) : (
                  <>
                    Offerte aanvragen
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-ink-400">
                We gebruiken je gegevens uitsluitend om op je aanvraag te reageren.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
