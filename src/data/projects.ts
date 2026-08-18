export type ArchitectureEvidence =
  | "repo-confirmed"
  | "conceptual-target"
  | "unavailable";

export type ArchitectureNodeKind =
  | "client"
  | "service"
  | "data"
  | "external"
  | "runtime"
  | "output";

export type ArchitectureNode = {
  id: string;
  label: string;
  detail: string;
  kind: ArchitectureNodeKind;
};

export type ArchitectureStep = {
  from: string;
  to: string;
  label: string;
  type: "request" | "response" | "event" | "local";
};

export type ArchitectureScenario = {
  id: string;
  label: string;
  description: string;
  nodes: ArchitectureNode[];
  steps: ArchitectureStep[];
};

export type ProjectArchitecture = {
  evidence: ArchitectureEvidence;
  title: string;
  summary: string;
  sourceLabel: string;
  sourceUrl?: string;
  unavailableReason?: string;
  scenarios: ArchitectureScenario[];
};

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
  video?: string;
  videoPoster?: string;
  architecture: ProjectArchitecture;
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
    architecture: {
      evidence: "unavailable",
      title: "Private system architecture",
      summary:
        "Technical implementation details for this production system are not publicly disclosed.",
      sourceLabel: "Private implementation",
      unavailableReason:
        "The production architecture and implementation repository for this project are private.",
      scenarios: [],
    },
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
    architecture: {
      evidence: "repo-confirmed",
      title: "Streaming request flow",
      summary:
        "A client-side movie request is normalized, resolved to an HLS source, then streamed into the browser player.",
      sourceLabel: "Verified from ThauPhim source",
      sourceUrl: "https://github.com/khanhnkq/ThauPhim",
      scenarios: [
        {
          id: "stream-movie",
          label: "Play movie",
          description:
            "The same OPhim service contract supports the Next.js web client and React Native interface.",
          nodes: [
            { id: "viewer", label: "Viewer", detail: "Selects a title", kind: "client" },
            { id: "client", label: "Next.js / RN", detail: "Requests movie data", kind: "client" },
            { id: "service", label: "Movie service", detail: "Axios + normalization", kind: "service" },
            { id: "ophim", label: "OPhim API", detail: "Metadata + m3u8 URL", kind: "external" },
            { id: "player", label: "HLS player", detail: "Hls.js / native HLS", kind: "runtime" },
            { id: "video", label: "Video element", detail: "Streams to viewer", kind: "output" },
          ],
          steps: [
            { from: "viewer", to: "client", label: "Select", type: "local" },
            { from: "client", to: "service", label: "GET movie", type: "request" },
            { from: "service", to: "ophim", label: "Fetch", type: "request" },
            { from: "ophim", to: "player", label: "m3u8", type: "response" },
            { from: "player", to: "video", label: "Media segments", type: "event" },
          ],
        },
      ],
    },
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
    architecture: {
      evidence: "repo-confirmed",
      title: "Social platform architecture",
      summary:
        "Authenticated API requests, AI moderation, persistence, realtime events, media storage, and encrypted chat are split into two representative flows.",
      sourceLabel: "Verified from ConnectCG source",
      sourceUrl: "https://github.com/khanhnkq/Connect-CG",
      scenarios: [
        {
          id: "publish-post",
          label: "Publish post",
          description:
            "A JWT-authenticated post passes Gemini moderation before persistence and realtime distribution.",
          nodes: [
            { id: "react", label: "React client", detail: "Axios + JWT", kind: "client" },
            { id: "security", label: "Spring Security", detail: "Validates identity", kind: "service" },
            { id: "controller", label: "Post service", detail: "Coordinates publish", kind: "service" },
            { id: "gemini", label: "Gemini", detail: "Content moderation", kind: "external" },
            { id: "database", label: "MySQL + MinIO", detail: "Post and media", kind: "data" },
            { id: "stomp", label: "STOMP socket", detail: "Broadcasts update", kind: "runtime" },
          ],
          steps: [
            { from: "react", to: "security", label: "POST + JWT", type: "request" },
            { from: "security", to: "controller", label: "Authorized", type: "local" },
            { from: "controller", to: "gemini", label: "Moderate", type: "request" },
            { from: "gemini", to: "database", label: "Approved + save", type: "response" },
            { from: "database", to: "stomp", label: "Post created", type: "event" },
          ],
        },
        {
          id: "encrypted-chat",
          label: "Encrypted chat",
          description:
            "Message content stays encrypted in Firebase while the backend coordinates conversation metadata and realtime state.",
          nodes: [
            { id: "sender", label: "Sender", detail: "Encrypts message", kind: "client" },
            { id: "firebase", label: "Firebase", detail: "Encrypted payload", kind: "data" },
            { id: "backend", label: "Spring API", detail: "Updates metadata", kind: "service" },
            { id: "database", label: "MySQL", detail: "Conversation state", kind: "data" },
            { id: "socket", label: "STOMP socket", detail: "Unread / typing / seen", kind: "runtime" },
            { id: "receiver", label: "Receiver", detail: "Decrypts locally", kind: "output" },
          ],
          steps: [
            { from: "sender", to: "firebase", label: "Encrypted write", type: "request" },
            { from: "firebase", to: "backend", label: "Message ref", type: "event" },
            { from: "backend", to: "database", label: "Update state", type: "request" },
            { from: "database", to: "socket", label: "Realtime status", type: "event" },
            { from: "socket", to: "receiver", label: "Notify + read", type: "response" },
          ],
        },
      ],
    },
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
    architecture: {
      evidence: "unavailable",
      title: "Private system architecture",
      summary:
        "Technical implementation details for this production system are not publicly disclosed.",
      sourceLabel: "Private implementation",
      unavailableReason:
        "The production architecture and implementation repository for this project are private.",
      scenarios: [],
    },
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
    architecture: {
      evidence: "repo-confirmed",
      title: "AI learning interaction",
      summary:
        "The browser client sends a learning prompt directly to Gemini, parses the response, and falls back to local content when generation fails.",
      sourceLabel: "Verified from WonderKids source",
      sourceUrl: "https://github.com/khanhnkq/WonderKids",
      scenarios: [
        {
          id: "learning-prompt",
          label: "Learning prompt",
          description:
            "Gemini 1.5 Flash returns text or raw JSON that is shaped into an interactive lesson in the UI.",
          nodes: [
            { id: "learner", label: "Learner", detail: "Starts an activity", kind: "client" },
            { id: "react", label: "React UI", detail: "Builds the prompt", kind: "client" },
            { id: "sdk", label: "Gemini SDK", detail: "Client-side request", kind: "service" },
            { id: "gemini", label: "Gemini 1.5", detail: "Generates content", kind: "external" },
            { id: "parser", label: "Response parser", detail: "Text / raw JSON", kind: "runtime" },
            { id: "lesson", label: "Lesson UI", detail: "Result or local fallback", kind: "output" },
          ],
          steps: [
            { from: "learner", to: "react", label: "Interaction", type: "local" },
            { from: "react", to: "sdk", label: "Prompt", type: "request" },
            { from: "sdk", to: "gemini", label: "Generate", type: "request" },
            { from: "gemini", to: "parser", label: "Text / JSON", type: "response" },
            { from: "parser", to: "lesson", label: "Render", type: "local" },
          ],
        },
      ],
    },
  },
  {
    id: 6,
    title: "HyperMatch",
    category: "HYPERWORK",
    description:
      "A hyperwork experience that connects guided product discovery with a focused workspace for comparing and organizing decisions.",
    tags: ["React 19", "TypeScript", "Vite 6", "Tailwind CSS 4", "GSAP", "Motion"],
    demo: "https://github.com/khanhnkq/HyperMatch",
    color: "bg-brand-yellow",
    // Temporary artwork until dedicated HyperMatch book images are added.
    image: "/front_paper.svg",
    page_cover: "/front_paper.svg",
    back_page_cover: "/back_paper.svg",
    architecture: {
      evidence: "conceptual-target",
      title: "Product matching architecture",
      summary:
        "A production-ready target architecture that evolves the current frontend demo into an AI-assisted product recommendation service.",
      sourceLabel: "Concept architecture",
      sourceUrl: "https://github.com/khanhnkq/HyperMatch",
      scenarios: [
        {
          id: "match-setup",
          label: "Match a setup",
          description:
            "Answers and an optional photo become structured signals, then AI and budget rules rank products from a commerce catalog.",
          nodes: [
            { id: "onboarding", label: "React onboarding", detail: "Needs, budget, photo", kind: "client" },
            { id: "api", label: "Match API", detail: "Validates request", kind: "service" },
            { id: "signals", label: "Signal pipeline", detail: "Profile + image features", kind: "runtime" },
            { id: "engine", label: "Match engine", detail: "AI + budget rules", kind: "service" },
            { id: "catalog", label: "Commerce catalog", detail: "Shopify / HyperWork", kind: "external" },
            { id: "results", label: "Ranked setup", detail: "Products + purchase links", kind: "output" },
          ],
          steps: [
            { from: "onboarding", to: "api", label: "Profile", type: "request" },
            { from: "api", to: "signals", label: "Normalize", type: "local" },
            { from: "signals", to: "engine", label: "Feature set", type: "request" },
            { from: "engine", to: "catalog", label: "Query products", type: "request" },
            { from: "catalog", to: "results", label: "Ranked matches", type: "response" },
          ],
        },
      ],
    },
  },
  {
    id: 7,
    title: "Flotie",
    category: "E-COMMERCE",
    description:
      "A fashion e-commerce experience designed to turn visual storytelling into product discovery and purchase intent.",
    tags: ["React 19", "TypeScript", "Vite 7", "Tailwind CSS 4", "Radix UI"],
    demo: "https://github.com/khanhnkq/Flotie-landing",
    color: "bg-brand-white",
    // Temporary artwork until dedicated Flotie book images are added.
    image: "/front_paper.svg",
    page_cover: "/front_paper.svg",
    back_page_cover: "/back_paper.svg",
    architecture: {
      evidence: "conceptual-target",
      title: "Commerce request architecture",
      summary:
        "A target backend architecture for taking the existing editorial storefront from discovery through payment and inventory confirmation.",
      sourceLabel: "Concept architecture",
      sourceUrl: "https://github.com/khanhnkq/Flotie-landing",
      scenarios: [
        {
          id: "commerce-checkout",
          label: "Checkout",
          description:
            "The storefront reads catalog data, maintains a cart session, then coordinates order, payment, and inventory services.",
          nodes: [
            { id: "storefront", label: "React storefront", detail: "Browse + cart", kind: "client" },
            { id: "commerce", label: "Commerce API", detail: "Catalog + checkout", kind: "service" },
            { id: "cart", label: "Cart session", detail: "Items + totals", kind: "data" },
            { id: "order", label: "Order service", detail: "Creates order", kind: "service" },
            { id: "payment", label: "Payment gateway", detail: "Authorizes charge", kind: "external" },
            { id: "inventory", label: "Inventory", detail: "Reserve + confirm", kind: "data" },
            { id: "confirmation", label: "Confirmation", detail: "Receipt + status", kind: "output" },
          ],
          steps: [
            { from: "storefront", to: "commerce", label: "Checkout", type: "request" },
            { from: "commerce", to: "cart", label: "Validate cart", type: "request" },
            { from: "cart", to: "order", label: "Create order", type: "local" },
            { from: "order", to: "payment", label: "Authorize", type: "request" },
            { from: "payment", to: "inventory", label: "Paid + reserve", type: "response" },
            { from: "inventory", to: "confirmation", label: "Confirmed", type: "event" },
          ],
        },
      ],
    },
  },
  {
    id: 8,
    title: "DocCleaner",
    category: "CHROME EXTENSION",
    description: "A Chrome extension that creates a distraction-free document reading experience and exports clean, high-quality A4 PDFs in one click.",
    tags: ["JavaScript", "Chrome Extension", "Manifest V3", "DOM Manipulation", "CSS Injection"],
    demo: "https://github.com/khanhnkq/DocCleaner.git",
    color: "bg-brand-yellow",
    image: "/doccleaner-preview-unified.png",
    page_cover: "/doccleaner-preview.png",
    back_page_cover: "/back_page_cover_6.png",
    architecture: {
      evidence: "repo-confirmed",
      title: "Document cleanup pipeline",
      summary:
        "A Manifest V3 service worker coordinates page cleanup, print preparation, and the browser's native PDF save flow.",
      sourceLabel: "Verified from DocCleaner source",
      sourceUrl: "https://github.com/khanhnkq/DocCleaner",
      scenarios: [
        {
          id: "clean-export",
          label: "Clean + export",
          description:
            "Navigation matching activates the extension, content cleanup prepares the DOM, then the browser prints a clean A4 document.",
          nodes: [
            { id: "page", label: "Document page", detail: "Matching navigation", kind: "client" },
            { id: "worker", label: "Service worker", detail: "Tab + navigation events", kind: "runtime" },
            { id: "content", label: "Content script", detail: "Runs cleanup commands", kind: "service" },
            { id: "dom", label: "Clean DOM", detail: "Remove noise + preload", kind: "data" },
            { id: "print", label: "Print CSS", detail: "A4 layout rules", kind: "runtime" },
            { id: "pdf", label: "Browser PDF", detail: "window.print()", kind: "output" },
          ],
          steps: [
            { from: "page", to: "worker", label: "Navigation", type: "event" },
            { from: "worker", to: "content", label: "Cleanup message", type: "request" },
            { from: "content", to: "dom", label: "Transform", type: "local" },
            { from: "dom", to: "print", label: "Prepare", type: "local" },
            { from: "print", to: "pdf", label: "Save as PDF", type: "response" },
          ],
        },
      ],
    },
  },
  {
    id: 9,
    title: "Pinoria",
    category: "CHROME EXTENSION",
    description: "A private, local-first Pinterest downloader for saving original-quality images, GIFs, and videos with audio, including one-click and bulk board downloads.",
    tags: ["TypeScript", "Chrome Extension", "Manifest V3", "Vite", "Vitest", "MediaBunny"],
    demo: "https://github.com/khanhnkq/Pinoria.git",
    color: "bg-brand-blue",
    // Temporary artwork until the dedicated Pinoria book images are added.
    image: "/front_paper.svg",
    page_cover: "/front_paper.svg",
    back_page_cover: "/back_paper.svg",
    video:
      "https://res.cloudinary.com/m4zjcx02/video/upload/v1787026967/Untitled_Project.mp4",
    videoPoster:
      "https://res.cloudinary.com/m4zjcx02/video/upload/so_3/v1787026967/Untitled_Project.jpg",
    architecture: {
      evidence: "repo-confirmed",
      title: "Media download pipeline",
      summary:
        "The extension resolves Pinterest media in a service worker, downloads direct assets immediately, and sends HLS jobs through an offscreen muxing pipeline.",
      sourceLabel: "Verified from Pinoria source",
      sourceUrl: "https://github.com/khanhnkq/Pinoria",
      scenarios: [
        {
          id: "hls-download",
          label: "HLS download",
          description:
            "A split HLS stream is muxed locally in an offscreen document before Chrome saves the final file.",
          nodes: [
            { id: "pinterest", label: "Pinterest page", detail: "Pin / board scan", kind: "client" },
            { id: "content", label: "Content script", detail: "Sends media request", kind: "service" },
            { id: "worker", label: "Service worker", detail: "Validates + resolves", kind: "runtime" },
            { id: "offscreen", label: "Offscreen document", detail: "Local media job", kind: "runtime" },
            { id: "mux", label: "MediaBunny", detail: "Mux queue + object URL", kind: "service" },
            { id: "downloads", label: "Chrome downloads", detail: "Saves local file", kind: "output" },
          ],
          steps: [
            { from: "pinterest", to: "content", label: "Scan", type: "local" },
            { from: "content", to: "worker", label: "Runtime message", type: "request" },
            { from: "worker", to: "offscreen", label: "HLS job", type: "event" },
            { from: "offscreen", to: "mux", label: "Audio + video", type: "request" },
            { from: "mux", to: "downloads", label: "Object URL", type: "response" },
          ],
        },
        {
          id: "direct-download",
          label: "Direct asset",
          description:
            "Images and already-combined media skip muxing and go directly through the Chrome Downloads API.",
          nodes: [
            { id: "page", label: "Pinterest page", detail: "Original asset", kind: "client" },
            { id: "content", label: "Content script", detail: "Extracts candidate", kind: "service" },
            { id: "worker", label: "Service worker", detail: "Validates sender + URL", kind: "runtime" },
            { id: "resolve", label: "Media resolver", detail: "Selects best quality", kind: "service" },
            { id: "downloads", label: "Chrome downloads", detail: "Direct save", kind: "output" },
          ],
          steps: [
            { from: "page", to: "content", label: "Scan", type: "local" },
            { from: "content", to: "worker", label: "Resolve", type: "request" },
            { from: "worker", to: "resolve", label: "Validate", type: "local" },
            { from: "resolve", to: "downloads", label: "Download URL", type: "response" },
          ],
        },
      ],
    },
  },
];
