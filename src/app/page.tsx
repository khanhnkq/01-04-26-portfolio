import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectSection from "@/components/sections/ProjectSection";
import SupporterSection from "@/components/sections/SupporterSection";
import ThankYouSection from "@/components/sections/ThankYouSection";
import BookSectionDynamic from "@/components/sections/BookSectionDynamic";
import { PROJECTS } from "@/data/projects";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />

      {/* 3D Book Showcase */}
      <BookSectionDynamic />

      {/* Detail Project Sections as fallback or detailed view */}
      {/* {PROJECTS.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))} */}

      {/* Wall of Appreciation / Supporters Wall Section */}
      <SupporterSection />

      <ThankYouSection />
    </main>
  );
}
