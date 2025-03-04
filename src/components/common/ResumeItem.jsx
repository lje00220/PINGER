/**
 * 자소서 정보를 보여주는 카드
 * @param {object} resume - props로 넘겨 받은 자소서 정보
 * @returns {JSX.Element}
 */

const ResumeItem = ({ resume }) => {
  const { jobs, users, is_confirmed } = resume;

  return (
    <li className="relative w-full cursor-pointer rounded-2xl bg-white px-28 py-8 shadow-xl">
      <div className="flex flex-col space-y-4">
        {is_confirmed && (
          <span className="text-mg absolute right-5 top-5 font-bold text-green-500">
            검토 완료
          </span>
        )}
        <span className="text-2xl font-bold">{jobs.company_name}</span>

        <span>
          경력 :<span className="text-lg"> {jobs.recruit_type}</span>
        </span>

        <span>
          구직자 :<span className="font-bold"> {users.nickname}</span>
        </span>
      </div>
    </li>
  );
};

export default ResumeItem;
