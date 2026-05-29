import Link from "next/link";
import { Apple, Activity, Star, Users, User, Layers, ShieldCheck } from "lucide-react";

const interactiveItems = [
  { name: "Central Biometrics", desc: "Update height, weight & injuries", icon: User, color: "text-emerald-400", path: "/profile" },
  { name: "Diet Customizer", desc: "Tailored nutritional profiles", icon: Apple, color: "text-amber-400", path: "/diet" },
  { name: "Exercise Atlas", desc: "Target custom muscle splits & swaps", icon: Layers, color: "text-teal-400", path: "/atlas" },
  { name: "Yoga & Flow", desc: "Postures, flexibility, metrics", icon: Activity, color: "text-purple-400", path: "/yoga" },
  { name: "Live Reviews", desc: "Real-time client transformations", icon: Star, color: "text-yellow-400", path: "/reviews" },
  { name: "Buddy Check", desc: "Compare logs with friends", icon: Users, color: "text-blue-400", path: "/buddy" },
];

export default function QuickMenu() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {interactiveItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900/80"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-xl bg-neutral-950 p-3 ${item.color} border border-neutral-800 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                  <p className="text-sm text-neutral-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Brand New Status Badge Replacement (No Checkout Needed!) */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-left">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-neutral-950 p-3 text-emerald-400 border border-neutral-800">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-1.5">
                All Access Unlocked
              </h3>
              <p className="text-sm text-emerald-400/70 mt-0.5">Free Sandbox Mode Active</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}