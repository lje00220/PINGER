import { useEffect } from 'react';
import { useState } from 'react';
import supabase from '../../../supabase/client';

const Profile = () => {
  /** 더미 데이터 생성하면 수정해야되는 코드  */
  // 조건부 렌더링을 위해 잠깐 추가해두었습니다.
  const [isSeeker, setIsSeeker] = useState(true);
  const [userInfo, setUserInfo] = useState([]);

  const userId = '544a3df2-13c9-4cb0-a396-f5ad773cce68';

  useEffect(() => {
    const getUsers = async (userId) => {
      try {
        const { data: users } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', userId)
          .single();

        setUserInfo(users);
        if (users.role !== 'seeker') setIsSeeker(false);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers(userId);
  }, []);

  /** 공통 컴포넌트 제작 + 더미 데이터 생성하면 수정해야되는 코드 */
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-2xl">{`${userInfo.nickname}님의 프로필`}</h1>
      <div className="flex w-full max-w-[600px] flex-col items-center gap-8 rounded-xl bg-white p-20">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">ID</span>
            <div className="flex w-[300px] justify-between">
              <span>{userInfo.email}</span>
              <span className="flex h-[30px] w-[80px] items-center justify-center rounded-full bg-my-main">
                {isSeeker ? '구직자' : '담당자'}
              </span>
            </div>
          </div>
          <label
            htmlFor="nickname"
            className="flex items-center justify-between gap-4"
          >
            <span className="text-lg font-semibold">닉네임</span>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임"
              value={userInfo.nickname}
              className="h-[50px] w-[300px] rounded-full border-2 border-my-main px-5"
            />
          </label>
          <label
            htmlFor="address"
            className="flex items-center justify-between gap-4"
          >
            <span className="text-lg font-semibold">주소</span>
            <input
              type="text"
              id="address"
              placeholder="주소"
              value={userInfo.address}
              className="h-[50px] w-[300px] rounded-full border-2 border-my-main px-5"
            />
          </label>
        </div>
        <hr className="mx-auto w-full rounded-full border-2 border-my-gray" />
        <button className="h-[50px] w-[300px] rounded-full bg-my-main">
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Profile;
