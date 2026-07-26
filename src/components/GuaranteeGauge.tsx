import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import SlidingNumber from "./SlidingNumber";

// ponytail: isolated from HomeContent -- the 14-tick interval used to live as
// state on the top-level page component, re-rendering the entire hero/portfolio/
// FAQ tree on every tick just to update this one dial.
export default function GuaranteeGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [day, setDay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const target = 14;
    const duration = 800; // ms
    const tickMs = Math.ceil(duration / target);

    const timer = setInterval(() => {
      current++;
      setDay(current);
      if (current >= target) clearInterval(timer);
    }, tickMs);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="w-full max-w-[280px] shrink-0 z-10 relative hidden md:block">
      {/* Tech Dial Gauge */}
      <div className="relative w-64 h-64 rounded-[2rem] flex flex-col items-center justify-center mx-auto">
        <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-[40px] scale-75 -z-10 animate-pulse" />
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/5" strokeLinecap="round" strokeDasharray="534" strokeDashoffset="0" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary transition-all duration-200 ease-linear" strokeLinecap="round" strokeDasharray="534" strokeDashoffset={534 * (1 - day / 14)} />
        </svg>
        <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wide mb-2 shadow-sm animate-pulse text-center leading-tight px-8 w-full">Money Back Guaranteed</span>
        <span className="font-display text-8xl md:text-9xl font-bold text-white tracking-tighter shadow-lg">
          <SlidingNumber value={day} />
        </span>
      </div>
    </div>
  );
}
