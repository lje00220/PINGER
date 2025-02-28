import JobItem from '../components/common/JobItem';
import { useJobsQuery } from '../hooks/useJobsQuerys';

/**
 * 채용 공고 리스트 페이지
 *  - Supabase에 있는 채용 공고 정보를 받아와 UI로 표현
 *
 * @returns {JSX Element}
 */

const JobListPage = () => {
  const { data: jobData, isPending, isError } = useJobsQuery();

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  return (
    <div className="h-max bg-my-bg p-8">
      <div className="flex flex-col items-center gap-5">
        {jobData.map((data) => {
          return <JobItem job={data} key={data.id} width={500} />;
        })}
      </div>
    </div>
  );
};

export default JobListPage;
