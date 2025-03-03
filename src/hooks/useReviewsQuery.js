import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKeys';
import {
  deleteReviewsData,
  fetchReviewsData,
  insertReviewsData,
  updateReviewsData,
} from '../api/reviews';
import { toast } from 'react-toastify';
import { REVIEW_MESSAGES } from '../constants/toastMessages';

/**
 * reviews 테이블의 정보를 가져오는 훅
 *
 * @param {number} jobId - 현재 페이지의 채용공고 id(index)
 * @returns {function} - reviews 테이블의 데이터를 불러오는 useQuery 함수
 */
export const useReviewsQuery = (jobId) => {
  return useQuery({
    queryKey: [QUERY_KEY.REVIEWS, jobId],
    queryFn: () => fetchReviewsData(jobId),
  });
};

/**
 * reviews 테이블의 정보를 update 훅
 *
 * @returns {function} - reviews 테이블의 데이터를 update하는 useMutation 함수
 */

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentData) => updateReviewsData(commentData),
    // 낙관적 업데이트 적용
    onMutate: async (commentData) => {
      await queryClient.cancelQueries([QUERY_KEY.REVIEWS, commentData.job_id]);
      const previousReviews = queryClient.getQueryData([
        QUERY_KEY.REVIEWS,
        commentData.job_id,
      ]);
      queryClient.setQueryData(
        [QUERY_KEY.REVIEWS, commentData.job_id],
        (old) => {
          return old.map((review) =>
            review.id === commentData.id
              ? { ...review, review_content: commentData.review_content }
              : review,
          );
        },
      );

      return previousReviews;
    },
    onError: (error, newReview, context) => {
      queryClient.setQueryData(
        [QUERY_KEY.REVIEWS, newReview.job_id],
        context.previousReviews,
      );
    },
    onSettled: (commentData) => {
      toast.success(REVIEW_MESSAGES.UPDATE);
      queryClient.invalidateQueries([QUERY_KEY.REVIEWS, commentData.job_id]);
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
    onSuccess: (id) => {
      toast.success(REVIEW_MESSAGES.DELETE);
      queryClient.invalidateQueries([QUERY_KEY.REVIEWS, Number(id)]);
    },
  });
};

/**
 * reviews 테이블에 정보를 추가하는 훅
 *
 * @returns {function} - reviews 테이블의 데이터를 추가하는 useMutation 함수
 */
export const useInsertMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReview) => insertReviewsData(newReview),
    onSuccess: (newReview) => {
      toast.success(REVIEW_MESSAGES.INSERT);
      queryClient.invalidateQueries([QUERY_KEY.REVIEWS, Number(newReview)]);
    },
  });
};
