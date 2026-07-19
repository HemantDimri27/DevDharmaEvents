import type { Metadata } from "next";
import Portfolio from "@/componants/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio | DevDharma Events",
  description: "Browse our portfolio of successfully managed events — weddings, corporate events, birthday parties, cultural shows, exhibitions, and destination events across India.",
};

export default function PortfolioPage() {
  return <Portfolio />;
}
