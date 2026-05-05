import { supabase } from './supabaseClient';

export const LinkService = {
  getLinks: async () => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching links:', error);
      return [];
    }
    return data;
  },

  saveLinks: async (links) => {
    // In Supabase, we usually update order_index for reordering
    // For simplicity in this migration, we'll update each link's order_index
    const updates = links.map((link, index) => ({
      id: link.id,
      order_index: index
    }));

    const { error } = await supabase
      .from('links')
      .upsert(updates);

    if (error) console.error('Error saving link order:', error);
  },

  addLink: async (link) => {
    const { data: links } = await supabase.from('links').select('order_index');
    const maxOrder = links?.length > 0 ? Math.max(...links.map(l => l.order_index || 0)) : -1;
    
    const { data, error } = await supabase
      .from('links')
      .insert([{ ...link, order_index: maxOrder + 1 }])
      .select();

    if (error) console.error('Error adding link:', error);
    return data;
  },

  updateLink: async (updatedLink) => {
    const { data, error } = await supabase
      .from('links')
      .update(updatedLink)
      .eq('id', updatedLink.id)
      .select();

    if (error) console.error('Error updating link:', error);
    return data;
  },

  deleteLink: async (id) => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);

    if (error) console.error('Error deleting link:', error);
  },

  getSettings: async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error || !data) {
      return { 
        mainTitle: 'BBPVP SEMARANG', 
        subTitle: 'Bidang TIK',
        description: 'Portal Layanan Pelatihan Terpadu. Akses semua kebutuhan belajar dalam satu pintu.' 
      };
    }
    return data;
  },

  saveSettings: async (settings) => {
    // Upsert settings (assuming id 1 for the main settings)
    const { data, error } = await supabase
      .from('settings')
      .upsert({ id: 1, ...settings })
      .select();

    if (error) console.error('Error saving settings:', error);
    return data;
  },

  getMessages: async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
    return data;
  },

  addMessage: async (text) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ text }])
      .select();

    if (error) console.error('Error adding message:', error);
    return data;
  },

  deleteMessage: async (id) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) console.error('Error deleting message:', error);
  }
};

