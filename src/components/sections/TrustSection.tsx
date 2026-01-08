"use client";

import React from "react";
import Link from "next/link";
import { Heart, Scroll, Shield, Globe, Facebook, Instagram, Twitter } from "lucide-react";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";

export default function TrustSection() {
  return (
    <footer className="bg-paper border-t border-border pt-24 pb-16 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none -translate-y-1/2 translate-x-1/2">
         <Scroll className="h-96 w-96 p-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="mb-10 group">
              <div className="h-16 w-16 rounded-2xl bg-ink flex items-center justify-center text-paper font-serif font-black text-3xl shadow-2xl group-hover:bg-accent transition-colors">B</div>
            </Link>
            <p className="text-ink-muted leading-relaxed font-medium italic text-lg mb-10">
              "The digital gateway to Bangladesh's literary future. 
              Connecting voices and stories through a timeless reading sanctuary."
            </p>
            <div className="flex gap-4">
               {[Facebook, Instagram, Twitter, Globe].map((Icon, i) => (
                 <button key={i} className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-ink/40 hover:text-accent hover:border-accent hover:scale-110 transition-all">
                    <Icon className="h-4 w-4" />
                 </button>
               ))}
            </div>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="font-black text-[10px] mb-10 uppercase tracking-[0.4em] text-ink/20 font-sans">The Archives</h4>
            <ul className="space-y-6 text-ink font-bold text-sm tracking-tight">
              <li><Link href="/marketplace" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Digital Emporium</Link></li>
              <li><Link href="/authors" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Scribe Portal</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Gift Manuscripts</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Curated Collections</Link></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-[10px] mb-10 uppercase tracking-[0.4em] text-ink/20 font-sans">The Repository</h4>
            <ul className="space-y-6 text-ink font-bold text-sm tracking-tight">
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Our Philosophy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Chronicles Blog</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Press Inquiries</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Global Outreach</Link></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-[10px] mb-10 uppercase tracking-[0.4em] text-ink/20 font-sans">Patron Charter</h4>
            <ul className="space-y-6 text-ink font-bold text-sm tracking-tight">
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Help Sanctuary</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Terms of Patronage</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Privacy Sanctum</Link></li>
              <li><Link href="#" className="hover:text-accent transition-all hover:translate-x-1 inline-block">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-ink/30">
            <span className="flex items-center gap-2"><Shield className="h-3 w-3 text-accent" /> Certified Bibliophile Hub</span>
            <div className="h-1 w-1 rounded-full bg-border md:block hidden" />
            <span className="flex items-center gap-2"><Globe className="h-3 w-3 text-accent" /> Digital Preservation Society</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-ink-muted">
            <p>&copy; {new Date().getFullYear()} Boifinity Platforms Ltd.</p>
            <div className="flex items-center gap-2 italic">
              <span>Crafted with</span>
              <Heart className="h-3 w-3 fill-accent text-accent" />
              <span>in Dhaka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Paper Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none" />
    </footer>
  );
}
