import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookMark } from '../../api/bookmarks';
import { QUERY_KEY } from '../../constants/queryKeys';

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookMark,
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries([QUERY_KEY.BOOKMARKS]);
      const previousBookmarks = queryClient.getQueryData([QUERY_KEY.BOOKMARKS]);

      queryClient.setQueryData([QUERY_KEY.BOOKMARKS], (prev = []) => [
        ...prev,
        newBookmark,
      ]);
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
    },
  });
};
