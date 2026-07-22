export type ProjectType = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  demo?: string;
  color: string;
  image: string;
  page_cover: string;
  back_page_cover: string;
};

export const PROJECTS: ProjectType[] = [
  {
    id: 1,
    title: "QuizKen",
    category: "WEB APP",
    description: "A modern quiz and vocabulary flashcard platform with a dynamic 3D interface. Achieved 5,000+ monthly visits and 200+ registered users.",
    tags: ["React 18", "TypeScript", "Supabase", "GSAP", "Framer Motion", "SEPAY"],
    demo: "https://www.quizken.com/",
    color: "bg-brand-blue",
    image: "/quizken-preview-unified.png",
    page_cover: "/quizken-preview.png",
    back_page_cover: "/back_page_cover_2.png",
  },
  {
    id: 2,
    title: "ThauPhim",
    category: "FULLSTACK",
    description: "A responsive movie streaming interface for OPhim's API. Features both web and mobile UI (React Native).",
    tags: ["NextJs", "React Native", "TypeScript", "Tailwind"],
    demo: "https://thauphim-neon.vercel.app",
    color: "bg-brand-yellow",
    image: "/thauphim-preview-unified.png",
    page_cover: "/thauphim-preview.jpg",
    back_page_cover: "/back_page_cover_3.png",
  },
  {
    id: 3,
    title: "ConnectCG",
    category: "SOCIAL PLATFORM",
    description: "A social platform featuring real-time interactions, AI content checking, and automated email delivery.",
    tags: ["Spring Boot", "Spring Security", "Kafka", "MySQL", "Firebase", "WebSocket", "ReactJs"],
    demo: "https://connect-cg.vercel.app",
    color: "bg-brand-white",
    image: "/connect-preview-unified.png",
    page_cover: "/connect-preview.png",
    back_page_cover: "/back_page_cover_4.png",
  },
  {
    id: 4,
    title: "Danang's Egov",
    category: "E-GOVERNMENT",
    description: "A conceptual e-government portal simulator. Streamlines administrative procedures with real-time tracking and online payments.",
    tags: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "WebSocket", "Flyway", "VNPay"],
    demo: "https://egov-cg.duckdns.org/",
    color: "bg-folder-light",
    image: "/egov-preview-unified.png",
    page_cover: "/egov-preview.png",
    back_page_cover: "/back_page_cover_5.png",
  },
  {
    id: 5,
    title: "WonderKids",
    category: "EDUCATION",
    description: "An interactive educational platform designed for children to learn about body safety and personal responsibility through 3D elements.",
    tags: ["React", "TypeScript", "Three.js", "Framer Motion", "Gemini API"],
    demo: "https://wonderkids-six.vercel.app/",
    color: "bg-brand-blue",
    image: "/wonderkids-preview-unified.png",
    page_cover: "/wonderkids-preview.png",
    back_page_cover: "/doccleaner-preview.png",
  },
  {
    id: 6,
    title: "DocCleaner",
    category: "CHROME EXTENSION",
    description: "A smart Chrome Extension that automatically removes 100% of ads, bypasses paywall/blur locks on Studocu & Scribd, and exports HD A4 PDFs in 1-Click.",
    tags: ["JavaScript", "Chrome Extension", "Manifest V3", "DOM Manipulation", "CSS Injection"],
    demo: "https://github.com/khanhnkq/DocCleaner",
    color: "bg-brand-yellow",
    image: "/doccleaner-preview-unified.png",
    page_cover: "/doccleaner-preview.png",
    back_page_cover: "/back_page_cover_6.png",
  }
];
