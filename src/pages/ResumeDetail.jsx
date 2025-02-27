import { useParams, useNavigate } from 'react-router-dom';
import { dummyData, useUserStore } from './ResumeListPage';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useUserStore();

  const handleEdit = () => {
    // 수정 페이지로 이동
    alert('자소서를 수정합니다');
  };

  const handleDelete = () => {
    // 삭제
    alert('자소서를 삭제합니다.');
  };

  const handleReview = () => {
    // 검토
    alert('자소서를 검토합니다.');
  };

  const resume = dummyData.find((item) => item.id === Number(id));

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-my-bg">
      <div className="mt-10 h-64 w-full max-w-lg rounded-lg border-2 bg-white p-10">
        <p>기업정보</p>
        <p>{resume.title}</p>
      </div>
      <div className="mt-10 h-96 w-full max-w-lg rounded-lg border-2 bg-white p-10">
        <p>자소서 내용 작성자 : {resume.user_name}</p>
      </div>

      <div className="mt-6 flex space-x-4">
        {role === 'seeker' ? (
          <>
            <button
              onClick={handleEdit}
              className="rounded bg-my-main px-4 py-2 text-white"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="rounded bg-my-main px-4 py-2 text-white"
            >
              삭제
            </button>
          </>
        ) : (
          <button
            onClick={handleReview}
            className="rounded bg-my-main px-4 py-2 text-white"
          >
            검토
          </button>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-10 rounded bg-my-main px-4 py-2 text-white"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default ResumeDetail;
