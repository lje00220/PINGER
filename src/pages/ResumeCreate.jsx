import ResumeContent from '../components/features/Resume/ResumeContent';
import useResumeStore from '../zustand/useResumeStore';

const ResumeCreate = () => {
  const sections = useResumeStore((state) => state.sections);
  const updateSection = useResumeStore((state) => state.updateSection);

  const handleSectionChange = (index, newContent) => {
    updateSection(index, newContent);
  };

  const handleSave = () => {
    // 저장 로직 구현
    alert('자기소개서가 저장되었습니다.');
  };

  return (
    <div className="min-h-screen w-full bg-my-bg p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">자기소개서 작성</h1>
      <div className="mx-auto w-2/3 rounded-2xl bg-white p-10 shadow-xl">
        <ResumeContent
          sections={sections}
          editable={true}
          onSectionChange={handleSectionChange}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-full bg-my-main px-4 py-2 text-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreate;
