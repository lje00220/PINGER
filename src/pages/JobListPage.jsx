const MOCK_DATA = [
  {
    id: 1,
    company_name: '경상국립대학교병원',
    work_type: '보건.의료',
    hire_type: '정규직',
    work_region: '경남',
    recruit_type: '신입',
    advantage: '해당사항없음',
    recruit_num: 18,
    start_date: 20250226,
    end_date: 20250226,
    recruit_title:
      '[창원경상국립대학교병원]2025년도 상반기 전공의(레지던트 상급년차) 2차 추가 모집 공고',
    url: 'https://recruit.gnuch.co.kr/',
    edu: '대졸(4년)',
    lat: 35.176481,
    lng: 128.09513,
  },
  {
    id: 2,
    company_name: '한국환경보전원',
    work_type: '환경.에너지.안전',
    hire_type: '비정규직',
    work_region: '광주,전남',
    recruit_type: '신입+경력',
    advantage:
      '국가유공자 등 법정/특별/경력 가점 대상자, 관련자격증 소지자, 동일직무 및 관련 직무 경력자, 상시 운영이 가능한 자동차 소유자, 운전 경력이 5년 이상인 자  - 직무 분야 별 우대 사항이 다르므로 보다 자세한 사항은 채용공고문 참조',
    recruit_num: 11,
    start_date: 20250221,
    end_date: 20250226,
    recruit_title:
      '2025년 한국환경보전원 영산강수변생태관리단 기간제 직원 채용 공고',
    url: 'https://www.keci.or.kr/common/bbs/selectBbs.do?bbs_code=A1003&bbs_seq=7520&sch_sort_col=&sch_sort=&sch_type=&row_per_page=&sch_text=&currentPage=1',
    edu: '학력무관',
    lat: 37.5467539,
    lng: 127.0611466,
  },
  {
    id: 3,
    company_name: '전남대학교병원',
    work_type: '보건.의료',
    hire_type: '정규직',
    work_region: '광주,전남',
    recruit_type: '신입',
    advantage: '취업보호대상자, 장애인',
    recruit_num: 104,
    start_date: 20250207,
    end_date: 20250226,
    recruit_title: '2025년도 상반기 전공의(레지던트 1년차) 추가모집 기간연장',
    url: 'https://cnuh.recruiter.co.kr/appsite/company/index',
    edu: '대졸(4년)',
    lat: 35.147942,
    lng: 126.92395,
  },
  {
    id: 4,
    company_name: '전남대학교병원',
    work_type: '보건.의료',
    hire_type: '정규직',
    work_region: '광주,전남',
    recruit_type: '경력',
    advantage: '취업지원대상자, 장애인',
    recruit_num: 151,
    start_date: 20250207,
    end_date: 20250226,
    recruit_title: '2025년도 상반기 전공의(레지던트 상급년차) 추가모집',
    url: 'https://cnuh.recruiter.co.kr/appsite/company/index',
    edu: '대졸(4년)',
    lat: 35.147942,
    lng: 126.92395,
  },
];

const JobListPage = () => {
  return (
    <div className="flex h-screen flex-col items-center gap-10 bg-my-bg">
      {MOCK_DATA.map((data) => {
        return (
          <div
            key={data.id}
            className="flex w-2/3 flex-col gap-2 rounded-2xl bg-white px-8 py-5"
          >
            <span className="text-2xl font-bold">{data.company_name}</span>
            <span>채용 후기</span>
            <div className="flex flex-row gap-3">
              <span>채용 날짜</span>
              <span>{`${data.start_date} ~ ${data.end_date}`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobListPage;
