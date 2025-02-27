import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';
import { useState } from 'react';

const BasicMap = () => {
  useKakaoLoader();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.978 }}
      className="h-screen w-screen"
      level={3}
    >
      <MapMarker
        position={{
          lat: 37.5665,
          lng: 126.978,
        }}
        clickable={true}
        onClick={() => setIsOpen(true)}
      >
        {isOpen && (
          <div className="relative min-w-[150px]">
            <img
              alt="close"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
              className="absolute right-1 top-1 h-4 w-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div className="p-1 text-black">Chill Chill</div>
          </div>
        )}
      </MapMarker>
    </Map>
  );
};

export default BasicMap;
