import { Link } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

// 클릭시 오버레이 디자인
const JobOverlay = ({ job, onClose }) => (
  <div className="relative min-w-[180px] min-h-[60px] rounded-lg border bg-white shadow-md p-4 transform -translate-y-8 flex flex-col items-center space-y-2 text-center">
    <IoMdCloseCircleOutline className="absolute top-1 right-1 w-4 h-4 cursor-pointer" onClick={onClose}/>
    <div className="font-semibold text-lg">{job.company_name}</div>
    <div className="text-sm">{job.adress}</div>
    <div className="text-xs">{job.work_type}</div>
    <Link to='' className="rounded-full bg-my-main px-6 py-1 text-sm mt-2" >자세히</Link>
  </div>
);

export default JobOverlay;