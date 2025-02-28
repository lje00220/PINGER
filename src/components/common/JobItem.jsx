import { useState } from 'react';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { iconSize } from '../../constants/iconSizeConstants';
import { PATH } from '../../constants/RouterPathConstants';
import { handleToggleBookMark } from '../../utils/handleToggleBookMark';
import separateDate from '../../utils/SeparateDate';
import sliceTitleLength from '../../utils/SliceTitleLength';

// To.지은님
// jobs를 map로 돌렸을 때 나오는 job을 props로 넘겨받습니다.
// job 관련 정보들은 따로 수정할 필요없으실거예요~!

const JobItem = ({ job }) => {
  /** 추가해야되는 data */
  // 유저 정보 -> user_id 가져오기
  // 등록된 자소서 개수 가져오기

  const { id: jobId, company_name, recruit_title, start_date, end_date } = job;
  const [isBookMarked, setIsBookmarked] = useState(false);
  const [resumeCount, setResumeCount] = useState(0);

  const userId = '544a3df2-13c9-4cb0-a396-f5ad773cce68';

  return (
    <Link to={`${PATH.JOB_DETAIL}/${jobId}`}>
      <div
        className={`mx-auto flex w-[600px] items-center justify-between gap-4 rounded-xl bg-white p-10`}
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
          <button
            onClick={(e) => {
              e.preventDefault();
              handleToggleBookMark({
                isBookMarked,
                setIsBookmarked,
                jobId,
                userId,
              });
            }}
          >
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
