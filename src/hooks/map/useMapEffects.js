import { useEffect } from 'react';
import { useMapStore } from '../../zustand/useMapStore';

const useMapEffects = (jobData) => {
  const { setJobData, setKeyword, setSelectedCompany, setIsOpen } = useMapStore();

  // 채용 정보 데이터 설정
  useEffect(() => {
    if (jobData) {
      setJobData(jobData);
    }
  }, [jobData, setJobData]);

  // 초기화 로직 (페이지 이동 시 초기화)
  useEffect(() => {
    setKeyword("");
    setSelectedCompany(null);
    setIsOpen(null);
  }, []);
};

export default useMapEffects;
