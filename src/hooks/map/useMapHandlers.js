import { useMapStore } from '../../zustand/useMapStore';

const useMapHandlers = () => {
  const {
    isOpen, setIsOpen, keyword, setKeyword,
    filteredJobs, setMap, selectedCompany, setSelectedCompany
  } = useMapStore();

  return {
    isOpen, setIsOpen, keyword, setKeyword,
    filteredJobs, setMap, selectedCompany, setSelectedCompany
  };
};

export default useMapHandlers;
