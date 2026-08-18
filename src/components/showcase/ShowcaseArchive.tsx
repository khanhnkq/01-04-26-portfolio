"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef, useState } from "react";
import { PROJECTS, ProjectType } from "@/data/projects";
import ArchitectureFlow from "./ArchitectureFlow";
import styles from "./ShowcaseArchive.module.css";

const PROJECT_FILTERS = [
  "All",
  ...Array.from(new Set(PROJECTS.map((project) => project.category))),
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
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

function ProjectVideo({ project }: { project: ProjectType }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
  };

  return (
    <div className="group/video absolute inset-0 bg-brand-blue">
      <video
        aria-label={`${project.title} demo video`}
        className="h-full w-full object-cover"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        poster={project.videoPoster}
        preload="metadata"
        ref={videoRef}
        src={project.video}
      />
      <button
        aria-label={`${isPlaying ? "Pause" : "Play"} ${project.title} video`}
        aria-pressed={isPlaying}
        className={`absolute z-10 inline-flex items-center gap-3 border-2 border-brand-blue bg-brand-yellow font-mono text-xs font-black uppercase tracking-widest text-brand-blue shadow-[5px_5px_0_#238CFF] transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow ${
          isPlaying
            ? "bottom-4 left-4 px-4 py-3 opacity-90 hover:opacity-100"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-4 hover:-translate-y-[calc(50%+4px)]"
        }`}
        onClick={togglePlayback}
        type="button">
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 place-items-center border-2 border-brand-blue bg-paper ${
            isPlaying ? "gap-1" : "pl-0.5"
          }`}>
          {isPlaying ? (
            <span className="flex gap-1">
              <span className="h-3.5 w-1 bg-brand-blue" />
              <span className="h-3.5 w-1 bg-brand-blue" />
            </span>
          ) : (
            <span className="h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-brand-blue" />
          )}
        </span>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

function ProjectMedia({ project }: { project: ProjectType }) {
  if (project.video) {
    return <ProjectVideo project={project} />;
  }

  return (
    <Image
      alt={`${project.title} interface preview`}
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
      fill
      loading="eager"
      sizes="(max-width: 767px) 100vw, 54vw"
      src={project.page_cover}
    />
  );
}

function ProjectRow({
  project,
  shouldReduceMotion,
  visibleIndex,
}: {
  project: ProjectType;
  shouldReduceMotion: boolean;
  visibleIndex: number;
}) {
  const reverse = visibleIndex % 2 === 1;

  return (
    <motion.article
      className={`${styles.projectChapter} border-t-2 border-brand-blue`}
      data-project-chapter
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -24 }}
      id={`project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
      <div className={styles.projectChapterViewport} data-project-viewport>
        <div className={styles.projectChapterTrack} data-project-track>
          <section className={styles.projectOverviewSlide}>
            <div
              className={`${styles.projectLink} group grid items-center gap-8 md:grid-cols-12 md:gap-12`}>
        <motion.div
          className={`relative md:col-span-7 ${
            reverse
              ? "md:col-start-6 md:row-start-1"
              : "md:col-start-1 md:row-start-1"
          }`}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, rotate: reverse ? 3 : -3, scale: 0.92 }
          }
          transition={{
            delay: 0.08,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ amount: 0.25, once: true }}
          whileInView={
            shouldReduceMotion ? undefined : { opacity: 1, rotate: 0, scale: 1 }
          }>
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
        </motion.div>

        <motion.div
          className={`flex min-h-56 flex-col justify-between md:col-span-5 md:row-start-1 ${
            reverse ? "md:col-start-1" : "md:col-start-8"
          }`}
          initial={
            shouldReduceMotion ? false : { opacity: 0, x: reverse ? -42 : 42 }
          }
          transition={{
            delay: 0.16,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ amount: 0.25, once: true }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}>
          <div>
            <span className={styles.indexNumber}>
              {String(project.id).padStart(2, "0")}
            </span>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-blue/65">
              {project.category}
            </p>
            <h2 className="mt-2 text-4xl font-bold uppercase leading-none tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              {project.title}
            </h2>
          </div>

          <div className="mt-8 flex items-end justify-between gap-5">
            <ul
              aria-label={`${project.title} technologies`}
              className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  className="border border-brand-blue bg-brand-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider sm:text-xs"
                  key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
            {project.demo && (
              <a
                aria-label={
                  project.demo.includes("github.com")
                    ? `View ${project.title} repository on GitHub`
                    : `Open live ${project.title} project`
                }
                className={`${styles.repositoryLink} shrink-0`}
                href={project.demo}
                rel="noreferrer"
                target="_blank">
                <span className={styles.arrowBox}>
                  <ArrowIcon />
                </span>
              </a>
            )}
          </div>
        </motion.div>
            </div>
          </section>

          <section
            aria-label={`${project.title} architecture`}
            className={styles.projectArchitectureSlide}>
            <ArchitectureFlow
              architecture={project.architecture}
              projectTitle={project.title}
            />
          </section>
        </div>
      </div>
    </motion.article>
  );
}

