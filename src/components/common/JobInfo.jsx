import separateDate from '../../utils/separateDate';

/**
 * 채용공고 정보를 출력하는 컴포넌트
 *
 * @param {Object} targetJob - 정보를 출력하기를 원하는 채용공고 데이터를 객체 형태로 넘기면 됩니다.
 * ex) const targetJob = jobData.find((job) => job.id === parseInt(id));
 * ex) useJobsQuery를 사용해서 전체 데이터를 불러온 후 원하는 아이디 값과 동일한 아이디를 가진 객체 넘기기
 * @returns {JSX.Element}
 */

const JobInfo = ({ targetJob }) => {
  return (
    <div className="w-80 space-y-2">
      <div className="flex">
        <span className="mr-5 w-32 font-bold">지역</span>
        <span className="w-full">{targetJob.work_region}</span>
      </div>
      <div className="flex">
        <span className="mr-5 w-32 font-bold">NCS 분류</span>
        <span className="w-full">{targetJob.work_type}</span>
      </div>
      <div className="flex">
        <span className="mr-5 w-32 font-bold">고용형태</span>
        <span className="w-full">{targetJob.hire_type}</span>
      </div>
      <div className="flex">
        <span className="mr-5 w-32 font-bold">채용날짜</span>
        <span className="w-full">{`${separateDate(targetJob.start_date)} - ${separateDate(targetJob.end_date)}`}</span>
      </div>
    </div>
  );
};

export default JobInfo;
