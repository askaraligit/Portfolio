"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./about-transition.module.css";

export default function AboutTransition() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clipPath = useTransform(scrollYProgress, [0.08, 0.42], ["inset(48% 0% 48% 0%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0.08, 0.45], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.78], [1, 1, 0.12]);

  return (
    <div ref={ref} className={styles.track} aria-hidden="true">
      <div className={styles.sticky}>
        <motion.div className={styles.mask} style={reduceMotion ? undefined : { clipPath }}>
          <span className={styles.kicker}>A little about how I work</span>
          <motion.span className={styles.title} style={reduceMotion ? undefined : { scale, opacity }}>About</motion.span>
          <span className={styles.caption}>Engineering with a point of view.</span>
        </motion.div>
      </div>
    </div>
  );
}
