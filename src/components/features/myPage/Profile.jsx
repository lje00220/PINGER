import { useState } from 'react';
import { BUTTON_MODE } from '../../../constants/mode';
import useAuthStore from '../../../zustand/useAuthStore';
import SignupAddressSelect from '../../auth/SignupAddressInput';
import { Button } from '../../common/Button';
import { InputBar } from '../../common/Input';
import { useUpdateUserMutation } from '../../../hooks/users/useUpdateUserMutation';
import { toast } from 'react-toastify';
import { UPDATE_SUCCESS_MESSAGES } from '../../../constants/toastMessages';

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const { user_id: userId, nickname, email, address } = user;
  const [newUserInfo, setNewUser] = useState({ nickname, email, address });

  const updateUser = useUpdateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUserInfo = () => {
    setNewUser(newUserInfo);

    updateUser.mutate({
      userId,
      newNickname: newUserInfo.nickname,
      newAddress: newUserInfo.nickname,
    });

    toast.success(UPDATE_SUCCESS_MESSAGES.ALL);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-2xl">{`${nickname}님의 프로필`}</h1>

      <div className="flex w-full max-w-[600px] flex-col items-center gap-8 rounded-xl bg-white p-20 shadow-xl">
        <div className="flex w-full flex-col gap-4">
          {/** ID */}
          <div className="flex justify-between">
            <span className="min-w-[110px] text-lg font-semibold">ID</span>
            <span className="flex-1">{email}</span>
          </div>

          {/** NICKNAME */}
          <label className={labelStyle}>
            <span className="min-w-[110px] text-lg font-semibold">
              NICKNAME
            </span>
            <InputBar
              type="text"
              name="nickname"
              placeholder="새로운 닉네임 입력"
              value={newUserInfo.nickname}
              onChange={handleChange}
              minLength={2}
              maxLength={6}
            />
          </label>

          {/** ADDRESS */}
          <label className={labelStyle}>
            <span className="min-w-[110px] text-lg font-semibold">ADDRESS</span>
            <SignupAddressSelect
              value={newUserInfo.address}
              name="address"
              onChange={handleChange}
            />
          </label>
        </div>
        <hr className="mx-auto w-full rounded-full border-2 border-my-gray" />
        <Button
          mode={BUTTON_MODE.L}
          type="button"
          onClick={handleUpdateUserInfo}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default Profile;

/** 공통되는 Tailwind Style */
const labelStyle = 'flex items-center justify-between';
