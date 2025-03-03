import { InputBar } from '../common/Input';
import SearchResults from './SearchResults';
import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';
import { useMapStore } from '../../zustand/useMapStore';

const SearchPanel = () => {
  const { keyword, setKeyword, filteredJobs, setSelectedCompany } = useMapStore();

  return (
    <div className="absolute top-8 left-14 z-50 w-[300px] h-[80vh] bg-gray-100/80 shadow-lg rounded-xl p-4 overflow-auto">
      {/* 검색 입력창 */}
      <div className="mb-4">
        <InputBar
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={AUTH_INPUT_PLACEHOLDER.SEARCH}
          className="border p-2 w-full"
        />
      </div>

      {/* 검색 결과 목록 */}
      {filteredJobs.length > 0 && <SearchResults filteredJobs={filteredJobs} setSelectedCompany={setSelectedCompany} />}
    </div>
  );
};

export default SearchPanel;
