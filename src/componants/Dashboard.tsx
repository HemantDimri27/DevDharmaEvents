"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Stage =
  | "Booked"
  | "Planning"
  | "Execution"
  | "Wrap-Up"
  | "Delivered";

interface WorkItem {
  id: string;
  clientName: string;
  service: string;
  date: string;
  stage: Stage;
  progress: number; // 0-100
  coordinator: string;
  notes: string;
  deliveryDate: string;
}

// ─── Sample Data ─────────────────────────────────────────────────────────────

const SAMPLE_WORK: WorkItem[] = [
  {
    id: "DK-2024-001",
    clientName: "Priya & Arjun Sharma",
    service: "Wedding Events",
    date: "2024-11-10",
    stage: "Delivered",
    progress: 100,
    coordinator: "Hemant (Lead)",
    notes: "Grand wedding — 350 guests, full décor, catering & coordination. Client extremely satisfied.",
    deliveryDate: "2024-11-11",
  },
  {
    id: "DK-2024-002",
    clientName: "TechCorp Pvt Ltd",
    service: "Corporate Events",
    date: "2024-12-05",
    stage: "Delivered",
    progress: 100,
    coordinator: "Ravi K.",
    notes: "Annual conference for 200 delegates. AV, staging, and speaker management handled.",
    deliveryDate: "2024-12-05",
  },
  {
    id: "DK-2024-003",
    clientName: "Meera Nair",
    service: "Birthday & Private Parties",
    date: "2024-12-20",
    stage: "Wrap-Up",
    progress: 85,
    coordinator: "Anita S.",
    notes: "50th birthday party — royal theme, 80 guests. Event completed, post-event review pending.",
    deliveryDate: "2024-12-22",
  },
  {
    id: "DK-2025-001",
    clientName: "Global Events Co.",
    service: "Exhibition & Expo Management",
    date: "2025-01-15",
    stage: "Execution",
    progress: 60,
    coordinator: "Hemant (Lead)",
    notes: "3-day trade expo — stall setup Day 1 done. Day 2-3 execution in progress.",
    deliveryDate: "2025-01-17",
  },
  {
    id: "DK-2025-002",
    clientName: "Uttarakhand Cultural Society",
    service: "Social & Cultural Events",
    date: "2025-02-01",
    stage: "Planning",
    progress: 35,
    coordinator: "Ravi K.",
    notes: "Annual cultural fest — 500 attendees. Venue confirmed, artist line-up in discussion.",
    deliveryDate: "2025-02-03",
  },
  {
    id: "DK-2025-003",
    clientName: "Kavya & Dev Patel",
    service: "Destination Events",
    date: "2025-02-14",
    stage: "Booked",
    progress: 10,
    coordinator: "Hemant (Lead)",
    notes: "Destination wedding in Rishikesh. Venue scouted. Travel & logistics planning started.",
    deliveryDate: "2025-02-16",
  },
];

// ─── Stage Config ─────────────────────────────────────────────────────────────

const STAGE_CONFIG: Record<Stage, { color: string; bg: string; dot: string }> = {
  Booked:      { color: "text-sky-400",    bg: "bg-sky-400/10 border-sky-400/30",    dot: "bg-sky-400" },
  Planning:    { color: "text-amber-400",  bg: "bg-amber-400/10 border-amber-400/30", dot: "bg-amber-400" },
  Execution:   { color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/30", dot: "bg-violet-400" },
  "Wrap-Up":   { color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30", dot: "bg-orange-400" },
  Delivered:   { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30", dot: "bg-emerald-400" },
};

const STAGES: Stage[] = ["Booked", "Planning", "Execution", "Wrap-Up", "Delivered"];

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const ProgressBar = ({ value, stage }: { value: number; stage: Stage }) => {
  const colors: Record<Stage, string> = {
    Booked:    "from-sky-500 to-sky-400",
    Planning:  "from-amber-500 to-amber-400",
    Execution: "from-violet-500 to-violet-400",
    "Wrap-Up": "from-orange-500 to-orange-400",
    Delivered: "from-emerald-500 to-emerald-400",
  };

  return (
    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${colors[stage]}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
};

// ─── Work Card ────────────────────────────────────────────────────────────────

const WorkCard = ({ item, index }: { item: WorkItem; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = STAGE_CONFIG[item.stage];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:bg-white/8 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded((p) => !p)}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-white/30">{item.id}</span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
              {item.stage}
            </span>
          </div>
          <h3 className="font-semibold text-white text-base truncate">{item.clientName}</h3>
          <p className="text-sm text-white/50 mt-0.5">{item.service}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-white/40">Event Date</p>
          <p className="text-sm text-white/70 font-medium">{item.date}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>Progress</span>
          <span>{item.progress}%</span>
        </div>
        <ProgressBar value={item.progress} stage={item.stage} />
      </div>

      {/* Stage timeline dots */}
      <div className="mt-4 flex items-center gap-1">
        {STAGES.map((s, i) => {
          const current = STAGES.indexOf(item.stage);
          const done = i <= current;
          return (
            <React.Fragment key={s}>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  done ? cfg.dot : "bg-white/10"
                }`}
              />
              {i < STAGES.length - 1 && (
                <div className={`flex-1 h-px ${done && i < current ? cfg.dot.replace("bg-", "bg-") + " opacity-40" : "bg-white/10"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/40 text-xs mb-0.5">Coordinator</p>
                <p className="text-white/80">{item.coordinator}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-0.5">Delivery Date</p>
                <p className="text-white/80">{item.deliveryDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-white/40 text-xs mb-0.5">Notes</p>
                <p className="text-white/70">{item.notes}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-white/25 mt-3 text-right">
        {expanded ? "▲ collapse" : "▼ click for details"}
      </p>
    </motion.div>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const StatsBar = ({ data }: { data: WorkItem[] }) => {
  const stats = STAGES.map((s) => ({
    stage: s,
    count: data.filter((d) => d.stage === s).length,
    cfg: STAGE_CONFIG[s],
  }));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
      {stats.map(({ stage, count, cfg }) => (
        <div
          key={stage}
          className={`rounded-xl border p-3 text-center ${cfg.bg}`}
        >
          <p className={`text-2xl font-bold ${cfg.color}`}>{count}</p>
          <p className="text-xs text-white/50 mt-0.5">{stage}</p>
        </div>
      ))}
    </div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [filter, setFilter] = useState<Stage | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_WORK.filter((w) => {
    const matchStage = filter === "All" || w.stage === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      w.clientName.toLowerCase().includes(q) ||
      w.service.toLowerCase().includes(q) ||
      w.id.toLowerCase().includes(q);
    return matchStage && matchSearch;
  });

  return (
    <section className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Event Dashboard
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Dashboard
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Real-time visibility into every event project — from booking to final delivery.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <StatsBar data={SAMPLE_WORK} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by client, service or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500/50 transition-colors"
          />
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["All", ...STAGES] as (Stage | "All")[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                  filter === s
                    ? "bg-teal-500 border-teal-500 text-black"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-white/30"
          >
            No projects match your filter.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, i) => (
              <WorkCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-10">
          Showing {filtered.length} of {SAMPLE_WORK.length} projects • Click a card to expand details
        </p>
      </div>
    </section>
  );
}
