import Link from "next/link";
import Image from "next/image";
import { Spotlight } from "@/componants/ui/Spotlight";
import { Button } from "@/componants/ui/moving-border";

export default function HeroSection() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#080808" }}
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#C9A84C" />

      <div className="relative z-10 text-center px-6 pt-20">
        {/* Logo */}
        <div className="flex justify-center relative">
          <Image
            src="/logo/devdharma-logo-transparent.png"
            alt="DevDharma Events Logo"
            width={280}
            height={90}
            className="object-contain opacity-100 relative z-10"
            priority
          />
        </div>

        {/* Heading */}
        <h1
          className="mb-3 font-normal"
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            color: "#C9A84C",
            lineHeight: 1,
          }}
        >
          Dev Dharma
        </h1>

        {/* Divider + subtitle */}
        <div className="flex items-center justify-center gap-3 mb-6 mt-1">
          <hr style={{ border: "none", borderTop: "1px solid rgba(201,168,76,0.5)", width: "70px" }} />
          <span
            className="text-xs tracking-[0.45em] uppercase"
            style={{ fontFamily: "Inter, sans-serif", color: "rgba(201,168,76,0.85)", letterSpacing: "0.35em" }}
          >
            Event Management Company
          </span>
          <hr style={{ border: "none", borderTop: "1px solid rgba(201,168,76,0.5)", width: "70px" }} />
        </div>

        <p
          className="mb-8 max-w-md mx-auto"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}
        >
          Crafting extraordinary experiences, one event at a time. From grand weddings to corporate galas, we turn your vision into unforgettable celebrations.
        </p>

        <Link href="/services">
          <Button
            borderRadius="1.75rem"
            className="bg-black text-white border-slate-800 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
          >
            Explore Services
          </Button>
        </Link>

        {/* Stat cards */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
            { label: "Events Executed", value: "200+" },
            { label: "Years of Experience", value: "5+" },
            { label: "Happy Clients", value: "500+" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="px-6 py-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
                backdropFilter: "blur(10px)",
                minWidth: "140px",
              }}
            >
              <p
                style={{ fontFamily: "var(--font-playfair), serif", fontSize: "28px", color: "#C9A84C" }}
              >
                {value}
              </p>
              <p
                style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
