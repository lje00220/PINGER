const JobComments = () => {
  return (
    <div className="ml-auto flex w-full max-w-[800px] flex-col">
      <h2 className="mt-5 text-2xl font-bold">채용 후기</h2>
      <div className="mt-3">
        {MOCK_DATA.map((data) => (
          <div key={data.id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-x-8">
              <span className="min-w-[100px] font-bold">{data.writed_id}</span>
              <span className="text-gray-700">{data.review_content}</span>
            </div>
            <div className="flex space-x-3">
              <button className="rounded-full bg-my-main px-6 py-2">
                수정
              </button>
              <button className="rounded-full bg-my-main px-6 py-2">
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-row items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="채용 후기 한줄평을 입력해주세요 (200자 이하)"
          className="w-2/3 rounded-full border px-5 py-3"
        />
        <button className="rounded-full bg-my-main px-6 py-2">등록</button>
      </div>
    </div>
  );
};

export default JobComments;

const MOCK_DATA = [
  { id: 1, writed_id: 'ㄹㅇㅋㅋ', review_content: '밥이 맛있어요', job_id: 1 },
  {
    id: 2,
    writed_id: '자미보약',
    review_content: '집에 가고 싶어요',
    job_id: 2,
  },
  {
    id: 3,
    writed_id: '아진짜요',
    review_content: '초밥이 먹고싶어요',
    job_id: 3,
  },
  {
    id: 4,
    writed_id: '칠칠이',
    review_content: '역에서 10분인데 차타고 10분이에요',
    job_id: 4,
  },
];
