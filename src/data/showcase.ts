export const SHOWCASE_FILTERS = ["All", "Web", "Mobile", "Landing"] as const;

export type ShowcaseFilter = (typeof SHOWCASE_FILTERS)[number];

export type ShowcaseProject = {
  id: number;
  title: string;
  category: Exclude<ShowcaseFilter, "All">;
  label: string;
  tags: string[];
  repositoryUrl: string;
  image?: string;
  imagePosition?: string;
  posterTone?: "blue" | "yellow" | "paper";
};

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 1,
    title: "Flotie",
    category: "Landing",
    label: "Fashion / Commerce",
    tags: ["React 19", "Vite 7", "Tailwind 4"],
    repositoryUrl: "https://github.com/khanhnkq/Flotie-landing",
    posterTone: "yellow",
  },
  {
    id: 2,
    title: "WonderKids",
    category: "Web",
    label: "Education / AI",
    tags: ["React", "TypeScript", "Gemini API"],
    repositoryUrl: "https://github.com/khanhnkq/wonderkids-fun-zone",
    image: "/wonderkids-preview.png",
  },
  {
    id: 3,
    title: "Checked",
    category: "Mobile",
    label: "Social / Finance",
    tags: ["Flutter", "Riverpod", "Dio"],
    repositoryUrl: "https://github.com/khanhnkq/Checked-Mobile-UI",
    posterTone: "blue",
  },
  {
    id: 4,
    title: "HyperMatch",
    category: "Web",
    label: "Hyperwork / Workspace",
    tags: ["React 19", "GSAP", "Motion"],
    repositoryUrl: "https://github.com/khanhnkq/HyperMatch",
    posterTone: "paper",
  },
  {
    id: 5,
    title: "QuizKen Landing",
    category: "Landing",
    label: "Learning / Product",
    tags: ["Next.js 16", "Tailwind 4", "Framer Motion"],
    repositoryUrl: "https://github.com/khanhnkq/quizken-landing",
    image: "/quizken-preview.png",
  },
  {
    id: 6,
    title: "ThauPhim Web",
    category: "Web",
    label: "Streaming / Web",
    tags: ["Next.js 16", "HLS.js", "OPhim API"],
    repositoryUrl:
      "https://github.com/khanhnkq/khanhnkq-ThauPhim-FE-for-OPhim-API",
    image: "/thauphim-preview.jpg",
  },
  {
    id: 7,
    title: "ThauPhim Mobile",
    category: "Mobile",
    label: "Streaming / Mobile",
    tags: ["React Native", "Expo 55", "NativeWind"],
    repositoryUrl:
      "https://github.com/khanhnkq/thauphim-mobileUI-react-native",
    image: "/thauphim-preview-3d.png",
    imagePosition: "center",
  },
];
