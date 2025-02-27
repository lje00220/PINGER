import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import { useState } from "react";

const BasicMap = () => {
  useKakaoLoader();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.9780 }}
      className="w-screen h-screen"
      level={3}
    >
      <MapMarker
        position={{
          lat: 37.5665,
          lng: 126.9780,
        }}
        clickable={true}
        onClick={() => setIsOpen(true)}
      >
        {isOpen && (
          <div className="relative min-w-[150px]">
            <img
              alt="close"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
              className="absolute top-1 right-1 w-4 h-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div className="text-black p-1">Chill Chill</div>
          </div>
        )}
      </MapMarker>
    </Map>
  );
};

export default BasicMap;