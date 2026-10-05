"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimatedWord({ word, className = "", direction = 1 }) {
  const wordRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wordRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction > 0 ? ["-12%", "8%"] : ["8%", "-12%"],
  );
  const clipPath = useTransform(scrollYProgress, [0, 0.35], ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <motion.div ref={wordRef} className={`word-band ${className}`} style={shouldReduceMotion ? undefined : { clipPath }} aria-hidden="true">
      <motion.span style={shouldReduceMotion ? undefined : { x }}>{word}</motion.span>
    </motion.div>
  );
}
