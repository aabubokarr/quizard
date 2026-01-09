"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, ScrollText, BookOpen } from "lucide-react";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";
// import { ParchmentContainer } from "@/components/ui/ParchmentContainer";

export default function ReadingStreakSection() {
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const currentStreak = 14; 

  return (
    <section className="relative overflow-hidden bg-paper py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto rounded-[64px] bg-[#111111] p-10 md:p-20 text-paper shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden border border-white/5 group">
        
        {/* Archival Glow */}
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-accent/5 blur-[150px] rounded-full group-hover:bg-accent/10 transition-colors duration-1000" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <div className="text-center lg:text-left">
            <ManuscriptBadge icon={<ScrollText className="h-4 w-4" />} className="bg-white/5 border-white/10 text-accent mb-12">
              Reader's Chronology
            </ManuscriptBadge>
            
            <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-8">
              A Legacy of <br />
              <span className="italic text-accent">Consistency</span>.
            </h2>
            
            <p className="text-paper/50 text-xl leading-relaxed font-medium italic mb-12">
              Fourteen cycles of intellectual growth. You have earned the high esteem of the Great Archivists.
            </p>
            
            <div className="flex flex-nowrap justify-center lg:justify-start gap-4 md:gap-6 items-center overflow-x-auto no-scrollbar">
              <div className="text-center flex-shrink-0">
                <p className="text-2xl md:text-3xl font-bold text-accent">{currentStreak}</p>
                <p className="text-[7px] md:text-[8px] uppercase font-black text-paper/20 tracking-[0.15em] mt-1.5">Day Chronology</p>
              </div>
              <div className="h-8 md:h-10 w-px bg-white/10 flex-shrink-0" />
              <div className="text-center flex-shrink-0">
                <p className="text-2xl md:text-3xl font-bold">840</p>
                <p className="text-[7px] md:text-[8px] uppercase font-black text-paper/20 tracking-[0.15em] mt-1.5">Pages Preserved</p>
              </div>
              <div className="h-8 md:h-10 w-px bg-white/10 flex-shrink-0" />
              <div className="text-center flex-shrink-0">
                <p className="text-2xl md:text-3xl font-bold">12</p>
                <p className="text-[7px] md:text-[8px] uppercase font-black text-paper/20 tracking-[0.15em] mt-1.5">Folios Deciphered</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              {/* Archival Progress Ring */}
              <svg className="h-full w-full -rotate-90 filter drop-shadow-[0_0_20px_rgba(184,134,11,0.3)]" viewBox="0 0 100 100">
                <circle
                  className="text-white/5"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  className="text-accent"
                  strokeWidth="3"
                  strokeDasharray="289"
                  initial={{ strokeDashoffset: 289 }}
                  whileInView={{ strokeDashoffset: 289 - (289 * 0.7) }}
                  transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                   initial={{ opacity: 0, scale: 0.5 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   className="absolute"
                >
                   <Trophy className="h-20 w-20 md:h-24 md:w-24 text-accent/5" />
                </motion.div>
                <div className="text-center relative z-10 group-hover:scale-110 transition-transform">
                  <span className="block text-4xl md:text-5xl font-bold tracking-tight">V</span>
                  <span className="text-[10px] text-accent uppercase font-black tracking-[0.4em] mt-2 block">Level IV</span>
                </div>
              </div>
              
              {/* Weekly Ledger Bubbles */}
              <div className="absolute -bottom-10 inset-x-0 flex justify-center gap-4">
                {weekDays.map((day, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ scale: 0, y: 10 }}
                    whileInView={{ scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`h-10 w-10 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all ${
                      idx < 5 
                        ? 'bg-accent/20 border-accent/40 text-accent shadow-[0_8px_16px_rgba(184,134,11,0.2)]' 
                        : 'bg-white/5 border-white/10 text-white/20'
                    }`}
                  >
                    {day}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
