
import { create } from "zustand";
import { initialMapState } from "./map/useMapState";
import { createMapActions } from "./map/useMapActions";

export const useMapStore = create((set, get) => ({
  ...initialMapState,   // 초기 상태 
  ...createMapActions(set, get),  // 액션 추가
}));











// import { create } from 'zustand';

// // 지도관련 상태관리
// export const useMapStore = create(
//   (set, get) => ({
//     map: null,
//     isOpen: null,
//     keyword: "",
//     filteredJobs: [],
//     selectedCompany: null,
//     jobData: [],

//     // 지도 상태
//     setMap: (map) => set({ map }),

//     // 검색 관련 상태
//     setKeyword: (keyword) => {
//       set({ keyword });

//       const { jobData } = get();
//       if (!jobData) return;

//       if (keyword.trim() === "") {
//         set({ filteredJobs: [] });
//         return;
//       }

//       const filtered = jobData.filter(
//         (job) => job.company_name.includes(keyword) || job.adress.includes(keyword)
//       );

//       set({ filteredJobs: filtered });
//     },

//     // 오버레이 상태
//     setIsOpen: (id) => set({ isOpen: id }),

//     // 선택된 회사 정보
//     setSelectedCompany: (job) => {
//       set({ selectedCompany: job });

//       if (!job) return;

//       const { map } = get();
//       if (map) {
//         map.setCenter(new window.kakao.maps.LatLng(job.lat, job.lng));
//       }
//     },

//     // 채용데이터 관련 상태
//     setJobData: (data) => set({ jobData: data }),
//   }),
// );
