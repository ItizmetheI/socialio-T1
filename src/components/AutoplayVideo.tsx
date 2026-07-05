import React, { useEffect, useRef } from "react";

// ponytail: don't fetch until near the viewport. Mounting many videos with
// preload="auto" at once floods the same R2 host past its connection limit
// and none of them ever finish loading (readyState stuck at 0) -- that was
// the real stutter, not decode cost. src is set imperatively (not via React
// state) so play() runs in the same tick as the src assignment landing.
export default function AutoplayVideo({ src, ...props }: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loadedRef.current) {
            loadedRef.current = true;
            video.src = src as string;
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={ref} muted loop playsInline {...props} preload="none" />;
}
