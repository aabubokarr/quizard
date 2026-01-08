"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Moon, Sun, ArrowRight, Github, Mail, Lock, User, Sparkles, Feather } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light");

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
    <main className="min-h-screen bg-paper relative flex flex-col pt-20">
      <Navbar />
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none scale-150">
         <Feather className="h-96 w-96" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-card border border-border rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] p-10 md:p-16 relative overflow-hidden"
        >
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none mix-blend-multiply" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="h-20 w-20 bg-ink rounded-[28px] flex items-center justify-center text-paper font-serif font-black text-4xl mx-auto mb-8 shadow-2xl">B</div>
              <h1 className="font-serif text-4xl font-bold text-ink mb-3">
                {mode === "login" ? "Return to the Archives." : "Begin Your Journey."}
              </h1>
              <p className="text-ink-muted text-lg font-medium italic">
                {mode === "login" ? "Welcome back, Keeper of Stories." : "Join the modern elite of digital bibliophiles."}
              </p>
            </div>

            <div className="flex bg-paper border border-border p-1.5 rounded-2xl mb-10">
              <button 
                onClick={() => setMode("login")}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "login" ? "bg-ink text-paper shadow-lg" : "text-ink/30 hover:text-ink"}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setMode("signup")}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "signup" ? "bg-ink text-paper shadow-lg" : "text-ink/30 hover:text-ink"}`}
              >
                Register
              </button>
            </div>

            <form className="space-y-5">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-5"
                  >
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/20 group-focus-within:text-accent transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Your Full Name" 
                        className="w-full bg-paper border border-border rounded-xl py-4.5 pl-14 pr-6 text-ink focus:border-accent outline-none transition-all font-medium"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/20 group-focus-within:text-accent transition-colors" />
                <input 
                  type="email" 
                  placeholder="Registry Email" 
                  className="w-full bg-paper border border-border rounded-xl py-4.5 pl-14 pr-6 text-ink focus:border-accent outline-none transition-all font-medium"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/20 group-focus-within:text-accent transition-colors" />
                <input 
                  type="password" 
                  placeholder="Security Cipher" 
                  className="w-full bg-paper border border-border rounded-xl py-4.5 pl-14 pr-6 text-ink focus:border-accent outline-none transition-all font-medium"
                />
              </div>

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline">Recover Cipher?</button>
                </div>
              )}

              <button className="w-full h-16 bg-ink text-paper rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-xl mt-6">
                {mode === "login" ? "Enter the Archives" : "Create My Record"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-[10px] text-ink-muted font-bold uppercase tracking-widest leading-relaxed">
                By entering, you abide by the <button className="text-ink hover:text-accent">Charter of Conduct</button> <br /> and our <button className="text-ink hover:text-accent">Sanctum Privacy Policy</button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Theme Toggle Floating Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-[60] h-14 w-14 rounded-full bg-ink text-paper shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        aria-label="Toggle Theme"
      >
        {theme === "light" && <Coffee className="h-6 w-6" />}
        {theme === "sepia" && <Moon className="h-6 w-6" />}
        {theme === "dark" && <Sun className="h-6 w-6" />}
      </button>
    </main>
  );
}
