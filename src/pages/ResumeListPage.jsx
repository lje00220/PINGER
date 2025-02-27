import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { PATH } from '../constants/RouterPathConstants';

//일단은 칠칠이로
export const useUserStore = create((set) => ({
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
  const handleResumeClick = (id) => {
    navigate(`${PATH.RESUME_DETAIL}/${id}`);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-my-bg">
      <button
        onClick={toggleRole}
        className="my-10 bg-blue-500 px-2 py-1 text-white"
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
              className="cursor-pointer rounded-lg border-2 bg-white px-20 py-5"
            >
              <h3 className="text-xl font-semibold">{resume.title}</h3>
              <p>{resume.user_name}</p>
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
export const dummyData = [
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
    user_name: '칠칠이',
    user_id: 'user1',
  },
  {
    id: 5,
    title: '기업이름 5',
    user_name: '유저4',
    user_id: 'user4',
  },
  {
    id: 6,
    title: '기업이름 6',
    user_name: '유저4',
    user_id: 'user4',
  },
  {
    id: 7,
    title: '기업이름 7',
    user_name: '유저4',
    user_id: 'user4',
  },
  {
    id: 8,
    title: '기업이름 8',
    user_name: '유저5',
    user_id: 'user5',
  },
  {
    id: 9,
    title: '기업이름 9',
    user_name: '유저5',
    user_id: 'user5',
  },
  {
    id: 10,
    title: '기업이름 10',
    user_name: '유저5',
    user_id: 'user5',
  },
];
