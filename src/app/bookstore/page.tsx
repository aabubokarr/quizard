"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import BookstoreHeader from "@/components/bookstore/BookstoreHeader";
import { BookCard } from "@/components/ui/BookCard";
import Navbar from "@/components/layout/Navbar";
import { Coffee, Moon, Sun, X, ShoppingBag, ShieldCheck, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatBDT } from "@/lib/utils/currency";
import { Button } from "@/components/ui/Button";

const BOOKSTORE_BOOKS = [
  { id: 1, title: "The Silent Symphony", author: "Amina Rahman", price: 250, rating: 4.8, color: "bg-[#1B3022]", excerpt: "A journey through the unheard melodies of old Dhaka's forgotten narrow lanes." },
  { id: 2, title: "Dust & Dreams", author: "Imran Hasan", price: 180, rating: 4.5, color: "bg-[#4E3B31]", excerpt: "When the city sleeps, the dreamers awake. A tale of ambition in a concrete jungle." },
  { id: 3, title: "Midnight Monsoon", author: "Nadia Islam", price: 320, rating: 4.9, color: "bg-[#0F172A]", excerpt: "Rain hides secrets. In the heart of the storm, one woman finds her true self." },
  { id: 4, title: "The Tea Stall", author: "Sabbir Ahmed", price: 150, rating: 4.7, color: "bg-[#7A5C43]", excerpt: "Conversations over condensed milk tea. Life lessons from a roadside vendor." },
  { id: 5, title: "Neon Shadows", author: "Farhan Ali", price: 290, rating: 4.6, color: "bg-[#1C2024]", excerpt: "Dhaka in 2050. Technology has advanced, but the human heart remains the same." },
  { id: 6, title: "Paper Boats", author: "Maria Tariq", price: 210, rating: 4.4, color: "bg-[#F4ECD8]", excerpt: "Childhood memories that float on the surface of time. A nostalgic masterpiece." },
  { id: 7, title: "Crimson Horizon", author: "Tanvir Khan", price: 275, rating: 4.8, color: "bg-[#9B2C2C]", excerpt: "Political intrigue meets personal sacrifice. The cost of freedom is always high." },
  { id: 8, title: "Ethereal Echoes", author: "Zarin Tasnim", price: 350, rating: 5.0, color: "bg-[#34D399]/20", excerpt: "Spiritual awakening in the Sunderbans. Nature speaks if you know how to listen." },
];

export default function BookstorePage() {
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light");
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

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

  return (
    <main className="min-h-screen bg-paper relative">
      <Navbar />
      
      {/* Header with Title */}
      <div className="pt-32">
        <PageHeader 
           badge="The Grand Emporium"
           badgeIcon={<ShoppingBag className="h-4 w-4" />}
           title="Curated"
           italicTitle="Manuscripts."
           description="Discover a timeless collection of independent voices, preserved for the modern digital bibliophile."
        />
      </div>

      <BookstoreHeader />

      {/* Book Grid */}
      <section className="py-20 bg-paper min-h-[600px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-12">
            {BOOKSTORE_BOOKS.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onQuickView={() => setSelectedBook(book)} 
              />
            ))}
          </div>
        </div>
      </section>



      {/* Theme Toggle Floating Button */}
      <Button
        variant="icon"
        size="icon"
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-[60] h-14 w-14 shadow-2xl"
        aria-label="Toggle Theme"
      >
        {theme === "light" && <Coffee className="h-6 w-6" />}
        {theme === "sepia" && <Moon className="h-6 w-6" />}
        {theme === "dark" && <Sun className="h-6 w-6" />}
      </Button>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-5xl mx-auto bg-card rounded-[32px] md:rounded-[48px] shadow-[0_40px_120px_rgba(0,0,0,0.5)] overflow-hidden border border-border max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Book Preview */}
                <div className={`aspect-[4/5] md:aspect-auto ${selectedBook.color} relative p-16 flex items-center justify-center overflow-hidden`}>
                   <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
                   <div className="w-full max-w-[300px] aspect-[2/3] bg-inherit shadow-[30px_30px_60px_rgba(0,0,0,0.4)] rounded-r-2xl border-l-[10px] border-black/20 relative group">
                      <div className="p-10 h-full flex flex-col justify-between items-center text-center">
                         <div className="h-px w-20 bg-white/20" />
                         <div>
                            <h2 className="text-white text-3xl font-serif font-bold mb-4">{selectedBook.title}</h2>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{selectedBook.author}</p>
                         </div>
                         <div className="h-px w-20 bg-white/20" />
                      </div>
                   </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-16 flex flex-col justify-between bg-card relative">
                   {/* Decorative Quote */}
                  <Quote className="absolute top-10 right-10 h-24 w-24 text-accent/5 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-2 sm:mb-4 block">Archive Record #00{selectedBook.id}</span>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight pr-12">{selectedBook.title}</h2>
                        <p className="text-ink-muted text-sm sm:text-base md:text-lg font-bold italic mt-2 sm:mt-3 underline decoration-accent/30 decoration-2 underline-offset-8">{selectedBook.author}</p>
                      </div>
                      <Button
                        variant="icon" 
                        onClick={() => setSelectedBook(null)}
                        className="h-12 w-12 bg-paper border border-border text-ink-muted hover:text-ink hover:border-accent"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>

                    <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
                      <p className="text-ink-muted text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed italic font-medium">
                        "{selectedBook.excerpt} A timeless exploration of the human condition, now preserved in our digital archive for the next generation of bibliophiles."
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-10 py-6 sm:py-8 md:py-10 border-y border-border">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-ink/30 uppercase tracking-widest mb-1">Acquisition Price</span>
                          <span className="text-2xl sm:text-3xl font-bold text-ink">{formatBDT(selectedBook.price)}</span>
                        </div>
                        <div className="h-10 w-px bg-border hidden sm:block" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-ink/30 uppercase tracking-widest mb-1">Archival Rating</span>
                          <span className="text-2xl sm:text-3xl font-bold text-accent flex items-center gap-2">
                            {selectedBook.rating} <Star className="h-5 w-5 fill-accent border-none" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12 relative z-10">
                    <Button 
                      fullWidth 
                      className="h-12 sm:h-14 md:h-16 lg:h-18 rounded-[20px] sm:rounded-[24px] text-base sm:text-lg md:text-xl shadow-2xl flex gap-3 sm:gap-4 group"
                    >
                      <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      Acquire This Folio
                    </Button>
                    <div className="flex items-center justify-center gap-3 text-ink/40">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Transactions &bull; Instant Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
