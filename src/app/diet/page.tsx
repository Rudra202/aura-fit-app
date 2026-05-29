"use client";
import { useState } from "react";
import Link from "next/link";
import { Apple, ArrowLeft, Leaf, Flame, Sparkles, Scale, MessageSquare } from "lucide-react";

export default function DietPage() {
  const [diet, setDiet] = useState("Non-Veg");
  const [calories, setCalories] = useState(2000);
  const [selectiveFoods, setSelectiveFoods] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  // Dynamic Macro Breakdown Engine
  const proteinGrams = Math.round((calories * 0.30) / 4);
  const carbGrams = Math.round((calories * 0.40) / 4);
  const fatGrams = Math.round((calories * 0.30) / 9);

  const handleGenerate = () => {
    const userIngredients = selectiveFoods.trim() 
      ? ` incorporating your preferred selections: "${selectiveFoods}"`
      : "";

    setGeneratedPlan({
      breakfast: {
        title: "Breakfast (Target: " + Math.round(calories * 0.25) + " kcal)",
        desc: selectiveFoods.toLowerCase().includes("oat") || selectiveFoods.toLowerCase().includes("egg")
          ? `Custom breakfast built focusing on your preferred choices: ${selectiveFoods}. Balanced carefully with almond milk and matching clean whey additions.`
          : `High-performance tracking breakfast${userIngredients}. Clean complex carbohydrates matched with targeted fat baselines.`,
        p: Math.round(proteinGrams * 0.25), c: Math.round(carbGrams * 0.25), f: Math.round(fatGrams * 0.25)
      },
      lunch: {
        title: "Lunch (Target: " + Math.round(calories * 0.40) + " kcal)",
        desc: selectiveFoods.trim()
          ? `Main course macro-allocation completely maximizing ${selectiveFoods}. Served over a baseline of dynamic grains and leafy greens.`
          : (diet === "Veg" 
              ? "Pan-seared cubed tofu tossed with quinoa, steamed broccoli, edamame, and 1 tbsp of olive oil." 
              : "Grilled spiced chicken breast served alongside brown rice, avocado slices, and mixed green leaf salad."),
        p: Math.round(proteinGrams * 0.40), c: Math.round(carbGrams * 0.40), f: Math.round(fatGrams * 0.40)
      },
      dinner: {
        title: "Dinner (Target: " + Math.round(calories * 0.35) + " kcal)",
        desc: diet === "Veg"
          ? `Thick recovery lentil stew customized${userIngredients}, served with warm roasted sweet potato mash.`
          : `Baked garlic salmon or protein fillet optimized${userIngredients}, paired with steamed asparagus strings.`,
        p: Math.round(proteinGrams * 0.35), c: Math.round(carbGrams * 0.35), f: Math.round(fatGrams * 0.35)
      }
    });
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Ecosystem
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/20">
            <Apple className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Macro Diet Customizer</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Controls Card */}
          <div className="lg:col-span-1 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-400 block mb-3">Select Diet Preference</label>
              <div className="grid grid-cols-3 gap-2">
                {["Veg", "Non-Veg", "Vegan"].map((type) => (
                  <button
                    key={type} onClick={() => setDiet(type)}
                    className={`py-2.5 rounded-xl font-medium border text-xs transition-all ${
                      diet === type 
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" 
                        : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-neutral-400 mb-2">
                <span>Target Energy</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><Flame className="h-4 w-4" /> {calories} kcal</span>
              </div>
              <input 
                type="range" min="1200" max="4000" step="100" 
                value={calories} onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Selective Food Suggestion Input Box */}
            <div>
              <label className="text-sm font-medium text-neutral-400 block mb-2 flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-amber-400" /> Prefer Specific Foods?
              </label>
              <input 
                type="text"
                placeholder="e.g., oats, chicken, paneer, fish"
                value={selectiveFoods}
                onChange={(e) => setSelectiveFoods(e.target.value)}
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
              />
            </div>

            <button 
              onClick={handleGenerate}
              className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-neutral-950 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" /> Generate Contextual Plan
            </button>
          </div>

          {/* Macro Breakdown Panel */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/20 p-6">
            <h3 className="text-sm font-medium text-neutral-400 flex items-center gap-1.5 mb-4"><Scale className="h-4 w-4 text-emerald-500" /> Continuous Day Target Allocations</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-neutral-950 rounded-xl p-3 border border-neutral-800/80">
                <span className="text-xs text-neutral-500 block uppercase font-bold tracking-wider">Protein (30%)</span>
                <span className="text-xl font-bold text-white mt-1 block">{proteinGrams}g</span>
              </div>
              <div className="bg-neutral-950 rounded-xl p-3 border border-neutral-800/80">
                <span className="text-xs text-neutral-500 block uppercase font-bold tracking-wider">Carbs (40%)</span>
                <span className="text-xl font-bold text-white mt-1 block">{carbGrams}g</span>
              </div>
              <div className="bg-neutral-950 rounded-xl p-3 border border-neutral-800/80">
                <span className="text-xs text-neutral-500 block uppercase font-bold tracking-wider">Fats (30%)</span>
                <span className="text-xl font-bold text-white mt-1 block">{fatGrams}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Meal Profile Display Output */}
        {generatedPlan && (
          <div className="mt-8 space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white">Your Custom Ingredient Meal Breakdown</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(generatedPlan).map(([key, data]: any) => (
                <div key={key} className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-bold text-emerald-400 block border-b border-neutral-800 pb-2 mb-3">{data.title}</span>
                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">{data.desc}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-neutral-800/60 text-[11px] font-bold text-center">
                    <div className="bg-neutral-950 text-neutral-400 py-1 rounded">P: <span className="text-white">{data.p}g</span></div>
                    <div className="bg-neutral-950 text-neutral-400 py-1 rounded">C: <span className="text-white">{data.c}g</span></div>
                    <div className="bg-neutral-950 text-neutral-400 py-1 rounded">F: <span className="text-white">{data.f}g</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}