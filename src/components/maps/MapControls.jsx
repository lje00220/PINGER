import { MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

const MapControls = () => (
  <>
    <MapTypeControl position={"TOPRIGHT"} />
    <ZoomControl position={"RIGHT"} />
  </>
);

export default MapControls;
