import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (can be improved with a backend later)
    if (password === 'admin123') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Password salah! Silakan coba lagi.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
            <ShieldCheck className="text-blue-400 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Admin Access</h1>
          <p className="text-slate-400 text-sm">Masuk untuk mengelola portal link</p>
        </div>

        {/* Login Form */}
        <div className="glass p-8 rounded-[2rem] relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Password Admin</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="password" 
                  autoFocus
                  required
                  placeholder="Masukkan password..."
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-700"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/40"
            >
              LOG IN
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Back to Portal */}
        <button 
          onClick={() => navigate('/')}
          className="w-full mt-6 text-slate-500 hover:text-slate-300 text-sm font-bold transition-colors"
        >
          KEMBALI KE PORTAL
        </button>

      </div>
    </div>
  );
}
