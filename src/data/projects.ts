export type ProjectType = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  demo: string;
  color: string;
  image: string;
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
    image: "/quizken-preview.png",
  },
  {
    id: 2,
    title: "ThauPhim",
    category: "FULLSTACK",
    description: "A responsive movie streaming interface for OPhim's API. Features both web and mobile UI (React Native).",
    tags: ["NextJs", "React Native", "TypeScript", "Tailwind"],
    demo: "https://thauphim-neon.vercel.app",
    color: "bg-brand-yellow",
    image: "/thauphim-preview.jpg",
  },
  {
    id: 3,
    title: "ConnectCG",
    category: "SOCIAL PLATFORM",
    description: "A social platform featuring real-time interactions, AI content checking, and automated email delivery.",
    tags: ["Spring Boot", "Spring Security", "Kafka", "MySQL", "Firebase", "WebSocket", "ReactJs"],
    demo: "https://connect-cg.vercel.app",
    color: "bg-brand-white",
    image: "/connect-preview.png",
  },
  {
    id: 4,
    title: "Danang's Egov",
    category: "E-GOVERNMENT",
    description: "A conceptual e-government portal simulator. Streamlines administrative procedures with real-time tracking and online payments.",
    tags: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "WebSocket", "Flyway", "VNPay"],
    demo: "https://egov-cg.duckdns.org/",
    color: "bg-folder-light",
    image: "/egov-preview.png",
  },
  {
    id: 5,
    title: "WonderKids",
    category: "EDUCATION",
    description: "An interactive educational platform designed for children to learn about body safety and personal responsibility through 3D elements.",
    tags: ["React", "TypeScript", "Three.js", "Framer Motion", "Gemini API"],
    demo: "https://wonderkids-six.vercel.app/",
    color: "bg-brand-blue",
    image: "/wonderkids-preview.png",
  }
];
