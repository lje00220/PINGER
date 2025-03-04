import { Link } from 'react-router-dom';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { PATH } from '../../constants/routerPath';

// 클릭시 오버레이 디자인
const JobOverlay = ({ job, onClose }) => (
  <div className="relative flex min-h-[60px] min-w-[180px] -translate-y-8 transform flex-col items-center space-y-2 rounded-lg border bg-white p-4 text-center shadow-md">
    <IoMdCloseCircleOutline
      className="absolute right-1 top-1 h-4 w-4 cursor-pointer"
      onClick={onClose}
    />
    <div className="text-lg font-semibold">{job.company_name}</div>
    <div className="text-sm">{job.adress}</div>
    <div className="text-xs">{job.work_type}</div>
    <Link
      to={`${PATH.JOB_DETAIL}/${job.id}`}
      className="mt-2 rounded-full bg-my-main px-6 py-1 text-sm"
    >
      자세히
    </Link>
  </div>
);

export default JobOverlay;
