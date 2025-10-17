"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO at TechFlow",
    initials: "SC",
    content: "AI Tutor Flow transformed how we build automation. What used to take weeks now takes hours.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer at DataCorp",
    initials: "MR",
    content: "The visual builder is incredible. My entire team can now create AI workflows without writing code.",
  },
  {
    name: "Emily Watson",
    role: "Product Manager at StartupXYZ",
    initials: "EW",
    content: "Best investment we've made this year. The ROI was immediate and the support team is phenomenal.",
  },
  {
    name: "David Kim",
    role: "CTO at InnovateLabs",
    initials: "DK",
    content: "Finally, an AI platform that actually delivers. The MCP integration alone is worth the price.",
  },
  {
    name: "Lisa Thompson",
    role: "Operations Director",
    initials: "LT",
    content: "We automated 80% of our workflows in the first month. The time savings are unreal!",
  },
  {
    name: "James Park",
    role: "Founder at AIStartup",
    initials: "JP",
    content: "This is the future of workflow automation. Clean, powerful, and incredibly intuitive.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-40 bg-[#0a0118]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join teams who have transformed their workflows
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 bg-white/5 rounded-2xl border border-white/10"
            >
              {/* Content */}
              <p className="text-gray-300 mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
        >
          {[
            { value: "50K+", label: "Active Users" },
            { value: "1M+", label: "Workflows Created" },
            { value: "99.9%", label: "Uptime" },
            { value: "4.9/5", label: "User Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white/5 rounded-2xl border border-white/10"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
