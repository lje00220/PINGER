import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKeys';
import { fetchReviewsData } from '../api/reviews';

export const useBookMarksQuery = (jobId) => {
  return useQuery({
    queryKey: [QUERY_KEY.REVIEWS],
    queryFn: () => fetchReviewsData(jobId),
  });
};
