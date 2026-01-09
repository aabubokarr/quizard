"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Sparkles, Lock, CheckCircle2, Zap } from "lucide-react";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";
import { Button } from "@/components/ui/Button";

export default function CheckoutExperienceSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-paper to-ink/5 py-20 border-y border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.02] pointer-events-none" />
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-accent/10 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1">
            <ManuscriptBadge icon={<Lock className="h-4 w-4" />} className="mb-6">
              Secure Exchange
            </ManuscriptBadge>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink mb-6 leading-[0.95]">
              One Tap to
              <br />
              <span className="italic text-accent">Ownership</span>.
            </h2>
            
            <p className="text-ink-muted text-lg sm:text-xl md:text-2xl font-medium mb-12 leading-relaxed italic max-w-xl">
              Integrations with the realm's most trusted trade houses ensure your literary acquisitions are seamless, instant, and inviolable.
            </p>

            <div className="space-y-8">
              {[
                { title: "Sovereign Royalty Flow", desc: "Authors receive their dues the moment the seal is broken on a new manuscript.", icon: Sparkles },
                { title: "Bank-Grade Encryption", desc: "Your financial details remain within the sanctum. Zero risk, total peace of mind.", icon: ShieldCheck },
                { title: "Instant Delivery", desc: "Acquire once within the Dhaka archive, read anywhere across the globe.", icon: Zap },
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-accent group-hover:text-paper transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-ink mb-1.5">{feature.title}</h4>
                    <p className="text-sm text-ink-muted font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Phone Mockup */}
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] bg-ink rounded-[40px] sm:rounded-[48px] border-[8px] sm:border-[10px] border-ink shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden"
              >
                {/* Screen Content */}
                <div className="h-full bg-paper flex flex-col p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8 sm:mb-12">
                    <div className="h-6 w-6 rounded-lg bg-ink/5 flex items-center justify-center">
                      <div className="h-1 w-4 bg-ink/20 rounded-full" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30">Archives</span>
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  </div>

                  {/* Book Card */}
                  <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 mb-6 sm:mb-8 shadow-sm">
                    <div className="flex gap-4 mb-4 sm:mb-6">
                      <div className="h-14 sm:h-16 w-10 sm:w-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg shadow-inner" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-ink mb-1">The Silent Symphony</p>
                        <p className="text-[10px] text-ink-muted italic">Archival Record #001</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border/50">
                      <span className="text-sm sm:text-base font-black text-ink">৳ 320.00</span>
                      <span className="text-[8px] sm:text-[9px] font-black text-accent uppercase tracking-widest">Tax Included</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3 sm:space-y-4 mb-auto">
                    <p className="text-[10px] font-black uppercase tracking-widest text-ink/30">Acquisition Gateway</p>
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl border-2 border-accent bg-accent/5">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-[#E2136E] flex items-center justify-center text-white font-black text-[10px] shadow-sm">b</div>
                        <span className="text-[10px] sm:text-xs font-bold text-ink">Personal Merchant</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <Button fullWidth className="h-12 sm:h-14 rounded-2xl text-xs sm:text-sm shadow-2xl">
                      Finalize Acquisition
                    </Button>
                    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
                      <Lock className="h-3 w-3 text-ink/20" />
                      <p className="text-[8px] text-ink-muted font-bold uppercase tracking-[0.1em]">Archival Cryptography Secured</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Trust Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 h-20 w-20 sm:h-24 sm:w-24 bg-card rounded-[28px] sm:rounded-[32px] shadow-2xl border border-border flex items-center justify-center backdrop-blur-xl bg-card/90"
              >
                <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
