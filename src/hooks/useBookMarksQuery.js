import { useQuery } from '@tanstack/react-query';
import { fetchUserBookMarks } from '../api/bookMarks';
import { QUERY_KEY } from '../constants/queryKeys';
import useAuthStore from '../zustand/useAuthStore';

export const useBookMarksQuery = () => {
  const { user_id } = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: [QUERY_KEY.BOOKMARKS],
    queryFn: () => fetchUserBookMarks(user_id),
  });
};
