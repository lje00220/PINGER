import { Link, useNavigate } from 'react-router-dom';
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

  //test용
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
    <div className="min-h-screen w-full bg-my-bg p-8">
      <div className="flex flex-col items-center">
        {/*테스트용 버튼들*/}
        <Link to={PATH.RESUME_CREATE}>
          <button>자소서 생성</button>
        </Link>
        <button
          onClick={toggleRole}
          className="mb-10 bg-blue-500 px-2 py-1 text-white"
        >
          모드 : {role}
        </button>

        <h1 className="mb-8 text-2xl font-bold">
          {role === 'seeker' ? '나의' : '전체'}
          <span className="text-my-main"> 자소서</span>
        </h1>

        {resumes ? (
          <ul className="grid grid-cols-2 gap-8">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                onClick={() => handleResumeClick(resume.id)}
                className="w-full cursor-pointer rounded-2xl bg-white px-28 py-8 shadow-xl"
              >
                <div className="flex flex-col space-y-4">
                  <span className="text-2xl font-bold">{resume.title}</span>
                  <span>
                    경력 :
                    <span className="text-lg"> {resume.recruit_type}</span>
                  </span>

                  <span>
                    구직자 :
                    <span className="font-bold"> {resume.user_name}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>자소서가 없습니다.</div>
        )}
        <button className="my-20 rounded-full bg-my-main px-4 py-2">
          더보기
        </button>
      </div>
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
    recruit_type: '신입',
  },
  {
    id: 2,
    title: '기업이름 2',
    user_name: '유저2',
    user_id: 'user2',
    recruit_type: '신입',
  },
  {
    id: 3,
    title: '기업이름 3',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
  },
  {
    id: 4,
    title: '기업이름 4',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
  },
  {
    id: 5,
    title: '기업이름 5',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입+경력',
  },
  {
    id: 6,
    title: '기업이름 6',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입',
  },
  {
    id: 7,
    title: '기업이름 7',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입+경력',
  },
  {
    id: 8,
    title: '기업이름 8',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입+경력',
  },
  {
    id: 9,
    title: '기업이름 9',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입',
  },
  {
    id: 10,
    title: '기업이름 10',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입',
  },
];
