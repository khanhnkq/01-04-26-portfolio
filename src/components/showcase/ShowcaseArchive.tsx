"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  SHOWCASE_FILTERS,
  SHOWCASE_PROJECTS,
  ShowcaseFilter,
  ShowcaseProject,
} from "@/data/showcase";
import styles from "./ShowcaseArchive.module.css";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
      />
    </svg>
  );
}

function ProjectMedia({ project }: { project: ShowcaseProject }) {
  if (project.image) {
    return (
      <Image
        alt={`${project.title} interface preview`}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        fill
        loading="eager"
        sizes="(max-width: 767px) 100vw, 54vw"
        src={project.image}
        style={{ objectPosition: project.imagePosition ?? "top" }}
      />
    );
  }

  const toneClass =
    project.posterTone === "blue"
      ? styles.placeholderBlue
      : project.posterTone === "paper"
        ? styles.placeholderPaper
        : styles.placeholderYellow;

  return (
    <div className={`${styles.placeholder} ${toneClass}`}>
      <span className={styles.placeholderTitle}>{project.title}</span>
    </div>
  );
}

function ProjectRow({
  project,
  visibleIndex,
}: {
  project: ShowcaseProject;
  visibleIndex: number;
}) {
  const reverse = visibleIndex % 2 === 1;

  return (
    <article className="border-t-2 border-brand-blue py-10 md:py-14">
      <a
        className={`${styles.projectLink} group grid items-center gap-8 md:grid-cols-12 md:gap-12`}
        href={project.repositoryUrl}
        rel="noreferrer"
        target="_blank"
      >
        <div
          className={`relative md:col-span-7 ${
            reverse
              ? "md:col-start-6 md:row-start-1"
              : "md:col-start-1 md:row-start-1"
          }`}
        >
          <Image
            alt=""
            aria-hidden="true"
            className={`absolute -top-6 left-7 z-20 h-24 w-auto drop-shadow-[3px_5px_2px_rgba(0,0,0,0.24)] sm:h-28 ${
              reverse ? "rotate-6" : "-rotate-6"
            }`}
            height={1385}
            loading="eager"
            src="/showcase-paperclip.png"
            width={306}
          />
          <span className={styles.tape} />
          <div className={styles.mediaFrame}>
            <ProjectMedia project={project} />
          </div>
        </div>

        <div
          className={`flex min-h-56 flex-col justify-between md:col-span-5 md:row-start-1 ${
            reverse ? "md:col-start-1" : "md:col-start-8"
          }`}
        >
          <div>
            <span className={styles.indexNumber}>
              {String(project.id).padStart(2, "0")}
            </span>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-blue/65">
              {project.label}
            </p>
            <h2 className="mt-2 text-4xl font-bold uppercase leading-none tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              {project.title}
            </h2>
          </div>

          <div className="mt-8 flex items-end justify-between gap-5">
            <ul
              aria-label={`${project.title} technologies`}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <li
                  className="border border-brand-blue bg-brand-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider sm:text-xs"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
            <span className={`${styles.arrowBox} shrink-0`}>
              <ArrowIcon />
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}

export default function ShowcaseArchive() {
  const [activeFilter, setActiveFilter] = useState<ShowcaseFilter>("All");

  const projects = useMemo(
    () =>
      activeFilter === "All"
        ? SHOWCASE_PROJECTS
        : SHOWCASE_PROJECTS.filter(
            (project) => project.category === activeFilter,
          ),
    [activeFilter],
  );

  return (
    <main className={`${styles.archive} ${styles.paperTexture}`}>
      <div aria-hidden="true" className={styles.binder}>
        <span className={styles.binderHole} />
        <span className={styles.binderHole} />
        <span className={styles.binderHole} />
      </div>

      <div className="mx-auto w-full max-w-[1480px] px-5 pb-10 pt-5 sm:px-8 md:pl-24 md:pr-12 lg:px-28">
        <nav
          aria-label="Showcase navigation"
          className="flex items-center justify-between border-b-2 border-brand-blue pb-5"
        >
          <Link
            className="text-xl font-bold uppercase tracking-[-0.06em] transition-transform hover:-rotate-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            href="/"
          >
            Khanh.
          </Link>
          <Link
            className="group inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.12em] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:text-sm"
            href="/"
          >
            Back to portfolio
            <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </nav>

        <header className="grid gap-10 pb-12 pt-14 md:grid-cols-12 md:pb-16 md:pt-20">
          <div className="md:col-span-9">
            <h1 className={styles.displayTitle}>Frontend Design Archive</h1>
            <p className="mt-8 max-w-2xl font-mono text-sm font-semibold leading-relaxed tracking-[0.04em] sm:text-base md:text-lg">
              Selected interfaces, product experiments, and cross-platform
              builds.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative hidden md:col-span-3 md:flex md:items-start md:justify-end"
          >
            <Image
              alt=""
              className="h-auto w-full max-w-[230px] -rotate-2 drop-shadow-[8px_10px_0_rgba(35,140,255,0.28)]"
              height={1484}
              loading="eager"
              src="/showcase-note.png"
              width={1060}
            />
          </div>
        </header>

        <div
          aria-label="Filter showcase projects"
          className="flex flex-wrap gap-3 border-b-2 border-brand-blue pb-7"
          role="group"
        >
          {SHOWCASE_FILTERS.map((filter) => {
            const selected = filter === activeFilter;

            return (
              <button
                aria-pressed={selected}
                className={`min-w-24 border-2 border-brand-blue px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:text-sm ${
                  selected
                    ? `${styles.hardShadow} -translate-x-0.5 -translate-y-0.5 bg-brand-yellow`
                    : "bg-brand-white hover:-translate-y-1"
                }`}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            );
          })}
        </div>

        <section aria-live="polite" aria-label="Showcase projects">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              visibleIndex={index}
            />
          ))}
        </section>
      </div>

      <footer className="border-t-[3px] border-brand-blue bg-brand-blue px-5 py-10 text-paper md:pl-24">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <p className="max-w-lg text-3xl font-bold uppercase leading-none tracking-[-0.055em] sm:text-4xl">
            Continue through the portfolio
          </p>
          <Link
            className={`${styles.hardShadow} inline-flex items-center gap-8 border-2 border-brand-blue bg-brand-yellow px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-brand-blue transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow`}
            href="/"
          >
            Back to portfolio
            <ArrowIcon />
          </Link>
        </div>
      </footer>
    </main>
  );
}
