"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "SC",
    content: "AI Workflow Builder transformed how our team automates tasks. We built complex workflows in minutes that used to take days to code. Game changer!",
    rating: 5,
    gradient: "from-pink-500 to-pink-600",
  },
  {
    name: "Marcus Rodriguez",
    role: "Startup Founder",
    avatar: "MR",
    content: "The best no-code tool I've ever used. Built my entire customer onboarding automation in an afternoon. Saved us months of dev time.",
    rating: 5,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    name: "Emily Thompson",
    role: "Operations Manager",
    avatar: "ET",
    content: "Finally, a workflow builder that actually works. No more complex code or expensive developers. I built 5 automations in my first week.",
    rating: 5,
    gradient: "from-rose-500 to-rose-600",
  },
  {
    name: "James Park",
    role: "Marketing Director",
    avatar: "JP",
    content: "I use AI Workflow Builder to automate our entire marketing stack. The drag-and-drop interface is intuitive. Highly recommend!",
    rating: 5,
    gradient: "from-violet-500 to-violet-600",
  },
  {
    name: "Aisha Kumar",
    role: "Data Analyst",
    avatar: "AK",
    content: "Processing complex data pipelines is so much easier now. The AI nodes handle everything from scraping to analysis automatically.",
    rating: 5,
    gradient: "from-fuchsia-500 to-fuchsia-600",
  },
  {
    name: "David Lee",
    role: "Working Professional",
    avatar: "DL",
    content: "Perfect for busy professionals. I built automations that save me 10 hours a week. The workflows are flexible and powerful.",
    rating: 5,
    gradient: "from-heat-100 to-primary-100",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-120 px-20 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-400 h-400 bg-primary-20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-400 h-400 bg-accent-20 rounded-full blur-3xl opacity-30" />
      </div>

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
            <span className="text-pink-500">
              Loved by Builders
            </span>
            <br />
            <span className="text-gray-900">Worldwide</span>
          </h2>
          <p className="text-xl text-accent-black max-w-2xl mx-auto">
            Join thousands of builders who transformed their workflows
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-28 bg-white rounded-24 border border-border-faint hover:border-primary-100 transition-all duration-300 shadow-sm hover:shadow-xl h-full">
                {/* Quote icon */}
                <Quote className="absolute top-20 right-20 w-32 h-32 text-primary-20" />

                {/* Rating */}
                <div className="flex gap-4 mb-16">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-16 h-16 fill-accent-honey text-accent-honey" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-base text-accent-black mb-24 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-12">
                  <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-accent-black">{testimonial.name}</p>
                    <p className="text-sm text-accent-black opacity-70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-80 p-32 bg-gradient-to-r from-primary-4 to-accent-4 rounded-32 border border-primary-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 text-center">
            <div>
              <p className="text-5xl font-bold text-pink-500 mb-8">
                10,000+
              </p>
              <p className="text-lg text-accent-black">Active Users</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-purple-500 mb-8">
                50K+
              </p>
              <p className="text-lg text-accent-black">Workflows Executed</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-fuchsia-500 mb-8">
                4.9/5
              </p>
              <p className="text-lg text-accent-black">Average Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
