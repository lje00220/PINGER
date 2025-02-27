import { useParams, useNavigate } from 'react-router-dom';
import { dummyData, useUserStore } from './ResumeListPage';
import JobInfo from '../components/common/JobInfo';
import { useJobsQuery } from '../hooks/useJobsQuerys';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useUserStore();
  const { data: jobData, isPending, isError } = useJobsQuery();

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  const targetJob = jobData.find((job) => job.id === parseInt(id));

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
    <div className="min-h-screen w-full bg-my-bg p-8">
      <div className="flex flex-col items-center space-y-20">
        {/*기업 정보*/}
        <div className="w-2/3 rounded-2xl bg-white p-10 shadow-xl">
          <div className="mx-4 flex justify-between">
            <div className="mb-10 flex flex-col">
              <span className="text-2xl font-bold">기업</span>
              <span className="text-xl">제목</span>
            </div>
            <div>
              <JobInfo targetJob={targetJob} />
              <button className="mt-5 w-fit rounded-full bg-my-main px-5 py-2">
                채용 사이트
              </button>
            </div>
          </div>
        </div>

        {/*자기 소개서*/}
        <div className="w-2/3 rounded-2xl bg-white p-10 shadow-xl">
          <div className="mx-4 flex justify-between">
            <div className="space-y-4">
              <p className="text-2xl font-bold">
                <span className="text-my-main">{resume.user_name}</span>님의
                자기소개서
              </p>
              <p>희망 근무 지역 : 서울 강남구</p>
            </div>
            <div className="h-[200px] w-[200px] border-2">지도</div>
          </div>

          {/* 자기소개서 내용 */}
          <div className="mx-4 mt-8 flex flex-col items-center gap-4">
            {[
              '상담 과정',
              '입사 후 포부',
              '성과 및 장단점',
              '경력사항 및 사회경험',
            ].map((title, idx) => (
              <div key={idx} className="w-full">
                <span className="mb-2 block font-bold">{title}</span>
                <div className="h-32 w-full rounded-2xl bg-my-gray p-3 shadow-sm">
                  내용...
                </div>
              </div>
            ))}
            <div className="flex space-x-4">
              {role === 'seeker' ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="rounded-full bg-my-main px-4 py-2 text-white"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-full bg-my-main px-4 py-2 text-white"
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
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-my-main px-4 py-2 text-white"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default ResumeDetail;
