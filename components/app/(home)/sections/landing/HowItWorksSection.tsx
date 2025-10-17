"use client";

import { motion } from "framer-motion";
import { MessageSquare, Workflow, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Define Your Workflow",
    description: "Simply describe what you want to automate. Our AI understands your needs and adapts to your use case.",
    color: "primary-100",
  },
  {
    number: "02",
    icon: Workflow,
    title: "AI Builds Your Automation",
    description: "Get a personalized workflow with step-by-step automation tailored to your specific requirements.",
    color: "accent-100",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Execute & Monitor",
    description: "Run your workflows, get instant feedback, and refine your automation until it's perfect.",
    color: "heat-100",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Track & Optimize",
    description: "Monitor your workflows, identify areas for optimization, and continuously improve efficiency.",
    color: "accent-amethyst",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-120 px-20 bg-gradient-to-b from-background-base to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-400 bg-gradient-to-b from-primary-4 to-transparent blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-80"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16">
            <span className="text-gray-900">How</span>
            <br />
            <span className="text-pink-500">
              AI Workflow Builder Works
            </span>
          </h2>
          <p className="text-xl text-accent-black max-w-2xl mx-auto">
            Four simple steps to unlock your automation potential
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-64">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-48`}
            >
              {/* Content */}
              <div className="flex-1 space-y-16">
                <div className="inline-block">
                  <span className={`text-6xl font-bold bg-gradient-to-br from-${step.color} to-${step.color} bg-clip-text text-transparent opacity-20`}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-accent-black">
                  {step.title}
                </h3>
                <p className="text-lg text-accent-black leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-300 h-300 rounded-32 bg-gradient-to-br from-${step.color} to-white/50 p-2 shadow-2xl`}
                >
                  <div className="w-full h-full bg-white rounded-30 flex items-center justify-center">
                    <step.icon className={`w-120 h-120 text-${step.color}`} strokeWidth={1.5} />
                  </div>
                  
                  {/* Floating accent */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute -top-16 -right-16 w-80 h-80 rounded-full bg-gradient-to-br from-${step.color} to-white opacity-80 blur-lg`}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection line */}
        <div className="hidden lg:block absolute left-1/2 top-200 bottom-200 w-2 -translate-x-1/2 opacity-20">
          <div className="h-full bg-gradient-to-b from-primary-100 via-accent-100 to-heat-100" />
        </div>
      </div>
    </section>
  );
}
