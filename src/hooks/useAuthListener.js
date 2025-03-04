import { useEffect } from 'react';
import supabase from '../supabase/client';
import useAuthStore from '../zustand/useAuthStore';

const useAuthListener = () => {
  //-----zustand : 클라이언트 상태관리-----
  const { setUserData, setLogout } = useAuthStore((state) => state);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        //이메일로 로그인
        const { user } = session;

        setUserData({
          user_id: user.id,
          email: user.email,
          nickname: user.user_metadata?.nickname,
          address: user.user_metadata?.address,
          role: user.user_metadata?.role,
        });
      } else {
        setLogout();
      }
    });

    return () => data?.subscription.unsubscribe();
  }, []);
};

export default useAuthListener;
