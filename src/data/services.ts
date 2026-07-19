export interface Service {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
    isFeatured: boolean;
    longDescription?: string;
    features?: string[];
    process?: { step: string, title: string, description: string }[];
}

export const eventServices: Service[] = [
    {
        id: 1,
        title: "Wedding Events",
        description: "From intimate ceremonies to grand celebrations, we plan and execute every detail of your dream wedding — décor, logistics, vendors, and on-the-day coordination.",
        longDescription: "Your wedding is the most important celebration of your life, and we are here to make every moment perfect. From the initial concept and venue selection to vendor coordination, décor design, and seamless on-the-day execution, DevDharma Events handles it all. We blend traditional Indian wedding grandeur with contemporary elegance to deliver an unforgettable experience for you and your guests. Every detail — from mandap decoration to the farewell — is crafted with love and precision.",
        image: "/portfolio/gallery/wedding-01.jpg",
        slug: "wedding-events",
        isFeatured: true,
        features: [
            "Full Wedding Planning & Coordination",
            "Venue Scouting & Booking",
            "Décor Design & Execution",
            "Vendor Management (Catering, Florals, Music)",
            "Guest Management & Hospitality",
            "On-the-Day Coordination Team"
        ],
        process: [
            { step: "01", title: "Vision Consultation", description: "We understand your dream, budget, and style to craft a personalised wedding blueprint." },
            { step: "02", title: "Planning & Booking", description: "Venue, vendors, décor, and logistics are sourced, negotiated, and confirmed." },
            { step: "03", title: "Execution & Setup", description: "Our team arrives early, sets everything up, and manages every moving part flawlessly." },
            { step: "04", title: "On-the-Day Magic", description: "You enjoy your day while we ensure everything runs perfectly, start to finish." }
        ]
    },
    {
        id: 2,
        title: "Corporate Events",
        description: "Professional conferences, product launches, seminars, team offsites, and award nights — executed with precision to reflect your brand's identity and vision.",
        longDescription: "Corporate events are a direct reflection of your organisation's culture and brand. Whether it's an annual conference for 500 delegates, a product launch that creates buzz, an employee recognition ceremony, or a leadership summit — DevDharma Events brings the same level of professionalism and creativity that your business demands. We manage AV, staging, speaker logistics, branding, catering, and post-event reporting, so you can focus on delivering impact.",
        image: "/portfolio/gallery/corporate-01.jpg",
        slug: "corporate-events",
        isFeatured: true,
        features: [
            "Conference & Seminar Management",
            "Product Launch Events",
            "Award Ceremonies & Gala Dinners",
            "AV, Stage & Lighting Production",
            "Corporate Branding & Signage",
            "Post-Event Reporting & Analytics"
        ],
        process: [
            { step: "01", title: "Brief & Strategy", description: "We align on your event objectives, audience, and key deliverables to build a solid strategy." },
            { step: "02", title: "Production Planning", description: "Venue, AV, speakers, branding, and catering are coordinated to the finest detail." },
            { step: "03", title: "Rehearsal & Dry Run", description: "A full technical and programme rehearsal ensures zero surprises on the day." },
            { step: "04", title: "Live Event Delivery", description: "Our crew manages every element — from registration desks to closing remarks." }
        ]
    },
    {
        id: 3,
        title: "Birthday & Private Parties",
        description: "Bespoke birthday parties, milestone celebrations, and private gatherings crafted with creative themes, elegant décor, and unforgettable personalised touches.",
        longDescription: "Every birthday is a milestone worth celebrating in style. Whether you want an intimate gathering for close family, a lavish 50th birthday bash, a 1st birthday extravaganza, or a surprise party — DevDharma Events brings your vision to life. We handle theme conceptualisation, venue styling, entertainment, catering, custom cakes, and every little personal touch that makes the celebration uniquely yours.",
        image: "/portfolio/gallery/birthday-01.jpg",
        slug: "birthday-parties",
        isFeatured: true,
        features: [
            "Custom Theme Design & Concept",
            "Venue Styling & Décor",
            "Entertainment & DJ / Live Acts",
            "Catering & Custom Cake Coordination",
            "Personalised Gifts & Favours",
            "Photography & Videography Tie-ups"
        ],
        process: [
            { step: "01", title: "Theme Discovery", description: "We brainstorm themes, colour palettes, and concepts that match your personality and vision." },
            { step: "02", title: "Vendor Coordination", description: "Décor, catering, entertainment and special elements are booked and briefed." },
            { step: "03", title: "Setup & Decoration", description: "Our team transforms the venue into your dream party space." },
            { step: "04", title: "Party Management", description: "We handle the flow of the event so you can celebrate without a worry." }
        ]
    },
    {
        id: 4,
        title: "Social & Cultural Events",
        description: "Award nights, cultural shows, fashion showcases, charity galas, and community festivals — managed with creativity and cultural sensitivity for maximum impact.",
        longDescription: "Social and cultural events require a deep understanding of community, tradition, and spectacle. DevDharma Events has managed award nights, cultural festivals, charity galas, fashion shows, and large community gatherings that have left lasting impressions. We bring together creative production, cultural expertise, and flawless logistics to deliver events that resonate deeply with your audience and honour the occasion's significance.",
        image: "/portfolio/gallery/cultural-01.webp",
        slug: "cultural-events",
        isFeatured: true,
        features: [
            "Award Night & Gala Management",
            "Cultural & Festival Events",
            "Fashion Shows & Showcases",
            "Charity Events & Fundraisers",
            "Stage Production & Performance Coordination",
            "Guest & VIP Management"
        ],
        process: [
            { step: "01", title: "Concept & Theme", description: "We develop a compelling creative concept that celebrates your culture or cause." },
            { step: "02", title: "Production Design", description: "Stage, lighting, sound, and programme flow are designed for maximum impact." },
            { step: "03", title: "Performer & Speaker Coordination", description: "Artists, speakers, and special guests are briefed and rehearsed." },
            { step: "04", title: "Seamless Execution", description: "Our production team ensures a smooth, memorable, and crowd-pleasing event." }
        ]
    },
    {
        id: 5,
        title: "Exhibition & Expo Management",
        description: "Trade shows, brand activations, product exhibitions, and expos managed end-to-end — stall design, footfall strategy, live demonstrations, and vendor coordination.",
        longDescription: "Exhibitions and expos are high-stakes business events where your brand visibility and first impressions matter the most. DevDharma Events manages everything from stall conceptualisation and fabrication to footfall strategy, live product demonstrations, event staffing, and visitor engagement. We work with businesses across industries to ensure your exhibition presence is not just noticed — it's remembered.",
        image: "/portfolio/gallery/exhibition-01.webp",
        slug: "exhibition-expo",
        isFeatured: true,
        features: [
            "Stall Design & Fabrication",
            "Footfall & Visitor Engagement Strategy",
            "Live Product Demonstrations",
            "Event Staffing & Promoters",
            "Branding, Banners & Signage",
            "Lead Capture & Post-Event Follow-Up"
        ],
        process: [
            { step: "01", title: "Stall Strategy", description: "We design a stall layout and engagement strategy that maximises visitor interaction." },
            { step: "02", title: "Fabrication & Setup", description: "Stall build, branding, AV, and product displays are executed to perfection." },
            { step: "03", title: "On-Ground Management", description: "Our staff manage the stall, demonstrations, and visitor engagement throughout the expo." },
            { step: "04", title: "Wrap-Up & Reporting", description: "Leads, feedback, and post-event insights are compiled and delivered to you." }
        ]
    },
    {
        id: 6,
        title: "Destination Events",
        description: "Breathtaking outdoor weddings, corporate retreats, and destination celebrations — organised at scenic locations with end-to-end travel, logistics, and on-site management.",
        longDescription: "Destination events combine the thrill of travel with the magic of celebration. Whether it's a royal wedding in a Rajasthani fort, a corporate retreat in the Himalayas, or a beach event in Goa — DevDharma Events manages it all from concept to completion. We coordinate travel, accommodation, permits, local vendors, décor, and on-site execution so that you and your guests experience seamless luxury, no matter where in India the event takes place.",
        image: "/portfolio/gallery/destination-01.jpg",
        slug: "destination-events",
        isFeatured: true,
        features: [
            "Destination Scouting & Venue Selection",
            "Travel & Accommodation Coordination",
            "Permit & Local Vendor Management",
            "On-Site Event Execution Team",
            "Outdoor Décor & Theme Setup",
            "Guest Itinerary & Hospitality Management"
        ],
        process: [
            { step: "01", title: "Destination Discovery", description: "We scout and shortlist beautiful venues that match your vision and budget." },
            { step: "02", title: "Logistics Planning", description: "Travel, stays, permits, and local vendor bookings are handled seamlessly." },
            { step: "03", title: "On-Site Setup", description: "Our team travels with you to set up, manage, and ensure everything is perfect." },
            { step: "04", title: "The Experience", description: "You and your guests enjoy an extraordinary event at an extraordinary location." }
        ]
    }
]

