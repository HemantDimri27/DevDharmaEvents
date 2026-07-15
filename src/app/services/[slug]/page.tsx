import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { eventServices, portfolioGallery } from "@/data/services"

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return eventServices.map((service) => ({
        slug: service.slug,
    }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const service = eventServices.find((s) => s.slug === slug)
    if (!service) return { title: "Service Not Found" }
    return {
        title: `${service.title} | DevKarma Events`,
        description: service.description,
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const service = eventServices.find((s) => s.slug === slug)

    if (!service) {
        notFound()
    }

    // Map slug to gallery category
    const categoryMap: Record<string, string> = {
        "wedding-events": "Wedding",
        "corporate-events": "Corporate",
        "birthday-parties": "Birthday",
        "cultural-events": "Cultural",
        "exhibition-expo": "Exhibition",
        "destination-events": "Destination",
    };
    
    const serviceCategory = categoryMap[slug];
    const galleryImages = portfolioGallery.filter(img => img.category === serviceCategory);

    // Other services to show at bottom
    const otherServices = eventServices.filter((s) => s.slug !== slug).slice(0, 3)

    return (
        <main className="min-h-screen bg-[#080808] text-white selection:bg-[#C9A84C] selection:text-[#080808]">
            {/* Hero Image Section */}
            <div className="relative h-[70vh] sm:h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#080808]"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 mt-12">
                    <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
                        Premium Services
                    </p>
                    <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#FFFFFF", fontStyle: "italic", lineHeight: 1.1 }}>
                        {service.title}
                    </h1>
                </div>

                <div className="absolute top-8 left-6 sm:top-12 sm:left-12 z-20">
                    <Link
                        href="/services"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs tracking-wider uppercase transition-all duration-300"
                        style={{ fontFamily: "Inter, sans-serif", borderColor: "rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
                    >
                        ← Back
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 sm:py-32">
                {/* The Story / Description */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-32">
                    <div className="lg:col-span-5">
                        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.5rem", color: "#C9A84C", fontStyle: "italic" }}>
                            Crafting the<br/>Experience
                        </h2>
                        <div className="w-16 h-[1px] bg-[#C9A84C] mt-6 opacity-50"></div>
                    </div>
                    <div className="lg:col-span-7">
                        <p className="text-lg sm:text-xl leading-relaxed text-gray-300 font-light" style={{ fontFamily: "Inter, sans-serif" }}>
                            {service.longDescription || service.description}
                        </p>
                    </div>
                </div>

                {/* Features & Process Grid */}
                {(service.features || service.process) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                        
                        {/* Features */}
                        {service.features && (
                            <div>
                                <h3 className="text-sm tracking-[0.2em] uppercase text-[#C9A84C] mb-10" style={{ fontFamily: "Inter, sans-serif" }}>What&apos;s Included</h3>
                                <ul className="space-y-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0"></div>
                                            <span className="text-gray-300 text-lg font-light tracking-wide">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Process */}
                        {service.process && (
                            <div>
                                <h3 className="text-sm tracking-[0.2em] uppercase text-[#C9A84C] mb-10" style={{ fontFamily: "Inter, sans-serif" }}>Our Approach</h3>
                                <div className="space-y-10 border-l border-[rgba(255,255,255,0.1)] ml-2">
                                    {service.process.map((step, idx) => (
                                        <div key={idx} className="relative pl-8">
                                            {/* Dot */}
                                            <div className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-[#080808] border border-[#C9A84C]"></div>
                                            
                                            <p className="text-xs text-[#C9A84C] mb-1 tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>STEP {step.step}</p>
                                            <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.5rem" }}>{step.title}</h4>
                                            <p className="text-gray-400 font-light text-sm leading-relaxed">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Mini Gallery for this specific service */}
                {galleryImages.length > 0 && (
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.5rem", color: "#FFFFFF", fontStyle: "italic" }}>
                                Featured {serviceCategory} Work
                            </h2>
                            <p className="text-gray-400 mt-4 font-light">A glimpse into our event management excellence.</p>
                        </div>
                        
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {galleryImages.map((item) => (
                                <div key={item.id} className="relative overflow-hidden rounded-xl break-inside-avoid">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-full h-auto object-cover hover:opacity-90 transition-opacity duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-12 text-center">
                            <Link
                                href="/portfolio"
                                className="inline-block border-b border-[#C9A84C] text-[#C9A84C] pb-1 tracking-wider text-sm uppercase hover:text-white hover:border-white transition-colors duration-300"
                            >
                                View Full Portfolio
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Premium CTA */}
            <div className="relative py-32 px-6 overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0 opacity-20">
                    <Image src={service.image} alt="Background" fill className="object-cover blur-sm" />
                </div>
                <div className="absolute inset-0 bg-[#080808]/80"></div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#FFFFFF", fontStyle: "italic", marginBottom: "1rem" }}>
                        Ready to Plan Your Event?
                    </h2>
                    <p className="text-gray-300 text-lg font-light mb-10">
                        Let&apos;s discuss your vision and create something extraordinary together.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-10 py-4 bg-[#C9A84C] text-[#080808] text-sm tracking-[0.2em] uppercase rounded-full hover:bg-white transition-colors duration-300 font-medium"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>

            {/* Other Services */}
            <div className="bg-[#111111] py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#FFFFFF", fontStyle: "italic" }}>
                            Explore More
                        </h2>
                        <Link href="/services" className="text-[#C9A84C] text-sm tracking-wider uppercase hover:text-white transition-colors">
                            All Services →
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {otherServices.map((s) => (
                            <Link
                                key={s.id}
                                href={`/services/${s.slug}`}
                                className="group block"
                            >
                                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl mb-4">
                                    <Image
                                        src={s.image}
                                        alt={s.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                                </div>
                                <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.25rem", color: "#FFFFFF" }}>
                                    {s.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
