"use client";

import React, { useState } from "react";
import { Search, ChevronDown, BookOpen, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MarketplaceHeader() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categories = [
    "Poetry", "History", "Science Fiction", "Biography", 
    "Philosophy", "Art & Design", "Folklore", "Contemporary",
    "Classic Lit", "Thriller", "Romance", "academic"
  ];
  
  return (
    <div className="bg-paper pb-16 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Search & Category Container */}
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-4 items-stretch relative">
          
          {/* Search Bar */}
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..."
              className="w-full bg-card border border-border rounded-2xl py-5 pl-16 pr-8 text-ink text-lg focus:border-accent outline-none transition-all shadow-sm"
            />
          </div>

          {/* Category Dropdown Button */}
          <div className="relative">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`h-full px-8 py-5 rounded-2xl border flex items-center gap-3 transition-all font-black uppercase tracking-widest text-xs whitespace-nowrap ${
                isCategoryOpen 
                  ? "bg-ink text-paper border-ink" 
                  : "bg-card border-border text-ink hover:border-accent"
              }`}
            >
              <Filter className="h-4 w-4" />
              Categories
              <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isCategoryOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCategoryOpen(false)}
                    className="fixed inset-0 z-[60]"
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-4 w-[480px] bg-card border border-border rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] p-8 grid grid-cols-2 gap-3 z-[70] origin-top-right backdrop-blur-xl"
                  >
                    <div className="col-span-2 mb-4 flex items-center gap-2 pb-4 border-b border-border">
                        <BookOpen className="h-4 w-4 text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40">Select Genre</span>
                    </div>
                    {categories.map((cat) => (
                      <button 
                        key={cat}
                        className="text-left px-5 py-3 rounded-xl hover:bg-ink hover:text-paper transition-all text-xs font-bold text-ink-muted hover:text-paper flex items-center justify-between group"
                      >
                        {cat}
                        <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Active Filters (Optional visual space) */}
        <div className="mt-8 flex gap-2">
           <div className="animate-pulse flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Sparkles className="h-3 w-3" />
              New Manuscripts Added Weekly
           </div>
        </div>
      </div>
    </div>
  );
}
