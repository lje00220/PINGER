import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';

const SignupAddressSelect = ({ name, onChange }) => {
  return (
    <select
      name={name}
      onChange={onChange}
      className="h-[30px] w-3/4 rounded-3xl border-2 border-my-main pl-2 text-sm"
    >
      <option value="" selected disabled>
        {AUTH_INPUT_PLACEHOLDER.ADDRESS}
      </option>
      <option value="서울">서울</option>
      <option value="인천/경기">인천/경기</option>
      <option value="대전/세종/충청">대전/세종/충청</option>
      <option value="전북">전북</option>
      <option value="광주/전남">광주/전남</option>
      <option value="대구/경북">대구/경북</option>
      <option value="부산/울산/경남">부산/울산/경남</option>
      <option value="강원">강원</option>
    </select>
  );
};

export default SignupAddressSelect;
