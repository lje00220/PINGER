import { Link } from 'react-router-dom';
import supabase from '../../supabase/client';
import useAuthStore from '../../zustand/useAuthStore';
import { PATH } from '../../constants/routerPath';

const Nav = () => {
  //-----zustand-----
  const { isAuthenticated, setLogout, user } = useAuthStore((state) => state);

  //로그아웃 로직
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLogout();
  };

  // 로그인 여부에 따른 링크 생성 리스트 분리
  const menuItems = isAuthenticated
    ? [
        { to: PATH.MY_PAGE, label: `${user?.nickname} 님` },
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
    <nav className="mr-3 flex flex-row items-center gap-3">
      {!!user &&
        (user?.role === 'seeker' ? (
          <div className={ROLE}>구직자</div>
        ) : (
          <div className={ROLE}>멘토</div>
        ))}
      {menuItems.map((item, idx) => {
        return item.isButton ? (
          <Link to={item.to} key={idx}>
            <button onClick={item.onClick} className={NAV_BUTTON}>
              {item.label}
            </button>
          </Link>
        ) : (
          <Link to={item.to} key={idx} className={NAV_BUTTON}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;

//tailwind css
const ROLE = 'w-12 rounded-md bg-my-main text-center text-xs';
const NAV_BUTTON =
  'cursor-pointer hover:text-my-main tansition-all duration-200 ease-linear';
