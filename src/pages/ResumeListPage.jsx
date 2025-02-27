import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

//일단은 칠칠이로
const useUserStore = create((set) => ({
  user: { id: 'user1', name: '칠칠이' },
  role: 'seeker',
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
}));

const ResumeListPage = () => {
  const { user, role, setRole } = useUserStore();
  const navigate = useNavigate();

  // 모드 정하기
  const toggleRole = () => {
    setRole(role === 'seeker' ? 'recruiter' : 'seeker');
  };

  // 역할 자소서 필터링
  const resumes =
    role === 'seeker'
      ? dummyData.filter((resume) => resume.user_id === user.id)
      : dummyData;

  //페이지 이동
  const handleResumeClick = () => {
    navigate();
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <button
        onClick={toggleRole}
        className="mb-10 bg-blue-500 px-2 py-1 text-white"
      >
        모드 : {role}
      </button>

      <h1 className="mb-8 text-2xl font-bold">
        {role === 'seeker' ? '나의 자소서 목록' : '전체 자소서 목록'}
      </h1>

      {resumes ? (
        <ul className="grid grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <li
              key={resume.id}
              onClick={() => handleResumeClick(resume.id)}
              className="w-full cursor-pointer rounded-lg border-2 px-20 py-5"
            >
              <h3 className="text-xl font-semibold">{resume.title}</h3>
              <p className="text-my-gray">{resume.user_name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>자소서가 없습니다.</div>
      )}
      <button className="mt-20">더보기</button>
    </div>
  );
};

export default ResumeListPage;

// 더미 데이터
const dummyData = [
  {
    id: 1,
    title: '기업이름 1',
    user_name: '칠칠이',
    user_id: 'user1',
  },
  {
    id: 2,
    title: '기업이름 2',
    user_name: '유저2',
    user_id: 'user2',
  },
  {
    id: 3,
    title: '기업이름 3',
    user_name: '칠칠이',
    user_id: 'user1',
  },
  {
    id: 4,
    title: '기업이름 4',
    user_name: '유저3',
    user_id: 'user3',
  },
];
