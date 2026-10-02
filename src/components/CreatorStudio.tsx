import React, { useEffect, useState } from "react";
import { BookOpen, Brain, Film, Sparkles, MessageSquare, LayoutDashboard, ChevronRight, Command, Upload, X } from "lucide-react";
import { WriterForge } from "./WriterForge";
import { NovelEngine } from "./NovelEngine";
import { MetacognitiveTracker } from "./MetacognitiveTracker";
import { VideoEditor } from "./VideoEditor";
import { PersistentChat } from "./PersistentChat";

type StudioView = "home" | "writer" | "novel" | "mind" | "media";

const modules = [
  { id: "writer" as StudioView, label: "Writing Studio", description: "Long-form writing, rewriting, series development and creative production.", icon: BookOpen },
  { id: "novel" as StudioView, label: "Story Engine", description: "Continuity, episodic memory, characters, locations and narrative threads.", icon: Sparkles },
  { id: "mind" as StudioView, label: "Metacognitive Studio", description: "Creative patterns, reflection, substrate telemetry and continuity.", icon: Brain },
  { id: "media" as StudioView, label: "Media Studio", description: "Real local media editing with trimming, overlays and sequence assembly.", icon: Film }
];

export const CreatorStudio: React.FC = () => {
  const [view, setView] = useState<StudioView>("home");
  const [command, setCommand] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaDuration, setMediaDuration] = useState(0);

  useEffect(() => () => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
  }, [mediaUrl]);

  const runCommand = () => {
    const q = command.toLowerCase();
    if (q.includes("write") || q.includes("book") || q.includes("story")) setView("writer");
    else if (q.includes("character") || q.includes("continuity") || q.includes("novel")) setView("novel");
    else if (q.includes("mind") || q.includes("metacogn") || q.includes("cognitive")) setView("mind");
    else if (q.includes("video") || q.includes("media") || q.includes("timeline")) setView("media");
    setCommand("");
  };

  const loadMedia = (file: File) => {
    if (!file.type.startsWith("video/")) return;
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    const url = URL.createObjectURL(file);
    setMediaUrl(url);
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.onloadedmetadata = () => {
      setMediaDuration(Number.isFinite(probe.duration) ? probe.duration : 0);
    };
    probe.src = url;
  };

  const clearMedia = () => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    setMediaUrl(null);
    setMediaDuration(0);
  };

  return (
    <div className="min-h-full w-full bg-[#06070a] text-white overflow-auto">
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#08090d]/95 backdrop-blur-xl">
        <div className="px-4 sm:px-6 py-4 flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black"><Sparkles size={20} /></div>
            <div><div className="font-black tracking-wide">WORTHWYL CREATOR STUDIO</div><div className="text-[10px] uppercase tracking-[.18em] text-amber-300/70">Creation surface inside the governed ecosystem</div></div>
          </div>
          <div className="flex-1 max-w-3xl lg:mx-auto">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 focus-within:border-amber-400/50">
              <Command size={15} className="text-amber-400 shrink-0" />
              <input value={command} onChange={e => setCommand(e.target.value)} onKeyDown={e => { if (e.key === "Enter") runCommand(); }} placeholder="Tell Cranium what you want to create…" className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500" aria-label="Creator Studio command" />
              <button onClick={runCommand} className="px-3 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-black hover:bg-amber-400">GO</button>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto">
          <button onClick={() => setView("home")} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${view === "home" ? "bg-white text-black" : "bg-white/5 text-slate-300"}`}><LayoutDashboard size={13} className="inline mr-1.5" /> Studio Home</button>
          {modules.map(m => { const Icon = m.icon; return <button key={m.id} onClick={() => setView(m.id)} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${view === m.id ? "bg-amber-500 text-black" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}><Icon size={13} className="inline mr-1.5" /> {m.label}</button>; })}
        </div>
      </div>

      {view === "home" && <div className="p-4 sm:p-6 max-w-[1500px] mx-auto space-y-6">
        <section className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10 p-6 sm:p-8">
          <div className="max-w-3xl"><div className="text-xs font-mono uppercase tracking-[.2em] text-amber-300">Creator control surface</div><h2 className="text-3xl sm:text-5xl font-black mt-2 leading-tight">Create the thing. Let the governed machinery handle the rest.</h2><p className="mt-4 text-slate-300 leading-relaxed">Writing, story continuity, cognition and real media editing share one workspace. Canonical authority remains outside this surface in the Convertible Cranium Kernel.</p></div>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">{modules.map(m => { const Icon=m.icon; return <button key={m.id} onClick={() => setView(m.id)} className="text-left rounded-2xl border border-white/10 bg-white/[.035] hover:bg-white/[.065] hover:border-amber-400/30 p-5 transition-all group"><div className="flex items-start justify-between"><div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-amber-300"><Icon size={19}/></div><ChevronRight size={17} className="text-slate-600 group-hover:text-amber-300"/></div><h3 className="mt-5 font-black text-lg">{m.label}</h3><p className="mt-2 text-sm text-slate-400 leading-relaxed">{m.description}</p></button>; })}</div>
        <section className="rounded-2xl border border-white/10 bg-black/20 p-5"><div className="flex items-center gap-2 text-sm font-black"><MessageSquare size={16} className="text-amber-400"/> GOVERNED CREATION</div><p className="mt-3 text-sm text-slate-400 leading-relaxed">Studio is the human-facing workspace. Commander coordinates governed operations, Cranium AI proposes cognition, Synapse assesses evidence, the two independent jurors review, and the Kernel alone establishes canonical authority.</p></section>
      </div>}

      {view === "writer" && <div className="p-4 sm:p-6"><WriterForge /></div>}
      {view === "novel" && <div className="p-4 sm:p-6"><NovelEngine /></div>}
      {view === "mind" && <div className="p-4 sm:p-6"><MetacognitiveTracker /></div>}

      {view === "media" && <div className="p-4 sm:p-6">
        {!mediaUrl ? (
          <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-black/20 p-8 text-center">
            <Film className="mx-auto text-amber-400" size={38}/>
            <h2 className="mt-3 text-2xl font-black">Media Studio</h2>
            <p className="mt-2 text-sm text-slate-400">Load an actual video file to enter the editing workspace. No fake media, no stock placeholder masquerading as your asset.</p>
            <label className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black font-black text-xs uppercase cursor-pointer">
              <Upload size={15}/> Load Video
              <input type="file" accept="video/*" className="hidden" onChange={e => { const f=e.target.files?.[0]; if (f) loadMedia(f); e.currentTarget.value=""; }} />
            </label>
          </div>
        ) : (
          <div className="relative">
            <button onClick={clearMedia} className="absolute right-3 top-3 z-[120] p-2 rounded-full bg-black/70 text-white border border-white/10" aria-label="Close media editor"><X size={16}/></button>
            <VideoEditor initialUrl={mediaUrl} duration={mediaDuration} onClose={clearMedia} onSave={() => clearMedia()} />
          </div>
        )}
      </div>}

      <PersistentChat />
    </div>
  );
};
