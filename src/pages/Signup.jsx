import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { toast } from 'react-toastify';
import supabase from '../supabase/client';
import { PATH } from '../constants/RouterPathConstants';
import AuthForm from '../components/auth/AuthForm';
import { AUTH_MODE } from '../constants/mode';
import {
  AUTH_ERROR_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
} from '../constants/toastMessages';
import { validateSignUpForm } from '../utils/validate';
import { useState } from 'react';

const Signup = () => {
  //-----navigate-----
  const navigate = useNavigate();
  //-----state-----
  const [isNicknameExisted, setIsNickNameExisted] = useState(true);

  //-----custom hook : useForm-----
  //input값 유효성 검사
  const { formData, formError, handleChange, resetForm } = useForm(
    {
      email: '',
      password: '',
      checkpassword: '',
      nickname: '',
      address: '',
      role: '',
    },
    validateSignUpForm,
  );
  //formData 구조분해할당
  const { email, password, nickname, address, role } = formData;

  //닉네임 중복 검사
  const checkNicknameExsited = async () => {
    // 예외처리 : 닉네임 빈칸
    if (!nickname.trim()) {
      return toast.warn(AUTH_ERROR_MESSAGES.NICKNAME.BLANK);
    }

    try {
      const { data } = await supabase
        .from('users')
        .select('nickname')
        .eq('nickname', nickname)
        .single();

      if (data) {
        toast.warn(AUTH_ERROR_MESSAGES.NICKNAME.SAME);
        setIsNickNameExisted(true);
      } else {
        toast.success(AUTH_SUCCESS_MESSAGES.SIGNUP.NICKNAME);
        setIsNickNameExisted(false);
      }
    } catch (error) {
      console.error('닉네임 중복시 오류 발생 : ', error.message);
      toast.error(AUTH_ERROR_MESSAGES.ERROR);
    }
  };

  //-----회원가입 로직-----
  //유저 데이터 등록
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    //예외처리 : 닉네임 중복 확인
    if (isNicknameExisted) {
      toast.warn(AUTH_ERROR_MESSAGES.NICKNAME.CHECK);
      return;
    }
    //예외처리 : 주소선택 누락
    if (!address) {
      toast.warn(AUTH_ERROR_MESSAGES.ADDRESS.BLANK);
      return;
    }

    //새로운 유저 데이터 => supabase auth.users에 insert
    const newUserData = {
      email,
      password,
      created_at: Date.now(),
      options: {
        data: {
          nickname,
          address,
          role,
        },
      },
    };
    const { data, error } = await supabase.auth.signUp(newUserData);

    console.log('newUserData', newUserData);
    //회원가입 성공
    if (data.user) {
      //유저 알람
      toast.success(AUTH_SUCCESS_MESSAGES.SIGNUP.NEW);
      //로그인 페이지로 이동
      navigate(PATH.LOGIN);
      //폼 리셋
      resetForm();
    }

    //회원가입 실패
    if (error) {
      console.log('error', error.message);
      console.log('error type', typeof error.message);
    }
  };

  return (
    <div>
      <AuthForm
        mode={AUTH_MODE.SIGNUP}
        formData={formData}
        formError={formError}
        handleChange={handleChange}
        onSubmit={handleSubmitSignUp}
        handleCheckNickname={checkNicknameExsited}
      />
    </div>
  );
};

export default Signup;
