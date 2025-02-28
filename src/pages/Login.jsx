import { Link } from 'react-router-dom';
import { LongButton } from '../components/common/Button';

const Login = () => {
  return (
    <div>
      <form>
        <label>
          <h4>EMAIL</h4>
          <input type="text" />
        </label>
        <label>
          <h4>PW</h4>
          <input type="text" />
        </label>
        <LongButton type="submit">로그인</LongButton>
      </form>

      <div>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/signup">회원가입하기</Link>
      </div>
    </div>
  );
};

export default Login;
