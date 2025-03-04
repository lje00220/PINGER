import { InputBar } from '../common/Input';
import SearchResults from './SearchResults';
import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';
import { useMapStore } from '../../zustand/useMapStore';

const SearchPanel = () => {
  const { keyword, setKeyword, filteredJobs, setSelectedCompany } =
    useMapStore();

  return (
    <div className="absolute left-14 top-8 z-50 h-[80vh] w-[300px] overflow-auto rounded-xl bg-gray-100/80 p-4 shadow-lg">
      {/* 검색 입력창 */}
      <div className="mb-4">
        <InputBar
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={AUTH_INPUT_PLACEHOLDER.SEARCH}
          className="w-full border p-2"
        />
      </div>

      {/* 검색 결과 목록 */}
      {filteredJobs.length > 0 && (
        <SearchResults
          filteredJobs={filteredJobs}
          setSelectedCompany={setSelectedCompany}
        />
      )}
    </div>
  );
};

export default SearchPanel;
