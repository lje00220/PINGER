import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { AUTH_MODE } from '../constants/mode';
import useForm from '../hooks/useForm';
import { validateLoginForm } from '../utils/validate';
import { PATH } from '../constants/routerPath';

const Login = () => {
  //-----navigate-----
  const navigate = useNavigate();

  //-----custom hook : useForm-----
  //input값 유효성 검사
  const { formData, formError, handleChange, resetForm } = useForm(
    {
      email: '',
      password: '',
    },
    validateLoginForm,
  );

  //-----로그인 로직-----
  //유저 데이터 확인
  const handleSubmitLogin = (e) => {
    e.preventDefault();

    //홈으로 이동
    navigate(PATH.HOME);
    //폼 리셋
    resetForm();
  };

  return (
    <div>
      <AuthForm
        mode={AUTH_MODE.LOGIN}
        formData={formData}
        formError={formError}
        handleChange={handleChange}
        onSubmit={handleSubmitLogin}
      />
    </div>
  );
};

export default Login;
