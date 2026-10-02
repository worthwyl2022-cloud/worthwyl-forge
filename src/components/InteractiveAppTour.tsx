import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Play, 
  Pause,
  CheckCircle2, 
  Activity, 
  ShieldAlert, 
  FileCode, 
  Terminal, 
  Layers, 
  RotateCcw,
  Zap,
  Check,
  Cpu,
  Award,
  BarChart3,
  Lock
} from "lucide-react";
import { cn } from "../lib/utils";

export interface TourStation {
  id: string;
  stepNumber: number;
  view: 'overview' | 'kernel' | 'quarantine' | 'canon' | 'benchmark' | 'console';
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  liveActionLabel: string;
  liveActionDescription: string;
  keyFeatures: string[];
}

const CRANIUM_TOUR_STATIONS: TourStation[] = [
  {
    id: "station-overview",
    stepNumber: 1,
    view: "overview",
    title: "Honest Acquisition One-Pager & Substrate Architecture",
    badge: "EXECUTIVE DILIGENCE",
    subtitle: "Real Moat vs Cosmetic Claims & 90-Day Plan",
    description: "Review the honest buyer statement, 4-pillar architectural moat, verified 74 Kotlin kernel module inventory, and clean valuation posture.",
    liveActionLabel: "Review Diligence Package",
    liveActionDescription: "Inspect the Honest Buyer Statement and switch between the 4 Moat tabs.",
    keyFeatures: [
      "Behavioral contract: intention → identity → permanence → conflict signal",
      "Quarantine boundary for provisional model output isolation",
      "Adaptive immune memory ledger with SHA-256 parent digests"
    ]
  },
  {
    id: "station-kernel",
    stepNumber: 2,
    view: "kernel",
    title: "Formal Authority Kernel & Monotonic State Reducer",
    badge: "5-TIER SOVEREIGNTY",
    subtitle: "Authority Monotonicity & Causal Provenance",
    description: "Explore the 5-tier privilege ladder (Tier 0 External → Tier 4 System Core). Simulate illegal privilege escalation probes and inspect cryptographic authority receipts.",
    liveActionLabel: "Probe Authority Escalation",
    liveActionDescription: "Select source/target tiers and submit state updates to verify monotonicity invariants.",
    keyFeatures: [
      "Strict Authority Monotonicity invariant enforcer",
      "No Isolated Subject (Causal provenance trace guarantee)",
      "Cryptographic SHA-256 parent-linked receipt chain"
    ]
  },
  {
    id: "station-quarantine",
    stepNumber: 3,
    view: "quarantine",
    title: "Quarantine Boundary & Write-Back Gate",
    badge: "OUTPUT ISOLATION",
    subtitle: "Provisional Token Hold & Immune Incidents",
    description: "Every candidate token from generative models resides in quarantine with zero write privilege until verified by dual-lane contradiction filters.",
    liveActionLabel: "Inspect Candidate Buffer",
    liveActionDescription: "Review candidate model streams and execute 'PROTECT & Quarantine' or 'Promote to Canon'.",
    keyFeatures: [
      "Zero-authority provisional holding zone for LLM output",
      "One-click 'PROTECT & Quarantine' vs 'Promote to Canon'",
      "Immune Incident ledger for adaptive constitutional memory"
    ]
  },
  {
    id: "station-canon",
    stepNumber: 4,
    view: "canon",
    title: "Canon Memory Lattice & Dual-Lane NLI Registry",
    badge: "IMMUTABLE CANON",
    subtitle: "Ground Truth Storage & Live NLI Judge",
    description: "Maintains worldbuilding invariants, character constraints, and corporate compliance rules. Includes a live dual-lane NLI judge sandbox.",
    liveActionLabel: "Test NLI Contradiction",
    liveActionDescription: "Load canonical premises into the NLI sandbox and evaluate provisional hypotheses.",
    keyFeatures: [
      "Immutable Tier 4 constitutional axiom storage",
      "Dual-lane NLI judge with Gemini 3.7 LLM adapter fallback",
      "Instant polarity collision detection"
    ]
  },
  {
    id: "station-benchmark",
    stepNumber: 5,
    view: "benchmark",
    title: "Benchmark Lab & High-Velocity Stress Engine",
    badge: "FROZEN VERIFICATION",
    subtitle: "100% Frozen Corpus Accuracy & 400k+ ops/sec",
    description: "Run the frozen 15-sample NLI benchmark (`corpus_frozen_v1.json`) and execute high-velocity adversarial stress rounds.",
    liveActionLabel: "Run Frozen Benchmark",
    liveActionDescription: "Execute the frozen benchmark suite and verify 100% Substrate accuracy vs 46.7% Naive RAG.",
    keyFeatures: [
      "Frozen standardized NLI contradiction benchmark runner",
      "Adversarial penetration stress test (~400k+ ops/sec)",
      "Replay nonce and cryptographic hash chain defenses"
    ]
  },
  {
    id: "station-console",
    stepNumber: 6,
    view: "console",
    title: "Sovereign Directive Console",
    badge: "DIRECTIVE TERMINAL",
    subtitle: "Full-Pipeline Governed LLM Execution",
    description: "Issue operational directives to Cranium Core. Every prompt undergoes directive ingestion, authority invariant checks, quarantine isolation, and dual-lane NLI review.",
    liveActionLabel: "Issue Operational Directive",
    liveActionDescription: "Send directives in natural language and inspect the generated cryptographic receipts.",
    keyFeatures: [
      "Full cognitive substrate governance pipeline execution",
      "Real-time token streaming inside quarantine boundary",
      "SHA-256 parent hash verification on every generation"
    ]
  }
];

