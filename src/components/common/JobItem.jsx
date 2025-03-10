import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ICON_SIZE } from '../../constants/iconSize';
import { ROLE_MODE } from '../../constants/mode';
import { PATH } from '../../constants/routerPath';
import { BOOKMARK_MESSAGES } from '../../constants/toastMessages';
import { useCreateBookmarkMutation } from '../../hooks/bookmarks/useCreateBookmarkMutation';
import { useDeleteBookmarkMutation } from '../../hooks/bookmarks/useDeleteBookmarkMutation';
import separateDate from '../../utils/separateDate';
import sliceTitleLength from '../../utils/sliceTitleLength';
import useAuthStore from '../../zustand/useAuthStore';

/**
 * 채용 정보를 보여주는 카드
 * @param {object} job - props로 넘겨 받은 채용 정보
 * @returns {JSX.Element}
 */
const JobItem = ({ job }) => {
  const { id: jobId, company_name, recruit_title, start_date, end_date } = job;
  const { user_id: userId, role } = useAuthStore((state) => state.user);

  const isSeeker = role === ROLE_MODE.SEEKER;
  const isBookmarked = job.bookmarks.some(
    (bookmark) => bookmark.user_id === userId,
  );

  const { mutateAsync: createBookmark } = useCreateBookmarkMutation();
  const { mutateAsync: deleteBookmark } = useDeleteBookmarkMutation();

  const handleToggleBookMark = (e) => {
    e.preventDefault();

    if (isBookmarked === false) {
      createBookmark({ jobId, userId, jobs: job });
      toast.success(BOOKMARK_MESSAGES.CREATE);
    } else {
      deleteBookmark({ jobId, userId });
      toast.success(BOOKMARK_MESSAGES.DELETE);
    }
  };

  return (
    <Link to={`${PATH.JOB_DETAIL}/${jobId}`}>
      <div
        className={`mx-auto flex min-w-[600px] items-center justify-between gap-4 rounded-xl bg-white p-10 shadow-xl`}
      >
        {/** 채용 정보 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">
            {sliceTitleLength(company_name, 15)}
          </h1>
          <h2>{sliceTitleLength(recruit_title, 20)}</h2>
          <div className="flex gap-4">
            <span className="text-sm font-semibold">채용 날짜</span>
            <span className="text-sm">
              {`${separateDate(start_date)} ~ ${separateDate(end_date)}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/** 북마크 버튼 */}
          {isSeeker && (
            <button onClick={handleToggleBookMark}>
              {isBookmarked ? (
                <IoBookmark size={ICON_SIZE.BASE} className="text-my-main" />
              ) : (
                <IoBookmarkOutline size={ICON_SIZE.BASE} />
              )}
            </button>
          )}

          {/** 지원한 자소서 */}
          <div className="flex items-center gap-2 rounded-xl bg-my-main p-5">
            <span>지원 자소서</span>
            <span className="text-lg font-semibold">{`${job.resumes.length}건`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
