"use client";

import React, { useState } from "react";
// import { ParchmentContainer } from "@/components/ui/ParchmentContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ManuscriptBadge } from "@/components/ui/ManuscriptBadge";
import { User, Mail, Calendar, BookOpen, Star, Settings, Feather, Shield, Heart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"collection" | "wishlist" | "settings">("collection");

  return (
    <section className="relative overflow-hidden bg-paper min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header Section */}
      <div className="mb-12">
        <PageHeader
          title="The Writer's Study"
          italicTitle="Personal Archives"
          description="Manage your collection, view your wishlist, and update your personal settings in this curated space."
          badge="Member Log"
          badgeIcon={<Feather className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
        {/* LEFT COLUMN: Profile Card */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="vintage-border glass p-8 flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Decorative ribbon */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Feather className="w-24 h-24 text-accent" />
            </div>

            <div className="w-32 h-32 rounded-full border-4 border-accent/30 p-1 mb-6 bg-paper shadow-xl">
              <div className="w-full h-full rounded-full bg-ink/5 flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-ink-muted" />
              </div>
            </div>

            <h2 className="font-serif text-3xl font-bold text-ink mb-2">Alexandriana</h2>
            <p className="text-accent font-medium mb-6 uppercase tracking-widest text-xs">Distinguished Scholar</p>

            <div className="w-full space-y-4 text-left border-t border-border pt-6">
              <div className="flex items-center gap-3 text-ink-muted group hover:text-ink transition-colors">
                <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">writer@boifinity.com</span>
              </div>
              <div className="flex items-center gap-3 text-ink-muted group hover:text-ink transition-colors">
                <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">London, UK</span>
              </div>
              <div className="flex items-center gap-3 text-ink-muted group hover:text-ink transition-colors">
                <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-sm">Joined Oct 2024</span>
              </div>
              <div className="flex items-center gap-3 text-ink-muted group hover:text-ink transition-colors">
                <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-sm">Premium Plan</span>
              </div>
            </div>

            <div className="mt-8 w-full">
              <Button variant="outline" fullWidth size="sm">
                Edit Profile
              </Button>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="vintage-border glass p-6 flex justify-between items-center"
          >
            <div className="text-center flex-1 border-r border-border last:border-0">
              <p className="text-2xl font-serif font-bold text-ink">24</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted pt-1">Books</p>
            </div>
            <div className="text-center flex-1 border-r border-border last:border-0">
              <p className="text-2xl font-serif font-bold text-ink">12</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted pt-1">Reviews</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-2xl font-serif font-bold text-ink">850</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted pt-1">Points</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Main Content */}
        <div className="lg:col-span-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-border pb-6">
            <Button 
              variant={activeTab === "collection" ? "primary" : "ghost"} 
              onClick={() => setActiveTab("collection")}
              icon={<BookOpen className="w-4 h-4" />}
              size="sm"
            >
              Collection
            </Button>
            <Button 
              variant={activeTab === "wishlist" ? "primary" : "ghost"} 
              onClick={() => setActiveTab("wishlist")}
              icon={<Heart className="w-4 h-4" />}
              size="sm"
            >
              Wishlist
            </Button>
            <Button 
              variant={activeTab === "settings" ? "primary" : "ghost"} 
              onClick={() => setActiveTab("settings")}
              icon={<Settings className="w-4 h-4" />}
              size="sm"
            >
              Settings
            </Button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "collection" && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="group relative bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-accent/20 cursor-pointer">
                    <div className="flex gap-4">
                      <div className="w-20 h-28 bg-ink/10 rounded-sm flex-shrink-0 flex items-center justify-center">
                        <BookOpen className="text-ink-muted w-8 h-8" />
                      </div>
                      <div>
                        <ManuscriptBadge className="mb-2 text-[10px] py-0.5 px-2">Fiction</ManuscriptBadge>
                        <h3 className="font-serif font-bold text-lg leading-tight mb-1 group-hover:text-accent transition-colors">The Invisible Life of Addie La Rue</h3>
                        <p className="text-sm text-ink-muted italic">V.E. Schwab</p>
                        <div className="flex items-center gap-1 mt-2 text-accent text-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "wishlist" && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center py-20 bg-card/30 rounded-lg border border-dashed border-border"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold">Your wishlist is empty</h3>
                <p className="text-ink-muted max-w-md mx-auto mt-2 mb-6">Start saving books you want to read. They will appear here for easy access.</p>
                <Button variant="secondary" size="sm">Explore Books</Button>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="vintage-border p-8 bg-card"
              >
                <h3 className="font-serif text-xl font-bold mb-6 pb-4 border-b border-border">Account Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-ink-muted mb-2">Display Name</label>
                    <input type="text" defaultValue="Alexandriana" className="w-full bg-paper border border-border rounded p-3 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-ink-muted mb-2">Email Address</label>
                    <input type="email" defaultValue="writer@boifinity.com" className="w-full bg-paper border border-border rounded p-3 focus:outline-none focus:border-accent transition-colors" />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button size="md">Save Changes</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
