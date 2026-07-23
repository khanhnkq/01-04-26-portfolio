import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SupporterSection from "@/components/sections/SupporterSection";
import ContactSection from "@/components/sections/ContactSection";
import ThankYouSection from "@/components/sections/ThankYouSection";
import BookSectionDynamic from "@/components/sections/BookSectionDynamic";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />

      {/* 3D Book Showcase */}
      <BookSectionDynamic />

      {/* Mobile entry point — the 3D book is intentionally desktop-only */}
      <section className="relative overflow-hidden border-y-8 border-brand-yellow bg-paper px-5 py-20 text-brand-blue md:hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #238CFF 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
            Project collection
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em]">
            Frontend Design Archive
          </h2>
          <p className="mt-6 text-base font-semibold leading-relaxed text-brand-blue/75">
            Selected interfaces, product experiments, and cross-platform
            builds.
          </p>
          <Link
            className="mt-8 inline-flex items-center gap-5 border-2 border-brand-blue bg-brand-yellow px-5 py-4 font-mono text-xs font-black uppercase tracking-widest shadow-[6px_6px_0_#238CFF] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            href="/showcase"
          >
            Explore all work
            <svg
              aria-hidden="true"
              className="h-5 w-5"
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
          </Link>
        </div>
      </section>

      {/* Detail Project Sections as fallback or detailed view */}
      {/* {PROJECTS.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))} */}

      {/* Wall of Appreciation / Supporters Wall Section */}
      <SupporterSection />

      <ContactSection />

      <ThankYouSection />
    </main>
  );
}
