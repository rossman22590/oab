"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-40 bg-[#0a0118]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of teams using AI Tutor Flow to automate their workflows
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-base font-semibold hover:opacity-90 transition-all">
              Start Free Trial
            </button>

            <button className="px-8 py-3 bg-white/10 text-white rounded-xl text-base font-semibold hover:bg-white/15 transition-all">
              Watch Demo
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            No credit card required • Free forever plan available
          </p>
        </motion.div>

        {/* Footer */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                AI Tutor Flow
              </span>
            </div>

            {/* Links */}
            <div className="flex gap-8">
              <Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
              <Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link>
              <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/15 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/15 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/15 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>© 2025 AI Tutor Flow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
