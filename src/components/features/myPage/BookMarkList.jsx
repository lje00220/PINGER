import { useBookMarksQuery } from '../../../hooks/useBookMarksQuery';
import JobItem from '../../common/JobItem';

const BookMarkList = () => {
  const { data: bookMarkList, isPending, isError } = useBookMarksQuery();

  /** UI */
  if (isPending) {
    return <span>북마크한 채용 정보가 없습니다.</span>;
  }

  if (isError) {
    return <span>북마크 리스트를 가져오는 중 에러가 발생하였습니다.</span>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h1 className="text-2xl">북마크</h1>
      {bookMarkList.map((data) => {
        return <JobItem key={data.id} job={data.jobs} />;
      })}
    </div>
  );
};

export default BookMarkList;
