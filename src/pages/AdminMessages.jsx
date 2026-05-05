import React, { useState, useEffect } from 'react';
import { LinkService } from '../services/LinkService';
import { 
  MessageSquare, 
  Clock, 
  Trash2, 
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  Search,
  ChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await LinkService.getMessages();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Hapus pesan ini secara permanen?')) {
      await LinkService.deleteMessage(id);
      const data = await LinkService.getMessages();
      setMessages(data);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen mesh-gradient text-slate-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">
              <MessageSquare size={14} />
              Feedback Peserta
            </div>
            <h1 className="text-3xl font-black text-white">Pesan & Kesan</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all border border-slate-700"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <button 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-semibold transition-all border border-red-500/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Cari pesan tertentu..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="glass px-6 py-3 rounded-2xl flex items-center justify-between border-l-4 border-blue-500">
            <span className="text-slate-400 font-bold text-sm uppercase">Total Pesan</span>
            <span className="text-2xl font-black text-white">{messages.length}</span>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-20 glass rounded-[2.5rem] border-dashed border-2 border-slate-800 opacity-50">
              <MessageSquare size={48} className="mx-auto mb-4 text-slate-700" />
              <p className="text-lg italic font-medium">Tidak ada pesan yang ditemukan.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div key={msg.id} className="glass p-6 rounded-3xl group relative hover:bg-white/5 transition-all border-white/5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-lg text-slate-200 leading-relaxed font-medium mb-4 italic">
                      "{msg.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={12} />
                        {msg.date}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="p-3 rounded-xl bg-red-500/10 text-red-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white self-end md:self-start"
                    title="Hapus Pesan"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2026 Admin Panel • BBPVP Semarang TIK
        </div>

      </div>
    </div>
  );
}
