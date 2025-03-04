import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookMark } from '../../api/bookmarks';
import { QUERY_KEY } from '../../constants/queryKeys';

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookMark,
    onMutate: async ({ jobId }) => {
      await queryClient.cancelQueries([QUERY_KEY.BOOKMARKS]);
      const previousBookmarks = queryClient.getQueryData([QUERY_KEY.BOOKMARKS]);

      queryClient.setQueryData([QUERY_KEY.BOOKMARKS], (prev = []) =>
        prev.filter((bookmark) => bookmark.jobId !== jobId),
      );
      return { previousBookmarks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [QUERY_KEY.BOOKMARKS],
        context?.previousBookmarks,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BOOKMARKS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.JOBS] });
    },
  });
};
