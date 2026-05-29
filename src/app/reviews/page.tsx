"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Send, CheckCircle, Flame, Hourglass, HelpCircle } from "lucide-react";

export default function ReviewsRoadmapPage() {
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"done" | "cooking" | "next">("done");

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setSuggestion("");
      setSubmitted(false);
    }, 2500);
  };

  // Modernized Roadmap Content Feed Object
  const roadmapData = {
    done: [
      { tag: "Core AI", title: "Gemini 2.5 Active Atlas v2.0", desc: "Real-time generative muscle target mapping engine capable of delivering 7 biomechanical exercise targets instantly with row-swapping logic.", status: "Deployed" },
      { tag: "Biometrics", title: "Central Fitness Biometrics Pipeline", desc: "Secure dashboard tracking user profile metrics (height, weight, physical limitations) that actively context-feeds your AI assistants.", status: "Deployed" },
      { tag: "Diet", title: "Macro Nutrition Core Suite", desc: "Dynamic, precision BMR metabolic tracking paired with customized single-ingredient micro adjustments.", status: "Deployed" }
    ],
    cooking: [
      { tag: "Database", title: "Buddy Sync Real-Time Hooks", desc: "Wiring active table listening parameters into public Supabase profile layers so shared workouts populate automatically.", progress: "75% Syncing" },
      { tag: "UX Mod", title: "Floating AI Assistant Memory Cache", desc: "Injecting memory hooks into the site context so closing your chat bubble doesn't reset your text logs.", progress: "40% Implemented" }
    ],
    next: [
      { tag: "Voice AI", title: "Hands-Free Voice Coach Integrations", desc: "Direct audio-stream pipeline allowing you to chat with AuraFit AI during live heavy lifts without typing.", timeline: "Q3 Release" },
      { tag: "Hardware", title: "Wearable Sync Architecture API", desc: "Native cloud access structures reading daily active calorie metrics and baseline cardiovascular telemetry.", timeline: "Q4 Release" }
    ]
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 antialiased font-sans p-6 md:p-12">
      <div className="mx-auto max-w-3xl">
        
        {/* Sleek Minimalist Back Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-emerald-400 mb-12 transition-colors tracking-wide uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Core System
        </Link>

        {/* Title Presentation */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold uppercase tracking-widest">
            <Sparkles className="h-3 w-3 animate-pulse" /> Platform Evolutionary Log
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">System Status & Changelog</h1>
          <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
            Monitor platform engine updates, check system implementations, and submit functional product ideas directly to the queue.
          </p>
        </div>

        {/* PREMIUM GLASSMORPHIC SUGGESTION BAR */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/20 p-6 mb-12 backdrop-blur-md">
          <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="text-sm font-bold text-white tracking-wide mb-1">Ecosystem Suggestion Box</h3>
          <p className="text-xs text-neutral-500 mb-4">Missing a tool? Request custom tracker updates or layout splits directly.</p>
          
          <form onSubmit={handleSuggestionSubmit} className="relative flex items-center">
            <input 
              type="text" required value={suggestion} disabled={submitted}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Suggest a feature... (e.g., Water track counter, Sleep timer)"
              className="w-full rounded-xl bg-neutral-950/80 border border-neutral-800 px-4 py-3.5 pr-36 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-emerald-500/60 transition-all disabled:opacity-40"
            />
            <button
              type="submit" disabled={submitted || !suggestion.trim()}
              className="absolute right-2 px-4 py-2 rounded-lg bg-white text-neutral-950 text-xs font-black tracking-wide hover:bg-neutral-200 active:scale-95 transition-all flex items-center gap-1.5 disabled:bg-neutral-900 disabled:text-neutral-600"
            >
              {submitted ? "Logged ✓" : <>Send <Send className="h-3 w-3" /></>}
            </button>
          </form>
        </div>

        {/* TAB CONTROLLERS BAR */}
        <div className="flex border-b border-neutral-900 gap-6 mb-8">
          <button 
            onClick={() => setActiveTab("done")}
            className={`pb-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === "done" ? "border-emerald-400 text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
          >
            What's New ({roadmapData.done.length})
          </button>
          <button 
            onClick={() => setActiveTab("cooking")}
            className={`pb-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === "cooking" ? "border-amber-400 text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
          >
            In The Oven ({roadmapData.cooking.length})
          </button>
          <button 
            onClick={() => setActiveTab("next")}
            className={`pb-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === "next" ? "border-purple-400 text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
          >
            Next Up ({roadmapData.next.length})
          </button>
        </div>

        {/* FEED ANIMATED LIST OUTPUT */}
        <div className="space-y-4 min-h-[300px]">
          
          {/* TAB A: COMPLETED ITEMS */}
          {activeTab === "done" && roadmapData.done.map((item, i) => (
            <div key={i} className="group rounded-xl border border-neutral-900 bg-neutral-900/10 p-5 flex items-start gap-4 hover:border-neutral-800/60 transition-all duration-300">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 text-emerald-400 mt-0.5 shrink-0">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{item.tag}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">{item.status}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            </div>
          ))}

          {/* TAB B: ACTIVE BUILD CHANNELS */}
          {activeTab === "cooking" && roadmapData.cooking.map((item, i) => (
            <div key={i} className="group rounded-xl border border-neutral-900 bg-neutral-900/10 p-5 flex items-start gap-4 hover:border-neutral-800/60 transition-all duration-300">
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2 text-amber-400 mt-0.5 shrink-0">
                <Flame className="h-4 w-4 animate-pulse" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{item.tag}</span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">{item.progress}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            </div>
          ))}

          {/* TAB C: INITIATIONS NEXT UP */}
          {activeTab === "next" && roadmapData.next.map((item, i) => (
            <div key={i} className="group rounded-xl border border-neutral-900 bg-neutral-900/10 p-5 flex items-start gap-4 hover:border-neutral-800/60 transition-all duration-300">
              <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-2 text-purple-400 mt-0.5 shrink-0">
                <Hourglass className="h-4 w-4" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{item.tag}</span>
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">{item.timeline}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}