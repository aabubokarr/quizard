"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, ShoppingCart } from "lucide-react";
import { formatBDT } from "@/lib/utils/currency";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    rating: number;
    color: string;
  };
  onQuickView: () => void;
}

export default function BookCard({ book, onQuickView }: BookCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div 
        className={`aspect-[2/3] w-full rounded-2xl ${book.color} relative overflow-hidden shadow-sm group-hover:shadow-2xl transition-all border border-black/5 cursor-pointer`}
        onClick={onQuickView}
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none mix-blend-multiply" />
        
        {/* Book Spine Simulation */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 border-r border-white/5" />
        
        {/* Quick View Button (Vintage Style) */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/60 to-transparent">
           <button className="w-full py-3 bg-paper text-ink rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-paper transition-all">
             Examine Folio
           </button>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <div className="h-10 w-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center text-accent shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ShoppingCart className="h-5 w-5" />
           </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-serif text-xl font-bold text-ink leading-tight group-hover:text-accent transition-colors cursor-pointer" onClick={onQuickView}>{book.title}</h3>
          <span className="text-sm font-black text-ink">{formatBDT(book.price)}</span>
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-ink/40">{book.author}</p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
             <Star className="h-3 w-3 fill-accent text-accent" />
             <span className="text-[10px] font-black text-ink">{book.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
             <ShieldCheck className="h-3 w-3 text-accent" />
             <span className="text-[8px] font-black uppercase tracking-widest">Digital Archive Certified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
