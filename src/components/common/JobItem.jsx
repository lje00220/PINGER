import { useState } from 'react';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';

const JobItem = ({ job }) => {
  const { company_name, start_date, end_date } = job;
  const [isBookmarked] = useState(false);

  return (
    <div className="flex w-full max-w-[600px] items-center justify-between gap-4 rounded-xl bg-white p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{company_name}</h1>
        <h2>채용후기</h2>
        <div className="flex gap-4">
          <span className="text-sm font-semibold">채용 날짜</span>
          <span className="text-sm">{start_date + end_date}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isBookmarked ? (
          <IoBookmark size={30} />
        ) : (
          <IoBookmarkOutline size={30} />
        )}
        <div className="rounded-full bg-my-main p-5">지원 자소서 0건</div>
      </div>
    </div>
  );
};

export default JobItem;
