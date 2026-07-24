import { useRef } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePointerCapability } from "../hooks/usePointerCapability";

const PULL = 0.35;
const MAX_OFFSET = 10;

interface MagneticButtonProps {
  as?: "a" | "button";
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function MagneticButton({ as = "a", href, className, children, onClick, type }: MagneticButtonProps) {
  const canHover = usePointerCapability();
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * PULL;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * PULL;
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetX)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = as === "button" ? motion.button : motion.a;

  return (
    <MotionTag
      ref={ref}
      href={as === "a" ? href : undefined}
      type={as === "button" ? type : undefined}
      onClick={onClick}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </MotionTag>
  );
}
