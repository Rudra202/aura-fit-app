"use client";
import { useState } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { sender: "ai", text: "Hello! I am your real-time Gemini Fitness Coach. Drop your health goals, parameters, or ask for a nutritional macro breakdown!" }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    const userMessage = { sender: "user", text: inputVal };
    setMessages((prev) => [...prev, userMessage]);
    const memoInput = inputVal;
    setInputVal("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: memoInput, contextType: "chatbot" })
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: "I ran into a server communication block. Please try again." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Network latency error reaching model endpoints." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999]">
      <button onClick={() => setIsOpen(!isOpen)} className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg text-neutral-950 hover:scale-105 active:scale-95 transition-transform">
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="absolute bottom-16 right-0 flex h-[500px] w-[360px] flex-col rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 bg-neutral-950 px-4 py-4 border-b border-neutral-800">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20"><Bot className="h-5 w-5" /></div>
              <div>
                <h3 className="text-sm font-semibold text-white">AuraFit AI Engine</h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1">● Gemini 2.5 Flash Live</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 border whitespace-pre-wrap ${msg.sender === "user" ? "bg-emerald-500 text-neutral-950 border-emerald-600 font-medium" : "bg-neutral-950 text-neutral-300 border-neutral-800"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-950 text-neutral-500 border border-neutral-800 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-500" /> AI Coach is generating...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-neutral-950/50 border-t border-neutral-800/80 flex gap-2">
              <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} disabled={loading} placeholder="Ask about workouts, meal macro tracks..." className="flex-1 rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 placeholder:text-neutral-600" />
              <button type="submit" disabled={loading} className="rounded-xl bg-emerald-500 p-2.5 text-neutral-950 hover:bg-emerald-400"><Send className="h-4 w-4" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}