"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { site, projectTypes } from "@/lib/site";
import { type ContactInput } from "@/lib/contact-schema";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const steps = [
  { title: "Je aanvraag", text: "Vul het formulier in of bel ons. Hoe meer je deelt, hoe beter." },
  { title: "Kennismaking", text: "We nemen zo snel mogelijk contact op om je plan te bespreken - doorgaans binnen enkele werkdagen." },
  { title: "Offerte op maat", text: "Je ontvangt een heldere offerte zonder verrassingen achteraf." },
];

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    "w-full rounded-xl border border-ink-200 bg-ink-100 px-4 py-3 text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-ink-500 focus:ring-2 focus:ring-ink-300/40";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink-700";
  const legendClass =
    "mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500";

  return (
    <section id="contact" className="relative overflow-hidden pt-28 pb-28 md:pt-36 md:pb-36">
      <div className="container-px mx-auto grid max-w-6xl gap-10 lg:grid-cols-5 lg:gap-16">
        {/* Left: clear orientation - how it works + how to reach us */}
        <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent-400">
              <Clock className="h-3.5 w-3.5" /> Reactie binnen enkele werkdagen
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-normal tracking-tight text-ink-900 md:text-5xl">
              Hoe ziet jouw nieuwe website eruit?
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-lg text-ink-500">
              Laat het ons weten! Liever direct contact? Bel of mail gerust.
            </p>
          </Reveal>

          {/* How it works */}
          <ol className="mt-8 space-y-5">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={0.12 + i * 0.05} className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ink-200 bg-surface font-display text-sm font-medium text-ink-900">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-medium text-ink-900">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-500">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Direct contact */}
          <div className="mt-7 space-y-2 border-t border-ink-200 pt-5">
            <Reveal delay={0.25}>
              <a
                href={`tel:${site.phoneIntl}`}
                className="flex items-center gap-3 text-ink-700 transition-colors hover:text-ink-900"
              >
                <Phone className="h-5 w-5 flex-none text-ink-500" />
                <span className="font-semibold">{site.phone}</span>
              </a>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-ink-700 transition-colors hover:text-ink-900"
              >
                <Mail className="h-5 w-5 flex-none text-ink-500" />
                <span className="font-semibold">{site.email}</span>
              </a>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="flex items-center gap-3 text-ink-500">
                <MapPin className="h-5 w-5 flex-none text-ink-500" />
                Werkgebied: heel {site.region}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right: the form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-ink-200 bg-surface p-6 shadow-lift md:p-7 lg:col-span-3"
        >
          {status === "success" ? (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-14 w-14 text-ink-900" />
              <h3 className="mt-4 font-display text-2xl font-medium text-ink-900">Bedankt!</h3>
              <p className="mt-2 max-w-sm text-ink-500">
                Je aanvraag is verstuurd. We nemen zo snel mogelijk contact met je op.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-900"
              >
                Nog een aanvraag versturen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Bedrijf
                  <input tabIndex={-1} autoComplete="off" {...register("company")} />
                </label>
              </div>

              {/* Section 1: contact details */}
              <fieldset>
                <legend className={legendClass}>
                  <span className="text-ink-700">01</span> Jouw gegevens
                </legend>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Naam *
                      </label>
                      <input
                        id="name"
                        className={inputClass}
                        placeholder="Je naam"
                        {...register("name", { required: "Vul je naam in" })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
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
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Telefoon <span className="text-ink-400">(optioneel)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={inputClass}
                      placeholder="Zodat we je ook kunnen bellen"
                      {...register("phone")}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Section 2: project */}
              <fieldset>
                <legend className={legendClass}>
                  <span className="text-ink-700">02</span> Je project
                </legend>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="projectType" className={labelClass}>
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
                      <p className="mt-1 text-sm text-red-400">{errors.projectType.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Bericht *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className={inputClass}
                      placeholder="Vertel kort over je project, wensen en eventueel budget…"
                      {...register("message", {
                        required: "Vertel kort waar we je mee kunnen helpen",
                        minLength: { value: 10, message: "Vertel kort waar we je mee kunnen helpen (minimaal 10 tekens)" },
                      })}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>
                </div>
              </fieldset>

              {status === "error" && serverError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="border-t border-ink-200 pt-5">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink-50 shadow-lift transition-all hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Versturen…
                    </>
                  ) : (
                    <>
                      Verstuur aanvraag
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-ink-400">
                  Velden met * zijn verplicht. We gebruiken je gegevens uitsluitend om op je aanvraag
                  te reageren.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
