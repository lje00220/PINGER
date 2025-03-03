// 기본채용정보와 검색된 회사 마커관리 컴포넌트

import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import JobMarker from './MapMarkers';
import JobOverlay from './JobOverlay';
import { useMapStore } from '../../zustand/useMapStore';

const JobMarkers = ({ jobData }) => {
  const { isOpen, setIsOpen, selectedCompany, setSelectedCompany, filteredJobs } = useMapStore();

  return (
    <>
      {/* 채용 정보 마커 */}
      {jobData.map((job) => (
        <div key={job.id}>
          <JobMarker job={job} onClick={setIsOpen} />
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
          <JobMarker job={job} onClick={setIsOpen} />
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
    </>
  );
};

export default JobMarkers;
