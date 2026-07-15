'use client';

import { useState } from "react";
import { portfolioGallery } from "@/data/services";

const categories = ["All", "Wedding", "Corporate", "Birthday", "Cultural", "Exhibition", "Destination"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGallery = portfolioGallery.filter(item => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="min-h-screen pt-24 pb-16 px-6" style={{ background: "#080808" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
            Our Portfolio
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#FFFFFF" }}>
            Events We&apos;ve Created
          </h1>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 text-sm rounded-full transition-all duration-300 ease-in-out"
              style={{
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.05em",
                background: activeCategory === cat ? "#C9A84C" : "transparent",
                color: activeCategory === cat ? "#080808" : "rgba(255,255,255,0.6)",
                border: activeCategory === cat ? "1px solid #C9A84C" : "1px solid rgba(255,255,255,0.15)",
                boxShadow: activeCategory === cat ? "0 4px 15px rgba(201,168,76,0.3)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl group break-inside-avoid"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center pointer-events-none"
                style={{ background: "rgba(8,8,8,0.4)" }}
              >
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center">
                  <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.5rem", color: "#FFFFFF", fontStyle: "italic" }}>
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
