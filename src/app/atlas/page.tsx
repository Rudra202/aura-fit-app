"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Dumbbell, RefreshCw, Layers, Loader2, Search, Sparkles } from "lucide-react";

export default function AtlasPage() {
  // Application starts with an active default layout state
  const [exercises, setExercises] = useState<any[]>([
    { id: "c1", name: "Incline Dumbbell Bench Press", utility: "Upper chest clavicular head isolation and hypertrophy development.", sets: "4 Sets x 10 Reps" },
    { id: "c2", name: "High-to-Low Cable Flyes", utility: "Sternal lower pectoral head definition and deep contraction isolation.", sets: "3 Sets x 15 Reps" },
    { id: "b1", name: "Weighted Wide-Grip Pullups", utility: "Latissimus dorsi width recruitment and scapular mechanics stabilization.", sets: "4 Sets x Failure" },
    { id: "a1", name: "Hanging Captains Chair Leg Raises", utility: "Lower rectus abdominis target recruitment and hip flexor management.", sets: "4 Sets x 15 Reps" }
  ]);

  const [searchTarget, setSearchTarget] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [rowInputs, setRowInputs] = useState<Record<string, string>>({});
  const [rowLoadingId, setRowLoadingId] = useState<string | null>(null);

  // 1. Core Generator Handler to fetch 6-7 exercises for ANY user-specified body part
  const handleLoadMuscleGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTarget.trim() || globalLoading) return;

    setGlobalLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: searchTarget,
          contextType: "atlas-load"
        })
      });

      const data = await res.json();
      if (res.ok && Array.isArray(data.reply)) {
        // Assigning clean temporary randomized unique string ids to guarantee rows swap safely
        const formatted = data.reply.map((item: any, idx: number) => ({
          ...item,
          id: `gen-${idx}-${Date.now()}`
        }));
        setExercises(formatted);
        setSearchTarget("");
      } else {
        alert("Failed to read model structure array. Try again.");
      }
    } catch (err) {
      alert("Network exception communicating with AI Studio endpoints.");
    } finally {
      setGlobalLoading(false);
    }
  };

  // 2. Row Handler to let you suggest alternative custom modifications on individual lines
  const handleIndividualSwap = async (exerciseId: string, currentName: string) => {
    const customAdjustment = rowInputs[exerciseId];
    if (!customAdjustment?.trim()) {
      alert("Type your swap reason first (e.g. 'bodyweight version' or 'hurts knees')!");
      return;
    }

    setRowLoadingId(exerciseId);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: customAdjustment,
          contextType: "exercise-swap",
          currentExercise: currentName
        })
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setExercises((prev) =>
          prev.map((ex) =>
            ex.id === exerciseId
              ? { ...ex, name: data.reply.name, utility: data.reply.utility, sets: data.reply.sets }
              : ex
          )
        );
        setRowInputs((prev) => ({ ...prev, [exerciseId]: "" }));
      }
    } catch (err) {
      alert("Connection timeout reaching Gemini.");
    } finally {
      setRowLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        
        {/* Banner Headers */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">AI Real-Time Exercise Atlas</h1>
              <p className="text-xs text-neutral-400 mt-0.5">Type any body part to build custom routines instantly using Google Gemini.</p>
            </div>
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleLoadMuscleGroup} className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-neutral-600" />
            <input 
              type="text" required
              value={searchTarget} onChange={(e) => setSearchTarget(e.target.value)}
              placeholder="Enter body part... (e.g., Triceps, Hamstrings, Lower Back, Core)"
              className="w-full rounded-xl bg-neutral-950 border border-neutral-800 pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
            />
          </div>
          <button 
            type="submit" disabled={globalLoading}
            className="w-full sm:w-auto rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shrink-0 disabled:bg-neutral-800"
          >
            {globalLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Load 7 Exercises
              </>
            )}
          </button>
        </form>

        {/* Dynamic Cards Map Output */}
        <div className="grid gap-4">
          {exercises.map((ex) => (
            <div key={ex.id} className="rounded-2xl border border-neutral-800 bg-neutral-900/20 p-5 md:p-6 space-y-4 hover:border-neutral-800/80 transition-colors animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-emerald-500" /> {ex.name}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1 leading-relaxed">{ex.utility}</p>
                </div>
                <span className="text-xs bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800/60 text-neutral-400 font-bold tracking-wide shrink-0">
                  {ex.sets}
                </span>
              </div>

              {/* Individual Row Swap Adjustment Control Input */}
              <div className="pt-3 border-t border-neutral-900/60 flex flex-col sm:flex-row gap-2">
                <input 
                  type="text" 
                  placeholder="Need a variation? (e.g., dumbbells only, no bench, make it easier)..."
                  value={rowInputs[ex.id] || ""} 
                  onChange={(e) => setRowInputs(prev => ({ ...prev, [ex.id]: e.target.value }))}
                  disabled={rowLoadingId === ex.id}
                  className="flex-1 rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder:text-neutral-700"
                />
                <button 
                  type="button"
                  onClick={() => handleIndividualSwap(ex.id, ex.name)}
                  disabled={rowLoadingId === ex.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-bold text-neutral-300 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition-all shrink-0 disabled:opacity-40"
                >
                  {rowLoadingId === ex.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />} Swap Move
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}