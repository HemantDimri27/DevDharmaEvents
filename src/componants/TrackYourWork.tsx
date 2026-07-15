"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Shared sample data (same as dashboard) ───────────────────────────────────
// In a real app this would be fetched from your DB by booking ID.

type Stage = "Booked" | "In Progress" | "Editing" | "Review" | "Delivered";

interface WorkItem {
  id: string;
  clientName: string;
  service: string;
  date: string;
  stage: Stage;
  progress: number;
  photographer: string;
  notes: string;
  deliveryDate: string;
}

const PROJECTS: WorkItem[] = [
  {
    id: "DC-2024-001",
    clientName: "Priya & Arjun Sharma",
    service: "Wedding Photography",
    date: "2024-11-10",
    stage: "Delivered",
    progress: 100,
    photographer: "Danu (Lead)",
    notes: "450 edited shots delivered via Google Drive link sent to your email.",
    deliveryDate: "2024-11-28",
  },
  {
    id: "DC-2024-002",
    clientName: "Meera Nair",
    service: "Portrait Photography",
    date: "2024-12-05",
    stage: "Editing",
    progress: 60,
    photographer: "Ravi K.",
    notes: "Your photos are being color-graded and retouched. Expected delivery in ~5 days.",
    deliveryDate: "2024-12-20",
  },
  {
    id: "DC-2024-003",
    clientName: "Rohan & Sneha Verma",
    service: "Pre-Wedding Shoots",
    date: "2024-12-15",
    stage: "Review",
    progress: 80,
    photographer: "Danu (Lead)",
    notes: "First batch of 120 images sent to your email. Please share your feedback!",
    deliveryDate: "2024-12-30",
  },
  {
    id: "DC-2025-001",
    clientName: "TechCorp Pvt Ltd",
    service: "Commercial Photography",
    date: "2025-01-08",
    stage: "In Progress",
    progress: 35,
    photographer: "Anita S.",
    notes: "Day 1 of 3 complete. Studio shoot ongoing for your Q1 catalogue.",
    deliveryDate: "2025-01-22",
  },
  {
    id: "DC-2025-002",
    clientName: "Global Events Co.",
    service: "Event Photography",
    date: "2025-01-20",
    stage: "Booked",
    progress: 5,
    photographer: "Ravi K.",
    notes: "Your event is confirmed! Logistics are in place. We'll reach out 2 days before.",
    deliveryDate: "2025-01-28",
  },
  {
    id: "DC-2025-003",
    clientName: "Kavya & Dev Patel",
    service: "Wedding Photography",
    date: "2025-02-14",
    stage: "Booked",
    progress: 10,
    photographer: "Danu (Lead)",
    notes: "Venue scouted. We'll finalise your shot list during the pre-wedding call.",
    deliveryDate: "2025-03-05",
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const STAGES: Stage[] = ["Booked", "In Progress", "Editing", "Review", "Delivered"];

const STAGE_CONFIG: Record<Stage, { color: string; bg: string; dot: string; label: string }> = {
  Booked:        { color: "text-sky-400",     bg: "bg-sky-400/10 border-sky-400/30",     dot: "bg-sky-400",     label: "Your booking is confirmed! 🎉" },
  "In Progress": { color: "text-amber-400",   bg: "bg-amber-400/10 border-amber-400/30", dot: "bg-amber-400",   label: "Shoot is underway. 📸" },
  Editing:       { color: "text-violet-400",  bg: "bg-violet-400/10 border-violet-500/30", dot: "bg-violet-400", label: "We're working our magic in post. ✨" },
  Review:        { color: "text-orange-400",  bg: "bg-orange-400/10 border-orange-400/30", dot: "bg-orange-400", label: "Photos sent — awaiting your feedback! 👀" },
  Delivered:     { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30", dot: "bg-emerald-400", label: "All done! Your memories are ready. 💚" },
};

// ─── Animated Progress Bar ────────────────────────────────────────────────────

const ProgressBar = ({ value, stage }: { value: number; stage: Stage }) => {
  const gradients: Record<Stage, string> = {
    Booked:        "from-sky-500 to-sky-400",
    "In Progress": "from-amber-500 to-amber-400",
    Editing:       "from-violet-500 to-violet-400",
    Review:        "from-orange-500 to-orange-400",
    Delivered:     "from-emerald-500 to-emerald-400",
  };
  return (
    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${gradients[stage]}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
};

// ─── Stage Timeline ───────────────────────────────────────────────────────────

const StageTimeline = ({ stage }: { stage: Stage }) => {
  const current = STAGES.indexOf(stage);
  const cfg = STAGE_CONFIG[stage];
  return (
    <div className="mt-6">
      <div className="flex items-center gap-0">
        {STAGES.map((s, i) => {
          const done = i <= current;
          const isCurrent = i === current;
          return (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    done ? cfg.dot : "bg-white/15"
                  } ${isCurrent ? `ring-2 ring-offset-2 ring-offset-[#0a0a0a] ${cfg.color.replace("text-", "ring-")}` : ""}`}
                />
                <span className={`text-[9px] text-center w-14 leading-tight ${done ? cfg.color : "text-white/25"}`}>
                  {s}
                </span>
              </div>
              {i < STAGES.length - 1 && (
                <div className={`flex-1 h-px mb-4 transition-all ${
                  i < current ? (cfg.dot + " opacity-50") : "bg-white/10"
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// ─── Result Card ──────────────────────────────────────────────────────────────

const ResultCard = ({ project }: { project: WorkItem }) => {
  const cfg = STAGE_CONFIG[project.stage];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-mono text-white/30 mb-1">{project.id}</p>
          <h2 className="text-xl font-bold text-white">{project.clientName}</h2>
          <p className="text-white/50 text-sm mt-0.5">{project.service}</p>
        </div>
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${cfg.bg} ${cfg.color}`}>
          <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
          {project.stage}
        </span>
      </div>

      {/* Status message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`mt-4 px-4 py-3 rounded-xl border text-sm ${cfg.bg} ${cfg.color}`}
      >
        {cfg.label}
      </motion.div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-white/40 mb-2">
          <span>Overall Progress</span>
          <span className={cfg.color}>{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} stage={project.stage} />
      </div>

      {/* Stage Timeline */}
      <StageTimeline stage={project.stage} />

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-white/10 text-sm">
        <div>
          <p className="text-white/35 text-xs mb-1">Shoot Date</p>
          <p className="text-white/80">{project.date}</p>
        </div>
        <div>
          <p className="text-white/35 text-xs mb-1">Expected Delivery</p>
          <p className="text-white/80">{project.deliveryDate}</p>
        </div>
        <div>
          <p className="text-white/35 text-xs mb-1">Your Photographer</p>
          <p className="text-white/80">{project.photographer}</p>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4 bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <p className="text-white/35 text-xs mb-1">Latest Update</p>
        <p className="text-white/70 text-sm leading-relaxed">{project.notes}</p>
      </div>

      {/* CTA */}
      {project.stage !== "Delivered" && (
        <p className="text-center text-xs text-white/25 mt-5">
          Questions? Reach us at{" "}
          <a href="/contact" className="text-teal-400 hover:underline">Contact Us</a>
        </p>
      )}
    </motion.div>
  );
};

// ─── Not Found State ──────────────────────────────────────────────────────────

const NotFound = ({ query }: { query: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-8 text-center max-w-sm mx-auto"
  >
    <div className="text-5xl mb-4">🔍</div>
    <h3 className="text-white font-semibold text-lg mb-2">No project found</h3>
    <p className="text-white/40 text-sm">
      We couldn&apos;t find a project matching <span className="text-white/60">&quot;{query}&quot;</span>.
    </p>
    <p className="text-white/30 text-xs mt-3">
      Try your Booking ID (e.g. <span className="font-mono">DC-2025-001</span>) or your full name.
    </p>
    <p className="text-xs text-white/20 mt-2">
      Still need help?{" "}
      <a href="/contact" className="text-teal-400 hover:underline">Contact us →</a>
    </p>
  </motion.div>
);

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function TrackYourWork() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [result, setResult] = useState<WorkItem | null | "not-found">(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    const found = PROJECTS.find(
      (p) =>
        p.id.toLowerCase() === q ||
        p.clientName.toLowerCase().includes(q)
    );

    setSubmitted(query.trim());
    setResult(found ?? "not-found");
  };

  const handleReset = () => {
    setQuery("");
    setSubmitted("");
    setResult(null);
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-4 pt-28 pb-20">
      {/* Hero text */}
      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase mb-3">
          Client Portal
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Track Your Work
        </h1>
        <p className="text-white/45 text-base">
          Enter your <span className="text-white/70">Booking ID</span> or{" "}
          <span className="text-white/70">name</span> to see real-time status of your project.
        </p>
      </motion.div>

      {/* Search box */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 w-full max-w-lg flex gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. DC-2025-001 or Priya Sharma"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-teal-500/60 transition-colors"
        />
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-400 active:scale-95 text-black font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200"
        >
          Track →
        </button>
      </motion.form>

      {/* Hint chips */}
      {!result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex gap-2 flex-wrap justify-center"
        >
          {["DC-2024-002", "DC-2025-001", "Kavya", "Rohan"].map((hint) => (
            <button
              key={hint}
              onClick={() => { setQuery(hint); }}
              className="text-xs font-mono bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20 px-3 py-1 rounded-full transition-all"
            >
              {hint}
            </button>
          ))}
        </motion.div>
      )}

      {/* Result */}
      <AnimatePresence mode="wait">
        {result === "not-found" && <NotFound key="nf" query={submitted} />}
        {result && result !== "not-found" && (
          <ResultCard key={result.id} project={result} />
        )}
      </AnimatePresence>

      {/* Reset */}
      {result && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleReset}
          className="mt-6 text-xs text-white/30 hover:text-white/60 transition-colors underline"
        >
          Search again
        </motion.button>
      )}

      {/* Footer hint */}
      {!result && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-xs text-white/20 text-center"
        >
          Don&apos;t have a Booking ID?{" "}
          <a href="/contact" className="text-teal-400/70 hover:text-teal-400 transition-colors">
            Book a session first →
          </a>
        </motion.p>
      )}
    </section>
  );
}
