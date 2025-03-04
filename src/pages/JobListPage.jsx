import IntroModal from '../components/common/IntroModal';
import JobItem from '../components/common/JobItem';
import LoadingPage from '../components/common/LoadingPage';
import { useJobsQuery } from '../hooks/useJobsQuery';

/**
 * 채용 공고 리스트 페이지
 *  - Supabase에 있는 채용 공고 정보를 받아와 UI로 표현
 *
 * @returns {JSX Element}
 */

const JobListPage = () => {
  const { data: jobData, isPending, isError } = useJobsQuery();

  if (isPending) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  return (
    <div className="h-max bg-my-bg p-8">
      <IntroModal />
      <div className="flex flex-col items-center gap-5">
        {jobData.map((data) => {
          return <JobItem job={data} key={data.id} width={600} />;
        })}
      </div>
    </div>
  );
};

export default JobListPage;
