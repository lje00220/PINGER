import { useEffect, useState } from 'react';
import supabase from '../../../supabase/client';
import { InputBar } from '../../common/Input';
import { Button } from '../../common/Button';
import { BUTTON_MODE } from '../../../constants/mode';

const Profile = ({ isSeeker }) => {
  /** 전역으로 user 정보 생기면 수정해야 되는 부분  */
  const [userInfo, setUserInfo] = useState([]);
  const { nickname, email, address } = userInfo;

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
      } catch (error) {
        console.error(error);
      }
    };

    getUsers(userId);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }));
  };

  /** 공통 컴포넌트 제작 + 더미 데이터 생성하면 수정해야되는 코드 */
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-2xl">{`${nickname}님의 프로필`}</h1>

      <div className="flex w-full max-w-[600px] flex-col items-center gap-8 rounded-xl bg-white p-20">
        <div className="flex w-full flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">ID</span>
            <div className="flex gap-4">
              <span>{email}</span>
              <span className="flex h-[30px] w-[80px] items-center justify-center rounded-full bg-my-main">
                {isSeeker ? '구직자' : '담당자'}
              </span>
            </div>
          </div>

          <label className="flex items-center justify-between">
            <span className="text-lg font-semibold">NICKNAME</span>
            <InputBar
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={nickname}
              onChange={handleChange}
              minLength={2}
              maxLength={6}
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-lg font-semibold">ADDRESS</span>
            <InputBar
              type="text"
              name="address"
              placeholder="주소"
              value={address}
              onChange={handleChange}
              minLength={2}
              maxLength={6}
            />
          </label>
        </div>
        <hr className="mx-auto w-full rounded-full border-2 border-my-gray" />
        <Button mode={BUTTON_MODE.L} type="button">
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default Profile;
