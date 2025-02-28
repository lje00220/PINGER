import supabase from '../supabase/client';

/**
 * 북마크 추가 함수
 * @param {*} newBookMark
 */
export const createBookMark = async (jobId, userId) => {
  await supabase.from('bookmarks').insert([{ job_id: jobId, user_id: userId }]);
};
