import { MoonLoader } from 'react-spinners';

/**
 * 로딩 상태와 에러 상태를 나타내는 컴포넌트
 * - 로딩 상태일 경우 스피너가 화면에 표시됩니다.
 * - 에러 상태일 경우 에러 메세지가 표시됩니다.
 *
 * @param {string} state - isPending일 경우 load, isError일 경우 error
 * @returns {JSX.Element}
 */

const LoadingPage = ({ state }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      {state === 'load' ? <MoonLoader /> : <p>데이터 불러오기 실패</p>}
    </div>
  );
};

export default LoadingPage;
