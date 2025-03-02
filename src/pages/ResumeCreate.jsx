import supabase from '../supabase/client';
import { useState } from 'react';
import ResumeForm from '../components/features/Resume/ResumeForm';
import useAuthStore from '../zustand/useAuthStore';

const ResumeCreate = () => {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    grow: '',
    strength: '',
    vision: '',
    experience: '',
  });

  //db에 자소서 저장 (컴포넌트 분리할 예정)
  const createResume = async (newResume) => {
    try {
      const { data, error } = await supabase.from('resumes').insert(newResume);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('자기소개서 저장 에러', error);
    }
  };

  //DB에 저장하기 위해 세팅
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const newResume = {
      job_id: '1',
      writer_id: user.user_id,
      grow: formData.grow,
      strength: formData.strength,
      vision: formData.vision,
      experience: formData.experience,
      is_confirmed: false,
    };

    const result = await createResume(newResume);
    if (result) {
      alert('자기소개서가 저장되었습니다.');
      //이동어디에 할지 정하기
    }
  };

  return (
    <div className="min-h-screen w-full bg-my-bg p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">자기소개서 작성</h1>
      <div className="mx-auto w-2/3 rounded-2xl bg-white p-10 shadow-xl">
        <ResumeForm
          formData={formData}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ResumeCreate;
