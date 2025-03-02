import { QUERY_KEY } from '../constants/queryKeys';
import supabase from '../supabase/client';

export const updateUserInfo = async ({ userId, newNickname, newAddress }) => {
  try {
    await supabase
      .from(QUERY_KEY.USERS)
      .update({ nickname: newNickname, address: newAddress })
      .eq('user_id', userId);
  } catch (error) {
    console.error('사용자 프로필 업데이트 오류', error);
  }
};
