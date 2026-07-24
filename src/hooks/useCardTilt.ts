import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { usePointerCapability } from "./usePointerCapability";

const MAX_TILT = 6; // degrees

// Returns motion values + handlers to spread onto an EXISTING motion.div
// (one already has initial/animate/whileInView) — composes rotateX/rotateY
// with those rather than needing a second wrapping element.
export function useCardTilt() {
  const canHover = usePointerCapability();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30, mass: 0.5 });

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT * 2);
    rotateX.set(-py * MAX_TILT * 2);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    ref,
    tiltStyle: { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 },
    onMouseMove,
    onMouseLeave,
  };
}
