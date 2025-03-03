import { Link } from 'react-router-dom';
import { PATH } from '../../constants/routerPath';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full flex-row flex-wrap items-center justify-between bg-white p-4">
      <Link to={PATH.HOME} className="ml-3">
        <img src="/images/PINGER_logo.png" alt="logo" className="w-[150px]" />
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
