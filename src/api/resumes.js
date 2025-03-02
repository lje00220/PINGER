import supabase from '../supabase/client';

//전체 자소서 리스트 가져오기
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

// 자소서 상세정보 가져오기
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

// 자기소개서 수정
export const updateResume = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('resumes')
    .update(updatedData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

// 자기소개서 삭제
export const deleteResume = async (id) => {
  const { data, error } = await supabase.from('resumes').delete().eq('id', id);
  if (error) throw error;
  return data;
};

//자기 소개서 생성
export const createResume = async (newResume) => {
  try {
    const { data, error } = await supabase.from('resumes').insert(newResume);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('에러', error);
  }
};
