import React, { useEffect, useRef } from "react";

// ponytail: plays only while on screen so off-screen videos stop decoding;
// severe scroll stutter was N videos all decoding at once regardless of visibility.
export default function AutoplayVideo(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} muted loop playsInline {...props} />;
}
