import useAuthStore from '../../../zustand/useAuthStore';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReviewsData, insertOrUpdateReview } from '../../../api/reviews';
import { toast } from 'react-toastify';
import { QUERY_KEY } from '../../../constants/queryKeys';
import { useState } from 'react';

/**
 * 1개의 댓글을 생성하는 컴포넌트
 *  - 닉네임, 내용, 버튼이 포함되어 있습니다.
 *
 * @param {Object} data - 개별 댓글 정보 ex) {id, nickname, review_content ....}
 * @returns {JSX.Element}
 */

const JobComment = ({ data }) => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState('');
  console.log('data', data);

  const { mutate } = useMutation({
    mutationFn: (id) => deleteReviewsData(id),
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다!');
      queryClient.invalidateQueries([QUERY_KEY.REVIEWS]);
    },
  });

  const { mutate: updateReview } = useMutation({
    mutationFn: (data) => insertOrUpdateReview(data),
    onSuccess: () => {
      toast.success('댓글이 수정되었습니다!');
      queryClient.invalidateQueries([QUERY_KEY.REVIEWS]);
    },
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      const editReviewData = {
        id: data.id,
        job_id: data.job_id,
        writer_id: user.user_id,
        review_content: editedReview,
      };

      updateReview(editReviewData);
    }
    setIsEditing(!isEditing);
    setEditedReview('');
  };

  const handleEditedReview = (e) => {
    setEditedReview(e.target.value);
  };

  const handleDeleteComment = () => {
    mutate(data.id);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-x-8">
        <span className="min-w-[100px] font-bold">{data.users.nickname}</span>
        {isEditing ? (
          <input
            type="text"
            className="w-2/3 rounded-full border px-5 py-3"
            value={editedReview}
            onChange={handleEditedReview}
          />
        ) : (
          <span className="text-gray-700">{data.review_content}</span>
        )}
      </div>
      {/* 버튼: 조건부 렌더링 예정 ('로그인 회원 정보 === 글쓴이 정보' 일 경우에만 보이게)*/}
      {user.user_id === data.writer_id && (
        <div className="flex space-x-3">
          <button
            className="rounded-full bg-my-main px-6 py-2"
            onClick={handleToggleEdit}
          >
            {isEditing ? '저장' : '수정'}
          </button>
          <button
            className="rounded-full bg-my-main px-6 py-2"
            onClick={handleDeleteComment}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default JobComment;
