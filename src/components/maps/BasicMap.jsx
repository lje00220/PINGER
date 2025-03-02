import { CustomOverlayMap, Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';
import { useJobsQuery } from '../../hooks/useJobsQuerys';
import { useMapStore } from '../../zustand/useMapStore';
import { useEffect } from 'react';
import JobOverlay from './JobOverlay';
import { InputBar } from '../common/Input';
import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';

const BasicMap = () => {
  useKakaoLoader();

  const { data: jobData, isPending, isError } = useJobsQuery();
  const {
    isOpen, keyword, filteredJobs, selectedCompany,
    setMap, setKeyword, setIsOpen, setSelectedCompany, setJobData
  } = useMapStore();

  // 데이터 설정
  useEffect(() => {
    if (jobData) {
      setJobData(jobData);
    }
  }, [jobData, setJobData]);


  // **초기화 로직 (다른 페이지에 갔다 오면 초기화)**
  useEffect(() => {
    setKeyword('');
    setSelectedCompany(null);
    setIsOpen(null);
  }, []);

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError) return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  return (
    <div className="relative w-screen h-[calc(100vh-80px)] overflow-hidden">

      {/* 왼쪽 검색 & 결과 패널 */}
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
        {filteredJobs.length > 0 && (
          <ul className="bg-white shadow-md rounded-lg max-h-[70vh] overflow-auto">
            {filteredJobs.map((job) => (
              <li
                key={job.id}
                className="p-2 border-b cursor-pointer hover:bg-my-main"
                onClick={() => setSelectedCompany(job)}
              >
                <strong>{job.company_name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 지도 */}
      <div className="w-screen h-screen">
        <Map
          center={{ lat: 37.5665, lng: 126.978 }}
          className="h-full w-full"
          level={2}
          onCreate={setMap}
        >

          {/* 채용 정보 마커 */}
          {jobData.map((job) => (
            <div key={job.id}>
              <MapMarker
                key={job.id}
                position={{ lat: job.lat, lng: job.lng }}
                clickable={true}
                onClick={() => setIsOpen(job.id)}
                image={{
                  src: '/public/images/PINGER_marker.png',
                  size: { width: 30, height: 30 },
                }}
              />
              {/* 오버레이 */}
              {isOpen === job.id && (
                <CustomOverlayMap
                  yAnchor={1.1}
                  key={`overlay-${job.id}`}
                  position={{ lat: job.lat, lng: job.lng }}
                  clickable={true}
                >
                  <JobOverlay job={job} onClose={() => setIsOpen(null)} />
                </CustomOverlayMap>
              )}
            </div>
          ))}

          {/* 검색된 회사 마커 */}
          {filteredJobs.map((job) => (
            <div key={job.id}>
              <MapMarker
                key={`filtered-${job.id}`}
                position={{ lat: job.lat, lng: job.lng }}
                clickable={true}
                onClick={() => setIsOpen(job.id)}
                image={{
                  src: '/public/images/PINGER_marker.png',
                  size: { width: 30, height: 30 },
                }}
              />
              {selectedCompany && selectedCompany.id === job.id && (
                <CustomOverlayMap
                  yAnchor={1.1}
                  key={`overlay-filtered-${job.id}`}
                  position={{ lat: job.lat, lng: job.lng }}
                  clickable={true}
                >
                  <JobOverlay job={job} onClose={() => {
                    setIsOpen(null);
                    setSelectedCompany(null);
                  }} />
                </CustomOverlayMap>
              )}
            </div>
          ))}
          <MapTypeControl position={"TOPRIGHT"} />
          <ZoomControl position={"RIGHT"} />
        </Map>
      </div>
    </div>
  );
};

export default BasicMap;
