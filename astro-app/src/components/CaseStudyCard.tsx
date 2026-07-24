import { Target, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useCardTilt } from "../hooks/useCardTilt";
import ImageWithSkeleton from "./ImageWithSkeleton";

export default function CaseStudyCard({ study }: { study: any }) {
  const tilt = useCardTilt();

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.tiltStyle}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
      className="bg-surface-container border border-white/5 rounded-3xl overflow-hidden flex flex-col lg:flex-row group hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_50px_rgba(var(--color-primary-rgb),0.05)]"
    >
       {/* Visual Side */}
       <div className="lg:w-2/5 relative overflow-hidden min-h-[300px] lg:min-h-full bg-black/40">
          <ImageWithSkeleton src={study.image} alt={study.headline} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-700 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-6 left-6 flex gap-2">
             <span className="backdrop-blur-md bg-black/50 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold">
               {study.category}
             </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
             <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 pl-2 pr-4 rounded-full border border-white/10">
                <img src={study.logo} alt={study.industry} loading="lazy" className="w-8 h-8 rounded-full border border-white/20" />
                <span className="font-sans text-sm font-bold text-white">{study.industry}</span>
             </div>
          </div>
       </div>

       {/* Content Side */}
       <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-4">
            <Target className="w-4 h-4" /> {study.tag}
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-primary transition-colors">
            {study.headline}
          </h2>

          <p className="font-sans text-on-surface-variant text-base lg:text-lg leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
            {study.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 pt-8 border-t border-white/5">
            {study.metrics.map((metric: any, i: number) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-2">{metric.label}</span>
                <span className="font-display text-3xl font-bold text-white mb-1">{metric.value}</span>
                <span className="font-sans text-xs text-primary bg-primary/10 w-fit px-2 py-0.5 rounded">{metric.detail}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-auto gap-4">
             <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {study.deliverables.map((del: string) => (
                  <span key={del} className="flex items-center gap-1.5 text-xs font-sans text-on-surface-variant bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    <CheckCircle2 className="w-3 h-3 text-primary" /> {del}
                  </span>
                ))}
             </div>

             <a href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group/btn">
               Discuss Similar Growth <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
             </a>
          </div>
       </div>
    </motion.div>
  );
}
