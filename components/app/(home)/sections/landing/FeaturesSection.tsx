"use client";

import { motion } from "framer-motion";
import { Workflow, Zap, Boxes, GitBranch, Plug, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Drag & Drop Builder",
    description: "Build complex AI workflows visually. Connect nodes, configure agents, and see your automation come to life—no coding required.",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "Run workflows in seconds. Our optimized engine handles parallel processing and smart caching for maximum performance.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Boxes,
    title: "AI Agent Nodes",
    description: "Deploy multiple AI agents in one workflow. Use GPT-5, Claude, or custom models with different instructions and tools.",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    icon: Plug,
    title: "MCP Tools Integration",
    description: "Connect to any MCP server—web scraping, code execution, APIs, and more. Extend capabilities without limits.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: GitBranch,
    title: "Logic & Branching",
    description: "Add conditions, loops, and approvals. Create smart workflows that adapt based on data and user input.",
    gradient: "from-fuchsia-500 to-fuchsia-600",
  },
  {
    icon: BarChart3,
    title: "Real-Time Monitoring",
    description: "Watch your workflows execute in real-time. Debug easily with detailed logs and execution traces.",
    gradient: "from-orange-500 to-orange-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-120 px-20 bg-gradient-to-b from-white to-background-base">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-80"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16">
            <span className="text-gray-900">
              Everything You Need
            </span>
            <br />
            <span className="text-pink-500">to Automate</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Powerful features for building production-ready AI workflows
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-24 blur-xl from-primary-20 to-accent-20" />
              
              <div className="relative p-32 bg-white rounded-24 border border-border-faint hover:border-primary-100 transition-all duration-300 shadow-sm hover:shadow-xl h-full">
                {/* Icon */}
                <div className={`w-56 h-56 rounded-16 bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-20 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-28 h-28 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-12">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
