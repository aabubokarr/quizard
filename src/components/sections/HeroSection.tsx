"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-80px)] min-h-screen overflow-hidden bg-gradient-to-br from-[#8B4513]/5 via-paper to-accent/5 pt-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-ink blur-3xl" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          
          {/* Left Side - Text Content */}
          <div className="text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ManuscriptBadge icon={<Sparkles className="h-3.5 w-3.5 fill-accent" />} className="mb-6">
                Premium Digital Library
              </ManuscriptBadge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ink leading-[0.95] tracking-tight mb-6"
            >
              Your Infinite
              <br />
              <span className="text-accent italic font-medium">Archive</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-ink-muted text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-medium leading-relaxed italic mb-10"
            >
              Preserving the tactile soul of physical manuscripts within the digital frontier.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-10"
            >
              <Link href="/auth" className="w-full sm:w-auto">
                <Button size="lg" icon={<ArrowRight className="h-5 w-5" />} className="min-w-[200px]" fullWidth>
                  Enter Library
                </Button>
              </Link>
              <Link href="/bookstore" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="min-w-[200px]" fullWidth>
                  Browse Collection
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4 opacity-60"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-paper bg-gradient-to-br from-accent/30 to-ink/30" />
                ))}
              </div>
              <p className="text-[10px] font-black text-ink-muted uppercase tracking-[0.3em]">50,000+ Readers</p>
            </motion.div>
          </div>

          {/* Right Side - Book Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto order-1 lg:order-2"
          >
            {/* Main Book Display */}
            <div className="relative aspect-[3/4] max-w-[320px] mx-auto lg:mx-0">
              {/* Shadow */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-accent/20 blur-3xl translate-y-8" />
              
              {/* Book Stack */}
              <div className="relative">
                {/* Back Books */}
                <div className="absolute inset-0 translate-x-6 translate-y-6 bg-gradient-to-br from-[#4A2511] to-[#2C1810] rounded-r-2xl opacity-40 blur-sm" />
                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-gradient-to-br from-[#5C3317] to-[#3D2314] rounded-r-2xl opacity-60" />
                
                {/* Main Book */}
                <div className="relative bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-r-3xl shadow-[20px_20px_60px_rgba(0,0,0,0.3)] border-l-[12px] border-black/30 overflow-hidden group">
                  {/* Leather Texture */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-multiply" />
                  
                  {/* Book Content */}
                  <div className="relative p-12 h-full flex flex-col justify-between items-center text-center aspect-[3/4]">
                    {/* Top Ornament */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-px w-16 bg-amber-200/40" />
                      <BookOpen className="h-8 w-8 text-amber-200/60" />
                    </div>
                    
                    {/* Title */}
                    <div className="space-y-2">
                      <h3 className="text-amber-100 text-3xl font-serif font-bold tracking-tight">Boifinity</h3>
                      <p className="text-amber-200/40 text-[9px] font-black uppercase tracking-[0.3em]">Digital Archive</p>
                    </div>
                    
                    {/* Bottom Ornament */}
                    <div className="flex flex-col items-center gap-3">
                      <Star className="h-6 w-6 text-amber-200/60 fill-amber-200/60" />
                      <div className="h-px w-16 bg-amber-200/40" />
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-8 h-16 w-16 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 flex items-center justify-center"
            >
              <Star className="h-6 w-6 text-accent fill-accent" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -right-8 h-20 w-20 rounded-full bg-ink/5 backdrop-blur-sm border border-ink/10 flex items-center justify-center"
            >
              <Sparkles className="h-7 w-7 text-ink/40" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
