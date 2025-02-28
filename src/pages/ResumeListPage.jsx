import { Link, useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { PATH } from '../constants/RouterPathConstants';

//일단은 칠칠이로
export const useUserStore = create((set) => ({
  user: {
    user_id: 'user1',
    nickname: '칠칠이',
    role: 'seeker',
    region: '서울 강남구',
  },
  setUser: (user) => set({ user }),
}));

const ResumeListPage = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  //test용
  // 구직자/멘토 정하기
  const toggleRole = () => {
    setUser({ ...user, role: user.role === 'seeker' ? 'recruiter' : 'seeker' });
  };

  // 역할 자소서 필터링
  const resumes =
    user.role === 'seeker'
      ? dummyData.filter((resume) => resume.user_id === user.user_id)
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
          모드 : {user.role}
        </button>

        <h1 className="mb-8 text-2xl font-bold">
          {user.role === 'seeker' ? '나의' : '전체'}
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
    id: 'resume1',
    title: '서울대학교병원',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
    companyId: 1,
  },
  {
    id: 'resume2',
    title: '기업이름 2',
    user_name: '유저2',
    user_id: 'user2',
    recruit_type: '신입',
    companyId: 2,
  },
  {
    id: 'resume3',
    title: '기업이름 3',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
    companyId: 3,
  },
  {
    id: 'resume4',
    title: '기업이름 4',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
    companyId: 4,
  },
  {
    id: 'resume5',
    title: '기업이름 5',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입+경력',
    companyId: 5,
  },
  {
    id: 'resume6',
    title: '기업이름 6',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입',
    companyId: 6,
  },
  {
    id: 'resume7',
    title: '기업이름 7',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입+경력',
    companyId: 7,
  },
  {
    id: 'resume8',
    title: '기업이름 8',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입+경력',
    companyId: 8,
  },
  {
    id: 'resume9',
    title: '기업이름 9',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입',
    companyId: 9,
  },
  {
    id: 'resume10',
    title: '기업이름 10',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입',
    companyId: 10,
  },
];
