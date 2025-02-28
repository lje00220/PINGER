import { Link, useNavigate } from 'react-router-dom';
import { LongButton, ShortButton } from '../components/common/Button';
import { InputBar } from '../components/common/Input';
import useForm, { validateSignUpForm } from '../hooks/useForm';
import { useState } from 'react';
import { toast } from 'react-toastify';
import supabase from '../supabase/client';

const Signup = () => {
  //-----state-----
  const [isNicknameExisted, setIsNickNameExisted] = useState(false);
  //-----navigate-----
  const navigate = useNavigate();

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
  const { email, password, checkpassword, nickname, address, role } = formData;

  //-----회원가입 로직-----
  //닉네임 중복 검사
  const checkNicknameExsited = async () => {
    // 예외처리 : 닉네임 빈칸
    if (!nickname.trim()) {
      return toast.warn('닉네임을 입력해주세요!');
    }

    try {
      const { data } = await supabase
        .from('users')
        .select('nickname')
        .eq('nickname', nickname)
        .single();

      if (data) {
        toast.warn('동일한 닉네임이 존재합니다! 다른 닉네임을 작성해주세요.');
        setIsNickNameExisted(true);
      } else {
        toast.success('사용가능한 닉네임 입니다.');
        setIsNickNameExisted(false);
      }
    } catch (error) {
      console.error('닉네임 중복시 오류 발생 : ', error.message);
      toast.error('에러가 발생했습니다! 다시 시도해주세요.');
    }
  };

  //유저 데이터 등록
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    //예외처리 : 중복 닉네임
    if (isNicknameExisted) {
      toast.warn('닉네임 중복확인을 해주세요!');
      return;
    }

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

    //회원가입 에러코드별 예외처리
    if (error) {
      switch (error.message) {
        case 'email_exists':
          toast.warn('이미 존재하는 이메일입니다.');
          return;
        case 'user_already_exists':
          toast.warn('이미 존재하는 이메일입니다.');
          return;
        case 'weak_password':
          toast.warn('비밀번호가 취약합니다.');
          return;
        default:
          toast.error(`${error.message}`);
          return;
      }
    }

    //회원가입 성공
    if (data) {
      alert('회원가입 성공');
      //알랏은 뜨는데 토스트 문제! 왜일까
      toast.success('PINGER 회원이 되신 것을 환영합니다!');
      navigate('/');
      resetForm();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitSignUp}>
        {/* 이메일 */}
        <label>
          <h4>EMAIL</h4>
          <InputBar
            type="text"
            placeholder="이메일을 입력해주세요"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {formError.email && (
            <p className="text-xs text-red-500">{formError.email}</p>
          )}
        </label>
        {/* 비밀번호 */}
        <label>
          <h4>PW</h4>
          <InputBar
            type="password"
            placeholder="비밀번호(6-10자)를 입력해주세요"
            name="password"
            value={password}
            onChange={handleChange}
            minLength={6}
            maxLength={10}
          />
          {formError.password && (
            <p className="text-xs text-red-500">{formError.password}</p>
          )}
        </label>
        <label>
          <h4>PW</h4>
          <InputBar
            type="password"
            placeholder="비밀번호 확인"
            name="checkpassword"
            value={checkpassword}
            onChange={handleChange}
            minLength={6}
            maxLength={10}
          />
        </label>
        {formError.checkpassword && (
          <p className="text-xs text-red-500">{formError.checkpassword}</p>
        )}
        {/* 닉네임 */}
        <label>
          <h4>NICKNAME</h4>
          <InputBar
            type="text"
            placeholder="닉네임(2-6자)를 입력해주세요"
            name="nickname"
            value={nickname}
            onChange={handleChange}
            minLength={2}
            maxLength={6}
          />
          <ShortButton onClick={checkNicknameExsited}>중복확인</ShortButton>
        </label>
        {formError.nickname && (
          <p className="text-xs text-red-500">{formError.nickname}</p>
        )}
        {/* 주소 */}
        <label>
          <h4>ADDRESS</h4>
          <InputBar
            type="text"
            placeholder="주소를 입력해주세요 (서울시 강남구)"
            name="address"
            value={address}
            onChange={handleChange}
          />
          {formError.address && (
            <p className="text-xs text-red-500">{formError.address}</p>
          )}
        </label>
        {/* 권한 */}
        <label>
          <h4>ROLE</h4>
          <input
            className="h-4 w-4 accent-my-main focus:ring-my-main"
            name="role"
            value="seeker"
            type="radio"
            onChange={handleChange}
            checked={role === 'seeker'}
          />
          구직자
          <input
            className="h-4 w-4 accent-my-main focus:ring-my-main"
            name="role"
            value="recruiter"
            type="radio"
            onChange={handleChange}
            checked={role === 'recruiter'}
          />
          멘토
        </label>

        <LongButton type="submit">회원가입</LongButton>
      </form>

      <div>
        <p>이미 회원이신가요?</p>
        <Link to="/login" className="text-my-main">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default Signup;