export default function ShowcaseArchive() {
  const [activeFilter, setActiveFilter] = useState("All");
  const archiveRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const projects = useMemo(
    () =>
      activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter(
            (project) => project.category === activeFilter,
          ),
    [activeFilter],
  );

  useGSAP(
    () => {
      const archive = archiveRef.current;

      if (!archive) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1400px) and (prefers-reduced-motion: no-preference)",
        () => {
          const chapters = Array.from(
            archive.querySelectorAll<HTMLElement>("[data-project-chapter]"),
          );
          const tracks: HTMLElement[] = [];

          chapters.forEach((chapter, index) => {
            const viewport =
              chapter.querySelector<HTMLElement>("[data-project-viewport]");
            const track =
              chapter.querySelector<HTMLElement>("[data-project-track]");

            if (!viewport || !track) {
              return;
            }

            tracks.push(track);

            const syncViewportWidth = () => {
              track.style.setProperty(
                "--chapter-viewport-width",
                `${viewport.clientWidth}px`,
              );
            };
            const getScrollDistance = () =>
              Math.max(0, track.scrollWidth - viewport.clientWidth);

            syncViewportWidth();
            gsap.set(track, { x: 0 });

            gsap.to(track, {
              ease: "none",
              x: () => -getScrollDistance(),
              scrollTrigger: {
                anticipatePin: 1,
                end: () => `+=${getScrollDistance()}`,
                id: `project-chapter-${index}`,
                invalidateOnRefresh: true,
                onRefreshInit: syncViewportWidth,
                pin: viewport,
                pinSpacing: true,
                refreshPriority: chapters.length - index,
                scrub: 0.7,
                start: "top top",
                trigger: chapter,
              },
            });
          });

          let resizeFrame = 0;
          const resizeObserver = new ResizeObserver(() => {
            window.cancelAnimationFrame(resizeFrame);
            resizeFrame = window.requestAnimationFrame(() =>
              ScrollTrigger.refresh(),
            );
          });
          tracks.forEach((track) => resizeObserver.observe(track));

          const refreshFrame = window.requestAnimationFrame(() =>
            ScrollTrigger.refresh(),
          );

          return () => {
            resizeObserver.disconnect();
            window.cancelAnimationFrame(resizeFrame);
            window.cancelAnimationFrame(refreshFrame);
            tracks.forEach((track) => {
              track.style.removeProperty("--chapter-viewport-width");
              gsap.set(track, { clearProps: "transform" });
            });
          };
        },
      );

      return () => media.revert();
    },
    {
      dependencies: [activeFilter],
      revertOnUpdate: true,
      scope: archiveRef,
    },
  );

  return (
    <main
      className={`${styles.archive} ${styles.paperTexture}`}
      ref={archiveRef}>
      <div aria-hidden="true" className={styles.binder}>
        <span className={styles.binderHole} />
        <span className={styles.binderHole} />
        <span className={styles.binderHole} />
      </div>

      <div className="w-full px-5 pb-10 pt-5 sm:px-8 md:pl-24 md:pr-12 lg:pl-28 lg:pr-10">
        <motion.nav
          aria-label="Showcase navigation"
          className="flex items-center justify-between border-b-2 border-brand-blue pb-5"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <Link
            className="text-xl font-bold tracking-[-0.06em] transition-transform hover:-rotate-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            href="/">
            Khanhnkq.
          </Link>
          <Link
            className="group inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.12em] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:text-sm"
            href="/">
            Back to portfolio
            <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </motion.nav>

        <motion.header
          className="grid gap-10 pb-12 pt-14 md:grid-cols-12 md:pb-16 md:pt-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: 0.08, staggerChildren: 0.12 },
            },
          }}>
          <motion.div
            className="md:col-span-9"
            variants={{ hidden: {}, visible: {} }}>
            <motion.h1
              aria-label="Project Archive"
              className={`${styles.displayTitle} flex flex-wrap`}
              variants={{
                hidden: {},
                visible: {
                  transition: { delayChildren: 0.05, staggerChildren: 0.045 },
                },
              }}>
              {"Project Archive".split("").map((char, index) => (
                <span
                  className="inline-block overflow-hidden"
                  key={`${char}-${index}`}>
                  <motion.span
                    className="inline-block origin-bottom"
                    variants={{
                      hidden: shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, rotate: 8, y: "120%" },
                      visible: {
                        opacity: 1,
                        rotate: 0,
                        y: 0,
                        transition: {
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            <motion.p
              className="mt-8 max-w-2xl font-mono text-sm font-semibold leading-relaxed tracking-[0.04em] sm:text-base md:text-lg"
              variants={{
                hidden: shouldReduceMotion
                  ? { opacity: 1 }
                  : { filter: "blur(4px)", opacity: 0, y: 22 },
                visible: {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}>
              A complete collection of web, mobile, full-stack, and product
              work.
            </motion.p>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="relative hidden md:col-span-3 md:flex md:items-start md:justify-end"
            variants={{
              hidden: shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, rotate: 8, scale: 0.75 },
              visible: {
                opacity: 1,
                rotate: 0,
                scale: 1,
                transition: {
                  delay: 0.35,
                  type: "spring",
                  stiffness: 180,
                  damping: 16,
                },
              },
            }}>
            <Image
              alt=""
              className="h-auto w-full max-w-[230px] -rotate-2 drop-shadow-[8px_10px_0_rgba(35,140,255,0.28)]"
              height={1484}
              loading="eager"
              src="/showcase-note.png"
              width={1060}
            />
          </motion.div>
        </motion.header>

        <motion.div
          aria-label="Filter showcase projects"
          className="flex flex-wrap gap-3 border-b-2 border-brand-blue pb-7"
          initial="hidden"
          animate="visible"
          role="group"
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: 0.42, staggerChildren: 0.08 },
            },
          }}>
          {PROJECT_FILTERS.map((filter) => {
            const selected = filter === activeFilter;

            return (
              <motion.button
                aria-pressed={selected}
                className={`min-w-24 border-2 border-brand-blue px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:text-sm ${
                  selected
                    ? `${styles.hardShadow} -translate-x-0.5 -translate-y-0.5 bg-brand-yellow`
                    : "bg-brand-white hover:-translate-y-1"
                }`}
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                }}
                type="button"
                variants={{
                  hidden: shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.8, y: 22 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  },
                }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}>
                {filter}
              </motion.button>
            );
          })}
        </motion.div>

        <section aria-live="polite" aria-label="Showcase projects">
          <AnimatePresence initial={false} mode="sync">
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                shouldReduceMotion={shouldReduceMotion}
                visibleIndex={index}
              />
            ))}
          </AnimatePresence>
        </section>
      </div>

      <motion.footer
        className="border-t-[3px] border-brand-blue bg-brand-blue px-5 py-10 text-paper md:pl-24"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 48 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ amount: 0.3, once: true }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}>
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <p className="max-w-lg text-3xl font-bold uppercase leading-none tracking-[-0.055em] sm:text-4xl">
            Continue through the portfolio
          </p>
          <Link
            className={`${styles.hardShadow} inline-flex items-center gap-8 border-2 border-brand-blue bg-brand-yellow px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-brand-blue transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow`}
            href="/">
            Back to portfolio
            <ArrowIcon />
          </Link>
        </div>
      </motion.footer>
    </main>
  );
}
