

const CLOSE_ICON_URL = "https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif";

// 클릭시 오버레이 디자인
const JobOverlay = ({ job, onClose }) => (
  <div className="relative min-w-[180px] min-h-[60px] rounded-lg border bg-white shadow-md p-4 transform -translate-y-8">
    <img
      alt="close"
      src={CLOSE_ICON_URL}
      className="absolute top-1 right-1 w-4 h-4 cursor-pointer"
      onClick={onClose}
    />
    <div className="font-semibold text-sm">{job.company_name}</div>
    <div className="text-sm">{job.adress}</div>
    <div className="text-xs">{job.work_type}</div>
  </div>
);

export default JobOverlay;