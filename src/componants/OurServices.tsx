import Link from "next/link";
import Image from "next/image";
import { eventServices } from "@/data/services";

export default function OurServices() {
  const featured = eventServices.filter((s) => s.isFeatured);
  return (
    <section className="py-24 px-6" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "Inter, sans-serif", color: "#C9A84C" }}
          >
            Our Services
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
            }}
          >
            Professional Event Management Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service) => (
            <div
              key={service.id}
              className="rounded-xl overflow-hidden group transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Link href={`/services/${service.slug}`} className="relative block w-full overflow-hidden" style={{ height: "200px" }}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.8) 100%)" }}
                />
              </Link>
              <div className="p-5">
                <h3
                  className="mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", color: "#FFFFFF" }}
                >
                  <Link href={`/services/${service.slug}`} className="hover:text-[#C9A84C] transition-colors duration-200">
                    {service.title}
                  </Link>
                </h3>
                <p
                  className="mb-5 line-clamp-2"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}
                >
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm transition-colors duration-200"
                  style={{ fontFamily: "Inter, sans-serif", color: "#C9A84C", borderBottom: "1px solid rgba(201,168,76,0.3)" }}
                >
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block px-8 py-3 rounded-full text-sm transition-colors duration-200"
            style={{
              fontFamily: "Inter, sans-serif",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#C9A84C",
            }}
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
