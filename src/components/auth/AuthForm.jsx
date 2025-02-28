import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';
import { AUTH_MODE, BUTTON_MODE } from '../../constants/mode';
import { Button } from '../common/Button';
import { InputBar, InputRadio } from '../common/Input';
import { Link } from 'react-router-dom';

import ErrorText from '../common/ErrorText';
import SignupAddressSelect from './SignupAddressInput';
import { PATH } from '../../constants/routerPath';

const AuthForm = ({
  mode,
  formData,
  formError,
  handleChange,
  onSubmit,
  handleCheckNickname,
}) => {
  //-----props-----
  const { email, password, checkpassword, nickname, role } = formData;

  const loginInputContents = [
    {
      title: 'EMAIL',
      placeholder: AUTH_INPUT_PLACEHOLDER.EMAIL,
      name: 'email',
      value: email,
      minLength: 8,
      maxLength: 30,
      type: 'text',
    },
    {
      title: 'PASSWORD',
      placeholder: AUTH_INPUT_PLACEHOLDER.PASSWORD,
      name: 'password',
      value: password,
      minLength: 6,
      maxLength: 12,
      type: 'password',
    },
  ];

  const signupInputContents = [
    {
      title: 'CHECK PW',
      placeholder: AUTH_INPUT_PLACEHOLDER.CHECK_PASSWORD,
      name: 'checkpassword',
      value: checkpassword,
      minLength: 6,
      maxLength: 12,
      type: 'password',
      checkButton: false,
    },
    {
      title: 'NICKNAME',
      placeholder: AUTH_INPUT_PLACEHOLDER.NICKNAME,
      name: 'nickname',
      value: nickname,
      minLength: 2,
      maxLength: 8,
      type: 'text',
      checkButton: true,
    },
  ];

  return (
    <div>
      <form onSubmit={onSubmit}>
        {loginInputContents.map((item) => {
          const {
            title,
            placeholder,
            name,
            value,
            minLength,
            maxLength,
            type,
          } = item;

          return (
            <label key={name}>
              <h4>{title}</h4>
              <InputBar
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                minLength={minLength}
                maxLength={maxLength}
              />
              {formError[name] && <ErrorText>{formError[name]}</ErrorText>}
            </label>
          );
        })}
        {/* 회원가입 모드 : 비밀번호 확인/닉네임/주소 input 추가 */}
        {mode === AUTH_MODE.SIGNUP && (
          <div>
            {signupInputContents.map((item) => {
              const {
                title,
                placeholder,
                name,
                value,
                minLength,
                maxLength,
                type,
                checkButton,
              } = item;

              return (
                <label key={name}>
                  <h4>{title}</h4>
                  <InputBar
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    minLength={minLength}
                    maxLength={maxLength}
                  />
                  {checkButton && (
                    <Button
                      mode={BUTTON_MODE.S}
                      type="button"
                      onClick={handleCheckNickname}
                    >
                      CHECK
                    </Button>
                  )}
                  {formError[name] && <ErrorText>{formError[name]}</ErrorText>}
                </label>
              );
            })}
            {/* 주소 */}
            <label>
              <h4>ADDRESS</h4>
              <SignupAddressSelect name="address" onChange={handleChange} />
            </label>
            {/* 권한 */}
            <div>
              <h4>ROLE</h4>
              <label>
                <InputRadio
                  name="role"
                  value="seeker"
                  onChange={handleChange}
                  checked={role === 'seeker'}
                />
                구직자
              </label>

              <label>
                <InputRadio
                  name="role"
                  value="recruiter"
                  onChange={handleChange}
                  checked={role === 'recruiter'}
                />
                멘토
              </label>
            </div>
          </div>
        )}

        {mode === AUTH_MODE.LOGIN ? (
          <Button mode={BUTTON_MODE.L} type="submit">
            로그인
          </Button>
        ) : (
          <Button mode={BUTTON_MODE.L} type="submit">
            회원가입
          </Button>
        )}
      </form>

      {mode === AUTH_MODE.LOGIN ? (
        <div>
          <p>아직 회원이 아니신가요?</p>
          <Link to={PATH.SIGNUP} className="font-semibold text-my-main">
            회원가입하기
          </Link>
        </div>
      ) : (
        <div>
          <p>회원이신가요?</p>
          <Link to={PATH.LOGIN} className="font-semibold text-my-main">
            로그인하기
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
