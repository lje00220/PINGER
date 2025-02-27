import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';
import { useState } from 'react';
import { useJobsQuery } from '../../hooks/useJobsQuerys';

const BasicMap = () => {

  useKakaoLoader();

  const { data: jobData, isPending, isError } = useJobsQuery();
  const [isOpen, setIsOpen] = useState(null);

  if (isPending) return <div className="text-center p-4">로딩 중...</div>;
  if (isError) return <div className="text-center p-4">데이터 불러오기 실패</div>;

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.9780 }}
      className="w-screen h-screen"
      level={3}
    >
      {jobData.map((job) => (
        <MapMarker
          key={job.id}
          position={{
            lat: job.lat,
            lng: job.lng,
          }}
          clickable={true}
          onClick={() => setIsOpen(job.id)}
        >
          {isOpen === job.id && (
            <div className="relative min-w-[150px]">
              <img
                alt="close"
                src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                className="absolute top-1 right-1 w-4 h-4 cursor-pointer"
                onClick={() => setIsOpen(null)}
              />
              <div className="text-black p-1">{job.company_name}</div>
            </div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

export default BasicMap;