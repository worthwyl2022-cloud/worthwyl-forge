/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  BarChart3, 
  Terminal, 
  Layers, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  Menu,
  X,
  Play,
  Lock,
  Compass,
  Award,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  Plus,
  Hash,
  Database
} from "lucide-react";
import { CraniumOverview } from "./components/CraniumOverview";
import { CreatorStudio } from "./components/CreatorStudio";
import { FormalAuthorityKernel } from "./components/FormalAuthorityKernel";
import { QuarantineInbox } from "./components/QuarantineInbox";
import { CanonRegistry } from "./components/CanonRegistry";
import { BenchmarkLab } from "./components/BenchmarkLab";
import { DirectiveConsole } from "./components/DirectiveConsole";
import { SelfDrivingDemoPlayer } from "./components/SelfDrivingDemoPlayer";
import { InteractiveAppTour } from "./components/InteractiveAppTour";
import { cn } from "./lib/utils";
import { useSubstrateProjects } from "./core/useSubstrateProjects";
import { CRANIUM_SUBSTRATE_ZIP_B64 } from "./zipBase64";
import { FULL_CRANIUM_SUBSTRATE_MD } from "./fullCodeExport";

export default function App() {
  const projectManager = useSubstrateProjects();
  const { 
    projects, 
    activeProjectId, 
    setActiveProjectId, 
    currentProject, 
    createProject, 
    exportDiligencePack 
  } = projectManager;

  const [activeView, setActiveView] = useState<'overview' | 'creator' | 'kernel' | 'quarantine' | 'canon' | 'benchmark' | 'console'>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasCopiedMd, setHasCopiedMd] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isInteractiveTourOpen, setIsInteractiveTourOpen] = useState(false);

  // Project Switcher & Creator State
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const [newProjGenre, setNewProjGenre] = useState("Sci-Fi Universe");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjAxiomTitle, setNewProjAxiomTitle] = useState("");
  const [newProjAxiomText, setNewProjAxiomText] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleDownloadZip = () => {
    try {
      const byteCharacters = atob(CRANIUM_SUBSTRATE_ZIP_B64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cranium_substrate.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("ZIP download failed", e);
    }
  };

  const handleDownloadMd = () => {
    try {
      const blob = new Blob([FULL_CRANIUM_SUBSTRATE_MD], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CRANIUM_SUBSTRATE_ALL.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("MD download failed", e);
    }
  };

  const handleCreateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim() || isCreatingProject) return;
    setIsCreatingProject(true);
    try {
      const created = await createProject(
        newProjName.trim(),
        newProjGenre.trim(),
        newProjDesc.trim() || "Isolated sovereign cognitive domain",
        newProjAxiomText.trim() ? {
          title: newProjAxiomTitle.trim() || "Primary Domain Anchor",
          statement: newProjAxiomText.trim(),
          domain: "WORLD"
        } : undefined
      );

      if (created) {
        setIsCreateProjectModalOpen(false);
        setNewProjName("");
        setNewProjDesc("");
        setNewProjAxiomTitle("");
        setNewProjAxiomText("");
      }
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050508] text-white">
      {/* Top Sovereign Navigation Bar */}
      <header className="min-h-16 py-2.5 border-b border-white/10 flex items-center justify-between px-3 sm:px-6 bg-[#08080c]/90 backdrop-blur-2xl sticky top-0 z-40 gap-2 flex-wrap sm:flex-nowrap">
        {/* Brand Logo & Sovereign Tagline */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveView('overview')}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 flex items-center justify-center border border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <Cpu size={20} className="text-black" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs sm:text-base font-black tracking-wider text-white flex items-center gap-1.5 font-sans">
              WORTHWYL <span className="text-amber-400">STUDIO</span>
            </h1>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-amber-400/80 -mt-0.5 uppercase hidden md:block">
              Creation • Operations • Governance
            </span>
          </div>
        </div>

        {/* Project Domain Isolation Switcher */}
        <div className="relative order-2 sm:order-2">
          <button
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12131e] hover:bg-[#1a1b2a] border border-purple-500/40 text-xs font-mono text-white shadow-[0_0_12px_rgba(168,85,247,0.2)] cursor-pointer transition-all"
            title="Switch Sandboxed Project Domain"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-purple-300 max-w-[130px] sm:max-w-[200px] truncate">
              {currentProject?.name || "The Aetherius Continuum"}
            </span>
            <span className="text-[10px] text-slate-400 font-normal hidden md:inline">
              | {currentProject?.constitution.length || 0} Axioms
            </span>
            <ChevronDown size={12} className="text-purple-400" />
          </button>

          {/* Project Switcher Dropdown */}
          <AnimatePresence>
            {isProjectDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute left-0 mt-2 w-72 sm:w-80 bg-[#0c0d14] border border-purple-500/40 rounded-2xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl"
              >
                <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400 uppercase font-bold">Isolated Domains</span>
                  <span className="text-purple-400">{projects.length} Active</span>
                </div>

                <div className="max-h-56 overflow-y-auto custom-scrollbar space-y-1 py-1">
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setActiveProjectId(proj.id);
                        setIsProjectDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between cursor-pointer",
                        proj.id === activeProjectId
                          ? "bg-purple-950/60 border border-purple-500/50 text-white"
                          : "hover:bg-white/5 text-slate-300 hover:text-white"
                      )}
                    >
                      <div className="truncate mr-2">
                        <div className="font-bold text-white truncate">{proj.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{proj.genre}</div>
                      </div>
                      <div className="text-right text-[10px] text-slate-400 shrink-0">
                        <div className="text-amber-400 font-bold">{proj.axiomCount} Ax</div>
                        <div>Merkle #{proj.merkleHeight}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-1 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsProjectDropdownOpen(false);
                      setIsCreateProjectModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Plus size={13} />
                    <span>Create Isolated Project Domain</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Mode Switcher Tabs */}
        <nav className="flex items-center bg-black/50 p-1 rounded-full border border-white/10 shadow-inner overflow-x-auto max-w-full custom-scrollbar py-1 shrink-0 order-4 sm:order-3">
          <button
            onClick={() => setActiveView('creator')}
            className={cn(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
              activeView === 'creator'
                ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Sparkles size={13} className={activeView === 'creator' ? "text-black" : "text-amber-400"} />
            <span>Creator Studio</span>
          </button>

          <button
            onClick={() => setActiveView('overview')}
            className={cn(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
              activeView === 'overview'
                ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Award size={13} className={activeView === 'overview' ? "text-black" : "text-amber-400"} />
            <span>Overview & Diligence</span>
          </button>

          <button
            onClick={() => setActiveView('kernel')}
            className={cn(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
              activeView === 'kernel'
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Cpu size={13} className={activeView === 'kernel' ? "text-black" : "text-cyan-400"} />
            <span>Authority Kernel</span>
          </button>

          <button
            onClick={() => setActiveView('quarantine')}
            className={cn(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
              activeView === 'quarantine'
                ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-white"
            )}
          >
            <ShieldAlert size={13} className={activeView === 'quarantine' ? "text-black" : "text-amber-400"} />
            <span>Quarantine Gate</span>
          </button>

          <button
            onClick={() => setActiveView('canon')}
            className={cn(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
              activeView === 'canon'
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "text-slate-400 hover:text-white"
            )}
          >
            <BookOpen size={13} className={activeView === 'canon' ? "text-white" : "text-purple-400"} />
            <span>Canon Lattice</span>
          </button>

          <button
            onClick={() => setActiveView('benchmark')}
            className={cn(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
              activeView === 'benchmark'
                ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                : "text-slate-400 hover:text-white"
            )}
          >
            <BarChart3 size={13} className={activeView === 'benchmark' ? "text-white" : "text-rose-400"} />
            <span>Benchmarks & Tests</span>
          </button>

          <button
            onClick={() => setActiveView('console')}
            className={cn(
              "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap",
              activeView === 'console'
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Terminal size={13} className={activeView === 'console' ? "text-black" : "text-amber-400"} />
            <span>Directive Console</span>
          </button>
        </nav>

        {/* Right Quick Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 order-3 sm:order-4">
          <button
            onClick={() => setIsInteractiveTourOpen(true)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            title="Launch Interactive Guided Tour"
          >
            <Compass size={12} />
            <span className="hidden sm:inline">Tour</span>
          </button>

          <button
            onClick={() => setIsDemoOpen(true)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
            title="Launch Diligence Walkthrough"
          >
            <Play size={12} className="fill-black" />
            <span className="hidden sm:inline">90s Demo</span>
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Studio Settings & Diligence"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeView === 'creator' && (
          <CreatorStudio />
        )}

        {activeView === 'overview' && (
          <CraniumOverview onNavigateTab={(tab) => setActiveView(tab)} />
        )}

        {activeView === 'kernel' && (
          <FormalAuthorityKernel />
        )}

        {activeView === 'quarantine' && (
          <QuarantineInbox externalProjectManager={projectManager} />
        )}

        {activeView === 'canon' && (
          <CanonRegistry externalProjectManager={projectManager} />
        )}

        {activeView === 'benchmark' && (
          <BenchmarkLab externalProjectManager={projectManager} />
        )}

        {activeView === 'console' && (
          <DirectiveConsole externalProjectManager={projectManager} />
        )}
      </main>

      {/* Create Isolated Domain Modal */}
      <AnimatePresence>
        {isCreateProjectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#0c0d14] border border-purple-500/40 p-6 rounded-3xl shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Database size={18} className="text-purple-400" />
                  <h3 className="text-sm font-black uppercase text-white tracking-wider">
                    Create Isolated Project Domain
                  </h3>
                </div>
                <button onClick={() => setIsCreateProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateProjectSubmit} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Domain / Project Name:</label>
                  <input
                    type="text"
                    required
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    placeholder="e.g. Titan-9 Mining Colony"
                    className="w-full bg-black/50 border border-sleek-border rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Genre / Category:</label>
                  <input
                    type="text"
                    value={newProjGenre}
                    onChange={(e) => setNewProjGenre(e.target.value)}
                    placeholder="e.g. Industrial Sci-Fi, Bio-Defense"
                    className="w-full bg-black/50 border border-sleek-border rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Domain Description:</label>
                  <textarea
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    placeholder="Primary narrative or operational context..."
                    rows={2}
                    className="w-full bg-black/50 border border-sleek-border rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 mb-1 font-bold">Initial Sovereign Axiom (Optional):</label>
                  <input
                    type="text"
                    value={newProjAxiomTitle}
                    onChange={(e) => setNewProjAxiomTitle(e.target.value)}
                    placeholder="Axiom Title (e.g. Cryo-Pressure Invariant)"
                    className="w-full bg-black/50 border border-sleek-border rounded-xl px-3 py-1.5 text-white mb-2"
                  />
                  <textarea
                    value={newProjAxiomText}
                    onChange={(e) => setNewProjAxiomText(e.target.value)}
                    placeholder="Rule statement..."
                    rows={2}
                    className="w-full bg-black/50 border border-sleek-border rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingProject || !newProjName.trim()}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase cursor-pointer disabled:opacity-50"
                  >
                    {isCreatingProject ? "Provisioning..." : "Provision Domain"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diligence & Exports Settings Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-[#0c0d14] border border-amber-500/30 p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-black font-black">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-wider text-white">
                      WORTHWYL STUDIO DILIGENCE
                    </h3>
                    <p className="text-[11px] text-amber-300 font-mono">
                      DUAL-SUBSTRATE / QUAD-ENGINE • KERNEL-AUTHORITY BOUNDARY
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Codebase & Package Exports */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-amber-300 block">
                  Export Substrate Sources & Specifications
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={handleDownloadMd}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 hover:border-emerald-400/50 transition-all cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>Export .MD</span>
                  </button>

                  <button
                    onClick={handleDownloadZip}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-amber-400 hover:border-amber-400/50 transition-all cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download .ZIP</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(FULL_CRANIUM_SUBSTRATE_MD).then(() => {
                        setHasCopiedMd(true);
                        setTimeout(() => setHasCopiedMd(false), 2500);
                      });
                    }}
                    className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-white hover:border-white/30 transition-all cursor-pointer"
                  >
                    {hasCopiedMd ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                    <span>{hasCopiedMd ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
              </div>

              {/* 1-Click RFC-8785 JSON Diligence Pack */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock size={15} className="text-emerald-400" />
                    <span className="text-xs font-bold uppercase text-white">
                      Formal Diligence Pack (RFC-8785)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">
                    SHA-256 Merkle
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Full cryptographic ledger, constitutional axioms, and benchmark attestation formatted for technical diligence.
                </p>
                <button
                  onClick={async () => {
                    const pack = await exportDiligencePack();
                    if (pack) {
                      const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `cranium_core_diligence_pack_${currentProject?.id || 'export'}.json`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download Diligence Pack</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Lock size={15} className="text-emerald-400" />
                  <span className="text-xs font-bold uppercase text-white">Server-backed diligence session</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Credentials are never stored in browser storage. Protected API routes require the server-issued HttpOnly session.
                  Canonical authority remains exclusively in the Convertible Cranium Kernel.
                </p>
              </div>

              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                Close Settings
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 90-Second Diligence Demo Player */}
      <SelfDrivingDemoPlayer
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onLaunchInteractiveTour={() => {
          setIsDemoOpen(false);
          setIsInteractiveTourOpen(true);
        }}
      />

      {/* Interactive App Tour */}
      <InteractiveAppTour
        isOpen={isInteractiveTourOpen}
        onClose={() => setIsInteractiveTourOpen(false)}
        activeView={activeView}
        onNavigateView={(v: any) => setActiveView(v)}
      />
    </div>
  );
}
