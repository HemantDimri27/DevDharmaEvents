'use client';

import { useState } from "react";
import { Phone, MapPin, Mail, CheckCircle } from "lucide-react";

const serviceOptions = [
  "Wedding Events", "Corporate Events", "Birthday & Private Parties",
  "Social & Cultural Events", "Exhibition & Expo Management", "Destination Events", "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", meetingDate: "", eventDate: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.name === "phone") {
      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
      setForm((prev) => ({ ...prev, [e.target.name]: onlyNums }));
      return;
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build the pre-filled WhatsApp message
    const lines = [
      `🎉 *New Inquiry – DevKarma Events*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📱 *Phone:* ${form.phone ? "+91 " + form.phone : "Not provided"}`,
      `🎯 *Service:* ${form.service}`,
      `📅 *Preferred Meeting Date:* ${form.meetingDate}`,
      `📅 *Event Date:* ${form.eventDate}`,
      ``,
      `💬 *Message:*`,
      form.message,
    ];

    const message = encodeURIComponent(lines.join("\n"));
    const whatsappNumber = "916397988226"; // Country code (91) + number, no spaces
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#FFFFFF",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    colorScheme: "dark",
  };

  const isFormValid = form.name.trim() !== "" && form.email.trim() !== "" && form.phone.trim() !== "" && form.service !== "" && form.meetingDate !== "" && form.eventDate !== "" && form.message.trim() !== "";
  const isSubmitDisabled = loading || !isFormValid;

  return (
    <section className="min-h-screen py-24 px-6" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
            Let&apos;s Plan Together
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#FFFFFF",
            }}
          >
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info Panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-xl p-6 flex flex-col gap-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)" }}>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", color: "#FFFFFF" }}>Get In Touch</h2>
              {[
                { icon: Mail, text: "devkarmaevents@gmail.com", href: "mailto:devkarmaevents@gmail.com" },
                { icon: Phone, text: "+91 63979 88226", href: "tel:+916397988226" },
                { icon: MapPin, text: "Mohkampur, Dehradun, Uttarakhand 248018", href: "https://maps.app.goo.gl/wfTTKNUoWdEosd4h6" },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={15} style={{ color: "#C9A84C", marginTop: "2px", flexShrink: 0 }} />
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{text}</a>
                  ) : (
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)" }}>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", color: "#FFFFFF", marginBottom: "16px" }}>Working Hours</h2>
              {[
                { day: "Mon – Fri", hours: "9:00 AM – 7:00 PM" },
                { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
                { day: "Sunday", hours: "By Appointment" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between mb-2">
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{day}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{hours}</span>
                </div>
              ))}
            </div>

            <a 
              href="https://maps.app.goo.gl/wfTTKNUoWdEosd4h6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block rounded-xl overflow-hidden group cursor-pointer" 
              style={{ border: "1px solid rgba(201,168,76,0.15)", height: "200px", position: "relative", display: "block" }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-white/5 z-10 transition-colors duration-300" />
              <iframe
                src="https://maps.google.com/maps?q=Mohkampur,+Dehradun,+Uttarakhand&t=&z=13&ie=UTF8&iwloc=&output=embed"
                style={{
                  border: 0,
                  position: "absolute",
                  top: "-150px",
                  left: "-15px",
                  width: "calc(100% + 30px)",
                  height: "calc(100% + 250px)",
                  pointerEvents: "none"
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 rounded-xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
                <CheckCircle size={48} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
                <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "28px", color: "#FFFFFF" }}>Message Sent</h2>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 px-5 py-2 text-sm rounded-lg hover:bg-[#C9A84C] hover:text-[#080808] transition-colors" style={{ border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", color: "#FFFFFF", marginBottom: "4px" }}>Send Us a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-1.5 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>Full Name *</label>
                    <input name="name" required maxLength={27} value={form.name} onChange={handleChange} placeholder="FirstName LastName" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>Email *</label>
                    <input name="email" type="email" required maxLength={30} value={form.email} onChange={handleChange} placeholder="your@mail.com" style={inputStyle} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-1.5 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>Phone *</label>
                    <div className="flex items-center gap-2" style={{ ...inputStyle, padding: "0 14px" }}>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>+91</span>
                      <input name="phone" type="tel" required maxLength={10} value={form.phone} onChange={handleChange} style={{ background: "transparent", border: "none", outline: "none", color: "#FFF", width: "100%", padding: "10px 0", fontSize: "14px", fontFamily: "Inter, sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>Service *</label>
                    <select name="service" required value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="" disabled style={{ background: "#111" }}>Select a service</option>
                      {serviceOptions.map((s) => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-1.5 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>Preferred Meeting Date *</label>
                    <input name="meetingDate" type="date" required value={form.meetingDate} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>Event Date *</label>
                    <input name="eventDate" type="date" required value={form.eventDate} onChange={handleChange} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5 text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>Message *</label>
                  <textarea name="message" required maxLength={500} rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about your event vision…" style={{ ...inputStyle, resize: "none" }} />
                </div>
                <button type="submit" disabled={isSubmitDisabled} className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300" style={{ background: isSubmitDisabled ? "rgba(255,255,255,0.05)" : "#25D366", color: isSubmitDisabled ? "rgba(255,255,255,0.4)" : "#FFFFFF", border: isSubmitDisabled ? "1px solid rgba(255,255,255,0.1)" : "1px solid #25D366", fontFamily: "Inter, sans-serif", cursor: isSubmitDisabled ? "not-allowed" : "pointer" }}>
                  {loading ? (
                    <><span className="h-4 w-4 rounded-full border-2 border-[#080808] border-t-transparent animate-spin" /> Preparing…</>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                      Send Inquiry via WhatsApp
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
