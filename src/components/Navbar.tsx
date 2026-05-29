"use client";
import { useState, useEffect } from "react";
import { Dumbbell, LogOut, User } from "lucide-react";
import { createClient } from "@/utils/supabase";

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) alert(error.message);
      else alert("Check your email for the confirmation link!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else setShowModal(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-neutral-800/50 bg-neutral-950/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold tracking-wider text-white">
              AURAFIT<span className="text-emerald-500">.AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-300 hidden sm:inline flex items-center gap-1">
                  <User className="h-4 w-4 text-emerald-500" /> {user.user_metadata?.full_name || user.email}
                </span>
                <button 
                  onClick={() => supabase.auth.signOut()} 
                  className="flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-neutral-950 hover:bg-emerald-400 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Pop-up Auth Modal Box - Dead Centered */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop Shadow Blur Layer */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
            onClick={() => setShowModal(false)} 
          />
          
          {/* Form Card Content Window */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8 shadow-2xl transition-all flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <input
                  type="text" 
                  placeholder="Full Name" 
                  required
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                />
              )}
              <input
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password" 
                placeholder="Password" 
                required
                className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-600"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="submit" 
                className="w-full rounded-xl bg-emerald-500 py-3 mt-2 font-semibold text-neutral-950 hover:bg-emerald-400 transition-all duration-200 active:scale-95 shadow-md"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            
            <p className="text-sm text-neutral-400 text-center mt-6">
              {isSignUp ? "Already have an account?" : "New to AuraFit?"}{" "}
              <button 
                onClick={() => setIsSignUp(!isSignUp)} 
                type="button" 
                className="text-emerald-400 font-medium underline underline-offset-4 hover:text-emerald-300 transition-colors"
              >
                {isSignUp ? "Sign In" : "Create one"}
              </button>
            </p>
            
            <button 
              onClick={() => setShowModal(false)} 
              type="button" 
              className="mt-6 w-full text-xs text-neutral-500 hover:text-neutral-300 transition-colors tracking-wide"
            >
              Cancel & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}