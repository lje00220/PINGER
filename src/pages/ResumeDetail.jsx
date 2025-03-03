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
import StaticKakaoMap from '../components/maps/StaticKakaoMap';
import JobInfo from '../components/common/JobInfo';
import LoadingPage from '../components/common/LoadingPage';
import { ResumeContainer } from './ResumeListPage';

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
  //수정 내용 저장
  const [formData, setFormData] = useState({
    grow: '',
    vision: '',
    strength: '',
    experience: '',
  });

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

  // 변경 상태 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //수정 버튼 클릭시 편집하는 상태로 전환
  const handleEdit = () => {
    setIsEditing(true);
  };

  //저장하기
  const handleSave = () => {
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

  //삭제하기
  const handleDelete = async () => {
    await deleteMutateAsync(resume.id);
    navigate(PATH.RESUME_LIST);
  };

  //recruiter일 때 검토체크
  const handleConfirm = () => {
    const confirmStatus = resume.is_confirmed ? false : true;
    confirmMutate({
      is_confirmed: confirmStatus,
      mentor_id: confirmStatus ? user.user_id : null,
    });
  };

  // 해당 기업의 위도와 경도 정보 (카카오맵에 넘겨주기 위해)
  const targetPlace = {
    lat: Number(resume?.jobs.lat),
    lng: Number(resume?.jobs.lng),
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
          <div className="flex flex-row">
            <StaticKakaoMap targetPlace={targetPlace} size={330} />
            <div className="mx-10 flex max-w-[300px] flex-col">
              <div className="mb-10 flex flex-col">
                <span className="text-2xl font-bold">
                  {resume.jobs.company_name}
                </span>
                <span className="text-xl">{resume.jobs.recruit_title}</span>
              </div>
              <JobInfo targetJob={resume.jobs} />
              <button
                onClick={handleOpenJobSite}
                className="ml-2 mt-8 w-fit rounded-full bg-my-main px-5 py-2"
              >
                채용 사이트
              </button>
            </div>
          </div>
        </div>

        {/*자기 소개서*/}
        <div className="relative w-3/5 rounded-2xl bg-white p-10 shadow-xl">
          <IoMdClose
            onClick={() => navigate(-1)}
            size={24}
            className="absolute right-4 top-4 cursor-pointer"
          />
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
              onSave={handleSave}
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
