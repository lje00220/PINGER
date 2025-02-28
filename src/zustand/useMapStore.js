import { create } from "zustand";

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

        const { jobData, map } = get();
        if (!map || !jobData) return;

        if (keyword.trim() === "") {
          set({ filteredJobs: [] });
          return;
        }

        const filtered = jobData.filter(
          (job) => job.company_name.includes(keyword) || job.adress.includes(keyword)
        );

        set({ filteredJobs: filtered });

        if (filtered.length > 0) {
          const bounds = new window.kakao.maps.LatLngBounds();
          filtered.forEach((job) => bounds.extend(new window.kakao.maps.LatLng(job.lat, job.lng)));
          map.setBounds(bounds);
        }
      },
      setIsOpen: (id) => set({ isOpen: id }),
      setSelectedCompany: (job) => {
        set({ selectedCompany: job });

        const { map } = get();
        if (map) {
          map.setCenter(new window.kakao.maps.LatLng(job.lat, job.lng));
        }
      },
      setJobData: (data) => set({ jobData: data }),
    }),
);
