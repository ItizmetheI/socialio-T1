import { ShoppingBag, ChevronDown, MonitorPlay, Menu, X } from "lucide-react";
import { useCart } from "../hooks/useCart";
import CartDrawer from "./CartDrawer";
import { useState, useEffect } from "react";
import { servicesData } from "../data/services";
import logoIcon from "../assets/logo-icon.png";
import logoText from "../assets/logo-text.png";
import MagneticButton from "./MagneticButton";

const SHOW_CLIENT_PORTAL = import.meta.env.PUBLIC_SHOW_CLIENT_PORTAL === "true";

export default function NavBar({ currentPath: initialPath }: { currentPath: string }) {
  const { items, setIsCartOpen } = useCart();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // transition:persist keeps this component mounted across page navigations,
  // so `currentPath` (a prop) never updates again after the first swap — track it via the DOM instead.
  const [currentPath, setCurrentPath] = useState(initialPath);

  useEffect(() => {
    const syncPath = () => setCurrentPath(window.location.pathname);
    document.addEventListener("astro:page-load", syncPath);
    return () => document.removeEventListener("astro:page-load", syncPath);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const isActive = (path: string) => {
    return currentPath === path
      ? "text-primary font-bold pb-1 font-label-md text-label-md"
      : "text-on-surface/70 font-body-md hover:text-primary transition-colors duration-300 font-label-md text-label-md";
  };

  const isMobileActive = (path: string) => {
    return currentPath === path
      ? "text-primary font-bold block"
      : "text-on-surface-variant hover:text-white block transition-colors duration-300";
  };

  return (
    <>
      <nav
        className="fixed top-0 w-full z-40 bg-background/90 backdrop-blur-md border-b border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] [transform:translateZ(0)]"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <a href="/" className="flex items-center gap-2">
            <img src={logoIcon.src} alt="" className="h-9 w-auto" />
            <img src={logoText.src} alt="Socialio" className="h-4 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-8 relative">
            <a href="/" className={isActive("/")}>Home</a>

            {/* Services Mega Menu Toggle */}
            <a
              href="/services"
              className={`flex items-center gap-1 transition-colors ${activeDropdown === 'services' || currentPath.startsWith('/service') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
              onMouseEnter={() => setActiveDropdown('services')}
              onFocus={() => setActiveDropdown('services')}
              aria-expanded={activeDropdown === 'services'}
            >
              Services <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </a>

            <a href="/case-studies" className={isActive("/case-studies")}>Case Studies</a>

            {/* Company Mega Menu Toggle */}
            <a
              href="/about"
              className={`flex items-center gap-1 transition-colors ${activeDropdown === 'company' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
              onMouseEnter={() => setActiveDropdown('company')}
              onFocus={() => setActiveDropdown('company')}
              aria-expanded={activeDropdown === 'company'}
            >
              Company <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
            </a>
            <a href="/pricing" className={isActive("/pricing")}>Pricing</a>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative text-on-surface-variant hover:text-primary transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-background font-sans text-[10px] flex items-center justify-center rounded-full font-bold">
                  {items.length}
                </span>
              )}
            </button>
            {SHOW_CLIENT_PORTAL && (
              <a href="/client-login" className="hidden border border-white/10 md:inline-block bg-white text-black px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-gray-200">
                Log in
              </a>
            )}
            <MagneticButton href="/contact" className="hidden md:inline-block accent-gradient-button px-6 py-2 rounded-xl font-bold text-sm">
              Get Started
            </MagneticButton>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menus Dropdowns directly attached to navbar for seamless hovering */}
        <div
          className={`hidden md:block absolute top-full left-0 w-full bg-surface-container border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden origin-top ${activeDropdown ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 pointer-events-none'}`}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveDropdown(null); }}
        >
           <div className="max-w-7xl mx-auto px-6 py-8" onMouseLeave={() => setActiveDropdown(null)}>
              {activeDropdown === 'services' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                   <div className="lg:col-span-1 border-r border-white/5 pr-8">
                      <h4 className="font-mono text-xs text-primary uppercase tracking-widest font-bold mb-4">Core Services</h4>
                      <p className="font-sans text-on-surface-variant text-sm leading-relaxed mb-6">Explore our productized growth solutions designed to scale your operations instantly.</p>
                      <a href="/services" className="text-sm font-bold text-white hover:text-primary transition-colors flex items-center gap-2" onClick={() => setActiveDropdown(null)}>View All Services &rarr;</a>
                   </div>
                   <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-8">
                     {servicesData.map(service => (
                       <a
                         key={service.id}
                         href={`/service/${service.id}`}
                         onClick={() => setActiveDropdown(null)}
                         className="group block"
                       >
                         <h5 className="font-display font-bold text-white group-hover:text-primary transition-colors mb-2 flex items-center gap-2">
                           <MonitorPlay className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                           {service.title}
                         </h5>
                         <p className="font-sans text-xs text-on-surface-variant line-clamp-2">{service.description}</p>
                       </a>
                     ))}
                   </div>
                </div>
              )}
              {activeDropdown === 'company' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                   <a href="/about" onClick={() => setActiveDropdown(null)} className="group bg-background p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                      <h3 className="font-display text-lg font-bold text-white mb-2">About Us</h3>
                      <p className="text-sm text-on-surface-variant font-sans">Learn about our mission to productize the marketing agency model.</p>
                   </a>
                   <a href="/industries" onClick={() => setActiveDropdown(null)} className="group bg-background p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                      <h3 className="font-display text-lg font-bold text-white mb-2">Industries We Serve</h3>
                      <p className="text-sm text-on-surface-variant font-sans">See how we drive scale in SaaS, E-com, Health, and more.</p>
                   </a>
                   <a href="/reviews" onClick={() => setActiveDropdown(null)} className="group bg-background p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                      <h3 className="font-display text-lg font-bold text-white mb-2">Client Reviews</h3>
                      <p className="text-sm text-on-surface-variant font-sans">Read verified reviews from companies successfully scaling with us.</p>
                   </a>
                   <a href="/compare" onClick={() => setActiveDropdown(null)} className="group bg-background p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                      <h3 className="font-display text-lg font-bold text-white mb-2">Compare The Alternative</h3>
                      <p className="text-sm text-on-surface-variant font-sans">See why hiring us beats traditional agencies and in-house roles.</p>
                   </a>
                </div>
              )}
           </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-surface-container border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100 h-[calc(100vh-80px)] overflow-y-auto' : 'opacity-0 scale-y-0 h-0 pointer-events-none'}`}>
           <div className="px-6 py-8 flex flex-col gap-6">
              <a href="/" className={isMobileActive("/")}>Home</a>
              <a href="/services" className={isMobileActive("/services")}>Services</a>
              <a href="/case-studies" className={isMobileActive("/case-studies")}>Case Studies</a>
              <a href="/about" className={isMobileActive("/about")}>Company</a>
              <a href="/pricing" className={isMobileActive("/pricing")}>Pricing</a>

              <div className="h-[1px] bg-white/10 my-2 w-full"></div>

              <a href="/contact" className="text-center accent-gradient-button px-6 py-3 rounded-xl font-bold text-sm">
                Get Started
              </a>
              {SHOW_CLIENT_PORTAL && (
                <a href="/client-login" className="text-center border border-white/20 bg-transparent text-white px-6 py-3 rounded-xl font-bold text-sm">
                  Log in
                </a>
              )}
           </div>
        </div>
      </nav>
      <CartDrawer />
    </>
  );
}
