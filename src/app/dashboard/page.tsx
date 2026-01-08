"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Coffee, Moon, Sun, BookOpen, Clock, Flame, 
  TrendingUp, Star, Search, Bell,
  Play, ChevronRight, Scroll, Sparkles, Book
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";
import { ArchivalHeader } from "@/components/ui/ArchivalHeader";
import { FolioButton } from "@/components/ui/FolioButton";
import { ParchmentContainer } from "@/components/ui/ParchmentContainer";

const ARCHIVE_INVENTORY = [
  {
    title: "Neon Shadows",
    author: "Farhan Ali",
    progress: 65,
    color: "bg-[#1C2024]",
    lastRead: "2 hours ago"
  },
  {
    title: "The Silent Symphony",
    author: "Amina Rahman",
    progress: 12,
    color: "bg-[#1B3022]",
    lastRead: "Yesterday"
  },
  {
    title: "River's Song",
    author: "Nayeem Islam",
    progress: 90,
    color: "bg-[#4E3B31]",
    lastRead: "3 days ago"
  }
];

export default function DashboardPage() {
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light");

  const toggleTheme = () => {
    if (theme === "light") setTheme("sepia");
    else if (theme === "sepia") setTheme("dark");
    else setTheme("light");
  };

  React.useEffect(() => {
    document.documentElement.classList.remove("dark", "sepia");
    if (theme !== "light") {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const ledgerDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <main className="min-h-screen bg-paper pt-24 pb-16">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Scholar's Greeting */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-20">
          <div className="max-w-2xl">
            <ManuscriptBadge icon={<Book className="h-4 w-4" />} className="mb-6">
              Scholar Registry
            </ManuscriptBadge>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-ink leading-tight">Greetings, Master Reader.</h1>
            <p className="text-ink-muted mt-6 text-xl font-medium italic leading-relaxed">
              Your dedication is noted in the annals. You've preserved <span className="text-accent font-bold">42 pages</span> of wisdom this week.
            </p>
          </div>
          
          <div className="flex items-center gap-6 w-full lg:w-auto">
             <div className="flex flex-1 lg:flex-none items-center gap-4">
               <button className="h-16 w-16 rounded-3xl bg-card border border-border flex items-center justify-center text-ink/20 hover:text-accent hover:border-accent transition-all shadow-sm">
                 <Search className="h-7 w-7" />
               </button>
               <button className="h-16 w-16 rounded-3xl bg-card border border-border flex items-center justify-center text-ink/20 hover:text-accent hover:border-accent transition-all shadow-sm relative">
                 <Bell className="h-7 w-7" />
                 <div className="absolute top-5 right-5 h-3 w-3 rounded-full bg-accent border-2 border-card shadow-lg" />
               </button>
             </div>
             <div className="h-16 w-16 rounded-3xl bg-ink flex items-center justify-center text-paper font-serif font-black text-2xl shadow-2xl border border-white/5">
                MD
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Central Archive (Active Reading) */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* Manuscripts in Progress */}
            <section>
              <div className="flex justify-between items-end mb-12">
                <div className="flex items-center gap-4">
                   <Scroll className="h-8 w-8 text-accent opacity-50" />
                   <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink tracking-tight">Active Manuscripts</h2>
                </div>
                <Link href="/marketplace" className="text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:underline flex items-center gap-2 group">
                  Access Vault <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {ARCHIVE_INVENTORY.slice(0, 2).map((folio, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="bg-card border border-border rounded-[56px] p-10 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative"
                  >
                    {/* Delicate Shine */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="flex gap-10 relative z-10">
                      <div className={cn(
                        "h-48 w-32 rounded-2xl shadow-2xl border border-black/10 group-hover:scale-105 transition-transform flex-shrink-0 relative overflow-hidden",
                        folio.color
                      )}>
                        <div className="absolute left-0 top-0 bottom-0 w-5 bg-black/10 border-r border-white/5" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Play className="h-12 w-12 text-paper fill-paper" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <h3 className="font-serif text-3xl font-bold text-ink leading-tight">{folio.title}</h3>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mt-3 italic">{folio.author}</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between text-[10px] font-black uppercase text-ink/30 tracking-widest">
                            <span>{folio.progress}% Preserved</span>
                            <span className="text-accent">Active Ledger</span>
                          </div>
                          <div className="h-2.5 w-full bg-paper rounded-full overflow-hidden border border-border shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${folio.progress}%` }}
                              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-accent shadow-[0_0_10px_rgba(184,134,11,0.3)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recommendations: The Scholar's Path */}
            <section>
              <div className="flex justify-between items-end mb-12">
                <div className="flex items-center gap-4">
                   <Sparkles className="h-8 w-8 text-accent opacity-50" />
                   <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink tracking-tight">The Scholar's Path</h2>
                </div>
                <div className="flex gap-4">
                  <button className="h-12 w-12 rounded-2xl bg-card border border-border flex items-center justify-center text-ink/20 cursor-not-allowed"><ChevronRight className="h-6 w-6 rotate-180" /></button>
                  <button className="h-12 w-12 rounded-2xl bg-card border border-border flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-all shadow-sm"><ChevronRight className="h-6 w-6" /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  { title: "Digital Fortress", category: "Historical Record" },
                  { title: "Old Dhaka Echoes", category: "Contemporary" },
                  { title: "The Silk Road", category: "Journey" },
                  { title: "Quantum Soul", category: "Philosophical" }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-[3/4] w-full rounded-2xl bg-paper border border-border shadow-sm group-hover:shadow-2xl group-hover:-translate-y-4 transition-all relative overflow-hidden mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.05]" />
                      <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-card/60 backdrop-blur-md flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-all shadow-xl">
                         <Star className="h-6 w-6 fill-accent" />
                      </div>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-ink group-hover:text-accent transition-colors leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-ink/40 font-black uppercase tracking-[0.3em] mt-3">{item.category}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Side Registry (Stats & Consistency) */}
          <div className="space-y-12">
            
            {/* Merit Medallion Card */}
            <div className="bg-ink rounded-[64px] p-12 text-paper shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 h-64 w-64 bg-accent/5 blur-[100px] rounded-full" />
               <div className="relative z-10">
                 <div className="flex items-center gap-5 mb-12">
                    <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                       <TrendingUp className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Focus Index</p>
                       <p className="text-3xl font-bold mt-2 font-serif text-accent">+24% Peak</p>
                    </div>
                 </div>

                 <div className="space-y-10">
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                          <span className="text-white/30 italic">Reading Odyssey</span>
                          <span className="text-accent">12/20 Volumes</span>
                       </div>
                       <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "60%" }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-accent rounded-full shadow-[0_0_20px_rgba(184,134,11,0.6)]" 
                          />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-accent transition-all">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Merit</p>
                          <p className="text-4xl font-bold mt-3">1,420</p>
                       </div>
                       <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-accent transition-all">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Streak</p>
                          <p className="text-4xl font-bold text-accent mt-3">14</p>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Consistency Ledger (Weekly Activity) */}
            <div className="bg-card border border-border rounded-[64px] p-12 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none group-hover:opacity-10 transition-opacity">
                  <Flame className="h-48 w-48 translate-x-1/4 -translate-y-1/4" />
               </div>
               <div className="flex items-center gap-4 mb-12">
                  <Flame className="h-7 w-7 text-accent" />
                  <h3 className="font-serif text-2xl font-bold text-ink tracking-tight">Consistency Ledger</h3>
               </div>
               <div className="flex justify-between items-end h-56 gap-5">
                  {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full rounded-t-2xl transition-all shadow-inner ${i === 6 ? 'bg-accent' : 'bg-ink/5 group-hover/bar:bg-accent/20'}`}
                      />
                      <span className="text-[10px] font-black text-ink/30 uppercase tracking-[0.3em]">{ledgerDays[i]}</span>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-50">
        <FolioButton 
           onClick={toggleTheme}
           className="h-16 w-16 p-0 bg-ink text-paper shadow-2xl"
        >
          {theme === "light" && <Coffee className="h-7 w-7" />}
          {theme === "sepia" && <Moon className="h-7 w-7" />}
          {theme === "dark" && <Sun className="h-7 w-7" />}
        </FolioButton>
      </div>
    </main>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
