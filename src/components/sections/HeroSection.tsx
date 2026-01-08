"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Quote } from "lucide-react";
import { FolioButton } from "@/components/ui/FolioButton";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";
import Link from "next/link";

export default function HeroSection() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientY / innerHeight - 0.5) * 20;
    const y = (clientX / innerWidth - 0.5) * -20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-paper">
      {/* Background Decorative Seals */}
      <div className="absolute top-20 left-10 opacity-5 pointer-events-none">
         <div className="h-64 w-64 rounded-full border-4 border-accent flex items-center justify-center p-8">
            <span className="font-serif text-8xl font-black text-accent">B</span>
         </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Scribe Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <ManuscriptBadge icon={<Star className="h-3.5 w-3.5 fill-accent" />} className="mb-8">
              Premium Literary Experience
            </ManuscriptBadge>
            
            <h1 className="font-serif text-5xl md:text-8xl font-bold text-ink leading-[1.05] tracking-tight">
              Your Infinite <br />
              <span className="text-accent italic font-medium">Archive</span>, Anywhere.
            </h1>
            
            <p className="mt-8 text-ink-muted text-lg md:text-2xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed italic">
              Preserving the tactile soul of physical manuscripts within the digital frontier. 
              Tailored for modern bibliophiles.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link href="/auth" className="w-full sm:w-auto">
                <FolioButton size="lg" icon={<ArrowRight className="h-5 w-5" />} fullWidth>
                  Enter Library
                </FolioButton>
              </Link>
              <Link href="/marketplace" className="w-full sm:w-auto">
                <FolioButton variant="outline" size="lg" fullWidth>
                  The Emporium
                </FolioButton>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 opacity-60">
               <div className="flex -space-x-3">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="h-10 w-10 rounded-full border-2 border-paper bg-accent/20" />
                 ))}
               </div>
               <p className="text-[10px] font-black text-ink-muted uppercase tracking-[0.3em]">Join 50k+ Archivists</p>
            </div>
          </motion.div>

          {/* 3D Manuscript Visual */}
          <div 
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{
                perspective: "1200px",
                rotateX: rotation.x,
                rotateY: rotation.y,
              }}
              className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] transition-transform duration-200 ease-out"
            >
              {/* The Folio */}
              <div className="absolute inset-0 bg-[#2A1B16] rounded-r-3xl shadow-[30px_30px_80px_rgba(0,0,0,0.6)] border-l-[15px] border-[#3D2B24] overflow-hidden flex flex-col justify-between p-12">
                <div className="space-y-6">
                   <div className="h-px w-16 bg-accent/40" />
                   <h3 className="font-serif text-4xl md:text-5xl font-bold text-[#E5D5C5] leading-tight">The Archival Standard</h3>
                   <p className="font-serif italic text-accent text-xl">Manuscript I</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="h-14 w-14 rounded-full border-2 border-accent/40 flex items-center justify-center">
                    <span className="font-serif font-black text-accent text-xl">B</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#E5D5C5]/40 text-right">Boifinity <br /> Master Edition</p>
                </div>
                {/* Leather Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating Validation Card */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 md:-left-20 bg-card p-8 rounded-[40px] shadow-2xl border border-border max-w-[280px] hidden sm:block backdrop-blur-xl bg-card/95"
              >
                <Quote className="h-10 w-10 text-accent mb-6 opacity-20" />
                <p className="text-sm font-serif italic text-ink leading-relaxed">
                  "The most authentic digital reading sanctuary I've ever encountered. Pure bliss."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent/10" />
                  <span className="text-[10px] font-black text-ink-muted uppercase tracking-[0.2em]">Archivist Z.</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Aesthetic Vellum Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.04] pointer-events-none" />
    </section>
  );
}
