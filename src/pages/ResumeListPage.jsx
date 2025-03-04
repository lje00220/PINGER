import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/routerPath';
import useAuthStore from '../zustand/useAuthStore';
import { useResumesListQuery } from '../hooks/useResumeQuery';
import ResumeItem from '../components/common/ResumeItem';

import LoadingPage from '../components/common/LoadingPage';
import { ROLE_MODE } from '../constants/mode';

const ResumeListPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: resumes, isLoading, isError } = useResumesListQuery();

  if (isLoading) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  // 구직자일 경우 내가 작성한 자소서목록/ 멘토일 경우 모든 자소서 리스트 출력
  const filteredResumes =
    user.role === ROLE_MODE.SEEKER
      ? resumes.filter((resume) => resume.writer_id === user.user_id)
      : resumes;

  //페이지 이동
  const handleResumeClick = (id) => {
    navigate(`${PATH.RESUME_DETAIL}/${id}`);
  };

  return (
    <div className={ResumeContainer}>
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-2xl font-bold">
          {user.role === ROLE_MODE.SEEKER ? '나의' : '전체'}
          <span className="text-my-main"> 자소서 목록</span>
        </h1>

        {filteredResumes.length > 0 ? (
          <ul className="grid cursor-pointer grid-cols-2 gap-8">
            {filteredResumes.map((resume) => (
              <div key={resume.id} onClick={() => handleResumeClick(resume.id)}>
                <ResumeItem resume={resume} />
              </div>
            ))}
          </ul>
        ) : (
          <div>자소서가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ResumeListPage;

export const ResumeContainer = 'min-h-screen w-full bg-my-bg p-8';
