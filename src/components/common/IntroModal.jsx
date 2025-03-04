import Modal from 'react-modal';
import useModalStore from '../../zustand/useModalStore';

const IntroModal = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const setModalClose = useModalStore((state) => state.setModalClose);
  return (
    <>
      {isModalOpen && (
        <Modal
          className="absolute left-1/2 top-1/2 z-[99999] flex h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-12 rounded-3xl bg-white shadow-lg"
          isOpen={isModalOpen}
          ariaHideApp={false}
          contentLabel="Pop up Message"
          shouldCloseOnOverlayClick={false}
        >
          <p>내 주변의 채용 정보</p>
          <img src="/images/PINGER_logo.png" alt="logo" className="w-[200px]" />
          <div className="mb-3 flex flex-col items-center justify-center gap-1 text-xs">
            <div className="mb-3 text-base">
              <span className="text-my-main">PING </span>
              <span>+ WORK</span>
              <span className="text-my-main">ER</span>
            </div>
            <p>PINGER(핑거)는 지도를 활용한 혁신적인 구직 플랫폼입니다.</p>
            <p>
              원하는 지역을 탐색하고, 손가락 터치 한 번으로 채용 정보를 빠르게
              확인하세요.
            </p>
            <p>
              핑(ping)으로 찍고, 새로운 기회를 잡는 가장 직관적인 구직 경험을
              제공합니다.
            </p>
          </div>
          <button
            className="w-1/6 rounded-full bg-my-main py-2"
            onClick={setModalClose}
          >
            시작하기
          </button>
        </Modal>
      )}
    </>
  );
};

export default IntroModal;
