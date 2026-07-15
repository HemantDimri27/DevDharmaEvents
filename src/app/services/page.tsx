import OurServicesList from "@/componants/ServicesList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | DevKarma Events",
    description: "Explore our full range of professional event management services including wedding events, corporate events, birthday parties, cultural shows, exhibitions, and destination events.",
}

export default function ServicesPage() {
    return (
        <OurServicesList />
    )
}
