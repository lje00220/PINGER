import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();

  return (
    <div className="flex h-screen justify-center bg-my-bg">
      <div className="mt-10 flex h-2/3 w-3/5 flex-row rounded-xl bg-white px-20 py-10">
        <div className="h-60 w-1/3 bg-my-gray">지도 영역</div>
        <div className="mx-10 flex flex-col">
          <div className="mb-10 flex flex-col">
            <span className="text-2xl font-bold">기업</span>
            <span className="text-xl">제목</span>
          </div>
          <div className="w-80 space-y-2">
            <div className="flex">
              <span className="mr-5 w-32 font-bold">지역</span>
              <span className="w-full">서울</span>
            </div>
            <div className="flex">
              <span className="mr-5 w-32 font-bold">NCS 분류</span>
              <span className="w-full">보건/의료</span>
            </div>
            <div className="flex">
              <span className="mr-5 w-32 font-bold">고용형태</span>
              <span className="w-full">비정규직</span>
            </div>
            <div className="flex">
              <span className="mr-5 w-32 font-bold">채용날짜</span>
              <span className="w-full">20250205 - 20250212</span>
            </div>
          </div>
          <button className="mt-5 w-fit rounded-full bg-my-main px-5 py-2">
            채용 사이트
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
