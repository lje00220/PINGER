import JobItem from '../../common/JobItem';

const BookMarkList = () => {
  // 예시 데이터
  const jobs = [
    {
      id: 1,
      company_name: '서울대학교병원',
      recruit_title:
        '[창원경상국립대학교병원]2025년도 상반기 전공의(레지던트 상급년차) 2차 추가 모집 공고',
      start_date: '20250205',
      end_date: '20250212',
    },
    {
      id: 2,
      company_name: '경북대학교병원',
      recruit_title:
        '칠곡경북대학교병원 2025년도 상반기 레지던트 1년차 추가모집 공고',
      start_date: '20250205',
      end_date: '20250212',
    },
  ];

  /** UI */
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h1 className="text-2xl">북마크</h1>
      {!jobs ? (
        <span>북마크한 채용 정보가 없습니다.</span>
      ) : (
        jobs.map((job) => {
          return <JobItem key={job.id} job={job} />;
        })
      )}
    </div>
  );
};

export default BookMarkList;
