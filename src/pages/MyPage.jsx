import BookMarkList from '../components/features/myPage/BookMarkList';
import Profile from '../components/features/myPage/profile';

const MyPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-10 bg-my-bg py-8">
      <Profile />
      <BookMarkList />
    </div>
  );
};

export default MyPage;
