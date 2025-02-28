import { useNavigate, useParams } from 'react-router-dom';
import { useJobsQuery } from '../hooks/useJobsQuerys';
import JobInfo from '../components/common/JobInfo';
import { useState } from 'react';
import { PATH } from '../constants/routerPathConstants';
import JobCommentTable from '../components/features/jobDetail/JobCommentTable';
import StaticKakaoMap from '../components/maps/StaticKakaoMap';

/**
 * 채용 정보 디테일 페이지
 *  - 채용 정보에 대한 자세한 내용과 위치 정보를 지도로 표시
 *  - 기업의 채용 정보 사이트로 이동 가능
 *
 * @returns {JSX.Element}
 */

const JobDetail = () => {
  const { id } = useParams();
  const { data: jobData, isPending, isError } = useJobsQuery();
  const navigate = useNavigate();

  // 임시 데이터 -> 추후에 zustand store에서 가져와 사용할 예정
  const [role, setRole] = useState('seeker');

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  // 현재 페이지의 id와 jobs 테이블에 있는 id를 비교해 일치하는 것을 가져옴
  const targetJob = jobData.find((job) => job.id === Number(id));

  // 해당 기업의 위도와 경도 정보 (카카오맵에 넘겨주기 위해)
  const targetPlace = {
    lat: Number(targetJob.lat),
    lng: Number(targetJob.lng),
  };

  console.log(targetJob.company_name, targetPlace);
  // 기업 채용 공고(외부 링크)로 이동하는 이벤트 핸들러 함수
  const handleOpenJobSite = () => {
    window.open(targetJob.url);
  };

  // 만약 구직자일 경우 자기소개서 작성 페이지로, 채용담당자일 경우 자기소개서 디테일 페이지로 이동
  const handleMoveToResume = () => {
    if (role === 'seeker') {
      navigate(PATH.RESUME_CREATE);
    } else {
      // 기업 아이디 파라미터로 추가 예정
      navigate(PATH.RESUME_DETAIL);
    }
  };

  return (
    <div className="flex min-h-fit justify-center bg-my-bg pb-8">
      <div className="mt-10 flex min-h-fit w-3/5 flex-col items-center rounded-xl bg-white px-20 py-10">
        <div className="flex flex-row">
          <StaticKakaoMap targetPlace={targetPlace} size={330} />
          <div className="mx-10 flex max-w-[300px] flex-col">
            <div className="mb-10 flex flex-col">
              <span className="text-2xl font-bold">
                {targetJob.company_name}
              </span>
              <span className="text-xl">{targetJob.recruit_title}</span>
            </div>
            <JobInfo targetJob={targetJob} />
            <button
              onClick={handleOpenJobSite}
              className="ml-2 mt-8 w-fit rounded-full bg-my-main px-5 py-2"
            >
              채용 사이트
            </button>
          </div>
        </div>
        <div>
          <button
            className="mb-6 mt-14 w-fit rounded-full bg-my-main px-16 py-2"
            onClick={handleMoveToResume}
          >
            {role === 'seeker' ? '지원하기' : '지원 자소서 보러가기'}
          </button>
        </div>
        <hr className="mx-auto w-full rounded-full border-2 border-black" />
        <JobCommentTable />
      </div>
    </div>
  );
};

export default JobDetail;
