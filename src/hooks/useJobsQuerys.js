import { useQuery } from '@tanstack/react-query';
import { fetchJobsData } from '../api/fetchData';

const FIVE_MINUTES = 1000 * 60 * 5;

export const useJobsQuery = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => fetchJobsData('jobs'),
    staleTime: FIVE_MINUTES, 
  });
};
