import { QUERY_KEY } from '../constants/queryKeys';
import supabase from '../supabase/client';

/**
 * Supabase의 reviews 테이블에서 데이터를 받아오는 함수
 * - reviews 테이블의 정보 + users 테이블의 닉네임을 가져옵니다.
 * - id를 기준으로 정렬하여 댓글을 수정하더라도 댓글 순서를 그대로 유지하도록 했습니다.
 *
 * @param {number} jobId - 현재 페이지의 채용공고 id(index)
 * @returns
 */

export const fetchReviewsData = async (jobId) => {
  try {
    const { data } = await supabase
      .from(QUERY_KEY.REVIEWS)
      .select('*, users(nickname)')
      .eq('job_id', jobId)
      .order('id', { ascending: true });

    return data;
  } catch (error) {
    console.error('fetching error', error);
  }
};

/**
 * Supabase의 reviews 테이블에서 댓글을 삭제하는 함수
 * - 주어진 id와 동일한 id값을 갖는 댓글을 삭제합니다.
 *
 * @param {number} id - 삭제할 댓글의 id(index)
 */

export const deleteReviewsData = async (id) => {
  try {
    const { error } = await supabase
      .from(QUERY_KEY.REVIEWS)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('데이터 삭제 실패: ', error);
    }
  } catch (error) {
    console.error('서버오류가 발생하였습니다.: ', error);
  }
};

/**
 * Supabase에서 댓글을 업데이트하는 함수
 * - id를 기준으로 update를 실행합니다.
 *
 * @param {Object} upsertData
 */

export const updateReviewsData = async (updateData) => {
  try {
    const { error } = await supabase
      .from(QUERY_KEY.REVIEWS)
      .update(updateData)
      .eq('id', updateData.id);

    if (error) {
      console.error('데이터 삽입/업데이트 실패: ', error.message);
      return;
    }
  } catch (error) {
    console.error('서버오류가 발생하였습니다.: ', error);
  }
};

/**
 * Supabase에 댓글을 추가하는 함수
 *
 * @param {Object} insertData
 */

export const insertReviewsData = async (insertData) => {
  try {
    const { error } = await supabase.from(QUERY_KEY.REVIEWS).insert(insertData);

    if (error) throw error;
  } catch (error) {
    console.error('댓글 추가 오류', error);
  }
};
