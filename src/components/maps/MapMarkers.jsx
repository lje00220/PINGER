// 기본 마커 기능 관리 컴포넌트

import { MapMarker } from 'react-kakao-maps-sdk';

const JobMarker = ({ job, onClick }) => (
  <MapMarker
    key={job.id}
    position={{ lat: job.lat, lng: job.lng }}
    clickable={true}
    onClick={() => onClick(job.id)}
    image={{
      src: '/public/images/PINGER_marker.png',
      size: { width: 30, height: 30 },
    }}
  />
);

export default JobMarker;
