import BookMarkList from '../components/features/myPage/BookMarkList';
import Profile from '../components/features/myPage/profile';

const MyPage = () => {
  return (
    <div className="flex h-full flex-col gap-10 bg-my-bg">
      <Profile />
      <BookMarkList />
    </div>
  );
};

export default MyPage;
