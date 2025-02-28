import { QUERY_KEY } from '../constants/queryKeys';
import supabase from '../supabase/client';

/** 해당 table의 데이터를 join해서 가져오는 로직
 *
 * @param {"string"} table1 - 메인 테이블 (e.g. "feeds")
 * @param {"string"} table2 - 조인할 테이블 (e.g. "users")
 * @returns {Promise} - 데이터를 반환하는 Promise 객체
 *
 * 사용할 컴포넌트에서 async 함수로 감싼 후 사용해야합니다!
 * 단, users 테이블과 fk로 연결되어있어야 합니다.
 */
export const fetchData = async (table1, table2, ascending = true) => {
  try {
    const { data } = await supabase
      .from(table1)
      .select(`*, ${table2}(*)`)
      .order('created_at', { ascending });

    return data;
  } catch (error) {
    console.error('fetching error', error);
  }
};

export const fetchJobsData = async (table1) => {
  try {
    const { data } = await supabase.from(table1).select('*');

    return data;
  } catch (error) {
    console.error('fetching error', error);
  }
};

/**
 * 해당 사용자가 저장한 북마크 데이터 조회
 * @param {string} userId - 로그인한 사용자 아이디
 * @returns bookMarkData
 */
export const fetchUserBookMarks = async (userId) => {
  try {
    const { data: bookMarkList, error } = await supabase
      .from(QUERY_KEY.BOOKMARKS)
      .select(`*, ${QUERY_KEY.JOBS}(*)`)
      .eq('user_id', userId);

    if (error) throw error;

    return bookMarkList || [];
  } catch (error) {
    console.error('북마크 조회 오류', error);
  }
};
