import { create } from 'zustand';

const useResumeStore = create((set) => ({
  sections: [
    { title: '상담 과정', content: '' },
    { title: '입사 후 포부', content: '' },
    { title: '성과 및 장단점', content: '' },
    { title: '경력사항 및 사회경험', content: '' },
  ],
  updateSection: (index, newContent) =>
    set((state) => ({
      sections: state.sections.map((section, idx) =>
        idx === index ? { ...section, content: newContent } : section,
      ),
    })),
  resetSections: () =>
    set((state) => ({
      sections: state.sections.map((section) => ({ ...section, content: '' })),
    })),
}));

export default useResumeStore;
