import { toast } from 'react-toastify';
import supabase from '../supabase/client';
import {
  AUTH_ERROR_MESSAGES,
  // AUTH_SUCCESS_MESSAGES,
} from '../constants/toastMessages';
import { PATH } from '../constants/routerPath';

//google 소셜 로그인
export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      persistSession: true,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: PATH.SOCIAL_LOGIN_REDIRECT_URL,
    },
  });

  if (error) {
    toast.error(AUTH_ERROR_MESSAGES.LOGIN.FAIL);
    console.error('구글 로그인 error : ', error);
    return;
  }

  if (data) {
    const userId = data.user.id;

    // const { error: insertError } = await supabase
    //   .from('users')
    //   .update([
    //     {
    //       nickname:
    //         data.user.user_metadata?.name ||
    //         `user${Math.floor(Math.random() * 10000)}`, // 기본 닉네임
    //       address: '서울', // 기본 주소
    //       role: 'seeker', // 기본 역할
    //     },
    //   ])
    //   .eq('user_id', userId);
    const { error: insertError } = await supabase.from('users').upsert([
      {
        user_id: userId,
        nickname:
          data.user.user_metadata?.name ||
          `user${Math.floor(Math.random() * 10000)}`, // 기본 닉네임
        address: '서울', // 기본 주소
        role: 'seeker', // 기본 역할
      },
    ]);

    if (insertError) {
      console.error('소셜 로그인 유저 정보 업데이트 error:', insertError);
    } else {
      console.log('소셜 로그인 유저 정보 업데이트 성공');
    }
  }
};

//kakao 소셜 로그인
export const kakaoLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      persistSession: true,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: PATH.SOCIAL_LOGIN_REDIRECT_URL,
    },
  });

  if (data) {
    //유저 알람
    // toast.success(AUTH_SUCCESS_MESSAGES.LOGIN);
  }
  if (error) {
    toast.error(AUTH_ERROR_MESSAGES.LOGIN.FAIL);
    console.error('카카오 로그인 error : ', error);
    return;
  }
};

// export const updateSocialLoginUser = async () => {
//   const { user } = JSON.parse(
//     localStorage.getItem('sb-sakyvuakdxtpvojkcaxm-auth-token'),
//   );

//   const { error: insertError } = await supabase
//     .from('users')
//     .update([
//       {
//         nickname:
//           user.user_metadata?.name ||
//           `user${Math.floor(Math.random() * 10000)}`, // 기본 닉네임
//         address: '서울', // 기본 주소
//         role: 'seeker', // 기본 역할
//       },
//     ])
//     .eq('user_id', user.id);

//   if (insertError) {
//     console.error('소셜 로그인 유저 정보 업데이트 error:', insertError);
//   } else {
//     console.log('소셜 로그인 유저 정보 업데이트 성공');
//   }
// };
