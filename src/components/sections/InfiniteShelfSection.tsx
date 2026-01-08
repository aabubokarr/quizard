"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { formatBDT } from "@/lib/utils/currency";
import { ArchivalHeader } from "@/components/ui/ArchivalHeader";
import { ParchmentContainer } from "@/components/ui/ParchmentContainer";

const RECENT_MANUSCRIPTS = [
  { id: 1, title: "The Dust in Dhaka", author: "Hassan Mahmud", price: 250, color: "bg-[#7A5C43]", excerpt: "A gripping tale of resilience in the heart of a bustling metropolis. The city breathes through its secrets." },
  { id: 2, title: "River's Song", author: "Farheen Ahmed", price: 180, color: "bg-[#1B3022]", excerpt: "The Padma ripples with stories untold. A journey back to the roots of a changing landscape." },
  { id: 3, title: "Neon Nights", author: "Tanvir S.", price: 320, color: "bg-[#1C2024]", excerpt: "Cyberpunk shadows cast over the futuristic skyline of Banani. Where technology meets tradition." },
  { id: 4, title: "Tea Stall Tales", author: "Zerin Khan", price: 150, color: "bg-[#4E3B31]", excerpt: "Short stories served with a cup of hot cha. Warm, bitter-sweet, and relatable." },
  { id: 5, title: "The Last Zamindar", author: "S. Alam", price: 450, color: "bg-[#9B2C2C]", excerpt: "Echoes of a forgotten era. The crumbling walls of the mansion still hold the weight of history." },
  { id: 6, title: "Skyline Echo", author: "R. Kabir", price: 210, color: "bg-[#F4ECD8]", excerpt: "Poetic exploration of identity in a digital age." },
];

export default function InfiniteShelfSection() {
  const [hoveredManuscript, setHoveredManuscript] = useState<number | null>(null);

  return (
    <ParchmentContainer withBorder className="overflow-hidden">
      <ArchivalHeader 
        centered={false}
        badge="Bestsellers Gallery"
        badgeIcon={<Star className="h-3.5 w-3.5 fill-accent" />}
        title="The Golden Collection."
        italicTitle=""
        description="Our most cherished manuscripts, circulating through the hands of thousands."
        className="mb-16"
      />

      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        {/* Shelf Background Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-border/20 z-0" />

        <motion.div 
          className="flex w-full overflow-hidden relative z-10"
          animate={{
            filter: hoveredManuscript !== null ? "grayscale(30%)" : "grayscale(0%)",
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex gap-10 whitespace-nowrap py-12 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...RECENT_MANUSCRIPTS, ...RECENT_MANUSCRIPTS, ...RECENT_MANUSCRIPTS].map((folio, idx) => (
              <motion.div
                key={`${folio.id}-${idx}`}
                className="relative flex-shrink-0 w-64 group"
                onMouseEnter={() => setHoveredManuscript(idx)}
                onMouseLeave={() => setHoveredManuscript(null)}
                animate={{
                  scale: hoveredManuscript === idx ? 1.08 : 1,
                  filter: hoveredManuscript === idx ? "grayscale(0%)" : "inherit",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Book Cover */}
                <div className={`aspect-[2/3] w-full rounded-2xl ${folio.color} shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden relative border border-black/5`}>
                  {/* Leather Texture */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20" />
                  {/* Spine Shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-black/10 border-r border-white/5" />
                  
                  <div className="p-8 flex flex-col h-full justify-between items-center text-center">
                    <div className="h-px bg-white/20 w-16" />
                    <div className="text-white font-serif font-bold text-xl whitespace-normal leading-tight group-hover:scale-105 transition-transform">
                      {folio.title}
                    </div>
                    <div className="h-px bg-white/20 w-16" />
                  </div>

                  {/* Archival Overlay on Hover */}
                  <AnimatePresence>
                    {hoveredManuscript === idx && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-paper/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-10"
                      >
                         <div className="absolute top-6 left-6 h-8 w-8 rounded-full border border-accent/20 flex items-center justify-center">
                            <span className="text-accent text-xs font-serif font-black">B</span>
                         </div>
                        <p className="text-sm font-black text-accent mb-3 uppercase tracking-widest">{formatBDT(folio.price)}</p>
                        <div className="flex gap-4 mb-8">
                          <button className="h-12 w-12 rounded-full bg-ink text-paper hover:bg-accent transition-colors flex items-center justify-center shadow-lg">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="h-12 w-12 rounded-full bg-ink text-paper hover:bg-accent transition-colors flex items-center justify-center shadow-lg">
                            <ShoppingCart className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <motion.p 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="text-xs text-ink-muted italic whitespace-normal font-medium leading-relaxed border-t border-border pt-6"
                        >
                          "{folio.excerpt}"
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="mt-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h4 className="text-sm font-bold text-ink truncate font-serif">{folio.title}</h4>
                  <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mt-2">{folio.author}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </ParchmentContainer>
  );
}
