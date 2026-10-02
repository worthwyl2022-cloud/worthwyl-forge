import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Scissors, Type, Layout, Save, Play, Pause, ChevronLeft, ChevronRight, Plus, Trash2, Layers } from "lucide-react";
import { cn } from "../lib/utils";

interface VideoSegment {
  id: string;
  url: string;
  startTime: number;
  endTime: number;
  duration: number;
  textOverlays: TextOverlay[];
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  startTime: number;
  endTime: number;
}

interface VideoEditorProps {
  initialUrl: string;
  duration: number;
  onClose: () => void;
  onSave: (editedVideo: any) => void;
}

export function VideoEditor({ initialUrl, duration, onClose, onSave }: VideoEditorProps) {
  const [segments, setSegments] = useState<VideoSegment[]>([
    { 
      id: "1", 
      url: initialUrl, 
      startTime: 0, 
      endTime: duration, 
      duration, 
      textOverlays: [] 
    }
  ]);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mode, setMode] = useState<'trim' | 'text' | 'arrange'>('trim');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const generateTitles = async (theme: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      const titles = await response.json();
      setSuggestions(titles);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const activeSegment = segments[activeSegmentIndex];

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Loop or stop at trim points
      if (time >= activeSegment.endTime) {
        videoRef.current.currentTime = activeSegment.startTime;
      }
    }
  };

  const handleTrimChange = (type: 'start' | 'end', value: number) => {
    setSegments(prev => prev.map((s, i) => {
      if (i !== activeSegmentIndex) return s;
      const newS = { ...s };
      if (type === 'start') newS.startTime = Math.min(value, s.endTime - 0.5);
      else newS.endTime = Math.max(value, s.startTime + 0.5);
      return newS;
    }));
  };

  const addTextOverlay = () => {
    const newOverlay: TextOverlay = {
      id: Math.random().toString(36).substr(2, 9),
      text: "NEW TITLE",
      x: 50,
      y: 50,
      fontSize: 24,
      color: "#ffffff",
      startTime: activeSegment.startTime,
      endTime: activeSegment.endTime
    };
    
    setSegments(prev => prev.map((s, i) => {
      if (i !== activeSegmentIndex) return s;
      return { ...s, textOverlays: [...s.textOverlays, newOverlay] };
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col p-6"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-sleek-muted transition-all"
          >
            <X size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black tracking-tight text-white uppercase">Cinematic Sequence Editor</h2>
            <p className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest">Neural Sequence Refinement Layer</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => onSave({ segments })}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-sleek-accent text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-sleek-accent/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Save size={14} />
            Compile Sequence
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex gap-8 min-h-0">
        {/* Preview Area */}
        <div className="flex-1 flex flex-col bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative group">
          <div className="flex-1 relative flex items-center justify-center p-8">
            <video 
              ref={videoRef}
              src={activeSegment.url}
              onTimeUpdate={handleTimeUpdate}
              className="max-w-full max-h-full rounded-xl shadow-2xl object-contain lg:aspect-video"
              playsInline
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
              <div className="relative w-full h-full">
                {activeSegment.textOverlays.map(overlay => (
                  <motion.div
                    key={overlay.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: currentTime >= overlay.startTime && currentTime <= overlay.endTime ? 1 : 0,
                      scale: 1
                    }}
                    style={{ 
                      top: `${overlay.y}%`, 
                      left: `${overlay.x}%`,
                      fontSize: `${overlay.fontSize}px`,
                      color: overlay.color
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 font-black uppercase tracking-widest text-shadow-lg"
                  >
                    {overlay.text}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-xl border border-white/10 transition-all"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-white/5 relative">
            <motion.div 
              style={{ width: `${(currentTime / activeSegment.duration) * 100}%` }}
              className="absolute inset-y-0 left-0 bg-sleek-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />
          </div>
        </div>

        {/* Sidebar Controls */}
        <aside className="w-80 bg-sleek-surface rounded-3xl border border-sleek-border flex flex-col overflow-hidden">
          <div className="flex border-b border-sleek-border p-1 bg-black/20">
            {(['trim', 'text', 'arrange'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 py-3 flex flex-col items-center gap-1.5 transition-all",
                  mode === m ? "text-sleek-accent" : "text-sleek-muted hover:text-white"
                )}
              >
                {m === 'trim' && <Scissors size={18} />}
                {m === 'text' && <Type size={18} />}
                {m === 'arrange' && <Layers size={18} />}
                <span className="text-[8px] font-black uppercase tracking-widest">{m}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
            {mode === 'trim' && (
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-sleek-muted tracking-widest mb-4 block">Precision Trimming</label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase text-sleek-muted">
                        <span>Start Marker</span>
                        <span className="text-sleek-accent">{activeSegment.startTime.toFixed(2)}s</span>
                      </div>
                      <input 
                        type="range"
                        min={0}
                        max={activeSegment.duration}
                        step={0.1}
                        value={activeSegment.startTime}
                        onChange={(e) => handleTrimChange('start', parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-sleek-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase text-sleek-muted">
                        <span>End Marker</span>
                        <span className="text-sleek-accent">{activeSegment.endTime.toFixed(2)}s</span>
                      </div>
                      <input 
                        type="range"
                        min={0}
                        max={activeSegment.duration}
                        step={0.1}
                        value={activeSegment.endTime}
                        onChange={(e) => handleTrimChange('end', parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-sleek-accent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <p className="text-[9px] text-sleek-muted leading-relaxed uppercase font-medium">
                    The sequence will loop between these points. Neural boundaries are preserved at high fidelity.
                  </p>
                </div>
              </div>
            )}

            {mode === 'text' && (
              <div className="space-y-6">
                <button 
                  onClick={addTextOverlay}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-sleek-muted hover:border-sleek-accent/50 hover:text-white transition-all flex flex-col items-center gap-2"
                >
                  <Plus size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Inscribe Neural Marker</span>
                </button>

                <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-[10px] font-black uppercase text-sleek-muted tracking-widest block">AI Creative Assistant</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Describe theme..." 
                            className="flex-1 bg-black/20 border border-sleek-border rounded-lg px-3 py-2 text-[10px] font-mono uppercase tracking-widest focus:border-sleek-accent/50 focus:ring-0"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') generateTitles(e.currentTarget.value);
                            }}
                        />
                        <button 
                           onClick={(e) => {
                             const input = e.currentTarget.parentElement?.querySelector('input');
                             if (input) generateTitles(input.value);
                           }}
                           disabled={isGenerating}
                           className="px-4 py-2 bg-sleek-accent text-white rounded-lg text-[10px] uppercase font-black hover:scale-105 transition-all"
                        >
                          {isGenerating ? "..." : "Forge"}
                        </button>
                    </div>
                    
                    {suggestions.length > 0 && (
                    <div className="space-y-2">
                      {suggestions.map((s, i) => (
                        <button 
                            key={i} 
                            onClick={() => {
                                // Add overlay with suggested text
                                addTextOverlay();
                                // Wait for it to be added? No, simple approach is add now and update it...
                                // Actually, let's just update the last added overlay.
                                setSegments(prev => prev.map((seg, idx) => {
                                    if (idx !== activeSegmentIndex) return seg;
                                    const lastOverlay = seg.textOverlays[seg.textOverlays.length - 1];
                                    return {
                                        ...seg,
                                        textOverlays: seg.textOverlays.map(o => o.id === lastOverlay.id ? { ...o, text: s } : o)
                                    };
                                }));
                            }}
                            className="w-full text-left p-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-medium text-white hover:bg-sleek-accent/20 transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    )}
                </div>

                <div className="space-y-3">
                  {activeSegment.textOverlays.map(overlay => (
                    <div key={overlay.id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <input 
                          type="text"
                          value={overlay.text}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSegments(prev => prev.map((s, idx) => {
                              if (idx !== activeSegmentIndex) return s;
                              return {
                                ...s,
                                textOverlays: s.textOverlays.map(o => o.id === overlay.id ? { ...o, text: val } : o)
                              };
                            }));
                          }}
                          className="bg-transparent border-none p-0 text-[11px] font-black uppercase text-white focus:ring-0 w-32"
                        />
                        <button 
                          onClick={() => {
                            setSegments(prev => prev.map((s, idx) => {
                              if (idx !== activeSegmentIndex) return s;
                              return {
                                ...s,
                                textOverlays: s.textOverlays.filter(o => o.id !== overlay.id)
                              };
                            }));
                          }}
                          className="text-white/20 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-sleek-muted uppercase">Size</span>
                          <input 
                            type="range" 
                            min={12} 
                            max={72} 
                            value={overlay.fontSize}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setSegments(prev => prev.map((s, idx) => {
                                    if (idx !== activeSegmentIndex) return s;
                                    return {
                                        ...s,
                                        textOverlays: s.textOverlays.map(o => o.id === overlay.id ? { ...o, fontSize: val } : o)
                                    };
                                }));
                            }}
                            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-sleek-accent"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-sleek-muted uppercase">V-Pos</span>
                          <input 
                            type="range" 
                            min={0} 
                            max={100} 
                            value={overlay.y}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setSegments(prev => prev.map((s, idx) => {
                                    if (idx !== activeSegmentIndex) return s;
                                    return {
                                        ...s,
                                        textOverlays: s.textOverlays.map(o => o.id === overlay.id ? { ...o, y: val } : o)
                                    };
                                }));
                            }}
                            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-sleek-accent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === 'arrange' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase text-sleek-muted tracking-widest">Assembly Line</label>
                  <span className="text-[8px] font-bold text-sleek-accent bg-sleek-accent/10 px-2 py-0.5 rounded-full uppercase">
                    {segments.length} CLIPS
                  </span>
                </div>
                
                <div className="space-y-3">
                  {segments.map((seg, idx) => (
                    <div 
                      key={seg.id}
                      onClick={() => setActiveSegmentIndex(idx)}
                      className={cn(
                        "p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all",
                        activeSegmentIndex === idx 
                          ? "bg-sleek-accent/10 border-sleek-accent/30 translate-x-1" 
                          : "bg-black/20 border-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="w-16 aspect-video bg-black rounded border border-white/5 overflow-hidden">
                        <video src={seg.url} className="w-full h-full object-cover opacity-50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black text-white uppercase truncate">Clip {idx + 1}</div>
                        <div className="text-[8px] text-sleek-muted uppercase">{(seg.endTime - seg.startTime).toFixed(1)}s segment</div>
                      </div>
                      {segments.length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSegments(prev => prev.filter((_, i) => i !== idx));
                            if (activeSegmentIndex >= idx) setActiveSegmentIndex(Math.max(0, activeSegmentIndex - 1));
                          }}
                          className="text-white/20 hover:text-red-400"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                  

                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Timeline Footer */}
      <footer className="mt-8 h-24 bg-sleek-surface rounded-3xl border border-sleek-border flex items-center px-12 gap-8 relative overflow-hidden">
        <div className="flex-1 h-12 bg-black/40 rounded-xl relative border border-white/5 flex items-center p-2 gap-1 overflow-x-auto no-scrollbar">
          {segments.map((seg, idx) => (
            <div 
              key={seg.id}
              style={{ flexGrow: seg.endTime - seg.startTime }}
              className={cn(
                "h-full rounded-md border text-[8px] font-black uppercase flex items-center justify-center transition-all px-4",
                activeSegmentIndex === idx 
                  ? "bg-sleek-accent/20 border-sleek-accent/40 text-sleek-accent" 
                  : "bg-white/5 border-white/10 text-sleek-muted"
              )}
            >
              SEG-{idx + 1}
            </div>
          ))}
        </div>
        
        <div className="w-32 text-right">
          <div className="text-[10px] font-black text-white uppercase tracking-tighter">
            {segments.reduce((acc, s) => acc + (s.endTime - s.startTime), 0).toFixed(1)}s Total
          </div>
          <div className="text-[8px] font-bold text-sleek-muted uppercase tracking-[0.2em]">Sequence Runtime</div>
        </div>
      </footer>
    </motion.div>
  );
}
