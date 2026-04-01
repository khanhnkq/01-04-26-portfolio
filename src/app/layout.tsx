import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserratAlt = Montserrat_Alternates({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"], // Hỗ trợ tiếng Việt
  weight: ["400", "600", "700"], // Regular, Semibold, Bold
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khanh Nguyen Kim | Fullstack Developer",
  description:
    "I'm a fullstack developer focused on designing scalable architectures and seamless user experiences with Java, Spring Boot, and React.",
  keywords: [
    "Khanh Nguyen Kim",
    "khanhnkq",
    "Fullstack Developer",
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "Portfolio",
    "Software Engineer",
    "Web Development",
  ],
  authors: [{ name: "Khanh Nguyen Kim" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Khanh Nguyen Kim | Fullstack Developer",
    description:
      "I'm a fullstack developer focused on designing scalable architectures and seamless user experiences with Java, Spring Boot, and React.",
    type: "website",
    url: "https://khanhnkq.vercel.app/",
    images: [
      {
        url: "https://khanhnkq.vercel.app/avatar.jpg",
        alt: "Khanh Nguyen Kim - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khanh Nguyen Kim | Fullstack Developer",
    description:
      "I'm a fullstack developer focused on designing scalable architectures and seamless user experiences with Java, Spring Boot, and React.",
    images: ["https://khanhnkq.vercel.app/avatar.jpg"],
  },
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
      <body className="min-h-full flex flex-col overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
