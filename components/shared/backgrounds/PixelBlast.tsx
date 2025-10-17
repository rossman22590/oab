"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

export default function PixelBlast() {
  const [mounted, setMounted] = useState(false);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random pixels
  const pixels = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {pixels.map((pixel) => (
        <motion.div
          key={pixel.id}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: pixel.duration,
            repeat: Infinity,
            delay: pixel.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-sm"
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            background: `linear-gradient(135deg, 
              ${Math.random() > 0.5 ? '#ec4899' : '#a855f7'}, 
              ${Math.random() > 0.5 ? '#f472b6' : '#c084fc'})`,
            boxShadow: `0 0 ${pixel.size * 2}px ${Math.random() > 0.5 ? '#ec4899' : '#a855f7'}`,
          }}
        />
      ))}
    </div>
  );
}
