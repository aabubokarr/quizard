"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Feather, BookOpen, Globe, CreditCard, 
  ArrowRight, Star, Award, Sparkles,
  Coffee, Moon, Sun, Scroll
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
// import { ParchmentContainer } from "@/components/ui/ParchmentContainer";

export default function AuthorsPage() {
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

  const scribeBenefits = [
    {
      title: "Digital Sovereignty",
      description: "Retain complete control over your manuscripts and intellectual legacy.",
      icon: BookOpen,
    },
    {
      title: "Vellum Settlements",
      description: "Receive payments the moment a reader acquires your work via secure channels.",
      icon: CreditCard,
    },
    {
      title: "Global Distribution",
      description: "Reach bibliophiles from Dhaka to Detroit with one-tap publishing.",
      icon: Globe,
    },
    {
      title: "Presence Metrics",
      description: "Monitor your literary impact with sophisticated data visualization.",
      icon: Sparkles,
    },
  ];

  const scribeSpotlights = [
    {
      name: "Amina Rahman",
      title: "The Silent Symphony",
      role: "Contemporary Fiction",
      image: "bg-accent/20",
    },
    {
      name: "Farhan Ali",
      title: "Neon Shadows",
      role: "Cyberpunk Noir",
      image: "bg-primary/20",
    },
    {
      name: "Nayeem Islam",
      title: "River's Song",
      role: "Folk Realism",
      image: "bg-ink/10",
    },
  ];

  return (
    <main className="min-h-screen bg-paper relative">
      <Navbar />
      
      {/* Scribe Portal Hero */}
      <div className="pt-32">
        <PageHeader 
          badge="Scribe Portal"
          badgeIcon={<Feather className="h-4 w-4" />}
          title="Write Your"
          italicTitle="Own Legacy."
          description="Join a movement of modern authors redefining the literary landscape in Bangladesh through transparency and technology."
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button size="lg" icon={<ArrowRight className="h-5 w-5" />}>
            Apply to Publish
          </Button>
          <Button variant="outline" size="lg">
            Scribe Manifesto
          </Button>
        </div>
      </div>

      {/* Benefits Grid */}
      <section className="relative overflow-hidden bg-card border-y border-border py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {scribeBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="h-16 w-16 mx-auto rounded-2xl bg-paper border border-border shadow-sm flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-paper transition-all">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ink mb-3">{benefit.title}</h3>
              <p className="text-ink-muted text-sm font-medium leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="relative overflow-hidden bg-paper py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none">
           <Scroll className="h-96 w-96 translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <PageHeader 
          centered={false}
          title="Master Scribes."
          description="Witness the impact of creators who have chosen the Boifinity path."
          className="mb-16 md:text-left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {scribeSpotlights.map((scribe, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={cn(
                "aspect-[4/5] w-full rounded-[40px] border border-border shadow-sm overflow-hidden relative mb-6",
                scribe.image
              )}>
                 <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                 <div className="absolute top-6 left-6">
                    <div className="h-12 w-12 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center text-accent shadow-lg border border-border">
                       <Star className="h-6 w-6 fill-accent" />
                    </div>
                 </div>
              </div>
              <div className="text-center">
                <h4 className="font-serif text-2xl font-bold text-ink mb-1">{scribe.name}</h4>
                <p className="text-accent text-xs font-black uppercase tracking-widest mb-3">{scribe.role}</p>
                <p className="text-ink-muted text-sm font-bold opacity-60">Author of <span className="text-ink italic">"{scribe.title}"</span></p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Settlement Section */}
      <section className="py-20 bg-ink text-paper relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 text-accent mx-auto mb-10 opacity-50" />
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 italic">Secure Settlements. Instant Ownership.</h2>
            <p className="text-paper/60 text-xl font-medium mb-12 italic leading-relaxed">
              We leverage modern commerce frameworks to bypass traditional delays, 
              delivering royalties directly to your portal the moment they are earned.
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center border-t border-white/10 pt-12">
               <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-xs font-black uppercase tracking-widest text-paper/40 font-sans">Verified Folio Merchant</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-xs font-black uppercase tracking-widest text-paper/40 font-sans">Archival Encryption</span>
               </div>
            </div>
          </div>
        </div>
      </section>



      {/* Theme Toggle Floating Button */}
      <Button
        variant="icon"
        size="icon"
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-[60] h-14 w-14 shadow-2xl"
        aria-label="Toggle Theme"
      >
        {theme === "light" && <Coffee className="h-6 w-6" />}
        {theme === "sepia" && <Moon className="h-6 w-6" />}
        {theme === "dark" && <Sun className="h-6 w-6" />}
      </Button>
    </main>
  );
}

// Utility function to merge classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
