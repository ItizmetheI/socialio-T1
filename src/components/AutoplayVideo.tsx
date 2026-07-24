import React, { useEffect, useRef, useState, forwardRef } from "react";

// ponytail: don't fetch until near the viewport -- mounting many videos with
// preload="auto" at once floods the same host past its connection limit and
// none of them ever finish loading. src is set imperatively (not via React
// state) so play() runs in the same tick as the src assignment landing.
//
// preload="metadata" (not "none"): the host supports byte-range requests, so
// this only pulls a small range to get a first frame -- not the whole file.
// Without it, a video with no autoplay trigger (hover-gated previews) never
// fetches ANY data and just renders black until interacted with.
interface AutoplayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  // When false, src still lazy-loads near the viewport but play/pause is left
  // entirely to the caller (e.g. hover-gated previews) via the forwarded ref.
  autoPlayInView?: boolean;
}

const AutoplayVideo = forwardRef<HTMLVideoElement, AutoplayVideoProps>(function AutoplayVideo(
  { src, autoPlayInView = true, className, onLoadedMetadata, ...props },
  forwardedRef
) {
  const internalRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = internalRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loadedRef.current) {
            loadedRef.current = true;
            video.src = src;
          }
          if (autoPlayInView) video.play().catch(() => {});
        } else if (autoPlayInView) {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src, autoPlayInView]);

  return (
    <div className="relative w-full h-full">
      {!ready && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      <video
        ref={(node) => {
          internalRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
        onLoadedMetadata={(e) => {
          // Seeking forces the browser to decode a real frame instead of
          // showing black -- most poster-less videos otherwise stay blank
          // until playback actually starts. 1.5s (or 10% of duration for
          // short clips) clears fade-in intros for most source videos.
          // ponytail: a few clips have longer black intros than this covers
          // (still land on black) -- real fix is a static poster frame
          // extracted per video, add if this keeps showing up.
          const el = e.target as HTMLVideoElement;
          el.currentTime = Math.min(1.5, el.duration * 0.1) || 0.1;
          onLoadedMetadata?.(e);
        }}
        onLoadedData={() => setReady(true)}
        {...props}
      />
    </div>
  );
});

export default AutoplayVideo;
