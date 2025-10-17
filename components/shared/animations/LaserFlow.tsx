"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

export default function LaserFlow() {
  const [mounted, setMounted] = useState(false);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate laser beams
  const lasers = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      startY: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      color: i % 2 === 0 ? "pink" : "purple",
    }));
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lasers.map((laser) => (
        <motion.div
          key={laser.id}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: ["0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: laser.duration,
            repeat: Infinity,
            delay: laser.delay,
            ease: "linear",
          }}
          className="absolute h-[2px]"
          style={{
            top: `${laser.startY}%`,
            width: "100%",
            background:
              laser.color === "pink"
                ? "linear-gradient(90deg, transparent, #ec4899, #f472b6, transparent)"
                : "linear-gradient(90deg, transparent, #a855f7, #c084fc, transparent)",
            boxShadow:
              laser.color === "pink"
                ? "0 0 10px #ec4899, 0 0 20px #ec4899"
                : "0 0 10px #a855f7, 0 0 20px #a855f7",
          }}
        />
      ))}
      
      {/* Vertical lasers */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`v-${i}`}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "linear",
          }}
          className="absolute w-[2px]"
          style={{
            left: `${20 + i * 20}%`,
            height: "100%",
            background:
              i % 2 === 0
                ? "linear-gradient(180deg, transparent, #d946ef, #e879f9, transparent)"
                : "linear-gradient(180deg, transparent, #8b5cf6, #a78bfa, transparent)",
            boxShadow:
              i % 2 === 0
                ? "0 0 10px #d946ef, 0 0 20px #d946ef"
                : "0 0 10px #8b5cf6, 0 0 20px #8b5cf6",
          }}
        />
      ))}
    </div>
  );
}
