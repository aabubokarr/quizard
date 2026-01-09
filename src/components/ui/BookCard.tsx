"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, ShoppingCart } from "lucide-react";
import { formatBDT } from "@/lib/utils/currency";
import { Button } from "@/components/ui/Button";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    rating: number;
    color: string;
    excerpt?: string;
  };
  onQuickView: () => void;
}

export function BookCard({ book, onQuickView }: BookCardProps) {
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
           <Button variant="primary" fullWidth className="py-3 text-xs bg-paper text-ink hover:bg-accent hover:text-paper border-none">
             Examine Folio
           </Button>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <div className="h-10 w-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center text-accent shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ShoppingCart className="h-5 w-5" />
           </div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-base font-bold text-ink leading-tight group-hover:text-accent transition-colors cursor-pointer line-clamp-2" onClick={onQuickView}>{book.title}</h3>
          <span className="text-xs font-black text-ink whitespace-nowrap">{formatBDT(book.price)}</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-wider text-ink/40">{book.author}</p>
        
        <div className="flex items-center justify-between pt-1.5">
          <div className="flex items-center gap-0.5">
             <Star className="h-2.5 w-2.5 fill-accent text-accent" />
             <span className="text-[9px] font-black text-ink">{book.rating}</span>
          </div>
          <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
             <ShieldCheck className="h-2.5 w-2.5 text-accent" />
             <span className="text-[7px] font-black uppercase tracking-wider">Certified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
