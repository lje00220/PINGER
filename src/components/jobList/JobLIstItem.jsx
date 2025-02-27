import { useNavigate } from 'react-router-dom';
import separateDate from '../../utils/SeparateDate';
import sliceTitleLength from '../../utils/SliceTitleLength';
import { PATH } from '../../constants/RouterPathConstants';

/**
 *
 * @param {Object} data -
 * @returns
 */

const JobLIstItem = ({ data }) => {
  const navigate = useNavigate();
  const handleJobListClick = () => {
    navigate(`${PATH.JOB_DETAIL}/${data.id}`);
  };
  return (
    <div
      className="flex w-3/5 flex-col gap-2 rounded-2xl bg-white px-8 py-5 shadow-xl"
      onClick={handleJobListClick}
    >
      <span className="text-2xl font-bold">{data.company_name}</span>
      <span className="text-lg">{sliceTitleLength(data.recruit_title)}</span>
      <div className="flex flex-row gap-5">
        <span className="font-bold">채용 날짜</span>
        <span>{`${separateDate(data.start_date)} ~ ${separateDate(data.end_date)}`}</span>
      </div>
    </div>
  );
};

export default JobLIstItem;
