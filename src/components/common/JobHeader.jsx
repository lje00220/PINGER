import StaticKakaoMap from '../maps/StaticKakaoMap';
import JobInfo from './JobInfo';

const JobHeader = ({ job, onOpenJobSite }) => {
  // 지도에 넘길 좌표 값 계산 (문자열일 경우 Number 변환)
  const targetPlace = {
    lat: Number(job.lat),
    lng: Number(job.lng),
  };

  return (
    <div className="flex flex-row">
      <StaticKakaoMap targetPlace={targetPlace} size={330} />
      <div className="mx-10 flex max-w-[300px] flex-col">
        <div className="mb-10 flex flex-col">
          <span className="text-2xl font-bold">{job.company_name}</span>
          <span className="text-xl">{job.recruit_title}</span>
        </div>
        <JobInfo targetJob={job} />
        <button
          onClick={onOpenJobSite}
          className="ml-2 mt-8 w-fit rounded-full bg-my-main px-5 py-2 transition-all duration-200 hover:bg-my-hover"
        >
          채용 사이트
        </button>
      </div>
    </div>
  );
};

export default JobHeader;
