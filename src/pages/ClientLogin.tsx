import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Lock, Mail, Quote, LayoutDashboard, Zap } from 'lucide-react';

export default function ClientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isClientLoggedIn', 'true');
    navigate('/client-dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2 translate-y-1/2" />
      
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 z-10">
        <Link to="/" className="flex items-center gap-2 mb-16 md:absolute md:top-8 md:left-12">
          <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-display font-bold text-lg leading-none tracking-tighter">
            KB
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">Growth</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-mono text-xs uppercase tracking-widest rounded-full mb-4">
              Client Portal
            </span>
            <h1 className="font-display text-4xl font-bold text-white mb-3">Welcome back.</h1>
            <p className="font-sans text-on-surface-variant text-lg">Sign in to access your content engine dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="font-mono text-xs text-on-surface-variant font-medium tracking-wide uppercase px-1">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-sans"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs text-on-surface-variant font-medium tracking-wide uppercase px-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-sans"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-8 bg-white text-black hover:bg-primary hover:text-white transition-colors duration-300 rounded-xl font-bold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(215,183,255,0.3)]"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8">
            <Link to="/contact" className="text-on-surface-variant hover:text-white text-sm font-sans underline underline-offset-4 transition-colors">
              Need access? Contact us
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Right side: Image/Info */}
      <div className="hidden md:flex flex-col md:w-1/2 bg-surface-container/30 border-l border-white/5 relative items-center justify-center p-12 lg:p-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="max-w-md w-full relative z-10"
        >
           <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl mb-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
             <Quote className="w-10 h-10 text-primary/40 mb-6" />
             <p className="font-sans text-xl text-white leading-relaxed mb-8">
               "The dashboard gives us complete visibility into our content pipeline. We went from chaotic email threads to a streamlined engine in weeks."
             </p>
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" alt="Sarah J." className="w-full h-full object-cover" />
               </div>
               <div>
                 <div className="font-bold text-white text-sm">Sarah Jenkins</div>
                 <div className="text-on-surface-variant font-sans text-xs">CMO, TechFlow</div>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors shadow-lg">
                <LayoutDashboard className="w-6 h-6 text-primary mb-3" />
                <h3 className="text-white font-bold text-sm mb-1">Centralized Hub</h3>
                <p className="text-on-surface-variant font-sans text-xs">Track all deliveries, revisions, and active services in one place.</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors shadow-lg">
                <Zap className="w-6 h-6 text-tertiary mb-3" />
                <h3 className="text-white font-bold text-sm mb-1">Faster Reviews</h3>
                <p className="text-on-surface-variant font-sans text-xs">Approve content and leave feedback directly on assets.</p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
