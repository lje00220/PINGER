import { create } from 'zustand';

export const useMapStore = create(
  (set, get) => ({
    map: null,
    isOpen: null,
    keyword: "",
    filteredJobs: [],
    selectedCompany: null,
    jobData: [],

    setMap: (map) => set({ map }),

    setKeyword: (keyword) => {
      set({ keyword });

      const { jobData } = get();
      if (!jobData) return;

      if (keyword.trim() === "") {
        set({ filteredJobs: [] });
        return;
      }

      const filtered = jobData.filter(
        (job) => job.company_name.includes(keyword) || job.adress.includes(keyword)
      );

      set({ filteredJobs: filtered });
    },

    setIsOpen: (id) => set({ isOpen: id }),

    setSelectedCompany: (job) => {
      set({ selectedCompany: job });

      if (!job) return;

      const { map } = get();
      if (map) {
        map.setCenter(new window.kakao.maps.LatLng(job.lat, job.lng));
      }
    },

    setJobData: (data) => set({ jobData: data }),
  }),
);
