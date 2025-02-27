import { useParams } from 'react-router-dom';
import { useJobsQuery } from '../hooks/useJobsQuerys';
import JobInfo from '../components/common/JobInfo';
import { useState } from 'react';

const JobDetail = () => {
  const { id } = useParams();
  const { data: jobData, isPending, isError } = useJobsQuery();

  // 임시 데이터 -> 추후에 zustand store에서 가져와 사용할 예정
  const [role, setRole] = useState('seeker');

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  const targetJob = jobData.find((job) => job.id === parseInt(id));

  // 기업 채용 공고(외부 링크)로 이동하는 이벤트 핸들러 함수
  const handleOpenJobSite = () => {
    window.open(targetJob.url);
  };

  console.log(targetJob);

  return (
    <div className="flex h-screen justify-center bg-my-bg">
      <div className="mt-10 flex h-max w-3/5 flex-col items-center rounded-xl bg-white px-20 py-10">
        <div className="flex flex-row">
          <div className="h-80 w-1/3 bg-my-gray">지도 영역</div>
          <div className="mx-10 flex flex-col">
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
          <button className="mb-6 mt-14 w-fit rounded-full bg-my-main px-16 py-2">
            {role === 'seeker' ? '지원하기' : '지원 자소서 보러가기'}
          </button>
        </div>
        <hr className="mx-auto w-full rounded-full border-2 border-black" />
      </div>
    </div>
  );
};

export default JobDetail;
