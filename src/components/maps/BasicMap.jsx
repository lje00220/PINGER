import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';
import { useState } from 'react';
import { useJobsQuery } from '../../hooks/useJobsQuerys';

const CLOSE_ICON_URL =
  'https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif';

const BasicMap = () => {
  useKakaoLoader();

  const { data: jobData, isPending, isError } = useJobsQuery();
  const [isOpen, setIsOpen] = useState(null);

  if (isPending) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">데이터 불러오기 실패</div>;

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.978 }}
      className="h-screen w-screen"
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
                src={CLOSE_ICON_URL}
                className="absolute right-1 top-1 h-4 w-4 cursor-pointer"
                onClick={() => setIsOpen(null)}
              />
              <div className="p-1 text-black">{job.company_name}</div>
            </div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

export default BasicMap;
