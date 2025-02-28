import { useState } from 'react';
import BookMarkList from '../components/features/myPage/BookMarkList';
import Profile from '../components/features/myPage/Profile';
import ResumeList from '../components/features/myPage/ResumeList';

const MyPage = () => {
  const [isSeeker] = useState(true);

  return (
    <div className="flex h-full w-full flex-col gap-10 bg-my-bg py-8">
      <Profile isSeeker={isSeeker} />
      {isSeeker ? <BookMarkList /> : <ResumeList />}
    </div>
  );
};

export default MyPage;
