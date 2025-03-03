import supabase from '../supabase/client';

/**
 * Supabase의 resumes 테이블에서 전체 자소서 데이터 조회
 * @returns
 */

export const fetchResumes = async () => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select(
        '*, jobs(recruit_title, recruit_type, company_name), users: writer_id(nickname)',
      );
    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('에러', error);
  }
};

/**
 * Supabase의 resumes 테이블에서 자소서 조회
 * @param {number} id - 조회할 자소서의 id
 * @returns
 */
export const fetchResume = async (id) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*, jobs(*), users: writer_id(nickname, address)')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('에러', error);
  }
};

/**
 * Supabase의 resumes 테이블에서 멘토가 검토한 자소서 조회
 * @param {string} mentorId - 로그인한 멘토 아이디
 * @returns
 */
export const fetchConfirmedResumes = async (mentorId) => {
  try {
    const { data: confirmedResumes } = await supabase
      .from('resumes')
      .select(
        '*, jobs(recruit_title, recruit_type, company_name),users: writer_id(nickname)',
      )
      .eq('mentor_id', mentorId)
      .eq('is_confirmed', true);

    return confirmedResumes || [];
  } catch (error) {
    console.error('검토한 자소서 조회 중 오류 발생', error);
  }
};

/**
 * Supabase의 resumes 테이블에서 자소서 업데이트
 * @param {number} id - 업데이트 할 자소서의 id
 * @param {Object} updatedData - 업데이트할 내용
 * @returns
 */
export const updateResume = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('resumes')
    .update(updatedData)
    .eq('id', id)
    .select();

  if (error) throw error;

  return data || [];
};

/**
 *Supabase의 resumes 테이블에서 자소서 삭제
 * @param {number} id
 * @returns
 */
export const deleteResume = async (id) => {
  const { data, error } = await supabase.from('resumes').delete().eq('id', id);
  if (error) throw error;

  return data || [];
};

/**
 *Supabase의 resumes 테이블에 자소서 생성
 * @param {Object} newResume
 * @returns
 */
export const createResume = async (newResume) => {
  try {
    const { data, error } = await supabase.from('resumes').insert(newResume);
    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('에러', error);
  }
};
