import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchJobsData, fetchJobsInfinite } from '../api/fetchData';
import { QUERY_KEY } from '../constants/queryKeys';

const FIVE_MINUTES = 1000 * 60 * 5;

export const useJobsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.JOBS],
    queryFn: () => fetchJobsData(QUERY_KEY.JOBS),
    staleTime: FIVE_MINUTES,
  });
};

export const useInfiniteJobsQuery = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.JOBSINFINITE],
    queryFn: ({ pageParam = 0 }) =>
      fetchJobsInfinite({ startPageParam: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
