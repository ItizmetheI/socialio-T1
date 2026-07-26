import React, { useState, useRef } from "react";
import { Sparkles, Image, Video, UserSquare2, ArrowUpRight, MonitorPlay, CheckCircle2, Star, ChevronDown } from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { servicesData } from "../../data/services";
import PricingCard from "../PricingCard";
import AutoplayVideo from "../AutoplayVideo";
import { shortFormVideos, ugcVideos, blogImages, socialImages } from "../../data/media";
import { homeFaqs } from "../../data/faqs";
import SlidingNumber from "../SlidingNumber";
import MagneticButton from "../MagneticButton";
import { useCardTilt } from "../../hooks/useCardTilt";
import ParallaxBlob from "../ParallaxBlob";
import { usePointerCapability } from "../../hooks/usePointerCapability";
import MediaLightbox, { type LightboxItem } from "../MediaLightbox";
import ImageWithSkeleton from "../ImageWithSkeleton";
import GuaranteeGauge from "../GuaranteeGauge";

const socialImageOnly = socialImages.filter((i: any) => i.type !== 'video');


const col1Items = [
  { type: 'social', seed: '11', tag: 'Social Media' },
  { type: 'video', url: shortFormVideos[0].url, label: 'Reel', tag: 'Video' },
  { type: 'website', seed: 'w1', tag: 'Website' },
  { type: 'blog', seed: 'b1', tag: 'Blog' },
  { type: 'social', seed: '12', tag: 'Social Media' },
  { type: 'video', url: shortFormVideos[1].url, label: 'Short', tag: 'Video' },
  { type: 'website', seed: 'w2', tag: 'Website' },
];

const col2Items = [
  { type: 'video', url: shortFormVideos[2].url, label: 'Reel', tag: 'Video' },
  { type: 'website', seed: 'w3', tag: 'Website' },
  { type: 'blog', seed: 'b2', tag: 'Email' },
  { type: 'social', seed: '13', tag: 'Social Media' },
  { type: 'video', url: shortFormVideos[3].url, label: 'Short', tag: 'Video' },
  { type: 'social', seed: '14', tag: 'Social Media' },
  { type: 'website', seed: 'w4', tag: 'Website' },
];

const col3Items = [
  { type: 'website', seed: 'w5', tag: 'Website' },
  { type: 'blog', seed: 'b3', tag: 'Blog' },
  { type: 'social', seed: '15', tag: 'Social Media' },
  { type: 'video', url: shortFormVideos[0].url, label: 'Reel', tag: 'Video' },
  { type: 'website', seed: 'w6', tag: 'Website' },
  { type: 'social', seed: '16', tag: 'Social Media' },
  { type: 'video', url: shortFormVideos[1].url, label: 'Short', tag: 'Video' },
];

