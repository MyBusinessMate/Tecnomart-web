"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Words or Characters Blur Reveal animation
export function BlurRevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  as = "div",
  highlightWord = "",
  highlightClass = "text-amber-500",
}) {
  const words = text.split(" ");
  const Component = as;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    }),
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 20,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 100,
        duration: 0.6,
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
        viewport={{ once: true, margin: "-60px" }}
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

// Fade & Blur Reveal Container for cards and sections
export function BlurRevealBox({
  children,
  className = "",
  delay = 0,
  yOffset = 30,
  blurAmount = "16px",
  duration = 0.7,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blurAmount})`,
        y: yOffset,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={{ once: true, margin: "-50px" }}
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

