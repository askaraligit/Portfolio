"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const x = useMotionValue(-240);
  const y = useMotionValue(-240);
  const smoothX = useSpring(x, { stiffness: 150, damping: 24, mass: 0.32 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 24, mass: 0.32 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return undefined;

    const move = (event) => {
      x.set(event.clientX - 190);
      y.set(event.clientY - 190);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow"
      style={{ x: smoothX, y: smoothY, opacity: visible ? 1 : 0 }}
    />
  );
}
