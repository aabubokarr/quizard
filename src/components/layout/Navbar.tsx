"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, ShoppingBag, Book as BookIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "BOOKSTORE", href: "/bookstore" },
    { name: "AUTHORS", href: "/authors" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="h-10 w-10 rounded-lg bg-ink flex items-center justify-center text-paper font-serif font-black text-xl shadow-lg group-hover:bg-accent transition-colors">B</div>
            <span className="font-serif text-2xl font-bold text-ink tracking-tighter hidden sm:block">Boifinity</span>
          </Link>

          {/* Right Section: Links + Actions */}
          <div className="flex items-center gap-8">
             {/* Desktop Navigation */}
             <div className="hidden md:flex items-center gap-8">
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

            <div className="h-6 w-px bg-border hidden md:block" />

            <Link href="/auth">
                <Button variant="ghost" size="sm" className="hidden sm:flex border border-ink/10">
                   <BookIcon className="h-3.5 w-3.5" />
                   SIGN IN
                </Button>
            </Link>
            
            <div className="md:hidden">
              <Button variant="icon" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
