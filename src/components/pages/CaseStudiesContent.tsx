import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import CaseStudyCard from "../CaseStudyCard";
import ParallaxBlob from "../ParallaxBlob";

export default function CaseStudiesContent() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "SEO", "Social Media", "Paid Ads"];

  const caseStudies = [
    {
      id: "01",
      category: "Paid Ads",
      tag: "Short-Form Video & Meta",
      industry: "E-Commerce Apparel",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
      image: "https://images.unsplash.com/photo-1558769132-cb1fac0840c2?w=800&h=500&fit=crop",
      headline: "Scaling past 3.2x ROAS in 60 days",
      metrics: [
        { label: "CPA Reduction", value: "69%", detail: "From $42 to $13" },
        { label: "ROAS Increase", value: "+2.1x", detail: "From 1.1x to 3.2x" },
        { label: "Revenue Lift", value: "$125k", detail: "In new monthly ARR" },
      ],
      deliverables: ["Creative Strategy", "Influencer Sourcing", "Paid Social Scaling"],
      description: "A Shopify apparel brand was burning cash on stagnant Facebook creatives. We introduced a rapid-testing UGC short-form video strategy that drastically lowered CPA and scaled their top-of-funnel aggressively."
    },
    {
      id: "02",
      category: "SEO",
      tag: "Content & Backlinks",
      industry: "B2B SaaS",
      logo: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=100&h=100&fit=crop",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      headline: "Driving +180% organic high-intent MRR",
      metrics: [
        { label: "Search Traffic", value: "+275%", detail: "From 4k to 11k/mo" },
        { label: "MQLs Generated", value: "85/mo", detail: "Previously 15/mo" },
        { label: "Domain Rating", value: "+17", detail: "From 25 to 42" },
      ],
      deliverables: ["Technical SEO", "Programmatic SEO", "Link Insertion"],
      description: "A Series A SaaS company needed to reduce their reliance on ad spend. By building high-authority backlinks and refining their technical SEO pillars, we positioned them in the top 3 for their most critical 'alternative to' keywords."
    },
    {
      id: "03",
      category: "Social Media",
      tag: "Community Growth",
      industry: "National Restuarant Chain",
      logo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100&h=100&fit=crop",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop",
      headline: "Revitalizing a legacy brand via Reels",
      metrics: [
        { label: "Organic Reach", value: "5x", detail: "5k to 25k weekly" },
        { label: "Engagement", value: "5.4%", detail: "Industry avg >1.5%" },
        { label: "Foot Traffic", value: "+22%", detail: "Attributed to social" },
      ],
      deliverables: ["Content Output", "Community Management", "Influencer Events"],
      description: "This emerging local chain had great food but an inconsistent online presence. We revamped their aesthetic with premium post design and daily stories, directly driving a surge in weekend reservations through authentic storytelling."
    },
    {
      id: "04",
      category: "Paid Ads",
      tag: "Google Ads & PMax",
      industry: "Enterprise Service",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      headline: "Halving CPL while doubling volume",
      metrics: [
        { label: "Cost Per Lead", value: "$45", detail: "Down from $98" },
        { label: "Conversion Rate", value: "12%", detail: "Landing page opt" },
        { label: "Pipeline Value", value: "$2.1M", detail: "Generated in Q4" },
      ],
      deliverables: ["PMax Structure", "Search Arbitrage", "CRO"],
      description: "A legacy enterprise provider couldn't scale their search campaigns. We restructured their entire Google Ads account, introduced Performance Max selectively, and applied aggressive conversion rate optimization to their landers."
    }
  ];

  const filteredStudies = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter(study => study.category === activeFilter);

  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 mesh-gradient-case-studies opacity-20 mix-blend-screen pointer-events-none" />
      <ParallaxBlob className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" offsetX="33%" offsetY="-33%" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full font-mono text-[10px] text-primary mb-6 uppercase tracking-widest font-bold">Proof of Work</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-6 text-white font-bold leading-tight">
            Real impact.<br className="hidden md:block"/> No vanity metrics.
          </h1>
          <p className="font-sans text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Dive into the data behind our most successful campaigns. We don't just chase likes; we build compounding revenue systems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 font-bold border ${activeFilter === filter ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-on-surface-variant border-white/10 hover:border-white/30 hover:text-white'}`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Container */}
        <div className="w-full flex flex-col gap-16 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
