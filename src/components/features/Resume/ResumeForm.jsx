import { RESUME_INPUT_PLACEHOLDER } from '../../../constants/inputPlaceholder';

const fields = [
  {
    name: 'grow',
    label: '성장 과정',
    placeholder: RESUME_INPUT_PLACEHOLDER.GROW,
  },
  {
    name: 'vision',
    label: '입사 후 포부',
    placeholder: RESUME_INPUT_PLACEHOLDER.VISION,
  },
  {
    name: 'strength',
    label: '성격 및 장단점',
    placeholder: RESUME_INPUT_PLACEHOLDER.STRENGTH,
  },
  {
    name: 'experience',
    label: '경력사항 및 사회경험',
    placeholder: RESUME_INPUT_PLACEHOLDER.EXPERIENCE,
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
