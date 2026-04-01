import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectSection from "@/components/sections/ProjectSection";
import ThankYouSection from "@/components/sections/ThankYouSection";
import { PROJECTS } from "@/data/projects";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      
      {/* MAP OVER PROJECTS TO RENDER PROJECT SECTIONS */}
      {PROJECTS.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      <ThankYouSection />
    </main>
  );
}
