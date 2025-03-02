import BookMarkList from '../components/features/myPage/BookMarkList';
import Profile from '../components/features/myPage/Profile';
import ResumeList from '../components/features/myPage/ResumeList';
import useAuthStore from '../zustand/useAuthStore';

const MyPage = () => {
  const { role } = useAuthStore((state) => state.user);
  const isSeeker = role === 'seeker';

  return (
    <div className="flex h-screen w-full flex-col gap-10 bg-my-bg py-8">
      <Profile isSeeker={isSeeker} />
      {isSeeker ? <BookMarkList /> : <ResumeList />}
    </div>
  );
};

export default MyPage;
