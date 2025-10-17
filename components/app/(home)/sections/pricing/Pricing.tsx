"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for trying out AI Tutor Flow",
    features: [
      "5 AI workflows",
      "100 executions/month",
      "Basic AI models",
      "Community support",
      "Visual workflow builder",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For professionals and growing teams",
    features: [
      "Unlimited workflows",
      "10,000 executions/month",
      "All AI models (GPT-4, Claude)",
      "Priority support",
      "Advanced integrations",
      "Team collaboration",
      "Custom templates",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Unlimited executions",
      "Dedicated support",
      "Custom AI models",
      "On-premise deployment",
      "SLA guarantee",
      "Advanced security",
      "Custom integrations",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-40 bg-[#0a0118]">
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
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-10 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-white/8 border-pink-500/50"
                  : "bg-white/5 border-white/10"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-8">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {plan.price}
                </span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 mb-8 ${
                  plan.popular
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>

              {/* Features */}
              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
