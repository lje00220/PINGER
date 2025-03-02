import ResumeItem from '../../common/ResumeItem';

const ResumeList = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h1 className="text-2xl">검토한 자소서</h1>

      <ul className="grid grid-cols-2 gap-8">
        {dummyData.map((resume) => {
          return <ResumeItem key={resume.id} resume={resume} />;
        })}
      </ul>
    </div>
  );
};

export default ResumeList;

const dummyData = [
  {
    id: 'resume1',
    title: '서울대학교병원',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
    companyId: 1,
  },
  {
    id: 'resume2',
    title: '기업이름 2',
    user_name: '유저2',
    user_id: 'user2',
    recruit_type: '신입',
    companyId: 2,
  },
  {
    id: 'resume3',
    title: '기업이름 3',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
    companyId: 3,
  },
  {
    id: 'resume4',
    title: '기업이름 4',
    user_name: '칠칠이',
    user_id: 'user1',
    recruit_type: '신입',
    companyId: 4,
  },
  {
    id: 'resume5',
    title: '기업이름 5',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입+경력',
    companyId: 5,
  },
  {
    id: 'resume6',
    title: '기업이름 6',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입',
    companyId: 6,
  },
  {
    id: 'resume7',
    title: '기업이름 7',
    user_name: '유저4',
    user_id: 'user4',
    recruit_type: '신입+경력',
    companyId: 7,
  },
  {
    id: 'resume8',
    title: '기업이름 8',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입+경력',
    companyId: 8,
  },
  {
    id: 'resume9',
    title: '기업이름 9',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입',
    companyId: 9,
  },
  {
    id: 'resume10',
    title: '기업이름 10',
    user_name: '유저5',
    user_id: 'user5',
    recruit_type: '신입',
    companyId: 10,
  },
];
