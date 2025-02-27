import supabase from '../supabase/client';

export const createBookMark = async (newBookMark) => {
  await supabase.from('bookmarks').insert(newBookMark).select('*');
};
