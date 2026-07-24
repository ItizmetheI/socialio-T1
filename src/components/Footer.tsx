import { servicesData } from "../data/services";
import { Instagram, Facebook, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import logoIcon from "../assets/logo-icon.png";
import logoText from "../assets/logo-text.png";

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;

export default function Footer() {
  const socialCategories = servicesData.filter(s => s.category === "Social Media");
  const otherCategories = servicesData.filter(s => s.category !== "Social Media");

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@")) return;

    if (!WEB3FORMS_KEY) {
      setSubmitted(true);
      return;
    }

    setSubscribing(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New newsletter signup from socialio.io",
          from_name: "Socialio Newsletter",
          email
        })
      });
    } catch {
      // fail silently in the footer widget; the email address is simply lost this one time
    } finally {
      setSubscribing(false);
      setSubmitted(true);
    }
  };

  return (
    <footer className="w-full bg-background border-t border-white/5 pt-20 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

            {/* Brand & Newsletter */}
            <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <img src={logoIcon.src} alt="" className="h-8 w-auto" />
                  <img src={logoText.src} alt="Socialio" className="h-3.5 w-auto" />
                </div>
                <p className="font-sans text-on-surface-variant max-w-sm mb-8">
                  Precision marketing for high-growth teams. We turn digital attention into enterprise value.
                </p>
                <div className="bg-surface-container rounded-2xl p-6 border border-white/5 mb-8">
                   <h5 className="font-bold text-white mb-2 text-sm font-sans flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" /> Join the Growth Newsletter
                   </h5>
                   <p className="text-xs text-on-surface-variant mb-4 font-sans">Actionable insights sent weekly.</p>
                   {submitted ? (
                     <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-3 rounded-lg">
                       <CheckCircle2 className="w-5 h-5" /> You're in. Growth incoming.
                     </div>
                   ) : (
                     <div className="flex gap-2">
                       <input
                         type="email"
                         placeholder="Email address"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                         className="bg-background border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary flex-grow"
                       />
                       <button onClick={handleSubmit} disabled={subscribing} className="bg-white text-black p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-60">
                         <ArrowRight className="w-4 h-4" />
                       </button>
                     </div>
                   )}
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant">
                   <a href="https://www.facebook.com/share/17oA4Peihv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                   <a href="https://www.instagram.com/getsocialio?igsh=MTZ2Y21ucDN1dmRvdg==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                </div>
            </div>

            {/* Social Services */}
            <div className="lg:col-span-1">
                <h5 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-6">Social Media</h5>
                <ul className="space-y-4 font-sans text-sm">
                    {socialCategories.map(s => (
                       <li key={s.id}><a href={`/service/${s.id}`} className="text-on-surface-variant hover:text-white transition-colors block line-clamp-1">{s.title}</a></li>
                    ))}
                    <li><a href="/services" className="text-primary hover:text-primary-hover font-bold transition-colors">All Social Services &rarr;</a></li>
                </ul>
            </div>

            {/* Other Services */}
            <div className="lg:col-span-1">
                <h5 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-6">Growth & Scale</h5>
                <ul className="space-y-4 font-sans text-sm">
                    {otherCategories.map(s => (
                       <li key={s.id}><a href={`/service/${s.id}`} className="text-on-surface-variant hover:text-white transition-colors block line-clamp-1">{s.title}</a></li>
                    ))}
                    <li><a href="/services" className="text-primary hover:text-primary-hover font-bold transition-colors">All Growth Services &rarr;</a></li>
                </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-1">
                <h5 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-6">Company</h5>
                <ul className="space-y-4 font-sans text-sm">
                    <li><a href="/about" className="text-on-surface-variant hover:text-white transition-colors">About Us</a></li>
                    <li><a href="/industries" className="text-on-surface-variant hover:text-white transition-colors">Industries We Serve</a></li>
                    <li><a href="/reviews" className="text-on-surface-variant hover:text-white transition-colors flex items-center gap-2">Client Reviews <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] rounded animate-pulse">New</span></a></li>
                    <li><a href="/case-studies" className="text-on-surface-variant hover:text-white transition-colors">Case Studies</a></li>
                    <li><a href="/examples" className="text-on-surface-variant hover:text-white transition-colors">Our Work Gallery</a></li>
                    <li><a href="/compare" className="text-on-surface-variant hover:text-white transition-colors">Compare</a></li>
                    <li><a href="/pricing" className="text-on-surface-variant hover:text-white transition-colors">Pricing</a></li>
                </ul>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-6 px-4">
            <div className="flex flex-wrap items-center gap-6 text-xs text-on-surface-variant font-sans">
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <span>© {new Date().getFullYear()} Socialio. All rights reserved.</span>
            </div>
        </div>
      </div>
    </footer>
  );
}
