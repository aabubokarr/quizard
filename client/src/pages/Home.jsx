import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import {
  FiCheckCircle,
  FiBookOpen,
  FiShield,
  FiAward,
  FiChevronDown,
  FiArrowRight,
  FiUsers,
  FiBarChart2,
  FiActivity
} from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: FiBookOpen,
      title: 'Versatile Question Builder',
      desc: 'Build multiple question types including MCQ options, True/False, and Fill in the Blanks easily.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: FiShield,
      title: 'Protected Exam Mode',
      desc: 'Anti-cheat layout features like fullscreen lock, automated timers, and answer auto-saving.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: FiBarChart2,
      title: 'Advanced Analytics',
      desc: 'Visualize student scores, average response curves, and leaderboard positions live.',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const steps = [
    { number: '01', title: 'Create Accounts', desc: 'Register as a Teacher to host tests, or a Student to take them.' },
    { number: '02', title: 'Author Quizzes', desc: 'Teachers build question banks and publish customized online exams.' },
    { number: '03', title: 'Grade Instantly', desc: 'Students complete exams under timer limits, with automated immediate scores.' }
  ];

  const testimonials = [
    {
      quote: "Quizard completely overhauled our university testing flow. The auto-grading and responsive timer work flawlessly.",
      author: "Dr. Marcus Thorne",
      title: "Professor of CS, Stanford",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    {
      quote: "I love the clean interface. The question navigator makes taking complex coding and logic tests completely stress-free.",
      author: "Emily Watson",
      title: "Senior Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    }
  ];

  const faqs = [
    {
      q: "Does the exam progress persist if the internet disconnects?",
      a: "Yes! Quizard implements a stateful auto-save hook that backs up answers to localStorage every 10 seconds. You can reload and resume immediately."
    },
    {
      q: "How does auto-grading handle fill-in-the-blank questions?",
      a: "Our backend normalizes and compares text input string matching, ignoring capital letters or trailing spaces for precise matches."
    },
    {
      q: "Can I try it out without configuring databases?",
      a: "Absolutely. Quizard includes a complete local storage database layer, allowing you to create, schedule, and take exams offline out-of-the-box."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-zinc-200 transition-colors duration-300 font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-slate-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-md">
              <FiAward size={18} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
              Quizard
            </span>
          </Link>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold tracking-wider flex items-center gap-1.5 border border-brand-500/20"
          >
            <FiActivity className="animate-pulse" /> INTRODUCING QUIZARD V2
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent leading-[1.15]"
          >
            The Premium Online Testing <br className="hidden md:inline" /> Platform for Modern Educators
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl"
          >
            Create multi-format question banks, schedule custom exams, and monitor student performance curves using a sleek, Vercel-inspired dashboard interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            <Button size="lg" icon={FiArrowRight} iconPosition="right" onClick={() => navigate('/register')}>
              Get Started for Free
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              View Teacher Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-zinc-900">
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Core Capabilities</span>
          <h2 className="text-3xl font-bold dark:text-zinc-100">Supercharged testing features</h2>
          <p className="text-slate-400 dark:text-zinc-500 max-w-md">Everything you need to orchestrate assessments efficiently.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <Card key={idx} hoverable animate delay={0.1 * idx} className="flex flex-col gap-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-500/10 to-indigo-500/10 flex items-center justify-center text-brand-500 dark:text-brand-400">
                <feat.icon size={22} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-zinc-200">{feat.title}</h3>
              <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-slate-100/50 dark:bg-zinc-900/20 border-t border-b border-slate-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Workflow</span>
            <h2 className="text-3xl font-bold dark:text-zinc-100">How Quizard Works</h2>
            <p className="text-slate-400 dark:text-zinc-500 max-w-md">A simplified path from authors to exam completion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-4">
                <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-tr from-brand-600 to-indigo-600 bg-clip-text text-transparent opacity-40">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">{step.title}</h3>
                <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Reviews</span>
          <h2 className="text-3xl font-bold dark:text-zinc-100">Trusted by Teachers and Students</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <Card key={idx} glass className="p-8 flex flex-col justify-between gap-6">
              <p className="text-base md:text-lg italic text-slate-600 dark:text-zinc-300 leading-relaxed">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={test.avatar} alt={test.author} className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-zinc-800" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 dark:text-zinc-200">{test.author}</span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500">{test.title}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-6 bg-slate-100/50 dark:bg-zinc-900/20 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-bold dark:text-zinc-100">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-6 py-5 font-semibold text-slate-800 dark:text-zinc-200 text-left cursor-pointer focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-500 dark:text-zinc-400 leading-relaxed border-t border-slate-50 dark:border-zinc-800/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold dark:text-zinc-100 tracking-tight leading-tight">
            Ready to build smart assessments?
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 max-w-lg">
            Create an account today and start hosting tests within minutes. No installation required.
          </p>
          <Button size="lg" className="mt-2" onClick={() => navigate('/register')}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-600 text-white">
              <FiAward size={14} />
            </div>
            <span className="font-bold text-slate-800 dark:text-zinc-200">Quizard</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-zinc-500">
            &copy; 2026 Quizard Inc. All rights reserved. Designed for ultimate classroom grading efficiency.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;