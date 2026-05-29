import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Target, CheckCircle2 } from "lucide-react";
import { projects, getProject, shotUrl, site } from "@/lib/site";
import BrowserFrame from "@/components/BrowserFrame";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project niet gevonden" };
  return {
    title: `${project.name} — ${project.category}`,
    description: project.description,
    alternates: { canonical: `/werk/${project.slug}` },
    openGraph: {
      title: `${project.name} — project van ${site.name}`,
      description: project.description,
      images: [{ url: shotUrl(project.url), width: 1200, height: 750, alt: project.name }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -top-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl animate-blob" />

        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <Link
              href="/werk"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" /> Terug naar werk
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">
                {project.category}
              </span>
              <span className="text-ink-500">{project.year}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-900 md:text-6xl">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg text-ink-600">{project.description}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lift transition-all hover:bg-brand-700"
            >
              Bezoek de website
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Screenshot */}
      <section className="container-px mx-auto max-w-5xl pb-8">
        <Reveal>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
            <BrowserFrame
              domain={project.domain}
              shotUrl={shotUrl(project.url)}
              alt={`Screenshot van de website ${project.name} (${project.domain}) gemaakt door ${site.name}`}
            />
          </a>
        </Reveal>
      </section>

      {/* Details */}
      <section className="container-px mx-auto max-w-5xl py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5 text-lg leading-relaxed text-ink-600 md:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-ink-900">Over dit project</h2>
            </Reveal>
            {project.longDescription.map((para, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          <div className="space-y-5">
            <Reveal>
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-2 text-brand-600">
                  <Target className="h-5 w-5" />
                  <h3 className="font-display font-bold text-ink-900">De uitdaging</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{project.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-2 text-brand-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <h3 className="font-display font-bold text-ink-900">Het resultaat</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{project.result}</p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                <h3 className="font-display font-bold text-ink-900">Diensten</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Next project */}
        <Reveal className="mt-14 border-t border-ink-200 pt-8">
          <Link
            href={`/werk/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-soft transition-all hover:border-brand-200 hover:shadow-lift"
          >
            <div>
              <span className="text-sm text-ink-500">Volgend project</span>
              <p className="font-display text-lg font-bold text-ink-900">{next.name}</p>
            </div>
            <span className="flex-none rounded-full bg-brand-50 p-2.5 text-brand-600 transition-all group-hover:bg-brand-600 group-hover:text-white">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </Reveal>
      </section>

      <CtaBanner />
    </>
  );
}
