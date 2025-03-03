import { useQuery } from '@tanstack/react-query';
import { fetchUserBookMarks } from '../../api/bookmarks';
import { QUERY_KEY } from '../../constants/queryKeys';
import useAuthStore from '../../zustand/useAuthStore';

export const useBookMarksQuery = () => {
  const userId = useAuthStore((state) => state.user.user_id);

  return useQuery({
    queryKey: [QUERY_KEY.BOOKMARKS],
    queryFn: () => fetchUserBookMarks(userId),
  });
};
