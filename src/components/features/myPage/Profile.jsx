import { useState } from 'react';

const Profile = () => {
  const [isSeeker, setIsSeeker] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl">칠칠이님의 프로필</h1>
      <div className="flex w-full max-w-[600px] flex-col gap-4 rounded-xl bg-white p-20">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">ID</span>
          <div className="flex w-[300px] justify-between">
            <span>chillchill2</span>
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
            className="h-[50px] w-[300px] rounded-full border-2 border-my-main px-5"
          />
        </label>
      </div>
    </div>
  );
};

export default Profile;
