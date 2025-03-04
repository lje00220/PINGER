import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';
import { AUTH_MODE, BUTTON_MODE, ROLE_MODE } from '../../constants/mode';
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
  const { email, password, checkpassword, nickname, role, address } = formData;

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
    <div className="flex h-[600px] w-11/12 flex-col items-center justify-center rounded-3xl bg-white p-5 shadow-lg sm:w-[500px]">
      {mode === AUTH_MODE.SIGNUP ? (
        <h2 className={AUTH_TITLE}>SIGN UP</h2>
      ) : (
        <h2 className={AUTH_TITLE}>LOG IN</h2>
      )}
      <form className="flex w-11/12 flex-col gap-3" onSubmit={onSubmit}>
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
            <section key={name}>
              <label className={AUTH_LABEL}>
                <h4 className={AUTH_FORM_TITLE}>{title}</h4>
                <div className={AUTH_INPUT_WRAPPER}>
                  <InputBar
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    minLength={minLength}
                    maxLength={maxLength}
                  />
                </div>
              </label>
              <div className={AUTH_ERROR_WRAPPER}>
                {formError[name] && <ErrorText>{formError[name]}</ErrorText>}
              </div>
            </section>
          );
        })}
        {/* 회원가입 모드 : 비밀번호 확인/닉네임/주소 input 추가 */}
        {mode === AUTH_MODE.SIGNUP && (
          <div className="flex flex-col gap-3">
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
                <section key={name}>
                  <label className={AUTH_LABEL}>
                    <h4 className={AUTH_FORM_TITLE}>{title}</h4>
                    <div className={AUTH_INPUT_WRAPPER}>
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
                        <div className="self-end">
                          <Button
                            mode={BUTTON_MODE.S}
                            type="button"
                            onClick={handleCheckNickname}
                          >
                            CHECK
                          </Button>
                        </div>
                      )}
                    </div>
                  </label>
                  <div className={AUTH_ERROR_WRAPPER}>
                    {formError[name] && (
                      <ErrorText>{formError[name]}</ErrorText>
                    )}
                  </div>
                </section>
              );
            })}
            {/* 주소 */}
            <div className="mb-3 w-full">
              <label className={AUTH_LABEL}>
                <h4 className={AUTH_FORM_TITLE}>ADDRESS</h4>
                <div className={AUTH_INPUT_WRAPPER}>
                  <SignupAddressSelect
                    value={address}
                    name="address"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            {/* 권한 */}
            <div className="mb-3">
              <div className={AUTH_LABEL}>
                <h4 className={AUTH_FORM_TITLE}>ROLE</h4>
                <div className={AUTH_RADIO_WRAPPER}>
                  <label className="min-w-[60px]">
                    <InputRadio
                      name="role"
                      value={ROLE_MODE.SEEKER}
                      onChange={handleChange}
                      checked={role === ROLE_MODE.SEEKER}
                    />
                    구직자
                  </label>
                  <label className="min-w-[60px]">
                    <InputRadio
                      name="role"
                      value={ROLE_MODE.R}
                      onChange={handleChange}
                      checked={role === ROLE_MODE.RECRUITER}
                    />
                    멘토
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={AUTH_SUBMIT_BUTTON_WRPPER}>
          {mode === AUTH_MODE.LOGIN ? (
            <Button mode={BUTTON_MODE.L} type="submit">
              로그인
            </Button>
          ) : (
            <Button mode={BUTTON_MODE.L} type="submit">
              회원가입
            </Button>
          )}
        </div>
      </form>

      {mode === AUTH_MODE.LOGIN ? (
        <div className={AUTH_PAGEMOVE_WRAPPER}>
          <p>아직 회원이 아니신가요?</p>
          <Link to={PATH.SIGNUP} className="font-semibold text-my-main">
            회원가입하기
          </Link>
        </div>
      ) : (
        <div className={AUTH_PAGEMOVE_WRAPPER}>
          <p>PINGER 회원이신가요?</p>
          <Link to={PATH.LOGIN} className="font-semibold text-my-main">
            로그인하기
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;

//tailwind class
const AUTH_TITLE = 'mb-5 text-4xl';
const AUTH_LABEL = 'flex items-center justify-between';
const AUTH_FORM_TITLE = 'font-semibold';
const AUTH_INPUT_WRAPPER = 'w-4/6 flex justify-center gap-1';
const AUTH_ERROR_WRAPPER = 'w-full h-3 text-right';
const AUTH_RADIO_WRAPPER = 'w-4/6 flex justify-center gap-5';
const AUTH_SUBMIT_BUTTON_WRPPER = 'w-full flex justify-center p-7 border-t-2';
const AUTH_PAGEMOVE_WRAPPER = 'flex w-64 justify-between';
