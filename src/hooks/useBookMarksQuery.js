import { useQuery } from '@tanstack/react-query';
import { fetchUserBookMarks } from '../api/fetchData';
import { QUERY_KEY } from '../constants/queryKeys';

export const useBookMarksQuery = () => {
  //지워야되는 부분
  const userId = '544a3df2-13c9-4cb0-a396-f5ad773cce68';

  return useQuery({
    queryKey: [QUERY_KEY.BOOKMARKS],
    queryFn: () => fetchUserBookMarks(userId),
  });
};
