'use client';

import { motion } from "motion/react";
import { Users, Calendar, Star, MapPin } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Expert Event Planning Team",
    body: "Our seasoned team of event planners, designers, and coordinators brings decades of combined experience to every celebration — ensuring flawless execution from concept to completion.",
  },
  {
    icon: Calendar,
    title: "End-to-End Coordination",
    body: "From venue booking and vendor management to on-the-day coordination, we handle every detail so you can be fully present and enjoy your event without a single worry.",
  },
  {
    icon: Star,
    title: "Creative Theme Design",
    body: "We craft immersive, bespoke themes tailored to your vision — from grand traditional setups to sleek modern aesthetics — transforming any space into a breathtaking experience.",
  },
  {
    icon: MapPin,
    title: "Pan-India Event Reach",
    body: "Based in Dehradun with a network of trusted vendors and venues across India, we deliver exceptional events whether it's a local celebration or a destination event in any state.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6" style={{ background: "#0D0D0D" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "Inter, sans-serif", color: "#C9A84C" }}
          >
            Why DevDharma
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
            }}
          >
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(201,168,76,0.1)",
                borderLeft: "3px solid #C9A84C",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <r.icon size={20} style={{ color: "#C9A84C" }} />
                <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", color: "#FFFFFF" }}>
                  {r.title}
                </h3>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
