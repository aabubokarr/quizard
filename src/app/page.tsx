"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import VaultShowcaseSection from "@/components/sections/VaultShowcaseSection";
import InfiniteShelfSection from "@/components/sections/InfiniteShelfSection";
import ReadingStreakSection from "@/components/sections/ReadingStreakSection";
import CheckoutExperienceSection from "@/components/sections/CheckoutExperienceSection";
import ScribePortalPreviewSection from "@/components/sections/ScribePortalPreviewSection";
import { Moon, Sun, Coffee } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.remove("dark", "sepia");
    if (theme !== "light") {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") setTheme("sepia");
    else if (theme === "sepia") setTheme("dark");
    else setTheme("light");
  };

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      
      <HeroSection />
      <VaultShowcaseSection />
      <InfiniteShelfSection />
      <ReadingStreakSection />
      <CheckoutExperienceSection />
      <ScribePortalPreviewSection />

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
