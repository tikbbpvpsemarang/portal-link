import React, { useState, useEffect } from 'react';
import { LinkService } from '../services/LinkService';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  ExternalLink,
  LayoutDashboard,
  Eye,
  Video,
  ClipboardCheck,
  BookOpen,
  Globe,
  Settings,
  LogOut,
  GripVertical,
  MessageSquare,
  ArrowRight,
  Lock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const iconOptions = {
  Video,
  ClipboardCheck,
  BookOpen,
  Globe,
  Settings
};

export default function AdminDashboard() {
  const [links, setLinks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLink, setCurrentLink] = useState({ title: '', url: '', icon: 'Globe', subtitle: '' });
  const [settings, setSettings] = useState({ mainTitle: '', subTitle: '', description: '' });
  const [messageCount, setMessageCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const linksData = await LinkService.getLinks();
      const settingsData = await LinkService.getSettings();
      const messagesData = await LinkService.getMessages();
      setLinks(linksData);
      setSettings(settingsData);
      setMessageCount(messagesData.length);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentLink.id) {
      await LinkService.updateLink(currentLink);
    } else {
      await LinkService.addLink(currentLink);
    }
    const updatedLinks = await LinkService.getLinks();
    setLinks(updatedLinks);
    resetForm();
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    await LinkService.saveSettings(settings);
    alert('Pengaturan berhasil disimpan!');
  };

  const handleEdit = (link) => {
    setCurrentLink(link);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus link ini?')) {
      await LinkService.deleteLink(id);
      const updatedLinks = await LinkService.getLinks();
      setLinks(updatedLinks);
    }
  };

  const resetForm = () => {
    setCurrentLink({ title: '', url: '', icon: 'Globe', subtitle: '' });
    setIsEditing(false);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLinks(items);
    await LinkService.saveLinks(items);
  };

  return (
    <div className="min-h-screen mesh-gradient text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-1">Sistem Manajemen</h2>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              <LayoutDashboard className="text-blue-400" />
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all border border-slate-700"
            >
              <Eye size={18} />
              Portal
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

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass p-6 rounded-2xl border-l-4 border-blue-500">
            <h3 className="text-slate-400 font-bold text-xs uppercase mb-1 tracking-wider">Kelola Link</h3>
            <p className="text-2xl font-black text-white">{links.length} Link Aktif</p>
          </div>
          
          <Link to="/admin/messages" className="glass p-6 rounded-2xl border-l-4 border-cyan-500 hover:bg-white/5 transition-all group">
            <h3 className="text-slate-400 font-bold text-xs uppercase mb-1 tracking-wider">Pesan Peserta</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-black text-white">{messageCount} Pesan</p>
              <ArrowRight className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <div className="glass p-6 rounded-2xl border-l-4 border-indigo-500">
            <h3 className="text-slate-400 font-bold text-xs uppercase mb-1 tracking-wider">Status Sistem</h3>
            <p className="text-2xl font-black text-green-400 uppercase">Online</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Settings & Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Site Settings */}
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Settings size={18} className="text-blue-400" />
                Info Portal
              </h2>
              <form onSubmit={handleSettingsSave} className="space-y-4">
                <input 
                  type="text" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={settings.mainTitle}
                  onChange={(e) => setSettings({...settings, mainTitle: e.target.value})}
                  placeholder="Judul Utama"
                />
                <input 
                  type="text" 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={settings.subTitle}
                  onChange={(e) => setSettings({...settings, subTitle: e.target.value})}
                  placeholder="Sub Judul"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg text-sm transition-all">
                  Update Info
                </button>
              </form>
            </div>

            {/* Security Settings */}
            <div className="glass p-6 rounded-2xl border-t-2 border-red-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lock size={18} className="text-red-400" />
                Keamanan Akses
              </h2>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const newPass = e.target.password.value;
                  if (window.confirm('Yakin ingin mengganti password admin?')) {
                    const success = await LinkService.updateAdminPassword(newPass);
                    if (success) {
                      alert('Password berhasil diganti!');
                      e.target.reset();
                    }
                  }
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Password Baru</label>
                  <input 
                    type="password" 
                    name="password"
                    required
                    placeholder="Minimal 6 karakter..."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-red-500 outline-none text-sm transition-all"
                  />
                </div>
                <button type="submit" className="w-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold py-2.5 rounded-xl text-sm transition-all border border-red-500/20 shadow-lg shadow-red-900/10">
                  Ganti Password
                </button>
              </form>
            </div>

            {/* Add/Edit Link Form */}
            <div className="glass p-6 rounded-2xl border-t-2 border-green-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                {isEditing ? <Edit2 size={18} className="text-yellow-400" /> : <Plus size={18} className="text-green-400" />}
                {isEditing ? 'Edit Link' : 'Tambah Link Baru'}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-3">
                  <input 
                    type="text" required placeholder="Nama Link"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                    value={currentLink.title}
                    onChange={(e) => setCurrentLink({...currentLink, title: e.target.value})}
                  />
                  <input 
                    type="url" required placeholder="URL (https://...)"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                    value={currentLink.url}
                    onChange={(e) => setCurrentLink({...currentLink, url: e.target.value})}
                  />
                  <select 
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all appearance-none cursor-pointer"
                    value={currentLink.icon}
                    onChange={(e) => setCurrentLink({...currentLink, icon: e.target.value})}
                  >
                    {Object.keys(iconOptions).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm shadow-lg shadow-blue-900/30 transition-all">
                    {isEditing ? 'Update Link' : 'Simpan Link'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetForm} className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all">
                      <X size={20} className="text-slate-400" />
                    </button>
                  )}
                </div>
              </form>
            </div>

          </div>

          {/* Right Column: Link List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GripVertical size={20} className="text-slate-500" />
                Daftar Link
              </h2>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tarik untuk ubah urutan</span>
            </div>
            
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="links-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    {links.map((link, index) => {
                      const IconComponent = iconOptions[link.icon] || Globe;
                      return (
                        <Draggable key={link.id.toString()} draggableId={link.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.draggableProps}
                              className={`glass p-4 rounded-2xl flex items-center justify-between group transition-all ${snapshot.isDragging ? 'shadow-2xl border-blue-500/50 bg-blue-600/10 scale-[1.02] z-50' : 'hover:bg-white/5'}`}
                            >
                              <div className="flex items-center gap-4">
                                <div {...provided.dragHandleProps} className="p-1 text-slate-600 hover:text-slate-300">
                                  <GripVertical size={20} />
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                  <IconComponent size={20} />
                                </div>
                                <div>
                                  <h3 className="font-bold text-white text-sm">{link.title}</h3>
                                  <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{link.url}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(link)} className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all"><Edit2 size={14} /></button>
                                <button onClick={() => handleDelete(link.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

        </div>
      </div>
    </div>
  );
}
