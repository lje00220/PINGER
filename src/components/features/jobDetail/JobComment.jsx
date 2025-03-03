import useAuthStore from '../../../zustand/useAuthStore';
import { useState } from 'react';
import {
  useDeleteMutation,
  useUpdateMutation,
} from '../../../hooks/useReviewsQuery';
import { toast } from 'react-toastify';
import { validateReviewInput } from '../../../utils/validate';

/**
 * 1개의 댓글을 생성하는 컴포넌트
 *  - 닉네임, 내용, 버튼이 포함되어 있습니다.
 *  - 댓글 수정, 삭제가 가능합니다.
 *
 * @param {Object} data - 개별 댓글 정보 ex) {id, nickname, review_content ....}
 * @returns {JSX.Element}
 */

const JobComment = ({ comment }) => {
  const user = useAuthStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(comment.review_content);

  const { mutate: deleteMutate } = useDeleteMutation();
  const { mutate: updateMutate } = useUpdateMutation();

  // 댓글이 수정 상태일 경우 저장 버튼을 누르면 Supabase에 저장된 댓글의 내용이 업데이트됩니다.
  // 댓글이 수정 상태가 아닐 경우 버튼을 누르면 수정 가능 상태로 변합니다.
  const handleToggleEdit = () => {
    if (isEditing) {
      // 유효성 검사(댓글을 2자 이상 50자 이하로 입력해야 함
      const validateResult = validateReviewInput(editedReview);
      if (validateResult) {
        toast.error(validateResult);
        return;
      }
      const editReviewData = {
        id: comment.id,
        job_id: comment.job_id,
        writer_id: user.user_id,
        review_content: editedReview,
      };

      updateMutate(editReviewData); // 댓글 내용을 업데이트하는 함수
    }
    setIsEditing(!isEditing); // 편집 상태 변경
  };

  // 댓글 수정 input에 대한 이벤트 핸들러
  const handleEditedReview = (e) => {
    setEditedReview(e.target.value);
  };

  // 댓글을 삭제하는 이벤트 핸들러
  const handleDeleteComment = () => {
    deleteMutate(comment.id); // 댓글을 Supabase에서 삭제하는 함수
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-x-8">
        <span className="min-w-[100px] font-bold">
          {comment.users.nickname}
        </span>
        {/* 수정상태일 경우 input, 아닐 경우 저장된 댓글 내용을 표시 */}
        {isEditing ? (
          <input
            type="text"
            className="w-[350px] rounded-full border px-5 py-3"
            value={editedReview}
            onChange={handleEditedReview}
          />
        ) : (
          <span className="max-w-[400px] text-gray-700">
            {comment.review_content}
          </span>
        )}
      </div>
      {/* 조건부 렌더링 ('로그인 회원 정보 === 글쓴이 정보' 일 경우에만 보이게)*/}
      {user.user_id === comment.writer_id && (
        <div className="flex space-x-3">
          <button className="review-btn" onClick={handleToggleEdit}>
            {isEditing ? '저장' : '수정'}
          </button>
          <button className="review-btn" onClick={handleDeleteComment}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default JobComment;
