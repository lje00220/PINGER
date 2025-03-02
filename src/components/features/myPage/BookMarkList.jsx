import { useBookMarksQuery } from '../../../hooks/useBookMarksQuery';
import JobItem from '../../common/JobItem';
import LoadingPage from '../../common/LoadingPage';

const BookMarkList = () => {
  const { data: bookMarkList, isPending, isError } = useBookMarksQuery();

  /** UI */
  if (isPending) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h1 className="text-2xl">북마크</h1>
      {bookMarkList.length === 0 ? (
        <span>북마크한 채용 정보가 없습니다</span>
      ) : (
        bookMarkList.map((data) => {
          return <JobItem key={data.id} job={data.jobs} />;
        })
      )}
    </div>
  );
};

export default BookMarkList;
