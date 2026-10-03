"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const x = useMotionValue(-240);
  const y = useMotionValue(-240);
  const smoothX = useSpring(x, { stiffness: 150, damping: 24, mass: 0.32 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 24, mass: 0.32 });
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const finePointer = window.matchMedia("(pointer: fine)");

    const move = (event) => {
      x.set(event.clientX - 190);
      y.set(event.clientY - 190);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const updatePointer = () => {
      leave();
      window.removeEventListener("pointermove", move);
      if (finePointer.matches) window.addEventListener("pointermove", move, { passive: true });
    };

    if (finePointer.matches) window.addEventListener("pointermove", move, { passive: true });
    finePointer.addEventListener("change", updatePointer);
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      finePointer.removeEventListener("change", updatePointer);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, [x, y, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow"
      style={{ x: smoothX, y: smoothY, opacity: visible ? 1 : 0 }}
    />
  );
}
