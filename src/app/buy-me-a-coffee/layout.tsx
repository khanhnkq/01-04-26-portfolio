import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Me a Coffee",
  description:
    "Support Khanh Nguyen Kim's creative work, open-source projects, and fullstack engineering journey.",
  alternates: {
    canonical: "/buy-me-a-coffee",
  },
  openGraph: {
    title: "Buy Me a Coffee | Khanh Nguyen Kim",
    description:
      "Support Khanh Nguyen Kim's creative work, open-source projects, and fullstack engineering journey.",
    url: "https://khanhnkq.quizken.com/buy-me-a-coffee",
    siteName: "Khanh Nguyen Kim Portfolio",
    type: "website",
    images: [
      {
        url: "https://khanhnkq.quizken.com/avatar.svg",
        width: 1200,
        height: 630,
        alt: "Support Khanh Nguyen Kim - Buy Me a Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Me a Coffee | Khanh Nguyen Kim",
    description:
      "Support Khanh Nguyen Kim's creative work, open-source projects, and fullstack engineering journey.",
    images: ["https://khanhnkq.quizken.com/avatar.svg"],
  },
};

export default function BuyMeACoffeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
