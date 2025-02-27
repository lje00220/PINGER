import { useParams } from 'react-router-dom';
import { useJobsQuery } from '../hooks/useJobsQuerys';
import JobInfo from '../components/common/JobInfo';

const JobDetail = () => {
  const { id } = useParams();
  const { data: jobData, isPending, isError } = useJobsQuery();

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  const targetJob = jobData.find((job) => job.id === parseInt(id));

  return (
    <div className="flex h-screen justify-center bg-my-bg">
      <div className="mt-10 flex h-2/3 w-3/5 flex-row rounded-xl bg-white px-20 py-10">
        <div className="h-60 w-1/3 bg-my-gray">지도 영역</div>
        <div className="mx-10 flex flex-col">
          <div className="mb-10 flex flex-col">
            <span className="text-2xl font-bold">기업</span>
            <span className="text-xl">제목</span>
          </div>
          <JobInfo targetJob={targetJob} />
          <button className="mt-5 w-fit rounded-full bg-my-main px-5 py-2">
            채용 사이트
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