interface CarouselCardProps {
  item: any;
  columnIndex: number;
  index: number;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ item, index }) => {
  if (item.type === 'social') {
    return (
      <div className="w-full aspect-square bg-[#111] rounded-[14px] shrink-0 relative group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 flex flex-col p-3 pt-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
               <img src={socialImageOnly[0].url} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] font-bold text-white">Socialio</div>
          </div>
          <div className="flex-grow rounded-lg overflow-hidden relative">
             <img src={socialImageOnly[index % socialImageOnly.length].url} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2 mt-2">
             <div className="w-3 h-3 rounded-full border border-white/50"></div>
             <div className="w-3 h-3 rounded-full border border-white/50"></div>
             <div className="w-3 h-3 ml-auto rounded-sm border border-white/50"></div>
          </div>
        </div>
      </div>
    );
  }

  if (item.type === 'video') {
    return (
      <div className="w-full aspect-[9/16] bg-[#1a1a1a] rounded-[14px] shrink-0 relative group shadow-[0_4px_20px_rgba(0,0,0,0.10)] overflow-hidden">
        <AutoplayVideo
          src={item.url}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  if (item.type === 'website') {
    return (
      <div className="w-full aspect-video bg-[#222] rounded-[14px] shrink-0 relative group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:scale-[1.02] flex flex-col overflow-hidden">
        <div className="h-5 bg-white/5 flex items-center gap-1.5 px-3">
           <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
        </div>
        <img src={blogImages[0].url} alt="" className="flex-grow w-full object-cover" />
      </div>
    );
  }

  if (item.type === 'blog') {
    return (
      <div className="w-full h-[220px] bg-white rounded-[14px] shrink-0 relative group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:scale-[1.02] flex flex-col overflow-hidden">
        <div className="h-[100px] relative">
          <img src={blogImages[1].url} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="p-3 flex flex-col gap-2 flex-grow">
           <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
           <div className="w-1/2 h-2 bg-gray-300 rounded mb-2"></div>

           <div className="w-full h-1 bg-gray-200 rounded"></div>
           <div className="w-full h-1 bg-gray-200 rounded"></div>
           <div className="w-5/6 h-1 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return null;
}

function HeroCarousel() {
  return (
    <div className="hidden lg:flex w-full h-[550px] gap-3 z-20 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
      {/* Column 1 - Slide Up */}
      <div
        className={`flex-1 flex flex-col gap-3 pb-3 animate-slide-up hover:[animation-play-state:paused]`}
        style={{ animationDuration: '25s' }}
      >
        {[...col1Items, ...col1Items].map((item, i) => (
            <CarouselCard key={`col1-${i}`} item={item} columnIndex={1} index={i} />
        ))}
      </div>

      {/* Column 2 - Slide Down */}
      <div
        className={`flex-1 flex flex-col gap-3 pb-3 animate-slide-down hover:[animation-play-state:paused]`}
        style={{ animationDuration: '32s' }}
      >
        {[...col2Items, ...col2Items].map((item, i) => (
            <CarouselCard key={`col2-${i}`} item={item} columnIndex={2} index={i} />
        ))}
      </div>

      {/* Column 3 - Slide Up */}
      <div
        className={`flex-1 flex flex-col gap-3 pb-3 animate-slide-up hover:[animation-play-state:paused]`}
        style={{ animationDuration: '20s' }}
      >
        {[...col3Items, ...col3Items].map((item, i) => (
            <CarouselCard key={`col3-${i}`} item={item} columnIndex={3} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function HomeContent() {
  const statsRef = useRef<HTMLElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.5 });
  const [activeHeroTab, setActiveHeroTab] = useState(servicesData[0].category || "Social Media");
  const [activePortfolioTab, setActivePortfolioTab] = useState("Featured");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const socialPostsTilt = useCardTilt();
  const shortFormTilt = useCardTilt();
  const blogSeoTilt = useCardTilt();
  const ugcTilt = useCardTilt();

  const canHover = usePointerCapability();
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  const hoverPreviewHandlers = canHover
    ? {
        onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.querySelector("video")?.play().catch(() => {});
        },
        onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.querySelector("video")?.pause();
        },
      }
    : {};

  const faqs = homeFaqs;

  // Get unique categories for tabs
  const categories = Array.from(new Set(servicesData.map(s => s.category)));

  // Get the first service in the active category to preview
  const previewService = servicesData.find(s => s.category === activeHeroTab) || servicesData[0];

  return (
    <>
      {/* High-Impact Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-36 md:pb-20 px-6 max-w-6xl mx-auto min-h-[85vh] flex flex-col justify-center">
        {/* Background elements */}
        <ParallaxBlob className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" offsetX="33%" offsetY="-33%" />
        <ParallaxBlob className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[100px] pointer-events-none -z-10" offsetX="-33%" offsetY="33%" />
        <div className="absolute inset-0 mesh-gradient-home opacity-40 pointer-events-none -z-20"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-6 relative z-10 w-full"
          >
            <div className="flex items-center gap-2.5 mb-5 opacity-80">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ zIndex: 5 - i }} className="w-6 h-6 rounded-full border-2 border-background bg-surface-container flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-primary gap-0.5 mb-0.5">
                  <Star className="w-3 h-3 fill-primary" /><Star className="w-3 h-3 fill-primary" /><Star className="w-3 h-3 fill-primary" /><Star className="w-3 h-3 fill-primary" /><Star className="w-3 h-3 fill-primary" />
                </div>
                <div className="text-[9px] font-mono font-medium text-on-surface-variant uppercase tracking-widest">
                  Trusted by 200+ brands
                </div>
              </div>
            </div>

            <h1 className="font-display font-bold text-white mb-6 tracking-tighter" style={{ fontSize: "clamp(50px, 5.5vw, 84px)", lineHeight: 1.05 }}>
              Stop Guessing. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Start Scaling.</span>
            </h1>

            <p className="font-sans text-on-surface-variant text-base md:text-lg max-w-xl mb-10 leading-relaxed border-l-2 border-primary/30 pl-5">
              We create content that captures attention, sparks engagement, and keeps your brand visible across every platform; while you focus on growing your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-12">
              <MagneticButton href="/contact" className="w-full sm:w-auto text-center px-8 py-4 accent-gradient-button font-mono text-xs font-bold uppercase tracking-widest rounded shadow-[0_0_30px_rgba(var(--color-tertiary-rgb),0.35)]">
                Book a Demo
              </MagneticButton>
              <a href="/pricing" className="w-full sm:w-auto text-center px-2 py-3.5 bg-transparent text-on-surface-variant hover:text-white font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-300 underline underline-offset-4 decoration-white/20 hover:decoration-white/60">
                View Pricing
              </a>
            </div>

            {/* Interactive Service Selector (Moved under Hero content) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
               <div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"></div>

                  <h3 className="font-display text-xl font-bold text-white mb-4">What do you need help with?</h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveHeroTab(cat)}
                        className={`px-4 py-2 rounded-xl font-sans text-sm font-semibold transition-all ${activeHeroTab === cat ? 'bg-primary text-background shadow-lg' : 'bg-surface-container text-on-surface-variant hover:bg-white/10 hover:text-white border border-white/5'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Preview Card */}
                  <div className="bg-background/80 border border-white/5 rounded-[1.25rem] p-5 lg:p-6 transition-all flex flex-col md:flex-row items-center gap-6">
                     <div className="flex-grow w-full">
                       <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                           <CheckCircle2 className="w-5 h-5" />
                         </div>
                         <div>
                           <h4 className="font-display text-lg font-bold text-white mb-1">{previewService.title}</h4>
                           <div className="font-sans text-xs text-on-surface-variant line-clamp-2">{previewService.description}</div>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5 mt-5">
                          {previewService.features.slice(0, 4).map((f: string, i: number) => (
                             <div key={i} className="flex items-start gap-2 text-xs text-on-surface-variant font-sans">
                               <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                               {f}
                             </div>
                          ))}
                       </div>
                     </div>

                     <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-3 shrink-0 md:pl-6 md:border-l border-white/5">
                       <div className="text-left md:text-right">
                         <span className="text-[10px] text-on-surface-variant block mb-1 uppercase tracking-wider font-semibold">Starting at</span>
                         <div className="font-display font-bold text-2xl text-white">${previewService.sliderSteps[0].price}<span className="text-sm font-sans font-normal text-on-surface-variant">/mo</span></div>
                       </div>
                       <a href={`/service/${previewService.id}`} className="px-5 py-2.5 w-full text-center bg-white text-black hover:bg-gray-200 transition-colors rounded-xl font-bold text-xs flex justify-center items-center gap-2">
                         Explore <ArrowUpRight className="w-3.5 h-3.5" />
                       </a>
                     </div>
                  </div>
               </div>
            </motion.div>

          </motion.div>

          {/* Right Side: Vertical Carousel */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative">
             <HeroCarousel />
          </div>
        </div>
      </div>

      {/* Trusted By Marquee - Clean Minimal */}
      <section className="py-12 bg-surface-container border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 mb-6">
           <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Trusted by scaling companies</p>
        </div>
        <div className="overflow-hidden relative">
            <div className="flex gap-16 md:gap-32 items-center px-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 marquee-track whitespace-nowrap">
                {/* Duplicated for seamless scrolling effect */}
                {[1, 2].map((group) => (
                  <div key={group} className="flex gap-16 md:gap-32 items-center text-white font-display tracking-tighter shrink-0 text-xl md:text-3xl font-bold">
                      <span>Lumio Skincare</span>
                      <span>The Fit Club</span>
                      <span>Roast & Co.</span>
                      <span>Nova Apparel</span>
                      <span>Stackd Media</span>
                      <span>Bloom Wellness</span>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* Results Section - Streamlined */}
      <section id="stats-section" ref={statsRef} className="py-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl lg:text-5xl font-bold text-white tracking-tighter max-w-4xl mx-auto">Premium social media management without the premium agency costs.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats Stack */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <div className="flex-1 p-6 border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col justify-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/20 transition-colors"></div>
                 <div className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 font-bold">Posts Created</div>
                 <div className="text-primary font-display text-5xl md:text-6xl font-bold tracking-tighter">
                   <SlidingNumber value={isInView ? 1000000 : 0} />+
                 </div>
              </div>
              <div className="flex-1 p-6 border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col justify-center relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-tertiary/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-tertiary/20 transition-colors"></div>
                 <div className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 font-bold">Active Campaigns</div>
                 <div className="text-tertiary font-display text-5xl md:text-6xl font-bold tracking-tighter">
                   <SlidingNumber value={isInView ? 1350 : 0} />+
                 </div>
              </div>
              <div className="flex-1 p-6 border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col justify-center relative overflow-hidden group">
                 <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-secondary/20 transition-colors"></div>
                 <div className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 font-bold">Client Retention Rate</div>
                 <div className="text-secondary font-display text-5xl md:text-6xl font-bold tracking-tighter">
                   <SlidingNumber value={isInView ? 96 : 0} />%
                 </div>
              </div>
            </div>

            {/* Main Graph */}
            <div className="lg:col-span-2 flex flex-col justify-center pt-8 lg:pt-0 lg:pl-12">
               <h3 className="font-display text-3xl font-bold text-white mb-6">Social Media That Delivers</h3>
               <p className="text-on-surface-variant font-sans text-lg mb-6 leading-relaxed">We've partnered with businesses of all sizes to strengthen their online presence and build meaningful connections with their audiences. From local businesses to growing brands, we create consistent, high-quality content that keeps your social channels active, engaging, and on-brand.</p>
               <p className="text-on-surface-variant font-sans text-lg leading-relaxed">Every piece of content is crafted by experienced writers and designers, carefully reviewed before publishing, and tailored to perform on each platform. No long-term commitments or complicated contracts; just professional content, consistent execution, and a strategy focused on growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">The Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Our Three Simple Steps</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">We simplified the agency model into a predictable, frictionless assembly line for growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Connection line */}
             <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-white/10 z-0">
               <div className="h-full bg-primary w-full opacity-50"></div>
             </div>

             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
               className="relative z-10 bg-surface-container rounded-3xl p-8 border border-white/5 text-center px-8 hover:-translate-y-2 transition-transform duration-300"
             >
               <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary mx-auto flex items-center justify-center font-display font-bold text-2xl mb-6 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]">1</div>
               <h3 className="font-display text-xl font-bold text-white mb-4">Tell us about your business</h3>
               <p className="text-on-surface-variant text-sm">Quick onboarding so we understand your brand, voice, audience, and goals.</p>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
               className="relative z-10 bg-surface-container rounded-3xl p-8 border border-white/5 text-center px-8 hover:-translate-y-2 transition-transform duration-300"
             >
               <div className="w-16 h-16 rounded-2xl bg-tertiary/20 text-tertiary mx-auto flex items-center justify-center font-display font-bold text-2xl mb-6 shadow-[0_0_20px_rgba(var(--color-tertiary-rgb),0.3)]">2</div>
               <h3 className="font-display text-xl font-bold text-white mb-4">Review & Scale</h3>
               <p className="text-on-surface-variant text-sm">Approve content, request changes, or leave feedback—all in one place</p>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
               className="relative z-10 bg-surface-container rounded-3xl p-8 border border-white/5 text-center px-8 hover:-translate-y-2 transition-transform duration-300"
             >
               <div className="w-16 h-16 rounded-2xl bg-secondary/20 text-secondary mx-auto flex items-center justify-center font-display font-bold text-2xl mb-6 shadow-[0_0_20px_rgba(var(--color-secondary-rgb),0.3)]">3</div>
               <h3 className="font-display text-xl font-bold text-white mb-4">We post. You grow.</h3>
               <p className="text-on-surface-variant text-sm">Your content is published seamlessly across your social channels.</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Proof of Execution (Our Work) */}
      <section className="py-24 md:py-32 bg-surface-container-lowest border-y border-outline-variant/10 relative overflow-hidden">
        {/* Glow effects */}
        <ParallaxBlob className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" offsetX="-50%" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">Our Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter">
              Featured Work
            </h2>
            <p className="max-w-2xl text-on-surface-variant font-sans text-lg md:text-xl leading-relaxed">
              A look at posts created for actual clients across industries.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button onClick={() => setActivePortfolioTab("Featured")} className={`px-6 py-3 font-mono font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all duration-300 ${activePortfolioTab === 'Featured' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' : 'bg-transparent border border-white/10 hover:bg-white/5 text-white'}`}><Sparkles className="w-4 h-4"/> Featured</button>
            <button onClick={() => setActivePortfolioTab("Social Posts")} className={`px-6 py-3 font-mono font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all duration-300 ${activePortfolioTab === 'Social Posts' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' : 'bg-transparent border border-white/10 hover:bg-white/5 text-white'}`}><Image className="w-4 h-4"/> Social Posts</button>
            <button onClick={() => setActivePortfolioTab("Short-Form")} className={`px-6 py-3 font-mono font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all duration-300 ${activePortfolioTab === 'Short-Form' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' : 'bg-transparent border border-white/10 hover:bg-white/5 text-white'}`}><Video className="w-4 h-4"/> Short-Form</button>
            <button onClick={() => setActivePortfolioTab("UGC")} className={`px-6 py-3 font-mono font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all duration-300 ${activePortfolioTab === 'UGC' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' : 'bg-transparent border border-white/10 hover:bg-white/5 text-white'}`}><UserSquare2 className="w-4 h-4"/> UGC</button>
          </div>

          {/* Work Grid - Bento Style */}
          <div className="columns-1 lg:columns-2 gap-8 space-y-8">

            {/* Box 1: Social Media Posts */}
            {(activePortfolioTab === 'Featured' || activePortfolioTab === 'Social Posts') && (
            <motion.div
              ref={socialPostsTilt.ref}
              onMouseMove={socialPostsTilt.onMouseMove}
              onMouseLeave={socialPostsTilt.onMouseLeave}
              style={socialPostsTilt.tiltStyle}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="break-inside-avoid bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group mb-8"
            >
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3 text-white">
                   <div className="p-2 rounded-lg bg-surface-container border border-white/10"><Image className="w-4 h-4 text-on-surface-variant" /></div>
                   <span className="font-bold font-sans text-lg md:text-xl">Social Media Posts</span>
                 </div>

               </div>
               <div className="grid grid-cols-2 gap-4">
                  {socialImages.map((item, i) => (
                    <div
                      key={item.id}
                      className="rounded-xl overflow-hidden relative group/img aspect-square border border-white/5 cursor-pointer"
                      {...hoverPreviewHandlers}
                      role="button"
                      tabIndex={0}
                      onClick={() => setLightboxItem({ url: item.url, type: item.type === "video" ? "video" : "image", alt: `Social media post example ${i + 1}` })}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxItem({ url: item.url, type: item.type === "video" ? "video" : "image", alt: `Social media post example ${i + 1}` }); } }}
                    >
                      {item.type === "video"
                        ? <AutoplayVideo src={item.url} autoPlayInView={!canHover} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                        : <ImageWithSkeleton src={item.url} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={`Social media post example ${i + 1}`} />
                      }
                    </div>
                  ))}
               </div>
            </motion.div>
            )}

            {/* Box 2: Short-Form Videos */}
            {(activePortfolioTab === 'Featured' || activePortfolioTab === 'Short-Form') && (
            <motion.div
              ref={shortFormTilt.ref}
              onMouseMove={shortFormTilt.onMouseMove}
              onMouseLeave={shortFormTilt.onMouseLeave}
              style={shortFormTilt.tiltStyle}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="break-inside-avoid bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group mb-8"
            >
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3 text-white">
                   <div className="p-2 rounded-lg bg-surface-container border border-white/10"><Video className="w-4 h-4 text-on-surface-variant" /></div>
                   <span className="font-bold font-sans text-lg md:text-xl">Short-Form Videos</span>
                 </div>

               </div>
               <div className="grid grid-cols-2 gap-4">
                  {shortFormVideos.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden relative group/vid aspect-[9/16] border border-white/5 bg-black cursor-pointer"
                      {...hoverPreviewHandlers}
                      role="button"
                      tabIndex={0}
                      onClick={() => setLightboxItem({ url: item.url, type: "video", alt: `Short-form video example ${i + 1}` })}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxItem({ url: item.url, type: "video", alt: `Short-form video example ${i + 1}` }); } }}
                    >
                      <AutoplayVideo
                        src={item.url}
                        autoPlayInView={!canHover}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
               </div>
            </motion.div>
            )}

            {/* Box 3: Blog & SEO */}
            {(activePortfolioTab === 'Featured') && (
            <motion.div
              ref={blogSeoTilt.ref}
              onMouseMove={blogSeoTilt.onMouseMove}
              onMouseLeave={blogSeoTilt.onMouseLeave}
              style={blogSeoTilt.tiltStyle}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="break-inside-avoid bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group mb-8"
            >
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3 text-white">
                   <div className="p-2 rounded-lg bg-surface-container border border-white/10"><MonitorPlay className="w-4 h-4 text-on-surface-variant" /></div>
                   <span className="font-bold font-sans text-lg md:text-xl">Blog & SEO</span>
                 </div>

               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogImages.map((item: any, i: number) => (
                     <div
                       key={i}
                       className="rounded-xl overflow-hidden relative group/img aspect-video border border-white/5 bg-black cursor-pointer"
                       role="button"
                       tabIndex={0}
                       onClick={() => setLightboxItem({ url: item.url, type: "image", alt: `Blog and SEO content example ${i + 1}` })}
                       onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxItem({ url: item.url, type: "image", alt: `Blog and SEO content example ${i + 1}` }); } }}
                     >
                        <ImageWithSkeleton src={item.url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={`Blog and SEO content example ${i + 1}`} />
                     </div>
                  ))}
               </div>
            </motion.div>
            )}

            {/* Box 5: UGC */}
            {(activePortfolioTab === 'Featured' || activePortfolioTab === 'UGC') && (
            <motion.div
              ref={ugcTilt.ref}
              onMouseMove={ugcTilt.onMouseMove}
              onMouseLeave={ugcTilt.onMouseLeave}
              style={ugcTilt.tiltStyle}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="break-inside-avoid bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group mb-8"
            >
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3 text-white">
                   <div className="p-2 rounded-lg bg-surface-container border border-white/10"><UserSquare2 className="w-4 h-4 text-on-surface-variant" /></div>
                   <span className="font-bold font-sans text-lg md:text-xl">UGC Videos</span>
                 </div>

               </div>
               <div className="grid grid-cols-3 gap-4">
                 {[...ugcVideos, ...socialImages.filter((i: any) => i.type === 'video')].slice(0, 3).map((item: any, i: number) => (
                   <div
                     key={i}
                     className="rounded-xl overflow-hidden relative group/vid aspect-[9/16] border border-white/5 bg-black cursor-pointer"
                     {...hoverPreviewHandlers}
                     role="button"
                     tabIndex={0}
                     onClick={() => setLightboxItem({ url: item.url, type: "video", alt: `UGC video example ${i + 1}` })}
                     onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxItem({ url: item.url, type: "video", alt: `UGC video example ${i + 1}` }); } }}
                   >
                     <AutoplayVideo
                       src={item.url}
                       autoPlayInView={!canHover}
                       onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 0.1; }}
                       className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105"
                     />
                   </div>
                 ))}
               </div>
            </motion.div>
            )}
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 py-12 mt-16 border-y border-white/5 text-on-surface-variant font-mono text-xs uppercase tracking-widest font-bold">
             <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary/50" /> Vetted Marketers</div>
             <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tertiary/50" /> Fast Turnarounds</div>
             <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary/50" /> Fully Managed</div>
             <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary/50" /> Fixed Pricing</div>
             <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tertiary/50" /> Cancel Anytime</div>
          </div>

          {/* Services & Pricing Block */}
          <div className="mt-24 max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">Pricing</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
                Affordable pricing plans.
              </h2>
              <p className="text-on-surface-variant font-sans text-lg md:text-xl max-w-2xl mx-auto">
                Simple, transparent pricing. Everything you need to scale your social media presence without the agency overhead.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
               {servicesData.filter(s => ["social-media-posts", "short-form-videos", "seo-blog-posts"].includes(s.id)).slice(0, 3).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PricingCard service={service} />
                  </motion.div>
               ))}
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 md:gap-16 flex-wrap text-center opacity-80">
              <div className="font-sans">
                 <div className="font-bold text-3xl text-white mb-1">200+</div>
                 <div className="text-sm text-on-surface-variant font-medium">5-Star Reviews</div>
              </div>
              <div className="font-sans">
                 <div className="font-bold text-3xl text-white mb-1">100%</div>
                 <div className="text-sm text-on-surface-variant font-medium">Money-Back Guarantee</div>
              </div>
              <div className="font-sans">
                 <div className="font-bold text-3xl text-white mb-1">50+</div>
                 <div className="text-sm text-on-surface-variant font-medium">Vetted Creators</div>
              </div>
            </div>
          </div>

          {/* Money Back Guarantee Block */}
          <div className="mt-20 max-w-5xl mx-auto bg-surface-container border border-white/10 rounded-[2rem] p-8 md:p-14 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 group/card">
             <ParallaxBlob className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none group-hover/card:bg-primary/20 transition-colors duration-1000" />

             <div className="max-w-xl z-10 text-left">
               <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-tighter">
                 Not happy with your first batch? <br />
                 <span className="text-secondary bg-clip-text">Get your money back.</span>
               </h3>
               <p className="text-on-surface-variant font-sans text-lg leading-relaxed mb-8 max-w-lg">
                 We are so confident in our creative output that every new engagement comes with a 14-day absolute satisfaction guarantee. No friction, no endless email chains.
               </p>
               <div className="space-y-4 font-sans text-base">
                 <div className="flex items-start gap-4">
                   <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                     <CheckCircle2 className="w-3 h-3 text-primary" />
                   </div>
                   <p className="text-on-surface-variant leading-relaxed">Full 14 days to review your first batch of creatives and align with your dedicated squad.</p>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                     <CheckCircle2 className="w-3 h-3 text-primary" />
                   </div>
                   <p className="text-on-surface-variant leading-relaxed">Multiple revision rounds automatically baked into the sprint timeline to ensure exact brand alignment.</p>
                 </div>
               </div>
            </div>
                    <GuaranteeGauge />
          </div>


        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-4">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter text-white font-bold">Questions we get a lot.</h2>
          </div>
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/5">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="font-display font-bold text-white text-lg lg:text-xl group-hover:text-primary transition-colors pr-8">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-on-surface-variant flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  aria-hidden={openFaq !== index}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-on-surface-variant font-sans text-sm leading-relaxed max-w-2xl">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Minimal CTA */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center p-12 md:p-24 border border-white/10 rounded-2xl relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent -z-10"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary mb-6 font-bold flex items-center gap-2">
               <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span> Initialize Growth
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-8 text-white font-bold leading-tight">
              Ready to <span className="text-white">Dominate?</span>
            </h2>
            <p className="font-sans text-on-surface-variant mb-12 max-w-xl text-lg md:text-xl">
              Book a strategy call with our growth engineers. We'll audit your current setup and show you exactly where you're leaving money on the table.
            </p>
            <a href="/contact" className="px-8 py-4 accent-gradient-button font-mono text-xs font-bold uppercase tracking-widest rounded">
              Start The Audit
            </a>
        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && <MediaLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      </AnimatePresence>
    </>
  );
}
