import supabase from '../supabase/client';

/**
 * 북마크 추가 함수
 * @param {*} newBookMark
 */
export const createBookMark = async (newBookMark) => {
  await supabase.from('bookmarks').insert(newBookMark).select('*');
};
