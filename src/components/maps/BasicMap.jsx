import { CustomOverlayMap, Map, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';
import { useJobsQuery } from '../../hooks/useJobsQuery';
import { useMapStore } from '../../zustand/useMapStore';
import { useEffect } from 'react';
import JobOverlay from './JobOverlay';
import { InputBar } from '../common/Input';
import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';
import useAuthStore from '../../zustand/useAuthStore';
import { useState } from 'react';
import { REGION_COORDINATES } from '../../constants/regionCoordinates';
import JobMarker from './JobMarker';
import SearchResults from './SearchResults';
import LoadingPage from '../common/LoadingPage';

const BasicMap = () => {
  useKakaoLoader();

  const { data: jobData, isLoading, isError } = useJobsQuery();
  const {
    isOpen, keyword, filteredJobs, selectedCompany,
    setMap, setKeyword, setIsOpen, setSelectedCompany, setJobData
  } = useMapStore();
  const { user, isAuthenticated } = useAuthStore();
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });

  // 데이터 설정
  useEffect(() => {
    if (jobData) {
      setJobData(jobData);
    }
  }, [jobData, setJobData]);

  // 유저의 선호 지역을 기반으로 지도 중심 변경
  useEffect(() => {
    if (!isAuthenticated || !user || !user.address) return;

    if (isAuthenticated && user.address) {
      const region = user.address.trim();
      if (REGION_COORDINATES[region]) {
        setMapCenter(REGION_COORDINATES[region]);
      }
    }
  }, [isAuthenticated, user, user?.address]);

  // **초기화 로직 (다른 페이지에 갔다 오면 초기화)**
  useEffect(() => {
    setKeyword('');
    setSelectedCompany(null);
    setIsOpen(null);
  }, []);

  if (isLoading) return <LoadingPage state="load" />
  if (isError) return <LoadingPage state="error" />

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
        {filteredJobs.length > 0 && <SearchResults filteredJobs={filteredJobs} setSelectedCompany={setSelectedCompany} />}
      </div>

      {/* 지도 */}
      <div className="w-screen h-screen">
        <Map center={mapCenter} className="h-full w-full" level={4} onCreate={setMap}>

          {/* 채용 정보 마커 */}
          {jobData.map((job) => (
            <div key={job.id}>
              <JobMarker key={job.id} job={job} onClick={setIsOpen} />
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
              <JobMarker key={job.id} job={job} onClick={setIsOpen} />
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
