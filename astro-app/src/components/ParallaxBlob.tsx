import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";

interface ParallaxBlobProps {
  className?: string;
  offsetX?: string; // static base offset, e.g. "-33%" — replaces a Tailwind -translate-x-1/3 class
  offsetY?: string;
  range?: number; // px of scroll-linked travel
}

// Self-scoped: tracks its own scroll progress, no ref threading needed from the parent.
// offsetX/offsetY exist because Motion writes the whole `transform` string on every frame —
// mixing a Tailwind translate-* class with a Motion-driven y on the same element would have
// the class silently dropped, so the static offset has to live inside Motion's own transform too.
export default function ParallaxBlob({ className = "", offsetX = "0%", offsetY = "0%", range = 60 }: ParallaxBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rangeY = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const y = useMotionTemplate`calc(${offsetY} + ${rangeY}px)`;

  return <motion.div ref={ref} className={className} style={{ x: offsetX, y }} />;
}
