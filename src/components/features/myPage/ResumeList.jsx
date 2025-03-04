import { Link } from 'react-router-dom';
import { useConfirmedResumesQuery } from '../../../hooks/useResumeQuery';
import LoadingPage from '../../common/LoadingPage';
import ResumeItem from '../../common/ResumeItem';
import { PATH } from '../../../constants/routerPath';

const ResumeList = () => {
  const {
    data: confirmedResumes = [],
    isPending,
    isError,
  } = useConfirmedResumesQuery();

  /** UI */
  if (isPending) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h1 className="text-2xl">검토한 자소서</h1>

      {confirmedResumes.length === 0 ? (
        <span>검토한 자소서가 없습니다</span>
      ) : (
        <ul className="grid grid-cols-2 gap-8">
          {confirmedResumes.map((resume) => {
            return (
              <Link to={`${PATH.RESUME_DETAIL}/${resume.id}`} key={resume.id}>
                <ResumeItem resume={resume} />
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;
