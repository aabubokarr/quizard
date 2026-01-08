"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Sparkles, Lock, CheckCircle2 } from "lucide-react";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";
import { ParchmentContainer } from "@/components/ui/ParchmentContainer";

export default function CheckoutExperienceSection() {
  return (
    <ParchmentContainer className="pb-32 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* Archival Commerce Visual */}
        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative">
            {/* The Reader Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-[300px] h-[600px] bg-ink rounded-[48px] border-[10px] border-ink shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col"
            >
              {/* Screen Content */}
              <div className="flex-1 bg-paper flex flex-col p-8">
                <div className="flex justify-between items-center mb-12">
                  <div className="h-6 w-6 rounded-lg bg-ink/5 flex items-center justify-center">
                     <div className="h-1 w-4 bg-ink/20 rounded-full" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30">Archives</span>
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 mb-8 shadow-sm">
                  <div className="flex gap-4 mb-6">
                     <div className="h-16 w-12 bg-accent/20 rounded-lg shadow-inner" />
                     <div>
                        <p className="text-xs font-bold text-ink mb-1">The Silent Symphony</p>
                        <p className="text-[10px] text-ink-muted italic">Archival Record #001</p>
                     </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                     <span className="text-sm font-black text-ink">৳ 320.00</span>
                     <span className="text-[8px] font-black text-accent uppercase tracking-widest">Tax Included</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-widest text-ink/30 mb-2">Acquisition Gateway</p>
                   <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-accent bg-accent/5">
                      <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-lg bg-[#E2136E] flex items-center justify-center text-white font-black text-[10px] shadow-sm">b</div>
                         <span className="text-[10px] font-bold text-ink">Personal Merchant</span>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                   </div>
                </div>

                <div className="mt-auto">
                   <button className="w-full h-14 bg-ink text-paper rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all">
                      Finalize Acquisition
                   </button>
                   <div className="flex items-center justify-center gap-2 mt-6">
                      <Lock className="h-3 w-3 text-ink/20" />
                      <p className="text-[8px] text-ink-muted font-bold uppercase tracking-[0.1em]">Archival Cryptography Secured</p>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Trust Indicator */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 h-24 w-24 bg-card rounded-[32px] shadow-2xl border border-border flex items-center justify-center backdrop-blur-xl bg-card/90"
            >
              <ShieldCheck className="h-12 w-12 text-accent" />
            </motion.div>
          </div>
        </div>

        {/* Persuasion Content */}
        <div className="lg:pr-10">
          <ManuscriptBadge icon={<Lock className="h-4 w-4" />} className="mb-8">
            Secure Exchange
          </ManuscriptBadge>
          
          <h2 className="font-serif text-4xl md:text-7xl font-bold text-ink mb-8 leading-tight">
            One Tap to <br />
            <span className="italic text-accent">Ownership</span>.
          </h2>
          
          <p className="text-ink-muted text-xl md:text-2xl font-medium mb-12 leading-relaxed italic">
            Integrations with the realm's most trusted trade houses ensure your literary acquisitions are seamless, instant, and inviolable.
          </p>

          <div className="space-y-10">
            {[
              { title: "Sovereign Royalty Flow", desc: "Authors receive their dues the moment the seal is broken on a new manuscript.", icon: Sparkles },
              { title: "Bank-Grade Encryption", desc: "Your financial details remain within the sanctum. Zero risk, total peace of mind.", icon: ShieldCheck },
              { title: "Universal Access", desc: "Acquire once within the Dhaka archive, read anywhere across the globe.", icon: CreditCard },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-8 group"
              >
                 <div className="h-14 w-14 rounded-[20px] bg-card border border-border shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-paper transition-all">
                    <feature.icon className="h-7 w-7 text-accent group-hover:text-paper" />
                 </div>
                 <div>
                    <h4 className="font-serif text-xl font-bold text-ink mb-2">{feature.title}</h4>
                    <p className="text-sm text-ink-muted font-medium leading-relaxed">{feature.desc}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </ParchmentContainer>
  );
}
