import { StaticMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../hooks/useKakaoLoader';

/**
 * 카카오맵 라이브러리를 활용한 정적 지도 컴포넌트
 *
 * @param {Object} targetPlace - 지도에 표시할 장소의 위도 경도 객체
 * @param {number} size - 지도의 width, heigth 값
 * ex) targetPlace = {
    lat: Number(targetJob.lat),
    lng: Number(targetJob.lng),
  };
 * @returns {JSX.Element}
 */

const StaticKakaoMap = ({ targetPlace, size }) => {
  useKakaoLoader();

  return (
    <StaticMap
      center={targetPlace}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      marker={targetPlace}
      level={5}
    />
  );
};

export default StaticKakaoMap;
