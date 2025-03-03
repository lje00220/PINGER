// 상태 관리

export const initialMapState = {
  map: null,             // 지도 객체
  isOpen: null,          // 오버레이 상태
  keyword: "",           // 검색 키워드
  filteredJobs: [],      // 필터된 채용 공고
  selectedCompany: null, // 선택된 회사
  jobData: [],           // 전체 채용 데이터
};
