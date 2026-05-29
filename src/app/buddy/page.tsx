"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Copy, Check, UserPlus, Loader2, Edit3, Save } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize standard production Supabase client instance layout
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BuddyPage() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // User Profile Name State Rows
  const [myId, setMyId] = useState("Fetching your unique ID...");
  const [myName, setMyName] = useState("AuraFit Athlete");
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  // Connections Layout States
  const [buddyInputId, setBuddyInputId] = useState("");
  const [connectedBuddies, setConnectedBuddies] = useState<any[]>([]);

  useEffect(() => {
    async function loadUserData() {
      // 1. Fetch current active session account profile metadata properties
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) {
        setMyId("No active session - Check login setup");
        return;
      }

      setMyId(user.id);

      // 2. Fetch custom nickname string parameters matching account row entry
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      if (profile?.display_name) {
        setMyName(profile.display_name);
        setNameInput(profile.display_name);
      } else {
        const seededName = user.email ? user.email.split("@")[0] : "AuraFit Athlete";
        setMyName(seededName);
        setNameInput(seededName);
        await supabase.from("profiles").upsert({ id: user.id, display_name: seededName });
      }

      // 3. Fetch interconnected synced tracking row list references 
      const { data: connections } = await supabase
        .from("buddy_connections")
        .select("buddy_id")
        .eq("user_id", user.id);

      if (connections) {
        const buddyIds = connections.map(c => c.buddy_id);
        if (buddyIds.length > 0) {
          const { data: buddyProfiles } = await supabase
            .from("profiles")
            .select("id, display_name")
            .in("id", buddyIds);
          setConnectedBuddies(buddyProfiles || []);
        }
      }
    }
    
    if (supabaseUrl && supabaseAnonKey) {
      loadUserData();
    }
  }, []);

  const handleUpdateName = async () => {
    if (!nameInput.trim()) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: myId, display_name: nameInput.trim() });

    if (!error) {
      setMyName(nameInput.trim());
      setIsEditingName(false);
    } else {
      alert("Error saving profile name configuration updates.");
    }
    setLoading(false);
  };

  const handleLinkBuddy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buddyInputId.trim()) return;
    setLoading(true);

    const { error } = await supabase
      .from("buddy_connections")
      .insert([{ user_id: myId, buddy_id: buddyInputId.trim() }]);

    if (error) {
      alert("Error linking profiles. Check ID signature formatting.");
    } else {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, display_name")
        .eq("id", buddyInputId.trim())
        .single();
      
      if (profile) {
        setConnectedBuddies(prev => [...prev, profile]);
      }
      setBuddyInputId("");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 p-6 md:p-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Ecosystem
        </Link>

        {/* Title Block Banner Headers */}
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400 border border-blue-500/20">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Buddy Sync Network</h1>
            <p className="text-xs text-neutral-400 mt-0.5">Compare logs, share training parameters, and coordinate status with workout partners.</p>
          </div>
        </div>

        {/* PROFILE NICKNAME UPDATE ENGINE SECTION CONTAINER CARD */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-black text-neutral-500 tracking-wider">Your Connected Identity Profile</span>
              {isEditingName ? (
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                    className="rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button onClick={handleUpdateName} className="p-2 rounded-lg bg-blue-500 text-neutral-950 hover:bg-blue-400">
                    <Save className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                  {myName}
                  <button onClick={() => setIsEditingName(true)} className="p-1 rounded text-neutral-500 hover:text-white transition-colors">
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </h2>
              )}
            </div>
            
            <button onClick={copyToClipboard} className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-2 transition-all">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />} 
              {copied ? "Copied ID!" : "Copy Sync Code ID"}
            </button>
          </div>

          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-900 text-xs font-mono text-neutral-500 truncate select-all">
            {myId}
          </div>
        </div>

        {/* PARTNER INPUT ACTION LINK FORMS SUBMITTER */}
        <form onSubmit={handleLinkBuddy} className="rounded-2xl border border-neutral-800 bg-neutral-900/20 p-5 flex flex-col sm:flex-row gap-3 items-center mb-8">
          <input 
            type="text" required value={buddyInputId} onChange={(e) => setBuddyInputId(e.target.value)}
            placeholder="Paste your partner's profile Sync Code ID string right here..."
            className="w-full flex-1 rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 placeholder:text-neutral-700"
          />
          <button type="submit" disabled={loading} className="w-full sm:w-auto rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-blue-400 flex items-center justify-center gap-2 shrink-0 disabled:bg-neutral-800">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} Link Partner Account
          </button>
        </form>

        {/* ACTIVE FRIENDS RENDER GRID CARDS DISPLAY */}
        <div>
          <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-3">Active Sync Partners ({connectedBuddies.length})</h3>
          {connectedBuddies.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-800 p-8 text-center text-sm text-neutral-500">
              No synced partners active on this profile. Share your code string above to start trading data loops!
            </div>
          ) : (
            <div className="grid gap-3">
              {connectedBuddies.map((buddy, index) => (
                <div key={index} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                      {buddy.display_name?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <span className="font-semibold text-white text-sm">{buddy.display_name}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md uppercase font-bold tracking-widest">
                    Live Connected
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}