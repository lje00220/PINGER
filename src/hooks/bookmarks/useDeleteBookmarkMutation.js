import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookMark } from '../../api/bookmarks';
import { QUERY_KEY } from '../../constants/queryKeys';

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookMark,
    onSuccess: queryClient.invalidateQueries([QUERY_KEY.BOOKMARKS]),
  });
};
