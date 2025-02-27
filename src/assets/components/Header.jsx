import { Link } from 'react-router-dom';
import { PATH } from '../../constants/RouterPathConstants';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="flex w-full flex-row justify-between bg-red-50 p-4">
      <Link to={PATH.HOME}>로고</Link>
      <Nav />
    </header>
  );
};

export default Header;
