import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuickMenu from "@/components/QuickMenu";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer"; // Import Footer

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <QuickMenu />
      
      {/* The Global Footer sits safely at the absolute bottom */}
      <Footer />
      
      {/* Floating Chat Engine Engine over view tracks */}
      <ChatBot />
    </main>
  );
}