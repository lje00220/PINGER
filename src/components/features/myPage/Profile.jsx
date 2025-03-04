import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserMetaData } from '../../../api/users.js';
import { BUTTON_MODE } from '../../../constants/mode';
import { UPDATE_SUCCESS_MESSAGES } from '../../../constants/toastMessages';
import { useUpdateUserMutation } from '../../../hooks/users/useUpdateUserMutation';
import { validateNickname } from '../../../utils/validate.js';
import useAuthStore from '../../../zustand/useAuthStore';
import SignupAddressSelect from '../../auth/SignupAddressInput';
import { Button } from '../../common/Button';
import { InputBar } from '../../common/Input';

const Profile = () => {
  /** State */
  const user = useAuthStore((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    nickname: user.nickname,
    address: user.address,
  });

  /** Function */
  const { mutate: updateUserInfo } = useUpdateUserMutation();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검증
    const validateResult = await validateNickname(
      userInfo.nickname,
      user.nickname,
    );
    if (validateResult) {
      toast.error(validateResult);
      return;
    }

    // 사용자 정보 supabase에 업데이트
    updateUserInfo({
      userId: user.user_id,
      newNickname: userInfo.nickname,
      newAddress: userInfo.address,
    });

    // 사용자 metadata 업데이트
    updateUserMetaData({
      newNickname: userInfo.nickname,
      newAddress: userInfo.address,
    });

    toast.success(UPDATE_SUCCESS_MESSAGES.ALL);
  };

  /** UI */
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-2xl">{`${user.nickname}님의 프로필`}</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[600px] flex-col items-center gap-8 rounded-xl bg-white p-20 shadow-xl"
      >
        <div className="flex w-full flex-col gap-4">
          {/** ID */}
          <div className="flex justify-between">
            <span className="min-w-[110px] text-lg font-semibold">ID</span>
            <span className="flex-1">{userInfo.email}</span>
          </div>

          {/** NICKNAME */}
          <label className={labelStyle}>
            <span className="min-w-[110px] text-lg font-semibold">
              NICKNAME
            </span>
            <InputBar
              type="text"
              name="nickname"
              placeholder="새로운 닉네임을 입력해주세요"
              value={userInfo.nickname}
              onChange={handleChange}
              minLength={2}
              maxLength={6}
            />
          </label>

          {/** ADDRESS */}
          <label className={labelStyle}>
            <span className="min-w-[110px] text-lg font-semibold">ADDRESS</span>
            <SignupAddressSelect
              value={userInfo.address}
              name="address"
              onChange={handleChange}
            />
          </label>
        </div>
        <hr className="mx-auto w-full rounded-full border-2 border-my-gray" />
        <Button mode={BUTTON_MODE.L} type="submit">
          수정하기
        </Button>
      </form>
    </div>
  );
};

export default Profile;

/** 공통되는 Tailwind Style */
const labelStyle = 'flex items-center justify-between';
