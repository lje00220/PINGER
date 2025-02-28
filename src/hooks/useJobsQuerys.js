import { useQuery } from '@tanstack/react-query';
import { fetchJobsData } from '../api/fetchData';
import { QUERY_KEY } from '../constants/queryKeys';

const FIVE_MINUTES = 1000 * 60 * 5;

export const useJobsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.JOBS],
    queryFn: () => fetchJobsData(QUERY_KEY.JOBS),
    staleTime: FIVE_MINUTES,
  });
};
