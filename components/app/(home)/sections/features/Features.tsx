"use client";

import { motion } from "framer-motion";
import { Brain, Workflow, Zap, Sparkles, Rocket, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Agents",
    description: "Build intelligent agents with Claude, GPT-4, and more. Automate complex workflows with ease.",
  },
  {
    icon: Workflow,
    title: "Visual Builder",
    description: "Drag-and-drop interface for creating workflows. No coding required, just pure creativity.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute workflows in milliseconds. Real-time processing with optimized performance.",
  },
  {
    icon: Sparkles,
    title: "MCP Integration",
    description: "Connect to any tool with Model Context Protocol. Seamless integration with your stack.",
  },
  {
    icon: Rocket,
    title: "Deploy Anywhere",
    description: "Cloud, on-premise, or edge. Deploy your workflows wherever you need them.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance. Your data is always protected and secure.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-40 bg-[#0a0118]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to make workflow automation effortless
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
