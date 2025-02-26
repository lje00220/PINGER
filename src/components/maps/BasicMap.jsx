import { Map, MapMarker} from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";

const BasicMap = () => {
  useKakaoLoader();

  return (
    <Map
      center={{ lat: 37.5665, lng: 126.9780 }}
      style={{ width: "1920px", height: "1080px" }}
      level={3}
    >
      <MapMarker
        position={{
          lat: 37.5665,
          lng: 126.9780,
        }}
      />
      </Map>
  );
};

export default BasicMap;