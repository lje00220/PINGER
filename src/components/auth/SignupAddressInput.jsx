import { AUTH_INPUT_PLACEHOLDER } from '../../constants/inputPlaceholder';

const SignupAddressSelect = ({ value, name, onChange }) => {
  return (
    <select
      name={name}
      value={value || ''}
      onChange={onChange}
      className="h-[30px] w-full rounded-3xl border-2 border-my-main pl-2 text-xs"
    >
      <option value="" disabled>
        {AUTH_INPUT_PLACEHOLDER.ADDRESS}
      </option>
      <option value="서울">서울</option>
      <option value="경기">경기</option>
      <option value="인천">인천</option>
      <option value="충북">충북</option>
      <option value="충남">충남</option>
      <option value="대전">대전</option>
      <option value="세종">세종</option>
      <option value="전북">전북</option>
      <option value="전남">전남</option>
      <option value="광주">광주</option>
      <option value="경북">경북</option>
      <option value="경남">경남</option>
      <option value="대구">대구</option>
      <option value="부산">부산</option>
      <option value="울산">울산</option>
      <option value="강원">강원</option>
    </select>
  );
};

export default SignupAddressSelect;
