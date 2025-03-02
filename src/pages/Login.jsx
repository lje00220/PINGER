import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { AUTH_MODE } from '../constants/mode';
import useForm from '../hooks/useForm';
import { validateLoginForm } from '../utils/validate';
import { toast } from 'react-toastify';
import {
  AUTH_ERROR_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
} from '../constants/toastMessages';
import supabase from '../supabase/client';
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
  const { email, password } = formData;

  //-----로그인 로직-----
  //유저 데이터 확인
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    // 예외처리 : 누락된 정보 확인
    if (!email || !password) {
      toast.warn(AUTH_ERROR_MESSAGES.ALL_BLANK);
      return;
    }

    //로그인하려는 유저 데이터 => supabase auth.users 데이터에서 존재 여부 확인
    const currentUser = {
      email,
      password,
    };

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword(currentUser);

      if (data) {
        //유저 알람
        toast.success(AUTH_SUCCESS_MESSAGES.LOGIN);
        //홈으로 이동
        navigate(PATH.HOME);
        //폼 리셋
        resetForm();
      }

      if (error) {
        if (error.message === 'Invalid login credentials') {
          toast.error(AUTH_ERROR_MESSAGES.LOGIN.FAIL);
          return;
        }
      }
    } catch (error) {
      toast.error(AUTH_ERROR_MESSAGES.ERROR);
      console.error('로그인 error : ', error);
    }
  };

  return (
    <div
      className="flex w-full items-center justify-center bg-my-bg"
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
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
