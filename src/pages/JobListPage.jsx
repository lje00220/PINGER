import JobItem from '../components/common/JobItem';
import LoadingPage from '../components/common/LoadingPage';
import { useInfiniteJobsQuery, useJobsQuery } from '../hooks/useJobsQuery';
import { Button } from '../components/common/Button';
import { BUTTON_MODE } from '../constants/mode';

/**
 * 채용 공고 리스트 페이지
 *  - Supabase에 있는 채용 공고 정보를 받아와 UI로 표현
 *
 * @returns {JSX Element}
 */

const JobListPage = () => {
  // const { data: jobData, isPending, isError } = useJobsQuery();
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteJobsQuery();

  if (isPending) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  //data에는 {pages, pageParams} 형태
  const jobData = data.pages.map((page) => page.data).flat();

  return (
    <div className="h-max bg-my-bg p-8">
      <div className="flex flex-col items-center gap-5">
        {jobData.map((data) => {
          return <JobItem job={data} key={data.id} width={600} />;
        })}
      </div>
      <div className="mt-5 flex justify-center">
        {hasNextPage ? (
          <Button mode={BUTTON_MODE.S} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? '로딩중...' : '더 보기'}
          </Button>
        ) : (
          <div>더 이상 채용 공고가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default JobListPage;
