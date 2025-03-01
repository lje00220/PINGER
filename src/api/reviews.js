import { QUERY_KEY } from '../constants/queryKeys';
import supabase from '../supabase/client';

/**
 * Supabase의 reviews 테이블에서 데이터를 받아오는 함수
 * - 필요한 정보: reviews 테이블의 모든 column
 * - writer_id와 연결된 nickname
 * - job_id는 현재 페이지의 job_id와 같은 것
 *
 * @returns
 */
export const fetchReviewsData = async (jobId) => {
  try {
    const { data } = await supabase
      .from(QUERY_KEY.REVIEWS)
      .select('*, users: writer_id(nickname)')
      .eq('job_id', jobId);

    return data;
  } catch (error) {
    console.error('fetching error', error);
  }
};

/**
 *
 * @param {*} column
 * @param {*} id
 */

export const deleteReviewsData = async (id) => {
  try {
    const { error } = await supabase
      .from(QUERY_KEY.REVIEWS)
      .delete()
      .eq('id', id)
      .eq('writed_id'); // 여기에 zustand에서 가져온 uuid랑 비교

    if (error) {
      console.error('데이터 삭제 실패: ', error);
    }
  } catch (error) {
    console.error('서버오류가 발생하였습니다.: ', error);
  }
};

/**
 *
 * @param {*} upsertData
 * @returns
 */

export const insertOrUpdateData = async (upsertData) => {
  try {
    const { error } = await supabase
      .from(QUERY_KEY.REVIEWS)
      .upsert(upsertData, { onConflict: 'id' });

    if (error) {
      console.error('데이터 삽입/업데이트 실패: ', error.message);
      return;
    }
  } catch (error) {
    console.error('서버오류가 발생하였습니다.: ', error);
  }
};
