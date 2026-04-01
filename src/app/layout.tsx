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
  title: "Portfolio 2026",
  description: "Creative Developer Portfolio",
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
