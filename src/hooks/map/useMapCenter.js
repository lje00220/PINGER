import { useEffect, useState } from 'react';
import { REGION_COORDINATES } from '../../constants/regionCoordinates';
import useAuthStore from '../../zustand/useAuthStore';

const useMapCenter = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });

  useEffect(() => {
    if (!isAuthenticated || !user || !user.address) return;

    const region = user.address.trim();
    if (REGION_COORDINATES[region]) {
      setMapCenter(REGION_COORDINATES[region]);
    }
  }, [isAuthenticated, user, user?.address]);

  return { mapCenter };
};

export default useMapCenter;
