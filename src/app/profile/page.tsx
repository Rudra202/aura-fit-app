"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, User, Scale, Activity, Heart, ShieldAlert, Sparkles } from "lucide-react";
import { createClient } from "@/utils/supabase";

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Form State Values
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("Muscle Gain");
  const [bodyFat, setBodyFat] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [injuries, setInjuries] = useState("");

  // Simple Calculator Helper State
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) {
        setFullName(data.full_name || "");
        setAge(data.age?.toString() || "");
        setHeight(data.height?.toString() || "");
        setWeight(data.current_weight?.toString() || "");
        setTargetWeight(data.target_weight?.toString() || "");
        setFitnessGoal(data.fitness_goal || "Muscle Gain");
        setBodyFat(data.body_fat?.toString() || "");
        setMedicalHistory(data.medical_history || "");
        setInjuries(data.injuries || "");
      }
    }
    setLoading(false);
  };

  // Navy Circumference Body Fat Estimation Equation Formula
  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    if (!h || !w || !n) {
      alert("Please enter height, waist, and neck measurements first!");
      return;
    }
    // Estimated baseline metric equation
    const calculatedFat = Math.round(495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450);
    setBodyFat(Math.max(3, Math.min(50, calculatedFat)).toString());
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);

    const calculatedCalories = fitnessGoal === "Muscle Gain" 
      ? Math.round(parseFloat(weight) * 33) 
      : Math.round(parseFloat(weight) * 24);

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      full_name: fullName,
      age: parseInt(age) || null,
      height: parseFloat(height) || null,
      current_weight: parseFloat(weight) || null,
      target_weight: parseFloat(targetWeight) || null,
      fitness_goal: fitnessGoal,
      body_fat: parseFloat(bodyFat) || null,
      medical_history: medicalHistory,
      injuries: injuries,
      daily_calories_target: calculatedCalories || 2000,
      updated_at: new Date().toISOString()
    });

    setSaving(false);
    if (error) alert(error.message);
    else alert("Biometrics successfully synchronized across the ecosystem!");
  };

  if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">Loading Biometrics...</div>;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Ecosystem
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight mb-8 flex items-center gap-2">
          <User className="text-emerald-500 h-8 w-8" /> Central Biometrics Engine
        </h1>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Parameters */}
          <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2"><Scale className="h-4 w-4" /> Physiological Dimensions</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Age (Years)</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Current Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Ideal Target Weight (kg)</label>
                <input type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Primary Fitness Goal</label>
                <select value={fitnessGoal} onChange={(e) => setFitnessGoal(e.target.value)} className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500">
                  <option value="Muscle Gain">Muscle Gain (Hypertrophy)</option>
                  <option value="Weight Loss">Weight Loss (Deficit Toning)</option>
                  <option value="Endurance">Cardio Endurance</option>
                </select>
              </div>
            </div>

            {/* Health and Medical Issues Section */}
            <div className="pt-4 border-t border-neutral-800/60 space-y-4">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5"><Heart className="h-4 w-4" /> Medical History & Restrictions</h3>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Medical Background / Chronic Issues</label>
                <textarea value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} placeholder="e.g. Asthma, Hypertension, None" className="w-full h-16 rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 placeholder:text-neutral-700" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Active Injuries / Movement Limitations</label>
                <textarea value={injuries} onChange={(e) => setInjuries(e.target.value)} placeholder="e.g. Lumbar lower back strain, Left shoulder impingement" className="w-full h-16 rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 placeholder:text-neutral-700" />
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-neutral-950 hover:bg-emerald-400 transition-all">
              {saving ? "Synchronizing..." : "Save & Broadcast Biometrics"}
            </button>
          </div>

          {/* Fat Percentage Calculator Side Container */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/20 p-6 space-y-4 h-fit">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5"><Activity className="h-4 w-4" /> Body Fat Calculator</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">Waist Circumference (cm)</label>
                <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs text-white focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">Neck Circumference (cm)</label>
                <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs text-white focus:outline-none" />
              </div>
              <button type="button" onClick={calculateBodyFat} className="w-full rounded-lg bg-amber-500/10 border border-amber-500/30 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3" /> Execute Estimation
              </button>
            </div>
            <div className="pt-3 border-t border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest block">Calculated Value</span>
              <span className="text-3xl font-black text-white mt-1 block">{bodyFat || "0"}%</span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}