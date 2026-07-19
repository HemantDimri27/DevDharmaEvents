'use client';

import { InfiniteMovingCards } from "@/componants/ui/infinite-moving-cards";

const testimonials = [
  {
    quote: "DevDharma Events made our wedding an absolute dream. Every detail — from the mandap décor to the farewell — was handled with such care and creativity. We didn't have to worry about a single thing!",
    name: "Priya & Rahul Sharma",
    title: "Wedding Event Client",
  },
  {
    quote: "We hired DevDharma Events for our annual corporate conference and they delivered beyond expectations. The AV setup, seating arrangements, and speaker coordination were all impeccable. Truly professional.",
    name: "Amit Gupta, CEO",
    title: "Corporate Event Client",
  },
  {
    quote: "My daughter's first birthday party was magical! The theme was so beautifully executed — the décor, the cake, the games — everything was perfect. Our guests couldn't stop complimenting the setup.",
    name: "Anjali Mehta",
    title: "Birthday Party Client",
  },
  {
    quote: "DevDharma Events managed our company's product launch flawlessly. From the venue branding to the live demonstration setup, everything was aligned perfectly with our brand identity. Outstanding work!",
    name: "Vikram Malhotra",
    title: "Corporate Event Client",
  },
  {
    quote: "Our destination wedding in the hills was a fairy tale come true. DevDharma handled travel logistics, local vendors, and on-site coordination so beautifully — we felt like guests at our own wedding!",
    name: "Neha & Arjun Kapoor",
    title: "Destination Wedding Client",
  },
  {
    quote: "The cultural evening event they organised for our community festival was spectacular. The stage production, artist coordination, and crowd management were all top-notch. Would hire again without hesitation.",
    name: "Meera Desai",
    title: "Cultural Event Client",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-24"
      style={{ background: "#080808" }}
    >
      <div className="text-center mb-12">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ fontFamily: "Inter, sans-serif", color: "#C9A84C" }}
        >
          Client Stories
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#FFFFFF",
          }}
        >
          Creating Moments, Building Memories
        </h2>
      </div>

      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </section>
  );
}
