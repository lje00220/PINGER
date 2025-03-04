import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchResume,
  updateResume,
  deleteResume,
  fetchResumes,
  createResume,
  fetchConfirmedResumes,
} from '../api/resumes';
import { toast } from 'react-toastify';
import useAuthStore from '../zustand/useAuthStore';

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

//검토한 자소서 리스트
export const useConfirmedResumesQuery = () => {
  const userId = useAuthStore((state) => state.user.user_id);

  return useQuery({
    queryKey: [QUERY_KEY.RESUMES, userId],
    queryFn: () => fetchConfirmedResumes(userId),
  });
};

//자소서 검토
export const useConfirmedResume = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (confiredmData) => updateResume(id, confiredmData),
    onSuccess: (_, variables) => {
      toast.success(
        variables.is_confirmed ? '검토 했습니다.' : '검토를 취소했습니다.',
      );

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
