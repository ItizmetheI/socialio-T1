import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { X } from "lucide-react";

export interface LightboxItem {
  url: string;
  type: "video" | "image";
  alt?: string;
}

export default function MediaLightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full max-h-[85vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-8 h-8" />
        </button>
        {item.type === "video" ? (
          <video src={item.url} controls autoPlay className="w-full max-h-[85vh] rounded-2xl bg-black" />
        ) : (
          <img src={item.url} alt={item.alt || ""} className="w-full max-h-[85vh] object-contain rounded-2xl mx-auto" />
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}
