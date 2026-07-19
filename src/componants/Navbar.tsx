'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";

const services = [
  { label: "Wedding Events", href: "/services/wedding-events" },
  { label: "Corporate Events", href: "/services/corporate-events" },
  { label: "Birthday & Private Parties", href: "/services/birthday-parties" },
  { label: "Social & Cultural Events", href: "/services/cultural-events" },
  { label: "Exhibition & Expo Management", href: "/services/exhibition-expo" },
  { label: "Destination Events", href: "/services/destination-events" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const controls = useAnimation();
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (currentY < 80) {
        controls.start({ y: 0, opacity: 1 });
      } else if (delta > 6) {
        controls.start({ y: -100, opacity: 0 });
        setServicesOpen(false);
      } else if (delta < -6) {
        controls.start({ y: 0, opacity: 1 });
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const navLinkStyle = (href: string) => ({
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
    color: pathname === href ? "#C9A84C" : "rgba(255,255,255,0.75)",
    letterSpacing: "0.05em",
    transition: "color 0.2s",
    cursor: "pointer",
  });

  return (
    <motion.header
      animate={controls}
      initial={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(8,8,8,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "18px",
            fontStyle: "italic",
            color: "#C9A84C",
          }}
        >
          DevDharma Events
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" style={navLinkStyle("/")}>Home</Link>

          {/* Services Dropdown */}
          <div
            className="relative flex items-center h-full"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="flex items-center gap-1"
              style={navLinkStyle("/services")}
            >
              Services <ChevronDown size={12} />
            </Link>
            {servicesOpen && (
              <div className="absolute top-full left-0 w-60 pt-2">
                <div
                  className="w-full py-2 rounded"
                  style={{ background: "#111111", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  {services.map(({ label, href }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 hover:bg-white/5 ${isActive ? 'bg-white/5' : ''}`}
                        style={{ 
                          fontFamily: "Inter, sans-serif", 
                          color: isActive ? "#C9A84C" : "rgba(255,255,255,0.7)",
                          fontWeight: isActive ? 500 : 400
                        }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm mt-1 transition-colors duration-200 hover:bg-white/5"
                    style={{ fontFamily: "Inter, sans-serif", color: "#C9A84C", borderTop: "1px solid rgba(201,168,76,0.15)" }}
                  >
                    All Services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/portfolio" style={navLinkStyle("/portfolio")}>Portfolio</Link>
          <Link href="/contact" style={navLinkStyle("/contact")}>Contact</Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" style={{ color: "#C9A84C" }} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(201,168,76,0.15)", background: "#080808" }}>
          {[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
}
