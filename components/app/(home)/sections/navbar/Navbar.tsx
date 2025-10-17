"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-40 bg-[#0a0118]/95 backdrop-blur-xl border-b border-pink-500/20 shadow-lg shadow-pink-500/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Brand/Logo - Left */}
          <Link href="/" className="flex items-center group">
            <span className="text-4xl font-black bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent leading-none">
              AI Tutor Flow
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="https://ai-tutor-flow.vercel.app/?view=workflows" className="px-7 py-3.5 text-xl text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-xl transition-all font-bold">
              Workflows
            </Link>
            <Link href="#features" className="px-7 py-3.5 text-xl text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-xl transition-all font-bold">
              Features
            </Link>
            <Link href="#testimonials" className="px-7 py-3.5 text-xl text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-xl transition-all font-bold">
              Testimonials
            </Link>
            <Link href="#pricing" className="px-7 py-3.5 text-xl text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-xl transition-all font-bold">
              Pricing
            </Link>
          </div>
          
          {/* Right Side Actions */}
          <div className="hidden md:flex gap-4 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-8 py-3.5 text-xl text-pink-300 hover:text-pink-200 hover:bg-white/5 rounded-xl transition-all font-bold">
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-xl font-black hover:shadow-xl hover:shadow-pink-500/50 transition-all active:scale-95">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "!w-10 !h-10 !min-w-[40px] !min-h-[40px] border-2 border-pink-400/50 hover:border-pink-400 transition-all shadow-lg shadow-pink-500/30 hover:scale-105",
                      userButtonTrigger: "!w-10 !h-10",
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-pink-300 hover:text-pink-200 p-2 hover:bg-white/5 rounded-lg transition-all"
          >
            {mobileMenuOpen ? <X size={40} strokeWidth={3} /> : <Menu size={40} strokeWidth={3} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-2 border-t border-white/10 pt-4"
          >
            <Link 
              href="https://ai-tutor-flow.vercel.app/?view=workflows" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-lg transition-all py-3 px-4"
            >
              Workflows
            </Link>
            <Link 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-lg transition-all py-3 px-4"
            >
              Features
            </Link>
            <Link 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-lg transition-all py-3 px-4"
            >
              Testimonials
            </Link>
            <Link 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-purple-200 hover:text-pink-300 hover:bg-white/5 rounded-lg transition-all py-3 px-4"
            >
              Pricing
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="pt-2 flex justify-center">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "!w-10 !h-10 !min-w-[40px] !min-h-[40px] border-2 border-pink-400/50",
                      userButtonTrigger: "!w-10 !h-10",
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
