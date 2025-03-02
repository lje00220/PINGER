import { useState } from 'react';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { iconSize } from '../../constants/iconSize';
import { PATH } from '../../constants/routerPath';
import separateDate from '../../utils/separateDate';
import sliceTitleLength from '../../utils/sliceTitleLength';
import { toggleBookMark } from '../../utils/toggleBookMark';
import useAuthStore from '../../zustand/useAuthStore';

/**
 * 채용 정보를 보여주는 카드
 * @param {object} job - props로 넘겨 받은 채용 정보
 * @returns {JSX.Element}
 */
const JobItem = ({ job }) => {
  /** 추가해야되는 data */
  // 등록된 자소서 개수 가져오기
  const userId = useAuthStore((state) => state.user.user_id);

  const { id: jobId, company_name, recruit_title, start_date, end_date } = job;
  const [isBookMarked, setIsBookmarked] = useState(false);
  const [resumeCount, setResumeCount] = useState(0);

  const handleToggleBookMark = (e) => {
    e.preventDefault();

    toggleBookMark({
      isBookMarked,
      setIsBookmarked,
      jobId,
      userId,
    });
  };

  return (
    <Link to={`${PATH.JOB_DETAIL}/${jobId}`}>
      <div
        className={`mx-auto flex w-[600px] items-center justify-between gap-4 rounded-xl bg-white p-10 shadow-xl`}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{company_name}</h1>
          <h2>{sliceTitleLength(recruit_title)}</h2>
          <div className="flex gap-4">
            <span className="text-sm font-semibold">채용 날짜</span>
            <span className="text-sm">
              {`${separateDate(start_date)} ~ ${separateDate(end_date)}`}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleToggleBookMark}>
            {isBookMarked ? (
              <IoBookmark size={iconSize.BASE} className="text-my-main" />
            ) : (
              <IoBookmarkOutline size={iconSize.BASE} />
            )}
          </button>
          <div className="flex items-center gap-2 rounded-xl bg-my-main p-5">
            <span>지원 자소서</span>
            <span className="text-lg font-semibold">{`${resumeCount}건`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