export interface GalleryImage {
    id: number;
    src: string;
    category: "Wedding" | "Corporate" | "Birthday" | "Cultural" | "Exhibition" | "Destination";
    title: string;
}

export const portfolioGallery: GalleryImage[] = [
    { id: 1, src: "/portfolio/gallery/wedding-01.jpg", category: "Wedding", title: "Grand Wedding Celebration" },
    { id: 2, src: "/portfolio/gallery/wedding-02.jpg", category: "Wedding", title: "Elegant Wedding Setup" },
    { id: 3, src: "/portfolio/gallery/wedding-03.jpg", category: "Wedding", title: "Traditional Wedding Ceremony" },
    { id: 4, src: "/portfolio/gallery/wedding-04.jpg", category: "Wedding", title: "Joyful Wedding Moments" },
    { id: 5, src: "/portfolio/gallery/wedding-05.jpg", category: "Wedding", title: "Bridal Celebration" },
    { id: 6, src: "/portfolio/gallery/wedding-06.jpg", category: "Wedding", title: "Wedding Décor Showcase" },
    { id: 7, src: "/portfolio/gallery/corporate-01.jpg", category: "Corporate", title: "Corporate Conference" },
    { id: 8, src: "/portfolio/gallery/corporate-02.webp", category: "Corporate", title: "Product Launch Event" },
    { id: 9, src: "/portfolio/gallery/corporate-03.webp", category: "Corporate", title: "Award Night Gala" },
    { id: 10, src: "/portfolio/gallery/exhibition-01.webp", category: "Exhibition", title: "Brand Activation" },
    { id: 11, src: "/portfolio/gallery/exhibition-02.webp", category: "Exhibition", title: "Exhibition Stall" },
    { id: 12, src: "/portfolio/gallery/corporate-04.webp", category: "Corporate", title: "Corporate Networking Event" },
    { id: 13, src: "/portfolio/gallery/destination-01.jpg", category: "Destination", title: "Destination Wedding Setup" },
    { id: 14, src: "/portfolio/gallery/destination-02.jpg", category: "Destination", title: "Outdoor Celebration" },
    { id: 15, src: "/portfolio/gallery/destination-03.jpg", category: "Destination", title: "Scenic Venue Event" },
    { id: 16, src: "/portfolio/gallery/birthday-01.jpg", category: "Birthday", title: "Birthday Celebration Décor" },
    { id: 17, src: "/portfolio/gallery/birthday-02.jpg", category: "Birthday", title: "Private Party Setup" },
    { id: 18, src: "/portfolio/gallery/cultural-01.webp", category: "Cultural", title: "Cultural Evening Show" },
    { id: 19, src: "/portfolio/gallery/cultural-02.webp", category: "Cultural", title: "Festival Management" },
    { id: 20, src: "/portfolio/gallery/exhibition-03.webp", category: "Exhibition", title: "Expo Management" },
    { id: 21, src: "/portfolio/gallery/wedding-07.jpg", category: "Wedding", title: "Mandap Decoration" },
    { id: 22, src: "/portfolio/gallery/wedding-08.jpg", category: "Wedding", title: "Wedding Reception" },
    { id: 23, src: "/portfolio/gallery/birthday-03.jpg", category: "Birthday", title: "Birthday Party Setup" },
    { id: 24, src: "/portfolio/gallery/birthday-04.jpg", category: "Birthday", title: "Milestone Birthday Party" },
    { id: 25, src: "/portfolio/gallery/cultural-03.webp", category: "Cultural", title: "Award Night Décor" },
    { id: 26, src: "/portfolio/gallery/birthday-05.jpg", category: "Birthday", title: "Kids Birthday Party" },
    { id: 27, src: "/portfolio/gallery/birthday-06.jpg", category: "Birthday", title: "Theme Party Celebration" },
    { id: 28, src: "/portfolio/gallery/birthday-07.jpg", category: "Birthday", title: "Outdoor Birthday Bash" },
];
