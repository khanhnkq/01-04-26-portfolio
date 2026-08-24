import type { Metadata } from "next";
import ShowcaseArchive from "@/components/showcase/ShowcaseArchive";

export const metadata: Metadata = {
  title: "Project Archive",
  description:
    "A complete archive of web, mobile, full-stack, and product work by Khanh Nguyen Kim.",
  alternates: {
    canonical: "/showcase",
  },
  openGraph: {
    title: "Project Archive | Khanh Nguyen Kim",
    description:
      "A complete archive of web, mobile, full-stack, and product work by Khanh Nguyen Kim.",
    url: "https://khanhnkq.quizken.com/showcase",
    siteName: "Khanh Nguyen Kim Portfolio",
    type: "website",
    images: [
      {
        url: "https://khanhnkq.quizken.com/avatar.svg",
        width: 1200,
        height: 630,
        alt: "Project Archive - Khanh Nguyen Kim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Archive | Khanh Nguyen Kim",
    description:
      "A complete archive of web, mobile, full-stack, and product work by Khanh Nguyen Kim.",
    images: ["https://khanhnkq.quizken.com/avatar.svg"],
  },
};

export default function ShowcasePage() {
  return <ShowcaseArchive />;
}
