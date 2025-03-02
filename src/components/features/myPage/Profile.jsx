import { useEffect, useState } from 'react';
import { BUTTON_MODE } from '../../../constants/mode';
import supabase from '../../../supabase/client';
import { Button } from '../../common/Button';
import { InputBar } from '../../common/Input';
import SignupAddressSelect from '../../auth/SignupAddressInput';

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
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-2xl">{`${nickname}님의 프로필`}</h1>

      <div className="flex w-full max-w-[600px] flex-col items-center gap-8 rounded-xl bg-white p-20 shadow-xl">
        <div className="flex w-full flex-col gap-4">
          {/** ID */}
          <div className="flex justify-between">
            <span className="text-lg font-semibold">ID</span>
            <div className="flex gap-4">
              <span>{email}</span>
              <span className="flex h-[30px] w-[80px] items-center justify-center rounded-full bg-my-main">
                {isSeeker ? '구직자' : '담당자'}
              </span>
            </div>
          </div>

          {/** NICKNAME */}
          <label className={labelStyle}>
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

          {/** ADDRESS */}
          <label className={labelStyle}>
            <span className="text-lg font-semibold">ADDRESS</span>
            <SignupAddressSelect
              value={address}
              name="address"
              onChange={handleChange}
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

/** 공통되는 Tailwind Style */
const labelStyle = 'flex items-center justify-between';
