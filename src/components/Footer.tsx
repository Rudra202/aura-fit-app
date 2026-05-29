import { Dumbbell, Shield, Zap, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-900">
          
          {/* Brand Identity Slot */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-bold tracking-wider text-white">AURAFIT<span className="text-emerald-500">.AI</span></span>
            </div>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              An intelligent, context-aware digital ecosystem connecting biometric parameters to custom training plans and real-time community accountability.
            </p>
          </div>

          {/* Quick Ecosystem Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/profile" className="hover:text-emerald-400 transition-colors">Biometrics</a></li>
              <li><a href="/diet" className="hover:text-emerald-400 transition-colors">Diet Customizer</a></li>
              <li><a href="/atlas" className="hover:text-emerald-400 transition-colors">Exercise Atlas</a></li>
              <li><a href="/buddy" className="hover:text-emerald-400 transition-colors">Buddy Sync</a></li>
            </ul>
          </div>

          {/* Core System Performance Metrics */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">System Status</h4>
            <div className="space-y-3 text-xs font-medium">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Zap className="h-3.5 w-3.5" /> AWS Amplify Edge Node Live
              </div>
              <div className="flex items-center gap-1.5 text-blue-400">
                <Shield className="h-3.5 w-3.5" /> Supabase Securing Encrypted
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-600 font-medium">
          <div>
            &copy; {new Date().getFullYear()} RUDRAJHA. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            build by RUDY<Heart className="h-3 w-3 text-red-500 fill-red-500" /> for peak performance.
          </div>
        </div>
      </div>
    </footer>
  );
}