"use client";

import dynamic from "next/dynamic";

const BookSection = dynamic(() => import("@/components/sections/BookSection"), {
  ssr: false,
});

export default function BookSectionDynamic() {
  return <BookSection />;
}
