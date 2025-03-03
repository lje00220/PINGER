import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
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
    isOpen,
    keyword,
    filteredJobs,
    selectedCompany,
    setMap,
    setKeyword,
    setIsOpen,
    setSelectedCompany,
    setJobData,
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
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  return (
    <div className="relative h-[calc(100vh-80px)] w-screen overflow-hidden">
      {/* 왼쪽 검색 & 결과 패널 */}
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
          <ul className="max-h-[70vh] overflow-auto rounded-lg bg-white shadow-md">
            {filteredJobs.map((job) => (
              <li
                key={job.id}
                className="cursor-pointer border-b p-2 hover:bg-my-main"
                onClick={() => setSelectedCompany(job)}
              >
                <strong>{job.company_name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 지도 */}
      <div className="h-screen w-screen">
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
                  <JobOverlay
                    job={job}
                    onClose={() => {
                      setIsOpen(null);
                      setSelectedCompany(null);
                    }}
                  />
                </CustomOverlayMap>
              )}
            </div>
          ))}
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
        </Map>
      </div>
    </div>
  );
};

export default BasicMap;
