"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

interface CTASectionProps {
  onGetStarted: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-120 px-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-600 h-600 bg-gradient-to-br from-primary-20 to-accent-20 rounded-full blur-3xl opacity-40"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-8 px-16 py-8 mb-32 rounded-full bg-white/80 backdrop-blur-sm border border-primary-100 shadow-lg">
            <Sparkles className="w-16 h-16 text-primary-100" />
            <span className="text-sm font-medium text-gray-900">
              Join 10,000+ Users Automating Workflows
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-24 leading-tight">
            <span className="text-gray-900">Ready to Transform</span>
            <br />
            <span className="text-pink-500">
              Your Automation?
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-accent-black mb-48 max-w-3xl mx-auto leading-relaxed">
            Start building your personalized AI-powered automation workflows today.
            No credit card required. Cancel anytime.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <SignedIn>
              <button
                onClick={onGetStarted}
                className="group px-48 py-20 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full text-xl font-bold shadow-2xl transition-all flex items-center gap-12"
              >
                Get Started Free
                <ArrowRight className="w-24 h-24 group-hover:translate-x-4 transition-transform" />
              </button>
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="group px-48 py-20 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full text-xl font-bold shadow-2xl transition-all flex items-center gap-12">
                  Get Started Free
                  <ArrowRight className="w-24 h-24 group-hover:translate-x-4 transition-transform" />
                </button>
              </SignInButton>
            </SignedOut>
          </motion.div>

          {/* Trust badges */}
          <div className="mt-48 flex flex-wrap justify-center items-center gap-32 text-sm text-accent-black">
            <div className="flex items-center gap-8">
              <svg className="w-20 h-20 text-heat-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center gap-8">
              <svg className="w-20 h-20 text-accent-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">24/7 Availability</span>
            </div>
            <div className="flex items-center gap-8">
              <svg className="w-20 h-20 text-primary-100" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span className="font-medium">No Credit Card Required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
