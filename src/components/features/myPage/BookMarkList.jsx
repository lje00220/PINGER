import JobItem from '../../common/JobItem';

const BookMarkList = () => {
  // 예시 데이터
  const jobs = [
    {
      id: 1,
      company_name: '서울대학교병원',
      start_date: '20250205',
      end_date: '20250212',
    },
    {
      id: 2,
      company_name: '서울대학교병원',
      start_date: '20250205',
      end_date: '20250212',
    },
  ];

  /** UI */
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-2xl">북마크</h1>
      {jobs.map((job) => {
        return <JobItem key={job.id} job={job} width={600} />;
      })}
    </div>
  );
};

export default BookMarkList;
