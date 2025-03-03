import { QUERY_KEY } from '../constants/queryKeys';
import supabase from '../supabase/client';

/**
 * 해당 사용자가 저장한 북마크 데이터 조회
 * @param {string} userId - 로그인한 사용자 아이디
 * @returns bookMarkData
 */
export const fetchUserBookMarks = async (userId) => {
  try {
    const { data: bookMarkList } = await supabase
      .from(QUERY_KEY.BOOKMARKS)
      .select(
        `*, ${QUERY_KEY.JOBS}:job_id(id, company_name, recruit_title, start_date, end_date)`,
      )
      .eq('user_id', userId);

    return bookMarkList || [];
  } catch (error) {
    console.error('북마크 조회 오류', error);
  }
};

/**
 * 북마크 추가 함수
 * @param {*} newBookMark
 */
export const createBookMark = async (jobId, userId) => {
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
export const deleteBookMark = async (jobId, userId) => {
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
