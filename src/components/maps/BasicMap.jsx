import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';
import { useJobsQuery } from '../../hooks/useJobsQuerys';
import { useMapStore } from '../../zustand/useMapStore';
import { useEffect } from 'react';

const CLOSE_ICON_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif';

const BasicMap = () => {
  useKakaoLoader();

  const { data: jobData, isPending, isError } = useJobsQuery();
  const { 
    isOpen, keyword, filteredJobs, selectedCompany, 
    setMap, setKeyword, setIsOpen, setSelectedCompany, setJobData 
  } = useMapStore();

  useEffect(() => {
    if (jobData) {
      setJobData(jobData);
    }
  }, [jobData, setJobData]);

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError) return <div className="p-4 text-center">데이터 불러오기 실패</div>;


  return (
    <div className="flex">
      {/* 왼쪽 검색 & 결과 패널 */}
      <div className="w-1/5 h-screen bg-gray-100 p-4 overflow-auto">
        {/* 검색 입력창 */}
        <div className="mb-4">
          <input
            type='text'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='검색어를 입력해주세요'
            className="border p-2 w-full"
          />
        </div>

        {/* 검색 결과 목록 */}
        {filteredJobs.length > 0 && (
          <ul className="bg-white shadow-md rounded-lg max-h-[70vh] overflow-auto">
            {filteredJobs.map((job) => (
              <li
                key={job.id}
                className="p-2 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedCompany(job)}
              >
                <strong>{job.company_name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 지도 */}
      <div className="w-4/5 h-screen">
        <Map center={{ lat: 37.5665, lng: 126.978 }} className="h-full w-full" level={10} onCreate={setMap}>
          {/* 채용 정보 마커 */}
          {jobData?.map((job) => (
            <MapMarker
              key={job.id}
              position={{ lat: job.lat, lng: job.lng }}
              clickable={true}
              onClick={() => setIsOpen(job.id)}
            >
              {isOpen === job.id && (
                <div className="relative min-w-[150px]">
                  <img
                    alt='close'
                    src={CLOSE_ICON_URL}
                    className="absolute top-1 right-1 w-4 h-4 cursor-pointer"
                    onClick={() => setIsOpen(null)}
                  />
                  <div className="text-black p-1">{job.company_name}</div>
                </div>
              )}
            </MapMarker>
          ))}

          {/* 검색된 회사 마커 */}
          {filteredJobs.map((job) => (
            <MapMarker
              key={`filtered-${job.id}`}
              position={{ lat: job.lat, lng: job.lng }}
              clickable={true}
              onClick={() => setIsOpen(job.id)}
            >
              {selectedCompany && selectedCompany.id === job.id && (
                <div className="relative min-w-[150px]">
                  <strong>{job.company_name}</strong>
                </div>
              )}
            </MapMarker>
          ))}

          <ZoomControl />
        </Map>
      </div>
    </div>
  );
};

export default BasicMap;
