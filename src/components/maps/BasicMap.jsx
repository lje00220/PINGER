import { Map } from 'react-kakao-maps-sdk';
import { useJobsQuery } from '../../hooks/useJobsQuery';
import useKakaoLoader from '../../hooks/useKakaoLoader';
import LoadingPage from '../common/LoadingPage';
import useMapCenter from '../../hooks/map/useMapCenter';
import useMapEffects from '../../hooks/map/useMapEffects';
import MapControls from './MapControls';
import SearchPanel from './SearchPanel';
import JobMarkers from './JobMarkers';
import useMapHandlers from '../../hooks/map/useMapHandlers';
import IntroModal from '../common/IntroModal';

const BasicMap = () => {
  useKakaoLoader();

  const { data: jobData, isLoading, isError } = useJobsQuery();
  const { mapCenter } = useMapCenter();
  const { setMap } = useMapHandlers();

  useMapEffects(jobData);

  if (isLoading) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  return (
    <div className="relative h-[calc(100vh-80px)] w-screen overflow-hidden">
      <IntroModal />
      <SearchPanel />
      <div className="h-screen w-screen">
        <Map
          center={mapCenter}
          className="h-full w-full"
          level={4}
          onCreate={setMap}
        >
          <JobMarkers jobData={jobData} />
          <MapControls />
        </Map>
      </div>
    </div>
  );
};

export default BasicMap;
