import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    path: typeof window !== "undefined" ? window.location.pathname : "/404",
    noindex: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-24 text-center px-6">
      <div className="max-w-md mx-auto">
        <div className="font-mono text-xs text-primary uppercase tracking-widest font-bold mb-4">404</div>
        <h1 className="font-display text-4xl font-bold text-white mb-6">Page not found.</h1>
        <p className="font-sans text-on-surface-variant mb-8">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="px-6 py-3 bg-white text-black hover:bg-primary hover:text-white rounded-xl transition-colors font-bold text-sm inline-flex items-center gap-2">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
