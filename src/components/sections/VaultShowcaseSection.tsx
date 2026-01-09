"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Smartphone, Zap, Sparkles, Book as BookIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
// import { ParchmentContainer } from "@/components/ui/ParchmentContainer";

const VAULT_RECORDS = [
  {
    title: "The Great Search",
    description: "Navigate Bangladesh's most comprehensive digital manuscript archive with archival precision.",
    icon: Search,
    className: "lg:col-span-2 lg:row-span-1 bg-card",
    accent: "text-accent"
  },
  {
    title: "Offline Sanctum",
    description: "Read without boundaries. Your library, always reachable within the digital vault.",
    icon: Smartphone,
    className: "lg:col-span-1 lg:row-span-2 bg-ink text-paper",
    accent: "text-paper"
  },
  {
    title: "Instant Scribe",
    description: "Write, publish, and settle royalties instantly via our secure parchment gateway.",
    icon: Zap,
    className: "lg:col-span-1 lg:row-span-1 bg-paper border border-border",
    accent: "text-accent"
  },
  {
    title: "Mood Manuscripts",
    description: "Let the weight of your emotions guide your next literary discovery in the vault.",
    icon: Sparkles,
    className: "lg:col-span-1 lg:row-span-1 bg-accent/5",
    accent: "text-accent"
  }
];

export default function VaultShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-paper py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <PageHeader 
        badge="Technical Mastery"
        badgeIcon={<BookIcon className="h-3.5 w-3.5" />}
        title="Modern Features."
        italicTitle="Timeless Experience."
        description="We've digitized the soul of reading, ensuring every interaction feels as heavy as a leather-bound folio."
        className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-8">
        {VAULT_RECORDS.map((record, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`rounded-[48px] p-12 flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-2xl transition-all border border-border/50 relative overflow-hidden ${record.className}`}
          >
            {/* Gloss Highlight */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10">
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center bg-paper/10 backdrop-blur-md shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all ${record.accent}`}>
                <record.icon className="h-8 w-8" />
              </div>
              <div className="h-10 w-10 rounded-full border border-current opacity-10 flex items-center justify-center animate-spin-slow">
                 <div className="h-2 w-2 rounded-full bg-current" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-3xl font-bold mb-4">{record.title}</h3>
              <p className="text-sm font-medium opacity-70 leading-relaxed italic">{record.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
