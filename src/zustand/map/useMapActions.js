// 액션 관리

import { filterJobsByKeyword } from "./mapUtils";

export const createMapActions = (set, get) => ({
  // 지도 객체 설정
  setMap: (map) => set({ map }),

  // 검색 키워드 변경
  setKeyword: (keyword) => {
    set({ keyword });
    const { jobData } = get();
    if (!jobData) return;
    set({ filteredJobs: filterJobsByKeyword(keyword, jobData) });
  },

  // 선택된 회사 설정
  setSelectedCompany: (job) => {
    set({ selectedCompany: job });

    if (!job) return;
    const { map } = get();
    if (map) {
      map.setCenter(new window.kakao.maps.LatLng(job.lat, job.lng));
    }
  },

  // 오버레이 열기/닫기
  setIsOpen: (id) => set({ isOpen: id }),

  // 채용 데이터 설정
  setJobData: (data) => set({ jobData: data }),
  
});
