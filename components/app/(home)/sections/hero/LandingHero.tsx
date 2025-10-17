"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Brain, Workflow, ArrowRight, Star, Rocket, Crown } from "lucide-react";
import Prism from "@/components/shared/backgrounds/Prism";

interface LandingHeroProps {
  onGetStarted: () => void;
}

export default function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[#0a0118]">
      {/* Prism Background */}
      <div className="absolute inset-0 opacity-60">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </div>

      {/* Dark gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0118]/50 to-[#0a0118]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-purple-500/20 backdrop-blur-2xl rounded-full border border-pink-400/30 mb-8 shadow-lg shadow-pink-500/20"
        >
          <Crown className="w-5 h-5 text-pink-300" strokeWidth={2} />
          <span className="text-sm text-pink-100 font-semibold tracking-wide">
            Premium AI Workflow Platform
          </span>
          <Sparkles className="w-5 h-5 text-fuchsia-300" strokeWidth={2} />
        </motion.div>

        {/* Main Heading with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
              AI Tutor Flow
            </span>
          </h1>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-light mt-6"
        >
          Build{" "}
          <span className="font-bold bg-gradient-to-r from-pink-300 to-fuchsia-300 bg-clip-text text-transparent">
            intelligent AI workflows
          </span>{" "}
          with zero code
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base text-purple-200/70 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Create powerful AI agents, automate complex tasks, and connect to any API.
          The most beautiful workflow builder you've ever seen.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 active:scale-95 flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Rocket className="w-5 h-5 relative z-10" strokeWidth={2} />
            <span className="relative z-10">Start Creating Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" strokeWidth={2} />
          </button>
          
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="group px-8 py-4 bg-white/10 backdrop-blur-2xl text-white rounded-xl text-base font-semibold border-2 border-pink-300/30 hover:border-pink-300/60 hover:bg-white/20 transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            <Star className="w-5 h-5 text-pink-300" strokeWidth={2} />
            Explore Features
          </button>
        </motion.div>

        {/* Feature Cards - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20"
        >
          {[
            {
              icon: <Brain className="w-8 h-8" strokeWidth={2} />,
              title: "AI Agents",
              description: "Build intelligent agents with Claude, GPT-4, and more",
              gradient: "from-pink-500 to-rose-500",
              glowColor: "pink-500/50",
            },
            {
              icon: <Workflow className="w-8 h-8" strokeWidth={2} />,
              title: "Visual Builder",
              description: "Drag-and-drop workflow creation with no coding required",
              gradient: "from-fuchsia-500 to-purple-500",
              glowColor: "fuchsia-500/50",
            },
            {
              icon: <Zap className="w-8 h-8" strokeWidth={2} />,
              title: "MCP Integration",
              description: "Connect to any tool with Model Context Protocol",
              gradient: "from-purple-500 to-violet-600",
              glowColor: "purple-500/50",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-${feature.glowColor.split('/')[0]}/50 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg shadow-${feature.glowColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-purple-200/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Accent Elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-pink-400 to-fuchsia-500 rounded-full blur-2xl opacity-40"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full blur-2xl opacity-40"
        />
      </div>
    </div>
  );
}
