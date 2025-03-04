import BookMarkList from '../components/features/myPage/BookMarkList';
import Profile from '../components/features/myPage/Profile';
import ResumeList from '../components/features/myPage/ResumeList';
import { ROLE_MODE } from '../constants/mode';
import useAuthStore from '../zustand/useAuthStore';

const MyPage = () => {
  const { role } = useAuthStore((state) => state.user);
  const isSeeker = role === ROLE_MODE.SEEKER;

  return (
    <div className="flex max-h-fit min-h-[calc(100vh-80px)] w-full flex-col gap-20 bg-my-bg py-8">
      <Profile />
      {isSeeker ? <BookMarkList /> : <ResumeList />}
    </div>
  );
};

export default MyPage;
