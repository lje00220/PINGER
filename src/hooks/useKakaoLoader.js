import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

const useKakaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: import.meta.env.VITE_KAKAO_APP_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });
};

export default useKakaoLoader;
