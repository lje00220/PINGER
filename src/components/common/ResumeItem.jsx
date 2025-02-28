/**
 *
 * @param {object} resume
 * @returns {JSX.Element}
 */
const ResumeItem = ({ resume }) => {
  const { title, recruit_type, user_name } = resume;

  return (
    <li className="w-full cursor-pointer rounded-2xl bg-white px-28 py-8 shadow-xl">
      <div className="flex flex-col space-y-4">
        <span className="text-2xl font-bold">{title}</span>
        <span>
          경력 :<span className="text-lg"> {recruit_type}</span>
        </span>

        <span>
          구직자 :<span className="font-bold"> {user_name}</span>
        </span>
      </div>
    </li>
  );
};

export default ResumeItem;
