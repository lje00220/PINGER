import JobCommentTable from '../components/features/jobDetail/JobCommentTable';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../constants/routerPath';
import { useJobsQuery } from '../hooks/useJobsQuery';
import useAuthStore from '../zustand/useAuthStore';
import LoadingPage from '../components/common/LoadingPage';
import { ROLE_MODE } from '../constants/mode';
import JobHeader from '../components/common/JobHeader';

/**
 * 채용 정보 디테일 페이지
 *  - 채용 정보에 대한 자세한 내용과 위치 정보를 지도로 표시
 *  - 기업의 채용 정보 사이트로 이동 가능
 *
 * @returns {JSX.Element}
 */

const JobDetail = () => {
  const { id } = useParams();
  const role = useAuthStore((state) => state.user.role);
  const navigate = useNavigate();
  const { data: jobData, isPending, isError } = useJobsQuery();

  if (isPending) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  // 현재 페이지의 id와 jobs 테이블에 있는 id를 비교해 일치하는 것을 가져옴
  const targetJob = jobData.find((job) => job.id === Number(id));

  // 기업 채용 공고(외부 링크)로 이동하는 이벤트 핸들러 함수
  const handleOpenJobSite = () => {
    window.open(targetJob.url);
  };

  // 만약 구직자일 경우 자기소개서 작성 페이지로, 채용담당자일 경우 자기소개서 디테일 페이지로 이동
  const handleMoveToResume = () => {
    navigate(PATH.RESUME_CREATE);
  };

  return (
    <div className="flex min-h-fit justify-center bg-my-bg pb-8">
      <div className="mt-10 flex min-h-fit w-3/5 flex-col items-center rounded-xl bg-white px-20 py-10">
        <JobHeader job={targetJob} onOpenJobSite={handleOpenJobSite} />
        {role === ROLE_MODE.SEEKER && (
          <button
            className="mb-6 mt-14 w-fit rounded-full bg-my-main px-16 py-2 transition-all duration-200 hover:bg-my-hover"
            onClick={handleMoveToResume}
          >
            지원하기
          </button>
        )}
        <hr className="mx-auto mt-5 w-full rounded-full border-2 border-black" />
        <JobCommentTable jobId={Number(id)} />
      </div>
    </div>
  );
};

export default JobDetail;
