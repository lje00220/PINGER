import { useState } from 'react';
import ResumeForm from '../components/features/Resume/ResumeForm';
import useAuthStore from '../zustand/useAuthStore';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { BUTTON_MODE } from '../constants/mode';
import { useCreateResume } from '../hooks/useResumeQuery';
import { PATH } from '../constants/routerPath';
import { ResumeContainer } from './ResumeListPage';

const ResumeCreate = () => {
  const { id: jobId } = useParams();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const { mutateAsync: createMutateAsync } = useCreateResume();

  const [formData, setFormData] = useState({
    grow: '',
    strength: '',
    vision: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //자소서 등록하기
  const handleCreateResume = async () => {
    const newResume = {
      job_id: jobId,
      writer_id: user.user_id,
      mentor_id: null,
      grow: formData.grow,
      strength: formData.strength,
      vision: formData.vision,
      experience: formData.experience,
      is_confirmed: false,
    };

    await createMutateAsync(newResume);
    navigate(PATH.RESUME_LIST);
  };

  return (
    <div className={ResumeContainer}>
      <h1 className="mb-8 text-center text-3xl font-bold">자기소개서 작성</h1>
      <div className="mx-auto w-2/3 rounded-2xl bg-white p-10 shadow-xl">
        <ResumeForm
          formData={formData}
          handleChange={handleChange}
          editable={true}
        />
        <Button type="submit" mode={BUTTON_MODE.S} onClick={handleCreateResume}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default ResumeCreate;
