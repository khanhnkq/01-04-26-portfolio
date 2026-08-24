import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const montserratAlt = Montserrat_Alternates({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"], // Hỗ trợ tiếng Việt
  weight: ["400", "600", "700"], // Regular, Semibold, Bold
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khanhnkq.quizken.com"),
  title: {
    default: "Khanh Nguyen Kim | Fullstack Developer",
    template: "%s | Khanh Nguyen Kim",
  },
  description:
    "I'm a fullstack developer focused on designing scalable architectures and seamless user experiences with Java, Spring Boot, React, and Next.js.",
  keywords: [
    "Khanh Nguyen Kim",
    "khanhnkq",
    "Nguyen Kim Quoc Khanh",
    "Fullstack Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Tailwind CSS",
    "Portfolio",
    "Web Development Vietnam",
  ],
  authors: [{ name: "Khanh Nguyen Kim", url: "https://khanhnkq.quizken.com" }],
  creator: "Khanh Nguyen Kim",
  publisher: "Khanh Nguyen Kim",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Khanh Nguyen Kim | Fullstack Developer",
    description:
      "I'm a fullstack developer focused on designing scalable architectures and seamless user experiences with Java, Spring Boot, React, and Next.js.",
    type: "website",
    url: "https://khanhnkq.quizken.com/",
    siteName: "Khanh Nguyen Kim Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://khanhnkq.quizken.com/avatar.svg",
        width: 1200,
        height: 630,
        alt: "Khanh Nguyen Kim - Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khanh Nguyen Kim | Fullstack Developer",
    description:
      "I'm a fullstack developer focused on designing scalable architectures and seamless user experiences with Java, Spring Boot, React, and Next.js.",
    creator: "@khanhnkq",
    images: ["https://khanhnkq.quizken.com/avatar.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://khanhnkq.quizken.com/#person",
      name: "Khanh Nguyen Kim",
      alternateName: ["khanhnkq", "Nguyen Kim Quoc Khanh"],
      url: "https://khanhnkq.quizken.com",
      image: "https://khanhnkq.quizken.com/avatar.svg",
      jobTitle: "Fullstack Developer",
      description:
        "Fullstack developer focused on designing scalable architectures and seamless user experiences with Java, Spring Boot, React, and Next.js.",
      sameAs: [
        "https://github.com/khanhnkq",
        "https://www.facebook.com/khanhnkq",
        "https://www.youtube.com/@khanhnkq",
      ],
      knowsAbout: [
        "Java",
        "Spring Boot",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Three.js",
        "PostgreSQL",
        "Tailwind CSS",
        "Fullstack Web Development",
        "Software Engineering",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://khanhnkq.quizken.com/#website",
      url: "https://khanhnkq.quizken.com",
      name: "Khanh Nguyen Kim | Fullstack Developer Portfolio",
      description:
        "Portfolio of Khanh Nguyen Kim showcasing fullstack development projects, interactive 3D experiences, and software engineering work.",
      publisher: {
        "@id": "https://khanhnkq.quizken.com/#person",
      },
      inLanguage: ["en", "vi"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserratAlt.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden font-sans">
        {children}
        <Analytics />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WB6LEF0B9W"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WB6LEF0B9W');
          `}
        </Script>
      </body>
    </html>
  );
}
