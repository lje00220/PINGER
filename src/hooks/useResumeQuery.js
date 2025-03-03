import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchResume,
  updateResume,
  deleteResume,
  fetchResumes,
  createResume,
} from '../api/resumes';
import { toast } from 'react-toastify';

const QUERY_KEY = {
  RESUME: 'resume',
  RESUMES: 'resumes',
};

//자소서 상세페이지
export const useResumeDetailQuery = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.RESUME, id],
    queryFn: () => fetchResume(id),
  });
};

//전체 자소서 리스트
export const useResumesListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.RESUMES],
    queryFn: fetchResumes,
  });
};

//자소서 검토
export const useConfirmedResume = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (confiredmData) => updateResume(id, confiredmData),
    onSuccess: () => {
      toast.success('검토를 완료했습니다.');
      queryClient.invalidateQueries([QUERY_KEY.RESUME, id]);
      queryClient.invalidateQueries([QUERY_KEY.RESUMES]);
    },
  });
};

// 자소서 업데이트
export const useUpdateResume = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedData) => updateResume(id, updatedData),
    onSuccess: () => {
      toast.success('수정되었습니다.');

      queryClient.invalidateQueries([QUERY_KEY.RESUME, id]);
    },
  });
};

//자소서 삭제
export const useDeleteResume = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteResume(id),
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries([QUERY_KEY.RESUMES]);
    },
  });
};

//자소서 생성

export const useCreateResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createResume,
    onSuccess: () => {
      toast.success('자기소개서가 저장되었습니다.');
      queryClient.invalidateQueries(['resumes']);
    },
  });
};
