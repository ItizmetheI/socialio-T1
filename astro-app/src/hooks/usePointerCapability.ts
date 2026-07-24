import { useEffect, useState } from "react";

// True only when the device has a real mouse (fine pointer + hover) AND the
// user hasn't asked for reduced motion. Used to gate cursor/magnetic/tilt/
// hover-preview effects that make no sense (or are actively broken) on touch.
export function usePointerCapability() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setCanHover(hoverQuery.matches && !motionQuery.matches);
    update();

    hoverQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      hoverQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return canHover;
}
