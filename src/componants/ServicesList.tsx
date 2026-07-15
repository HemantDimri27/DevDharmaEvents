import Link from "next/link";
import Image from "next/image";
import { eventServices } from "@/data/services";

export default function OurServicesList() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
            What We Offer
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#FFFFFF" }}>
            All Services
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventServices.map((service) => (
            <div key={service.id} className="rounded-xl overflow-hidden group" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.12)" }}>
              <Link href={`/services/${service.slug}`} className="relative block w-full overflow-hidden" style={{ height: "200px" }}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Link>
              <div className="p-5">
                <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", color: "#FFFFFF", marginBottom: "8px" }}>
                  <Link href={`/services/${service.slug}`} className="hover:text-[#C9A84C] transition-colors duration-200">
                    {service.title}
                  </Link>
                </h2>
                <p className="mb-5 line-clamp-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                  {service.description}
                </p>
                <Link href={`/services/${service.slug}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#C9A84C", borderBottom: "1px solid rgba(201,168,76,0.3)" }}>
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
