import { useState } from 'react';
import { useReviewsQuery } from '../../../hooks/useReviewsQuery';
import useAuthStore from '../../../zustand/useAuthStore';
import JobComment from './JobComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertOrUpdateReview } from '../../../api/reviews';
import { toast } from 'react-toastify';
import { QUERY_KEY } from '../../../constants/queryKeys';

/**
 * 채용 공고 디테일 페이지의 댓글창 테이블 컴포넌트
 *  - 댓글창의 컨테이너 역할을 합니다.
 *  - 댓글을 달 수 있는 input창이 있습니다.
 *
 * @returns {JSX.Element}
 */

const JobCommentTable = ({ jobId }) => {
  const user = useAuthStore((state) => state.user);
  const [inputComment, setInputComment] = useState('');
  // console.log(user);
  const { data: commentData, isPending, isError } = useReviewsQuery(jobId);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => insertOrUpdateReview(data),
    onSuccess: () => {
      toast.success('댓글이 작성되었습니다!');
      queryClient.invalidateQueries(QUERY_KEY.REVIEWS);
    },
  });

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  // console.log('commentData', commentData);

  const handleInputChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = () => {
    const commentTableData = {
      job_id: jobId,
      writer_id: user.user_id,
      review_content: inputComment,
      nickname: user.nickname, // 닉네임 변경시 어떻게 처리할지 생각해봐야 함
    };

    mutate(commentTableData);
    setInputComment('');
  };

  return (
    <div className="ml-auto flex w-full max-w-[800px] flex-col px-3">
      <h2 className="mt-5 text-2xl font-bold">채용 후기</h2>
      <div className="mt-6">
        {/* 댓글 전체 배열에서 map을 돌려 JobComment 컴포넌트로 하나씩 출력 */}
        {commentData.map((data) => (
          <JobComment data={data} key={data.id} />
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

// 임시 데이터 -> 로그인 기능 구현 후 Supabase에서 가져올 예정
// const MOCK_DATA = [
//   { id: 1, writed_id: 'ㄹㅇㅋㅋ', review_content: '밥이 맛있어요', job_id: 1 },
//   {
//     id: 2,
//     writed_id: '자미보약',
//     review_content: '집에 가고 싶어요',
//     job_id: 2,
//   },
//   {
//     id: 3,
//     writed_id: '아진짜요',
//     review_content: '초밥이 먹고싶어요',
//     job_id: 3,
//   },
//   {
//     id: 4,
//     writed_id: '칠칠이',
//     review_content: '역에서 10분인데 차타고 10분이에요',
//     job_id: 4,
//   },
// ];
