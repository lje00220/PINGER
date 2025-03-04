import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ResumeForm from '../components/features/Resume/ResumeForm';
import ResumeButtons from '../components/features/Resume/ResumeButtons';
import useAuthStore from '../zustand/useAuthStore';
import {
  useConfirmedResume,
  useDeleteResume,
  useResumeDetailQuery,
  useUpdateResume,
} from '../hooks/useResumeQuery';
import { IoMdClose } from 'react-icons/io';
import { PATH } from '../constants/routerPath';
import LoadingPage from '../components/common/LoadingPage';
import { ResumeContainer } from './ResumeListPage';
import JobHeader from '../components/common/JobHeader';
import { toast } from 'react-toastify';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const { data: resume, isLoading, isError } = useResumeDetailQuery(id);
  const { mutate: updateMutate } = useUpdateResume(id);
  const { mutateAsync: deleteMutateAsync } = useDeleteResume(id);
  const { mutate: confirmMutate } = useConfirmedResume(id);

  //편집 모드 여부 (수정버튼 클릭시 수정할 수 있도록)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // formdata 세팅
  useEffect(() => {
    if (resume) {
      setFormData({
        grow: resume.grow || '',
        vision: resume.vision || '',
        strength: resume.strength || '',
        experience: resume.experience || '',
      });
    }
  }, [resume]);

  // 기업 채용 공고(외부 링크)로 이동하는 이벤트 핸들러 함수
  const handleOpenJobSite = () => {
    window.open(resume.jobs.url);
  };

  // 입력 변경 상태 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //수정 버튼 클릭시 편집하는 상태로 전환
  const handleEdit = () => {
    setIsEditing(true);
  };

  //수정 후 저장하기
  const handleUpdate = () => {
    const updatedData = {
      grow: formData.grow,
      vision: formData.vision,
      strength: formData.strength,
      experience: formData.experience,
    };
    updateMutate(updatedData);
    setIsEditing(false);
  };

  //취소하기 [편집모드]일때 원상태로 복귀
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      grow: resume.grow,
      vision: resume.vision,
      strength: resume.strength,
      experience: resume.experience,
    });
  };

  //자소서 삭제하기
  const handleDelete = async () => {
    await deleteMutateAsync(resume.id);
    navigate(PATH.RESUME_LIST);
  };

  //recruiter일 때 검토 체크
  const handleConfirm = () => {
    if (resume.is_confirmed) {
      if (resume.mentor_id !== user.user_id) {
        toast.error('본인이 검토한 자소서만 취소 가능합니다');
        return;
      }
      confirmMutate({
        is_confirmed: false,
      });
    } else {
      confirmMutate({
        is_confirmed: true,
        mentor_id: user.user_id,
      });
    }
  };

  // 본인이 작성한 자소서인지 확인
  const isOwner = user.user_id === resume?.writer_id;

  if (isLoading) return <LoadingPage state="load" />;
  if (isError) return <LoadingPage state="error" />;

  return (
    <div className={ResumeContainer}>
      <div className="flex flex-col items-center space-y-20">
        {/*기업 정보*/}
        <div className="w-3/5 rounded-2xl bg-white p-10 shadow-xl">
          <JobHeader job={resume.jobs} onOpenJobSite={handleOpenJobSite} />
        </div>

        {/*자기 소개서*/}
        <div className="relative w-3/5 rounded-2xl bg-white p-10 shadow-xl">
          <IoMdClose
            onClick={() => navigate(-1)}
            size={24}
            className="absolute right-4 top-4 cursor-pointer"
          />
          {resume.is_confirmed && (
            <span className="text-mg reft-5 absolute top-5 font-bold text-green-500">
              검토 완료
            </span>
          )}
          <div className="mb-20 flex flex-col items-center justify-center space-y-4">
            <p className="text-2xl font-bold">
              <span className="text-my-main"> {resume.users.nickname}</span>
              님의 자기소개서
            </p>
            <p>희망 근무 지역 : {resume.users.address}</p>
          </div>
          <div>
            <ResumeForm
              formData={formData}
              handleChange={handleChange}
              editable={isOwner && isEditing}
            />
            <ResumeButtons
              isOwner={isOwner}
              isEditing={isEditing}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSave={handleUpdate}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
              isConfirmed={resume.is_confirmed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;
