import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SupporterSection from "@/components/sections/SupporterSection";
import ContactSection from "@/components/sections/ContactSection";
import ThankYouSection from "@/components/sections/ThankYouSection";
import BookSectionDynamic from "@/components/sections/BookSectionDynamic";

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

      <ContactSection />

      <ThankYouSection />
    </main>
  );
}
