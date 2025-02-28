const ResumeContent = ({ sections, editable, onSectionChange }) => {
  return (
    <>
      {sections.map((section, idx) => (
        <div key={idx} className="w-full">
          <span className="mb-2 block font-bold">{section.title}</span>
          {editable ? (
            <textarea
              value={section.content}
              onChange={(e) => onSectionChange(idx, e.target.value)}
              className="h-32 w-full rounded-2xl bg-my-bg p-3 shadow-sm"
              placeholder="내용을 입력하세요."
            />
          ) : (
            <div className="h-32 w-full rounded-2xl bg-my-gray p-3 shadow-sm">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ResumeContent;
