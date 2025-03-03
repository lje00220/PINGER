import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookMark } from '../../api/bookmarks';
import { QUERY_KEY } from '../../constants/queryKeys';

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookMark,
    onSuccess: queryClient.invalidateQueries([QUERY_KEY.BOOKMARKS]),
  });
};
