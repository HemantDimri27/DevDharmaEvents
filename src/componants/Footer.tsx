import Link from "next/link";
import { Instagram, Facebook, Youtube, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
      {/* Top glow line */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <p
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              fontSize: "22px",
              color: "#C9A84C",
            }}
          >
            DevKarma Events
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            Crafting extraordinary experiences, one event at a time. Dehradun, India.
          </p>
          <div className="flex gap-4 mt-2">
            {[
              { icon: Instagram, href: "https://www.instagram.com/devkarmaevents" },
              { icon: Facebook, href: "https://www.facebook.com/devkarmaevents" },
              { icon: Youtube, href: "https://www.youtube.com/@devkarmaevents" },
            ].map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: "rgba(255,255,255,0.35)" }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "16px" }}>
            Services
          </h3>
          <ul className="flex flex-col gap-2">
            {[
              { name: "Wedding Events", slug: "wedding-events" },
              { name: "Corporate Events", slug: "corporate-events" },
              { name: "Birthday & Private Parties", slug: "birthday-parties" },
              { name: "Social & Cultural Events", slug: "cultural-events" },
              { name: "Exhibition & Expo", slug: "exhibition-expo" },
            ].map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "16px" }}>
            Navigation
          </h3>
          <ul className="flex flex-col gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "16px" }}>
            Contact
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex gap-3">
              <Phone size={14} style={{ color: "rgba(255,255,255,0.3)", marginTop: "2px", flexShrink: 0 }} />
              <a href="tel:+916397988226" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>+91 63979 88226</a>
            </li>
            <li className="flex gap-3">
              <MapPin size={14} style={{ color: "rgba(255,255,255,0.3)", marginTop: "2px", flexShrink: 0 }} />
              <a href="https://maps.app.goo.gl/wfTTKNUoWdEosd4h6" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Mohkampur, Dehradun, Uttarakhand 248018</a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} DevKarma Events. All rights reserved.</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>Crafted with ♥ in Dehradun, India</p>
        </div>
      </div>
    </footer>
  );
}
