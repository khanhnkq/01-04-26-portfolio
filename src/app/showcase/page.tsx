import type { Metadata } from "next";
import ShowcaseArchive from "@/components/showcase/ShowcaseArchive";

export const metadata: Metadata = {
  title: "Project Archive | Khanh Nguyen Kim",
  description:
    "A complete archive of web, mobile, full-stack, and product work by Khanh Nguyen Kim.",
};

export default function ShowcasePage() {
  return <ShowcaseArchive />;
}