interface InteractiveAppTourProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'overview' | 'creator' | 'kernel' | 'quarantine' | 'canon' | 'benchmark' | 'console';
  onNavigateView: (view: 'overview' | 'creator' | 'kernel' | 'quarantine' | 'canon' | 'benchmark' | 'console') => void;
}

export function InteractiveAppTour({
  isOpen,
  onClose,
  activeView,
  onNavigateView
}: InteractiveAppTourProps) {
  const [currentStationIdx, setCurrentStationIdx] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState(15);
  const [completedStations, setCompletedStations] = useState<string[]>([]);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const station = CRANIUM_TOUR_STATIONS[currentStationIdx];

  useEffect(() => {
    if (!isOpen || !station) return;
    onNavigateView(station.view);
  }, [currentStationIdx, isOpen]);

  useEffect(() => {
    if (!isOpen || !isAutoAdvancing) return;

    const interval = setInterval(() => {
      setAutoAdvanceTimer((prev) => {
        if (prev <= 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isAutoAdvancing, currentStationIdx]);

  const handleNext = () => {
    if (currentStationIdx < CRANIUM_TOUR_STATIONS.length - 1) {
      setCompletedStations(prev => [...new Set([...prev, station.id])]);
      setCurrentStationIdx(prev => prev + 1);
      setAutoAdvanceTimer(15);
      setActionFeedback(null);
    } else {
      setCompletedStations(prev => [...new Set([...prev, station.id])]);
      setIsAutoAdvancing(false);
      setActionFeedback("🎉 Full Substrate Tour Complete! You have inspected every architectural layer of Cranium Core.");
    }
  };

  const handlePrev = () => {
    if (currentStationIdx > 0) {
      setCurrentStationIdx(prev => prev - 1);
      setAutoAdvanceTimer(15);
      setActionFeedback(null);
    }
  };

  const handleSelectStation = (index: number) => {
    setCurrentStationIdx(index);
    setAutoAdvanceTimer(15);
    setActionFeedback(null);
  };

  const handleTriggerLiveDemonstration = () => {
    setActionFeedback(`⚡ Exploring interactive substrate controls on ${station.title}...`);
    setTimeout(() => {
      setActionFeedback(null);
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-6 inset-x-3 sm:inset-x-6 z-50 pointer-events-none flex justify-center">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="pointer-events-auto max-w-4xl w-full bg-[#08080f]/95 border-2 border-amber-500/50 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_30px_rgba(245,158,11,0.25)] backdrop-blur-2xl p-4 sm:p-5 text-white flex flex-col gap-3 font-sans"
      >
        {/* Top Header & Progress */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] sm:text-xs font-black uppercase tracking-wider font-mono shadow-[0_0_12px_rgba(245,158,11,0.4)]">
              STATION {station.stepNumber} OF {CRANIUM_TOUR_STATIONS.length}
            </span>
            <span className="text-xs font-bold text-amber-300 font-mono hidden xs:inline">
              {station.badge}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono hidden md:inline">
              • Active View: <strong className="text-white uppercase">{station.view}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoAdvancing(!isAutoAdvancing)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all cursor-pointer flex items-center gap-1",
                isAutoAdvancing 
                  ? "bg-amber-500/20 text-amber-300 border-amber-400" 
                  : "bg-white/5 text-neutral-400 border-white/10 hover:text-white"
              )}
              title="Toggle Auto-Advance Tour"
            >
              {isAutoAdvancing ? <Pause size={12} /> : <Play size={12} />}
              <span className="hidden sm:inline">{isAutoAdvancing ? `Auto (${autoAdvanceTimer}s)` : "Auto-Pilot"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-neutral-400 hover:text-red-300 transition-all cursor-pointer"
              title="Exit Interactive Tour"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Station Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Main Station Explanation */}
          <div className="md:col-span-8 space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>{station.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {station.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {station.keyFeatures.map((feat, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-neutral-300 flex items-center gap-1"
                >
                  <CheckCircle2 size={10} className="text-amber-400" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Box & Live Trigger */}
          <div className="md:col-span-4 bg-black/60 border border-amber-500/30 rounded-xl p-3 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-mono text-amber-400 block font-bold">
                🎯 Station Guide
              </span>
              <p className="text-[11px] text-neutral-300 leading-normal">
                {station.liveActionDescription}
              </p>
            </div>

            <button
              onClick={handleTriggerLiveDemonstration}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
            >
              <Zap size={13} className="fill-black" />
              <span>{station.liveActionLabel}</span>
            </button>
          </div>
        </div>

        {/* Live Feedback Toast if Triggered */}
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2"
          >
            <Check size={14} className="text-emerald-400 shrink-0" />
            <span>{actionFeedback}</span>
          </motion.div>
        )}

        {/* Station Navigation Pills & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            {CRANIUM_TOUR_STATIONS.map((s, idx) => {
              const isActive = idx === currentStationIdx;
              const isDone = completedStations.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectStation(idx)}
                  className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1",
                    isActive
                      ? "bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                      : isDone
                        ? "bg-white/10 text-amber-300 border border-amber-500/30"
                        : "bg-white/5 text-neutral-400 hover:text-white"
                  )}
                >
                  <span>{idx + 1}</span>
                  <span className="hidden lg:inline">{s.badge.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStationIdx === 0}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
            >
              <span>{currentStationIdx === CRANIUM_TOUR_STATIONS.length - 1 ? "Finish Tour" : "Next Station"}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
