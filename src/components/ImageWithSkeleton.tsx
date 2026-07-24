import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

// Same pattern as AutoplayVideo's loading skeleton -- pulse placeholder until
// the real image has actually decoded, instead of a blank/collapsing box.
export default function ImageWithSkeleton({ className, onLoad, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      <img
        className={className}
        loading="lazy"
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </div>
  );
}
