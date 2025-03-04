import { useJobsQuery } from '../../../hooks/useJobsQuery';
import useAuthStore from '../../../zustand/useAuthStore';
import JobItem from '../../common/JobItem';
import LoadingPage from '../../common/LoadingPage';

const BookMarkList = () => {
  const userId = useAuthStore((state) => state.user.user_id);
  const { data: jobData, isPending, isError } = useJobsQuery();

  /** 사용자가 북마크한 채용 정보 */
  const bookmarkedJobs = jobData?.filter(
    (job) =>
      job.bookmarks.length !== 0 &&
      job.bookmarks.some((bookmark) => bookmark.user_id === userId),
  );

  /** UI */
  if (isPending) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h1 className="text-2xl">북마크</h1>
      {bookmarkedJobs.length === 0 ? (
        <span>채용 정보를 북마크해주세요!</span>
      ) : (
        bookmarkedJobs.map((data) => {
          return <JobItem job={data} key={data.id} />;
        })
      )}
    </div>
  );
};

export default BookMarkList;
