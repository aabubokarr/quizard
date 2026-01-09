"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Users, Settings, BarChart3, Feather } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
// import { ParchmentContainer } from "@/components/ui/ParchmentContainer";
import { Button } from "@/components/ui/Button";

export default function ScribePortalPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-paper py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <PageHeader 
        badge="Creator Ecosystem"
        badgeIcon={<Feather className="h-4 w-4" />}
        title="Built for Modern Scribes."
        italicTitle=""
        description="Monitor your literary empire through a portal designed for focus, clarity, and sustainable growth."
        className="mb-20"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto bg-card rounded-[64px] shadow-[0_60px_120px_rgba(0,0,0,0.15)] border border-border overflow-hidden relative"
      >
        {/* Dashboard Header Bar */}
        <div className="h-16 bg-ink flex items-center px-10 border-b border-white/5">
           <div className="flex gap-2.5">
              <div className="h-3.5 w-3.5 rounded-full bg-accent/40" />
              <div className="h-3.5 w-3.5 rounded-full bg-white/10" />
              <div className="h-3.5 w-3.5 rounded-full bg-white/10" />
           </div>
           <div className="flex-1 text-center"><span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Studio.Boifinity.Archives</span></div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Elegant Sidebar */}
          <div className="w-full lg:w-24 bg-paper/50 border-b lg:border-b-0 lg:border-r border-border flex lg:flex-col items-center py-8 lg:py-12 justify-around lg:justify-start lg:gap-12">
            <div className="h-12 w-12 rounded-2xl bg-accent flex items-center justify-center text-paper font-serif font-black text-2xl shadow-xl">B</div>
            <div className="flex lg:flex-col gap-10 text-ink/20">
              <LayoutDashboard className="h-7 w-7 text-accent" />
              <BookOpen className="h-7 w-7 hover:text-ink transition-colors cursor-pointer" />
              <Users className="h-7 w-7 hover:text-ink transition-colors cursor-pointer" />
              <Settings className="h-7 w-7 hover:text-ink transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 p-8 md:p-16 bg-card relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-16">
              <div>
                <h3 className="text-3xl font-serif font-bold text-ink">Greetings, Scribe Rahman</h3>
                <p className="text-ink-muted text-base font-medium mt-2 italic">Your latest volume has seen <span className="text-accent font-bold">12% archival growth</span> today.</p>
              </div>
              <div className="flex items-center gap-3 bg-paper px-6 py-3 rounded-full border border-border shadow-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-ink text-[10px] font-black uppercase tracking-widest">Vault Status: Live</span>
              </div>
            </div>

            {/* Stats Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
              {[
                { label: "Archival Revenue", value: "৳ 842,000", change: "+8% Yield" },
                { label: "Patron Base", value: "14.2k", change: "+1.2k New" },
                { label: "Manuscript Reach", value: "248.5k", change: "+18% Engagement" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-paper p-10 rounded-[40px] border border-border group hover:border-accent hover:shadow-2xl transition-all shadow-sm">
                  <p className="text-ink-muted text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                  <p className="text-4xl font-bold text-ink mt-5">{stat.value}</p>
                  <span className="text-accent text-[10px] font-bold block mt-3 uppercase tracking-widest">{stat.change}</span>
                </div>
              ))}
            </div>

            {/* Engagement Lexicon Chart */}
            <div className="bg-paper rounded-[48px] border border-border p-10 md:p-12 shadow-sm">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                   <BarChart3 className="h-6 w-6 text-accent" />
                   <h4 className="text-ink font-bold font-serif text-2xl">Presence Analytics</h4>
                </div>
                <div className="flex gap-3">
                  {['24H', '7D', '30D'].map(t => (
                    <Button 
                      key={t} 
                      variant={t === '7D' ? 'primary' : 'ghost'}
                      size="sm"
                      className={`rounded-xl text-[10px] ${t !== '7D' && 'text-ink/20 hover:text-ink bg-transparent'}`}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-64 md:h-80 flex items-end gap-3 md:gap-5 px-4 overflow-hidden">
                {[45, 75, 50, 95, 70, 85, 60, 100, 80, 90, 65, 110].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(h/110) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 bg-gradient-to-t from-accent/5 to-accent/40 rounded-t-xl hover:to-accent transition-all cursor-pointer relative group"
                  >
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-ink text-paper text-[8px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">{h}% Reach</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background Decorative Feather */}
      <div className="absolute bottom-20 right-20 opacity-[0.03] pointer-events-none scale-[2.5] rotate-12">
         <Feather className="h-64 w-64" />
      </div>
      </div>
    </section>
  );
}
