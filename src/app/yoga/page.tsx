"use client";
import Link from "next/link";
import { ArrowLeft, Activity, Target, Flame, BrainCircuit } from "lucide-react";

const fitnessPoses = [
  { title: "Utkatasana (Chair Pose)", utility: "Engages lower body quad power, loads the gluteal muscles, and spikes heart rate.", metrics: "Hold 45s • 3 sets" },
  { title: "Chaturanga Dandasana (Staff Pose)", utility: "Builds muscle tissue across pectorals, anterior deltoids, and deep core.", metrics: "Hold 20s • 4 sets" },
  { title: "Virabhadrasana III (Warrior 3)", utility: "Forces total unilateral leg stability, activating hamstrings and spinal erectors.", metrics: "Hold 30s • 3 sets" },
  { title: "Navasana (Boat Pose)", utility: "Directly isolates the rectus abdominis and hip flexors for midsection power.", metrics: "Hold 40s • 3 sets" },
  { title: "Phalakasana (High Plank)", utility: "Creates total body isometric tension across back, core, and shoulders.", metrics: "Hold 60s • 3 sets" }
];

const focusPoses = [
  { title: "Vrikshasana (Tree Pose)", utility: "Triggers intense mental clarity by forcing visual tracking on a single steady point.", metrics: "5 breaths • 3 sets" },
  { title: "Garudasana (Eagle Pose)", utility: "Demands precise balance coordination and calms central nervous system over-firing.", metrics: "45s a side • 2 sets" },
  { title: "Natarajasana (Dancer's Pose)", utility: "Combines back extension with balancing to promote sharp cognitive control.", metrics: "30s a side • 3 sets" },
  { title: "Kakasana (Crow Pose)", utility: "Demands total present-moment body awareness, balance, and arm stability.", metrics: "Max hold • 4 tries" },
  { title: "Sirshasana (Supported Headstand)", utility: "Reverses circulatory patterns, increasing oxygen supply directly to the brain.", metrics: "Hold 30s • 1 set" }
];

export default function YogaPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Ecosystem
        </Link>

        {/* SECTION 1: FAT LOSS & BULKING */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Fat Loss & Muscle Building Flows</h1>
            <p className="text-xs text-neutral-400 mt-0.5">High-metabolic isometric triggers to burn calories and build full-body tension stability.</p>
          </div>
        </div>

        <div className="grid gap-4 mb-12">
          {fitnessPoses.map((pose, idx) => (
            <div key={idx} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" /> {pose.title}
                </h3>
                <p className="text-sm text-neutral-400 max-w-2xl">{pose.utility}</p>
              </div>
              <span className="text-xs font-bold bg-neutral-950 text-emerald-400 border border-neutral-800 px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0 text-center">
                {pose.metrics}
              </span>
            </div>
          ))}
        </div>

        {/* SECTION 2: FOCUS */}
        <div className="flex items-center gap-3 mb-6 pt-6 border-t border-neutral-900">
          <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400 border border-purple-500/20">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Neuromuscular & Cognitive Focus Flows</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Balance-intensive calibration tracks to optimize concentration and center mental focus.</p>
          </div>
        </div>

        <div className="grid gap-4">
          {focusPoses.map((pose, idx) => (
            <div key={idx} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-400" /> {pose.title}
                </h3>
                <p className="text-sm text-neutral-400 max-w-2xl">{pose.utility}</p>
              </div>
              <span className="text-xs font-bold bg-neutral-950 text-purple-400 border border-neutral-800 px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0 text-center">
                {pose.metrics}
              </span>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}