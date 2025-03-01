import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKeys';
import {
  deleteReviewsData,
  fetchReviewsData,
  upsertReviewsData,
} from '../api/reviews';
import { toast } from 'react-toastify';

/**
 * reviews 테이블의 정보를 가져오는 훅
 *
 * @param {number} jobId - 현재 페이지의 채용공고 id(index)
 * @returns {function} - reviews 테이블의 데이터를 불러오는 useQuery 함수
 */
export const useReviewsQuery = (jobId) => {
  return useQuery({
    queryKey: [QUERY_KEY.REVIEWS],
    queryFn: () => fetchReviewsData(jobId),
  });
};

/**
 * reviews 테이블의 정보를 upsert하는 훅
 *
 * @param {string} - 성공했을 때 toast로 띄울 메세지
 * @returns {function} - reviews 테이블의 데이터를 insert 혹은 update하는 useMutation 함수
 */

export const useUpsertMutation = (message) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentData) => upsertReviewsData(commentData),
    onSuccess: () => {
      toast.success(message);
      queryClient.invalidateQueries(QUERY_KEY.REVIEWS);
    },
  });
};

/**
 * reviews 테이블의 정보를 삭제하는 훅
 *
 * @returns {function} - reviews 테이블의 데이터를 삭제하는 useMutation 함수
 */
export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteReviewsData(id),
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다!');
      queryClient.invalidateQueries([QUERY_KEY.REVIEWS]);
    },
  });
};
