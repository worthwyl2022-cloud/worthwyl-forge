import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Brain, 
  Cpu, 
  Lock, 
  Layers, 
  FileCheck, 
  FileText,
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink,
  ShieldAlert,
  Zap,
  Flame,
  Activity,
  Award
} from 'lucide-react';
import { FULL_CRANIUM_SUBSTRATE_MD } from '../fullCodeExport';
import { CRANIUM_SUBSTRATE_ZIP_B64 } from '../zipBase64';
import { cn } from '../lib/utils';

export function CraniumOverview({
  onNavigateTab
}: {
  onNavigateTab?: (tab: 'overview' | 'creator' | 'kernel' | 'quarantine' | 'canon' | 'benchmark' | 'console') => void;
}) {
  const [copiedMd, setCopiedMd] = useState(false);
  const [activeMoatTab, setActiveMoatTab] = useState<'contract' | 'quarantine' | 'immune' | 'constitution'>('contract');

  const handleDownloadZip = () => {
    try {
      const byteCharacters = atob(CRANIUM_SUBSTRATE_ZIP_B64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cranium_substrate.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('ZIP download error:', e);
    }
  };

  const handleDownloadMd = () => {
    try {
      const blob = new Blob([FULL_CRANIUM_SUBSTRATE_MD], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CRANIUM_SUBSTRATE_ALL.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('MD download error:', e);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(FULL_CRANIUM_SUBSTRATE_MD).then(() => {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2500);
    });
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto custom-scrollbar">
      {/* Executive Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0c0d14] via-[#090a10] to-[#050508] border border-amber-500/30 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.15)] overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              DIRECTIVE-GOVERNED COGNITIVE SUBSTRATE
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              74 KOTLIN KERNEL MODULES
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              PRE-REVENUE PROTOPACKAGE • 2026-08
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
            CRANIUM <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">CORE</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            A <strong>directive-governed cognitive substrate</strong> for long-running creative, strategic, and institutional continuity. It treats <strong>identity, canon, and human intent as first-class mathematical constraints</strong>—not chat history to be diluted.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('console')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer transition-all"
            >
              <Terminal size={15} />
              <span>Launch Directive Console</span>
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab('kernel')}
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Cpu size={15} className="text-cyan-400" />
              <span>Inspect Authority Kernel</span>
            </button>

            <button
              onClick={handleDownloadZip}
              className="px-5 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download size={15} />
              <span>Download 74-File Substrate .ZIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Honest Acquisition Statement & Diligence Posture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0c0d14] rounded-2xl border border-sleek-border p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-sleek-border">
            <Award className="text-amber-400" size={20} />
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-white">
              Honest Buyer Statement & Diligence Standard
            </h2>
          </div>

          <blockquote className="p-4 rounded-xl bg-black/40 border-l-4 border-amber-400 text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            "Cranium Core is a documented creative-governance prototype. Receipts demonstrate operational directives, identity-gate activity, quarantine write-back, and explicit memory governance. Comparative canon superiority is <strong>not</strong> claimed until a frozen, real-model harness shows it. The acquisition opportunity is the <strong>architecture, behavioral contract, and remediation path</strong>—not marketed performance superiority."
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-black/30 border border-sleek-border space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Real Asset Moat
              </span>
              <p className="text-xs text-slate-300 leading-normal">
                Behavioral contract, quarantine write-back boundaries, SHA-256 parent-linked receipts, and adaptive immune memory.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/30 border border-sleek-border space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1">
                <AlertTriangle size={12} /> Cosmetic / Ignored Metaphors
              </span>
              <p className="text-xs text-slate-300 leading-normal">
                No reliance on generic chat memory metaphors, ungrounded theme hashes, or decorative dashboards without write-back gates.
              </p>
            </div>
          </div>
        </div>

        {/* Valuation Posture Guidance */}
        <div className="bg-[#0c0d14] rounded-2xl border border-sleek-border p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-sleek-border">
              <Lock className="text-cyan-400" size={18} />
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Valuation Posture
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Clean IP Sale / Prototype:</strong> Low 5-figures to low 6-figures depending on exclusivity, support window, and verified proof status.
              </p>
              <p>
                <strong className="text-white">Strategic Premium:</strong> Unlocked after frozen real-model benchmarks beat naïve baselines on identity & constraint metrics.
              </p>
              <p className="text-slate-400 text-[11px] italic">
                SaaS multiples do not apply until live recurring revenue is established.
              </p>
            </div>
          </div>

          <div className="p-3 bg-black/50 rounded-xl border border-white/10 font-mono text-[11px] text-amber-300 flex items-center justify-between">
            <span>Asset Status:</span>
            <span className="font-bold">74 Files • 100% Kotlin Ready</span>
          </div>
        </div>
      </div>

      {/* The Core Moat: Real vs Cosmetic Tabs */}
      <div className="bg-[#0c0d14] rounded-2xl border border-sleek-border p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sleek-border">
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={18} />
              The Architectural Moat: 4 Pillars of Creative Governance
            </h3>
            <p className="text-xs text-sleek-muted">
              The foundational mechanics that turn human intent into sovereign mathematical constraints.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-sleek-border overflow-x-auto">
            <button
              onClick={() => setActiveMoatTab('contract')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                activeMoatTab === 'contract' ? "bg-amber-500 text-black shadow-lg" : "text-slate-400 hover:text-white"
              )}
            >
              1. Behavioral Contract
            </button>
            <button
              onClick={() => setActiveMoatTab('quarantine')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                activeMoatTab === 'quarantine' ? "bg-amber-500 text-black shadow-lg" : "text-slate-400 hover:text-white"
              )}
            >
              2. Quarantine Boundary
            </button>
            <button
              onClick={() => setActiveMoatTab('immune')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                activeMoatTab === 'immune' ? "bg-amber-500 text-black shadow-lg" : "text-slate-400 hover:text-white"
              )}
            >
              3. Immune Incidents
            </button>
            <button
              onClick={() => setActiveMoatTab('constitution')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                activeMoatTab === 'constitution' ? "bg-amber-500 text-black shadow-lg" : "text-slate-400 hover:text-white"
              )}
            >
              4. Creative Constitution
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeMoatTab === 'contract' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2 text-center">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Phase 1</span>
              <h4 className="text-xs font-black text-white">Intention</h4>
              <p className="text-[11px] text-slate-400">
                Explicit operator directive ingested with highest authority priority.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2 text-center">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">Phase 2</span>
              <h4 className="text-xs font-black text-white">Identity</h4>
              <p className="text-[11px] text-slate-400">
                Canonical identity anchors and world invariants enforced.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2 text-center">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">Phase 3</span>
              <h4 className="text-xs font-black text-white">Memory Permanence</h4>
              <p className="text-[11px] text-slate-400">
                Axiomatic state locked into immutable vector lattice.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2 text-center">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">Phase 4</span>
              <h4 className="text-xs font-black text-white">Conflict as Signal</h4>
              <p className="text-[11px] text-slate-400">
                Polarity inversions treated as boundary signals, not silent bugs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2 text-center">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Phase 5</span>
              <h4 className="text-xs font-black text-white">Directive Move</h4>
              <p className="text-[11px] text-slate-400">
                System acts strictly in compliance with constitutional invariants.
              </p>
            </div>
          </div>
        )}

        {activeMoatTab === 'quarantine' && (
          <div className="p-5 rounded-xl bg-black/40 border border-sleek-border space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-amber-400" size={18} />
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Provisional Model Output Isolation
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard LLM implementations immediately commit raw generation to rolling context or vector stores. In Cranium Core, <strong>all generated material lands in a provisional quarantine buffer</strong>. It holds zero authority until certified by dual-lane contradiction filters.
            </p>
          </div>
        )}

        {activeMoatTab === 'immune' && (
          <div className="p-5 rounded-xl bg-black/40 border border-sleek-border space-y-3">
            <div className="flex items-center gap-2">
              <Flame className="text-rose-400" size={18} />
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Immune Incidents as Adaptive Constitutional Memory
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When an adversarial attack, hallucination, or contradiction is intercepted, it is not merely dropped—it is logged as a formal <strong>Immune Incident</strong> with SHA-256 cryptographic signatures. These incidents dynamically tune boundary thresholds for future generations.
            </p>
          </div>
        )}

        {activeMoatTab === 'constitution' && (
          <div className="p-5 rounded-xl bg-black/40 border border-sleek-border space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="text-purple-400" size={18} />
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Builder-Facing Creative Constitution
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides creators and enterprises with explicit declarative governance rules (e.g. Character Invariants, Physics Constraints, Legal Guardrails) that override all ephemeral model tendencies.
            </p>
          </div>
        )}
      </div>

      {/* Asset Inventory & Codebase Packaging */}
      <div className="bg-[#0c0d14] rounded-2xl border border-sleek-border p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-sleek-border">
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Layers className="text-purple-400" size={18} />
              Asset Inventory & Diligence Package
            </h3>
            <p className="text-xs text-sleek-muted">
              Verified complete codebase inventory ready for immediate transfer and execution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMd}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-emerald-400 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={13} />
              <span>Export .MD</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedMd ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedMd ? "Copied" : "Copy All"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Substrate Core</span>
            <h4 className="text-xs font-bold text-white">Kotlin Invariant Reducers</h4>
            <p className="text-[11px] text-slate-400">
              `SubstrateCore.kt`, `ResonanceField.kt`, `ImmuneIncident.kt`, `FieldPulse.kt`, `MemoryPersistenceBridge.kt`.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Governance Engines</span>
            <h4 className="text-xs font-bold text-white">Dual-Lane Contradiction</h4>
            <p className="text-[11px] text-slate-400">
              `CanonLane.kt`, `ContradictionEngine.kt` (proxy v2), `OutputEvaluator.kt`, `DeliberationEngine.kt`.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-sleek-border space-y-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Benchmark Harness</span>
            <h4 className="text-xs font-bold text-white">Frozen Corpora & Judges</h4>
            <p className="text-[11px] text-slate-400">
              `corpus_frozen_v1.json`, `run_harness.py`, `adversarial_stress_test.py`, `receipts_runner.py`.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
