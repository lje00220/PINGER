import { useState } from 'react';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { iconSize } from '../../constants/iconSizeConstants';

// To.지은님
// jobs를 map로 돌렸을 때 나오는 job과 카드 넓이를 설정하는 width를 props로 넘겨받습니다.
// width는 원하시는 값으로 설정하시면 됩니다.
// job 관련 정보들은 따로 수정할 필요없으실거예요~!

const JobItem = ({ job, width }) => {
  const { company_name, start_date, end_date } = job;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookMarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div
      className={`flex w-full max-w-[${width}px] items-center justify-between gap-4 rounded-xl bg-white p-10`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{company_name}</h1>
        <h2>채용후기</h2>
        <div className="flex gap-4">
          <span className="text-sm font-semibold">채용 날짜</span>
          <span className="text-sm">{`${start_date} - ${end_date}`}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handleBookMarkClick}>
          {isBookmarked ? (
            <IoBookmark size={iconSize.BASE} className="text-my-main" />
          ) : (
            <IoBookmarkOutline size={iconSize.BASE} />
          )}
        </button>
        <div className="flex items-center gap-2 rounded-xl bg-my-main p-5">
          <span>지원 자소서</span>
          <span className="text-lg font-semibold">0건</span>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
