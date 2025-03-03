import { QUERY_KEY } from '../constants/queryKeys';
import supabase from '../supabase/client';

export const updateUserData = async ({ userId, newNickname, newAddress }) => {
  try {
    await supabase
      .from(QUERY_KEY.USERS)
      .update({ nickname: newNickname, address: newAddress })
      .eq('user_id', userId);
  } catch (error) {
    console.error('사용자 프로필 업데이트 오류', error);
  }
};

export const updateUserMetaData = async ({ newNickname, newAddress }) => {
  try {
    await supabase.auth.updateUser({
      data: {
        nickname: newNickname,
        address: newAddress,
      },
    });
  } catch (error) {
    console.error('사용자 MetaData 업데이트 오류', error);
  }
};
