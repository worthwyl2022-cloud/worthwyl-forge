import React, { useEffect, useState } from "react";
import { Lock, ArrowRight, AlertTriangle, Eye, EyeOff, Check, ShieldCheck } from "lucide-react";

interface AccessGateProps {
  children: React.ReactNode;
}

type AccessStatus = {
  enabled: boolean;
  authenticated: boolean;
};

export function AccessGate({ children }: AccessGateProps) {
  const [status, setStatus] = useState<AccessStatus>({ enabled: true, authenticated: false });
  const [inputCode, setInputCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/access/status", { credentials: "same-origin" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Access status unavailable");
        return (await res.json()) as AccessStatus;
      })
      .then((next) => {
        if (!cancelled) setStatus(next);
      })
      .catch(() => {
        if (!cancelled) {
          setStatus({ enabled: true, authenticated: false });
          setErrorMsg("Access service unavailable. The Studio will not bypass its protection locally.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleUnlock = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (unlocking) return;
    setUnlocking(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/access/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ code: inputCode })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Authorization failed");
      setStatus({ enabled: Boolean(data.enabled), authenticated: Boolean(data.authenticated) });
      setInputCode("");
      setSuccessMsg("Authenticated session established.");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Authorization failed");
    } finally {
      setUnlocking(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen w-full bg-[#050508] text-white flex items-center justify-center font-mono text-xs">Verifying Studio access boundary…</div>;
  }

  if (!status.enabled || status.authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen w-full bg-[#050508] text-white flex items-center justify-center p-4 relative overflow-y-auto font-sans select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.12)_0%,transparent_65%)] pointer-events-none" />
      <div className="max-w-md w-full relative z-10 bg-[#0a0a0f] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Lock size={28} />
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25">
            Confidential Technical Diligence Portal
          </span>
          <h1 className="text-xl font-black tracking-tight text-white mt-3 mb-1">WORTHWYL STUDIO</h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Server-backed access control for the acquisition and engineering workspace. No client-side credential is trusted.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Authorization Key</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter authorization key…"
              autoFocus
              autoComplete="current-password"
              className="w-full bg-black/70 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-mono"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-1" aria-label={showPassword ? "Hide authorization key" : "Show authorization key"}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errorMsg && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
              <Check size={14} className="shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <button type="submit" disabled={unlocking || !inputCode.trim()} className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 disabled:opacity-50 text-black font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2">
            <span>{unlocking ? "Verifying…" : "Authorize & Enter Studio"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-neutral-500">
          <ShieldCheck size={13} className="text-emerald-400" />
          Server-side session • HttpOnly cookie • no browser credential storage
        </div>
      </div>
    </div>
  );
}
