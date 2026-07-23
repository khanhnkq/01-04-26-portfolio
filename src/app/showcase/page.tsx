import type { Metadata } from "next";
import ShowcaseArchive from "@/components/showcase/ShowcaseArchive";

export const metadata: Metadata = {
  title: "Frontend Design Archive | Khanh Nguyen Kim",
  description:
    "A visual archive of frontend interfaces, product experiments, and cross-platform builds by Khanh Nguyen Kim.",
};

export default function ShowcasePage() {
  return <ShowcaseArchive />;
}
