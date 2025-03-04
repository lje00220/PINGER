import supabase from '../supabase/client';

export const fetchJobsData = async (table1) => {
  try {
    const { data } = await supabase
      .from(table1)
      .select('*, resumes(*), bookmarks(*)');

    return data || [];
  } catch (error) {
    console.error('fetching error', error);
  }
};

const PAGE_SIZE = 10;

export const fetchJobsInfinite = async ({ startPageParam = 0 }) => {
  const limit = PAGE_SIZE;
  const endPageParam = startPageParam + limit - 1;
  const { data, error } = await supabase
    .from('jobs')
    .select('*, resumes(*), bookmarks(*)')
    .range(startPageParam, endPageParam);

  if (error) throw error;

  const nextPage = data.length === limit ? startPageParam + limit : undefined;
  return { data, nextPage };
};
