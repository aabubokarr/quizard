"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, ShoppingBag, Book as BookIcon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Authors", href: "/authors" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-lg bg-ink flex items-center justify-center text-paper font-serif font-black text-xl shadow-lg group-hover:bg-accent transition-colors">B</div>
            <span className="font-serif text-2xl font-bold text-ink tracking-tighter hidden sm:block">Boifinity</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-bold transition-all uppercase tracking-widest font-sans ${
                    isActive 
                      ? "text-accent underline decoration-accent decoration-2 underline-offset-8" 
                      : "text-ink/60 hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-ink/60 hover:text-accent transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/auth" className={`hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all py-2 px-4 rounded-md border shadow-sm ${
              pathname === "/auth" 
                ? "bg-ink text-paper border-ink" 
                : "text-ink hover:text-accent border-ink/10 bg-paper"
            }`}>
                <BookIcon className="h-3.5 w-3.5" />
                Sign In
            </Link>
            <button className="md:hidden p-2 text-ink">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
