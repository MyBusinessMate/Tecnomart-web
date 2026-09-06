"use client";

import React from 'react';
import { motion } from 'framer-motion';

// High-performance Text Reveal animation without expensive filter:blur GPU thrashing
export function BlurRevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  as = "div",
  highlightWord = "",
  highlightClass = "text-amber-500",
}) {
  const words = text.split(" ");
  const Component = as;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <Component className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.28em]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {words.map((word, idx) => {
          const isHighlighted =
            highlightWord &&
            word.toLowerCase().includes(highlightWord.toLowerCase());

          return (
            <motion.span
              key={idx}
              variants={childVariants}
              className={`inline-block ${
                isHighlighted ? highlightClass : ""
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
}

// Hardware-accelerated Fade-up Reveal Container without GPU filter rasterization stalls
export function BlurRevealBox({
  children,
  className = "",
  delay = 0,
  yOffset = 20,
  duration = 0.45,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
