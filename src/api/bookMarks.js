import { QUERY_KEY } from '../constants/queryKeys';
import supabase from '../supabase/client';

/**
 * 북마크 추가 함수
 * @param {*} newBookMark
 */
export const createBookMark = async ({ jobId, userId }) => {
  try {
    const { error } = await supabase
      .from(QUERY_KEY.BOOKMARKS)
      .insert([{ job_id: jobId, user_id: userId }]);

    if (error) throw error;
  } catch (error) {
    console.error('북마크 추가 오류', error);
  }
};

/**
 * 북마크 취소 함수
 * @param {number} jobId
 * @param {string} userId
 */
export const deleteBookMark = async ({ jobId, userId }) => {
  try {
    await supabase
      .from(QUERY_KEY.BOOKMARKS)
      .delete()
      .eq('job_id', jobId)
      .eq('user_id', userId);
  } catch (error) {
    console.error('북마크 취소 오류', error);
  }
};
