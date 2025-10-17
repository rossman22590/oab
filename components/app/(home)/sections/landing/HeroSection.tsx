"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import dynamic from "next/dynamic";

const PrismaticBurst = dynamic(() => import("@/components/shared/effects/PrismaticBurst"), {
  ssr: false,
});

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Prismatic Burst Background */}
      <div className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
        <PrismaticBurst
          animationType="rotate3d"
          intensity={3}
          speed={0.3}
          distort={2.0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={24}
          mixBlendMode="lighten"
          colors={['#ff007a', '#a855f7', '#ffffff']}
        />
      </div>

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-40 to-accent-40 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-accent-40 to-heat-40 rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-20 py-100 text-center" style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-8 px-16 py-8 mb-32 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-sm border-2 border-pink-400/50 shadow-lg"
        >
          <Sparkles className="w-20 h-20 text-pink-500" strokeWidth={3} />
          <span className="text-base font-bold text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)' }}>
            No-Code AI Workflow Builder
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-24 leading-tight"
        >
          <span className="text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)' }}>
            Build AI Workflows
          </span>
          <br />
          <span className="text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)' }}>Without Code</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white mb-48 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Create powerful AI automation workflows with a simple drag-and-drop interface.
          Connect AI agents, tools, and data sources without writing a single line of code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-16 justify-center items-center"
        >
          <SignedIn>
            <button
              onClick={onGetStarted}
              className="group px-40 py-16 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full text-lg font-semibold shadow-2xl transition-all active:scale-95 flex items-center gap-12"
            >
              Get Started Free
              <ArrowRight className="w-20 h-20 group-hover:translate-x-4 transition-transform" />
            </button>
          </SignedIn>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group px-40 py-16 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full text-lg font-semibold shadow-2xl transition-all active:scale-95 flex items-center gap-12">
                Get Started Free
                <ArrowRight className="w-20 h-20 group-hover:translate-x-4 transition-transform" />
              </button>
            </SignInButton>
          </SignedOut>

          <a
            href="#how-it-works"
            className="px-40 py-16 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 rounded-full text-lg font-semibold transition-all active:scale-95 shadow-lg"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            See How It Works
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-96 flex flex-wrap justify-center items-center gap-x-48 gap-y-16 text-base font-semibold"
        >
          <div className="flex items-center gap-12 px-20 py-10 bg-white rounded-full shadow-lg">
            <svg className="w-20 h-20 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-900 font-semibold">10,000+ workflows built</span>
          </div>
          <div className="flex items-center gap-12 px-20 py-10 bg-white rounded-full shadow-lg">
            <svg className="w-20 h-20 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-semibold">100% Free to start</span>
          </div>
          <div className="flex items-center gap-12 px-20 py-10 bg-white rounded-full shadow-lg">
            <svg className="w-20 h-20 text-fuchsia-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-semibold">AI-powered results</span>
          </div>
        </motion.div>
      </div>


    </section>
  );
}
