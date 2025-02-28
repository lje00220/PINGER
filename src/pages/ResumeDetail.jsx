import { useParams, useNavigate } from 'react-router-dom';
import { dummyData, useUserStore } from './ResumeListPage';
import ResumeContent from '../components/features/Resume/ResumeContent';
import useResumeStore from '../zustand/useResumeStore';
import ResumeButtons from '../components/features/Resume/ResumeButtons';
import JobInfo from '../components/common/JobInfo';
import { useState } from 'react';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useUserStore();
  const sections = useResumeStore((state) => state.sections);
  const updateResumeContent = useResumeStore(
    (state) => state.updateResumeContent,
  );

  const [isEditing, setIsEditing] = useState(false);

  //일단 예시 핸들러
  //수정
  const handleEdit = () => {
    setIsEditing(true);
  };
  //삭제
  const handleDelete = () => {};

  //검토
  const handleReview = () => {};

  //변경할 때 호출 핸들러
  const handleEditResume = (index, newContent) => {
    updateResumeContent(index, newContent);
  };

  //변경 내용 저장 핸들러
  const handleSave = () => {
    setIsEditing(false);
  };

  //더미데이터찾기위해 임시
  const resume = dummyData.find((item) => item.id === id);

  return (
    <div className="배경 min-h-screen w-full bg-my-bg p-8">
      <div className="flex flex-col items-center space-y-20">
        {/*기업 정보*/}
        <div className="w-2/3 rounded-2xl bg-white p-10 shadow-xl">
          <div className="mx-4 flex justify-between">
            <div className="mb-10 flex flex-col">
              <span className="text-2xl font-bold">{resume.title}</span>
              <span className="text-xl">{resume.title}</span>
            </div>
            <div>
              <JobInfo targetJob={''} />
              <button className="mt-5 w-fit rounded-full bg-my-main px-5 py-2">
                채용 사이트
              </button>
            </div>
          </div>
        </div>

        {/*자기 소개서*/}
        <div className="w-2/3 rounded-2xl bg-white p-10 shadow-xl">
          {/* 정 보 */}
          <div className="mx-4 flex justify-between">
            <div>
              <p className="font-bold">
                <span className="text-my-main">{resume.user_name}</span>님의
                자기소개서
              </p>

              <p>희망 근무 지역 : {user.region}</p>
            </div>
            <div className="h-[200px] w-[200px] border-2">지도</div>
          </div>
          {/* 작성내용 */}
          <div className="mx-4 mt-8 flex flex-col items-center gap-4">
            <ResumeContent
              sections={sections}
              editable={isEditing}
              onResumeChange={handleEditResume}
            />
            {isEditing ? (
              <button
                onClick={handleSave}
                className="rounded-full bg-my-main px-4 py-2 text-white"
              >
                저장
              </button>
            ) : (
              <ResumeButtons
                role={user.role}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReview={handleReview}
              />
            )}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-my-main px-4 py-2 text-white"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default ResumeDetail;
