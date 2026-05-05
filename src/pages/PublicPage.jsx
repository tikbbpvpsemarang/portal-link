import React, { useState, useEffect } from 'react';
import { LinkService } from '../services/LinkService';
import bgBuilding from '../assets/bbpvp.jpeg';
import { 
  Video, 
  ClipboardCheck, 
  BookOpen, 
  Globe, 
  Settings,
  ChevronRight,
  Cpu,
  Heart,
  Lock,
  ArrowUpRight,
  Send,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const iconOptions = {
  Video,
  ClipboardCheck,
  BookOpen,
  Globe,
  Settings
};

export default function PublicPage() {
  const [links, setLinks] = useState([]);
  const [settings, setSettings] = useState({ mainTitle: '', subTitle: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const linksData = await LinkService.getLinks();
      const settingsData = await LinkService.getSettings();
      setLinks(linksData);
      setSettings(settingsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await LinkService.addMessage(message);
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen public-bg text-white flex flex-col items-center justify-start p-6 md:p-12 overflow-x-hidden relative">
      
      {/* Admin Quick Access */}
      <Link 
        to="/login" 
        className="fixed bottom-6 right-6 p-3 rounded-full glass hover:bg-white/10 transition-all text-white/50 hover:text-white group z-50 shadow-xl"
        title="Admin Login"
      >
        <Lock size={20} />
      </Link>

      {/* Header Section */}
      <header className="w-full max-w-4xl flex flex-col items-center mb-16 text-center relative z-10 pt-8 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h2 className="text-blue-300 font-bold tracking-[0.2em] text-xs uppercase mb-3 drop-shadow-sm">Portal Pelatihan Terpadu</h2>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">
          {settings.mainTitle}
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-bold mb-6 backdrop-blur-sm">
          <Cpu className="w-4 h-4 animate-pulse" />
          {settings.subTitle}
        </div>
        <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed font-medium">
          {settings.description}
        </p>
      </header>

      {/* Grid Layout (Bento Style) */}
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10 mb-20">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 glass rounded-[3rem]">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-300 font-bold animate-pulse">Memuat portal...</p>
          </div>
        ) : (
          links.map((link, index) => {
            const IconComponent = iconOptions[link.icon] || Globe;
            const isFirst = index === 0;
            
            return (
              <a 
                key={link.id}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group relative flex flex-col justify-between p-6 rounded-3xl glass transition-all hover:translate-y-[-8px] hover:bg-white/10 hover:border-white/30 overflow-hidden shadow-2xl ${isFirst ? 'md:col-span-2 lg:col-span-2 md:h-64' : 'h-64'}`}
              >
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/20 blur-3xl group-hover:bg-blue-500/30 transition-all"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-indigo-600/20 text-white group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-500 shadow-xl">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <div className="relative z-10 mt-auto">
                  <h2 className="font-black text-white text-xl md:text-2xl mb-1 group-hover:translate-x-1 transition-transform">
                    {link.title}
                  </h2>
                  {link.subtitle && (
                    <p className="text-sm text-white/80 group-hover:text-white leading-snug max-w-[90%] font-medium">
                      {link.subtitle}
                    </p>
                  )}
                </div>
  
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full transition-all duration-700"></div>
              </a>
            );
          })
        )}

        {!loading && links.length === 0 && (
          <div className="col-span-full text-center py-32 glass rounded-[3rem] border-dashed border-2 border-white/10">
            <p className="italic text-lg text-white/50">Belum ada modul pelatihan yang tersedia.</p>
          </div>
        )}
      </main>

      {/* Message Section */}
      <section className="w-full max-w-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="glass p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center text-white">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Pesan & Kesan</h2>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center text-green-300 mb-4 border border-green-500/40">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Terima Kasih!</h3>
              <p className="text-white/70 text-sm">Pesan Anda telah kami terima.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div className="relative">
                <textarea 
                  placeholder="Tuliskan pesan atau kesan Anda tentang pelatihan ini..."
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-white min-h-[120px] focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-white/20 text-sm md:text-base font-medium"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black px-8 py-3 rounded-xl transition-all flex items-center gap-2 group shadow-xl shadow-blue-900/50 active:scale-95"
                >
                  KIRIM PESAN
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center relative z-10 pb-12">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8"></div>
        <p className="text-white/60 text-xs flex items-center justify-center gap-1.5 font-bold">
          Powered by <span className="text-blue-300">Tim TIK</span> <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> 
        </p>
        <p className="text-[10px] text-white/40 mt-2 uppercase tracking-[0.3em] font-black">
          © 2026 BBPVP Semarang • Excellence in Training
        </p>
      </footer>

      {/* Deep Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none"></div>
    </div>
  );
}
