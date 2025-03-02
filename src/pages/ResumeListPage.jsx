import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/routerPath';
import useAuthStore from '../zustand/useAuthStore';
import { useResumesListQuery } from '../hooks/useResumeQuery';
import ResumeItem from '../components/common/ResumeItem';
import { BUTTON_MODE } from '../constants/mode';
import { Button } from '../components/common/Button';

const ResumeListPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: resumes, isLoading, isError } = useResumesListQuery();

  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;
  if (isError)
    return <div className="p-4 text-center">자소서 불러오기 실패</div>;

  // 구직자일 경우 내가 작성한 자소서목록/ 멘토일 경우 모든 자소서 리스트 출력
  const filteredResumes =
    user.role === 'seeker'
      ? resumes.filter((resume) => resume.writer_id === user.user_id)
      : resumes;

  //페이지 이동
  const handleResumeClick = (id) => {
    navigate(`${PATH.RESUME_DETAIL}/${id}`);
  };

  return (
    <div className="min-h-screen w-full bg-my-bg p-8">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-2xl font-bold">
          {user.role === 'seeker' ? '나의' : '전체'}
          <span className="text-my-main"> 자소서 목록</span>
        </h1>

        {filteredResumes.length > 0 ? (
          <ul className="grid grid-cols-2 gap-8">
            {filteredResumes.map((resume) => (
              <div key={resume.id} onClick={() => handleResumeClick(resume.id)}>
                <ResumeItem resume={resume} />
              </div>
            ))}
          </ul>
        ) : (
          <div>자소서가 없습니다.</div>
        )}

        {/*추 후 무한스크롤 구현 */}
        <div className="mt-20">
          <Button mode={BUTTON_MODE.S}>더보기</Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeListPage;
