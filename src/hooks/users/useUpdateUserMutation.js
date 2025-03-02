import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '../../api/users';
import { QUERY_KEY } from '../../constants/queryKeys';

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: queryClient.invalidateQueries([QUERY_KEY.USERS]),
  });
};
