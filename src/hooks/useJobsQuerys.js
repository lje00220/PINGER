import { useQuery } from '@tanstack/react-query';
import { fetchJobsData } from '../api/fetchData';

export const useJobsQuery = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => fetchJobsData('jobs'),
    staleTime: 1000 * 60 * 5, 
  });
};
