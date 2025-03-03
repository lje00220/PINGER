import { useState } from 'react';
import {
  useInsertMutation,
  useReviewsQuery,
} from '../../../hooks/useReviewsQuery';
import useAuthStore from '../../../zustand/useAuthStore';
import JobComment from './JobComment';
import LoadingPage from '../../common/LoadingPage';

/**
 * 채용 공고 디테일 페이지의 댓글창 테이블 컴포넌트
 *  - 댓글창의 컨테이너 역할을 합니다.
 *  - 댓글을 달 수 있는 input창이 있습니다.
 *
 * @returns {JSX.Element}
 */

const JobCommentTable = ({ jobId }) => {
  const [inputComment, setInputComment] = useState('');
  const user = useAuthStore((state) => state.user);
  const { data: commentData, isPending, isError } = useReviewsQuery(jobId);
  const { mutate: insertMutate } = useInsertMutation();

  if (isPending) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  // input값을 저장하는 이벤트 핸들러
  const handleInputChange = (e) => {
    setInputComment(e.target.value);
  };

  // 댓글 등록 버튼을 누르면 Supabase에 저장하는 이벤트 핸들러
  const handleSubmitComment = () => {
    const commentTableData = {
      job_id: jobId,
      writer_id: user.user_id,
      review_content: inputComment,
    };

    insertMutate(commentTableData); // Supabase에 데이터를 추가하는 함수
    setInputComment('');
  };

  return (
    <div className="ml-auto flex w-full max-w-[800px] flex-col px-3">
      <h2 className="mt-5 text-2xl font-bold">채용 후기</h2>
      <div className="mt-6">
        {/* 댓글 전체 배열에서 map을 돌려 JobComment 컴포넌트로 하나씩 출력 */}
        {commentData.map((comment) => (
          <JobComment comment={comment} key={comment.id} />
        ))}
      </div>
      <div className="mt-5 flex flex-row items-center justify-center space-x-4">
        <input
          type="text"
          value={inputComment}
          onChange={handleInputChange}
          placeholder="채용 후기 한줄평을 입력해주세요 (50자 이하)"
          className="w-2/3 rounded-full border px-5 py-3"
        />
        <button
          className="rounded-full bg-my-main px-6 py-2"
          onClick={handleSubmitComment}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default JobCommentTable;
