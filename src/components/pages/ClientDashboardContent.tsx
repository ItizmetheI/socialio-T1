import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Package, FileText, CreditCard, LifeBuoy, LogOut, CheckCircle2, ChevronRight } from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png';
import logoText from '../../assets/logo-text.png';

// ---------------------------------------------------------------------------
// NON-FUNCTIONAL DEMO -- placeholder portal UI, not a real client dashboard.
//
// Every figure rendered below (services, deliverables, invoices, support
// tickets) is hardcoded placeholder content. Nothing is fetched, nothing is
// user-specific, and no customer data of any kind exists behind this screen.
// The localStorage check below is a UI convenience so the demo flows from the
// login mockup -- it is NOT a security control and does not protect anything.
// Route is noindex. See ClientLoginContent.tsx for the full notice.
//
// !! REPLACE WITH REAL SERVER-SIDE AUTH BEFORE RENDERING ANY REAL CLIENT DATA.
// ---------------------------------------------------------------------------
export default function ClientDashboardContent({ path }: { path: string }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Demo gate only -- see the notice above. Not a security boundary.
    if (localStorage.getItem('isClientLoggedIn') === 'true') {
      setAuthorized(true);
    } else {
      window.location.href = '/client-login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isClientLoggedIn');
    window.location.href = '/client-login';
  };

  const navLinks = [
    { icon: LayoutDashboard, label: 'Overview', path: '/client-dashboard' },
    { icon: Package, label: 'My Services', path: '/client-dashboard/services' },
    { icon: FileText, label: 'Deliverables', path: '/client-dashboard/deliverables' },
    { icon: CreditCard, label: 'Billing', path: '/client-dashboard/billing' },
    { icon: LifeBuoy, label: 'Support', path: '/client-dashboard/support' },
  ];

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-surface-container/30 border-r border-white/5 flex flex-col p-6 h-auto md:h-screen sticky top-0 md:flex-shrink-0 z-10 transition-colors">
        <a href="/" className="flex items-center gap-2 mb-12">
          <img src={logoIcon.src} alt="" className="h-9 w-auto" />
          <img src={logoText.src} alt="Socialio" className="h-4 w-auto" />
        </a>

        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-colors ${
                path === link.path
                  ? 'bg-primary border border-primary/50 text-white shadow-lg shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <link.icon className={`w-5 h-5 ${path === link.path ? 'text-white' : 'opacity-70'}`} />
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium border border-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-on-surface-variant transition-colors"
        >
          <LogOut className="w-5 h-5 opacity-70" />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto w-full max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-mono text-xs uppercase tracking-widest rounded-full mb-4">
              Dashboard
            </span>
            <h1 className="font-display text-4xl font-bold text-white mb-2">Good to have you back.</h1>
            <p className="font-sans text-on-surface-variant text-lg">Here's an overview of your active content engine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
             {/* Stat Card 1 */}
             <div className="bg-surface-container border border-white/10 rounded-3xl p-6 hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="flex justify-between items-start mb-6">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      <Package className="w-5 h-5 text-primary" />
                   </div>
                   <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono font-bold uppercase rounded-md border border-green-500/30">Active</span>
                </div>
                <div className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-1">Active Services</div>
                <div className="font-display text-3xl font-bold text-white">2</div>
             </div>

             {/* Stat Card 2 */}
             <div className="bg-surface-container border border-white/10 rounded-3xl p-6 hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <FileText className="w-5 h-5 text-blue-400" />
                   </div>
                </div>
                <div className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-1">Next Delivery</div>
                <div className="font-display text-3xl font-bold text-white">Oct 24</div>
             </div>

             {/* Stat Card 3 */}
             <div className="bg-surface-container border border-white/10 rounded-3xl p-6 hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                      <LifeBuoy className="w-5 h-5 text-purple-400" />
                   </div>
                </div>
                <div className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-1">Revision Credits</div>
                <div className="font-display text-3xl font-bold text-white">4 <span className="text-sm font-sans text-on-surface-variant font-normal">/ 5</span></div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-surface-container border border-white/10 rounded-3xl p-6 md:p-8">
               <h2 className="font-display text-xl font-bold text-white mb-6">Recent Activity</h2>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1 border border-primary/30 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                     </div>
                     <div>
                        <h4 className="font-sans font-bold text-white text-base">October Content Strategy Approved</h4>
                        <p className="font-sans text-sm text-on-surface-variant mt-1">Your strategy document has been approved and moved to production.</p>
                        <span className="font-mono text-xs text-on-surface-variant opacity-70 block mt-2">2 days ago</span>
                     </div>
                  </div>
                  <div className="w-full h-px bg-white/5"></div>
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mt-1 border border-white/10 shrink-0">
                        <Package className="w-4 h-4 text-on-surface-variant" />
                     </div>
                     <div>
                        <h4 className="font-sans font-bold text-white text-base">September Deliverables Uploaded</h4>
                        <p className="font-sans text-sm text-on-surface-variant mt-1">15 short-form videos and 30 social posts are now available for download.</p>
                        <span className="font-mono text-xs text-on-surface-variant opacity-70 block mt-2">1 week ago</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-surface-container border border-white/10 rounded-3xl p-6 md:p-8">
               <h2 className="font-display text-xl font-bold text-white mb-6">Quick Links</h2>
               <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                     <span className="font-sans font-medium text-white text-sm">Review Drafts</span>
                     <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                     <span className="font-sans font-medium text-white text-sm">Submit Asset Request</span>
                     <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                     <span className="font-sans font-medium text-white text-sm">Update Brand Guidelines</span>
                     <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
               </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
