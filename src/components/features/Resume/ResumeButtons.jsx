const ResumeButtons = ({ role, onEdit, onDelete, onReview }) => {
  return (
    <div className="flex space-x-4">
      {role === 'seeker' ? (
        <>
          <button
            onClick={onEdit}
            className="rounded-full bg-my-main px-4 py-2 text-white"
          >
            수정
          </button>
          <button
            onClick={onDelete}
            className="rounded-full bg-my-main px-4 py-2 text-white"
          >
            삭제
          </button>
        </>
      ) : (
        <button
          onClick={onReview}
          className="rounded bg-my-main px-4 py-2 text-white"
        >
          검토
        </button>
      )}
    </div>
  );
};

export default ResumeButtons;
