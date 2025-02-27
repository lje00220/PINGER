import separateDate from '../../assets/utils/SeparateDate';

const JobLIstItem = ({ data }) => {
  return (
    <div className="flex w-3/5 flex-col gap-2 rounded-2xl bg-white px-8 py-5 shadow-xl">
      <span className="text-2xl font-bold">{data.company_name}</span>
      <span className="text-lg">채용 후기</span>
      <div className="flex flex-row gap-5">
        <span className="font-bold">채용 날짜</span>
        <span>{`${separateDate(data.start_date)} ~ ${separateDate(data.end_date)}`}</span>
      </div>
    </div>
  );
};

export default JobLIstItem;
