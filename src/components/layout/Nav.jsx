import { PATH } from '../../constants/RouterPathConstants';
import { Link } from 'react-router-dom';
import supabase from '../../supabase/client';
import useAuthStore from '../../zustand/useAuthStore';

const Nav = () => {
  //-----zustand-----
  const { isAuthenticated, setLogout } = useAuthStore((state) => state);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLogout();
  };

  // 로그인 여부에 따른 링크 생성 리스트 분리
  const menuItems = isAuthenticated
    ? [
        { to: PATH.MY_PAGE, label: '칠칠이님' },
        { to: PATH.JOB_LIST, label: '채용 리스트' },
        { to: PATH.RESUME_LIST, label: '자소서 리뷰' },
        {
          to: PATH.HOME,
          label: '로그아웃',
          isButton: true,
          onClick: handleLogout,
        },
      ]
    : [
        { to: PATH.LOGIN, label: '로그인' },
        { to: PATH.SIGNUP, label: '회원가입' },
        { to: PATH.JOB_LIST, label: '채용 리스트' },
        { to: PATH.RESUME_LIST, label: '자소서 리뷰' },
      ];

  return (
    <nav className="mr-3 flex flex-row gap-3">
      {menuItems.map((item, idx) => {
        return item.isButton ? (
          <Link to={item.to} key={idx}>
            <button onClick={item.onClick} className="">
              {item.label}
            </button>
          </Link>
        ) : (
          <Link to={item.to} key={idx} className="">
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
