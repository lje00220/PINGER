const fields = [
  {
    name: 'grow',
    label: '성장 과정',
    placeholder: '나의 성장 과정에 대해 입력하세요.',
  },
  {
    name: 'vision',
    label: '입사 후 포부',
    placeholder: '입사 후 포부에 대해  입력하세요.',
  },
  {
    name: 'strength',
    label: '성격 및 장단점',
    placeholder: '성격 및 장단점에 대해 입력하세요.',
  },
  {
    name: 'experience',
    label: '경력사항 및 사회경험',
    placeholder: '경력사항 및 사회경험에 대해 입력하세요.',
  },
];

const ResumeForm = ({ formData, handleChange, editable }) => {
  return (
    <form>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="mb-2 block font-bold">{field.label}</label>
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="h-32 w-full rounded-2xl bg-my-bg p-3 shadow-sm"
            disabled={!editable}
          />
        </div>
      ))}
    </form>
  );
};

export default ResumeForm;
