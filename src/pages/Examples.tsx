import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { shortFormVideos, ugcVideos, blogImages, socialImages } from "../data/media";

export default function Examples() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "Social Media Posts",
    "Short-Form Videos",
    "UGC Videos",
    "Blog Content",
    "SEO & Backlinks"
  ];

  const portfolioItems = [
    ...socialImages.map((item: any) => ({ ...item, category: 'Social Media Posts' })),
    ...shortFormVideos.map((item: any) => ({ ...item, category: 'Short-Form Videos' })),
    ...ugcVideos.map((item: any) => ({ ...item, category: 'UGC Videos' })),
    ...blogImages.map((item: any) => ({ ...item, category: 'Blog Content' })),
  ];

  const filteredItems = activeTab === "All" ? portfolioItems : portfolioItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto text-on-surface">
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Our Work</h1>
        <p className="font-sans text-xl text-on-surface-variant max-w-2xl mx-auto">
          A curated look at what we build for our clients.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest border transition-all ${activeTab === tab ? 'bg-white text-black border-white font-bold' : 'bg-transparent text-white border-white/20 hover:bg-white/10'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className={`break-inside-avoid rounded-2xl overflow-hidden relative group bg-surface-container ${item.aspectRatio === '16/9' ? 'aspect-video' : item.aspectRatio === '1/1' ? 'aspect-square' : 'aspect-[9/16]'}`}>
             {item.type === 'video'
               ? <video src={item.url} autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 0.1; }} className="w-full h-full object-cover transition-transform duration-700" />
               : <img src={item.url} alt={`${item.category} example`} className="w-full h-full object-cover transition-transform duration-700" loading="lazy" />
             }
          </div>
        ))}
      </div>
    </div>
  )
}
