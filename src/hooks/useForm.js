import { useState } from 'react';

const useForm = (initailState = {}, validate) => {
  const [formData, setFormData] = useState(initailState);
  const [formError, setFormError] = useState({});

  const handleChange = (event) => {
    console.log('onChange 작동중!');
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validate) {
      const error = validate(name, value, formData.password);
      setFormError((prev) => {
        const updatedError = { ...prev };

        if (value.length === 0) {
          delete updatedError[name];
        } else {
          updatedError[name] = error;
        }

        return updatedError;
      });
    }
  };

  const resetForm = () => {
    setFormData(initailState);
    setFormError({});
  };

  return { formData, formError, handleChange, resetForm };
};

export default useForm;

export const validateSignUpForm = (name, value, password) => {
  switch (name) {
    case 'email':
      if (value.length < 8 || !value.includes('@')) {
        return '이메일 형식에 맞춰주세요';
      }
      break;
    case 'password':
      if (value.length < 6 || value.length > 10) {
        return '비밀번호는 6~10자여야 합니다';
      }
      break;
    case 'checkpassword':
      if (value !== password) {
        return '비밀번호가 다릅니다';
      }
      break;
    case 'nickname':
      if (value.length < 2 || value.length > 6) {
        return '닉네임은 2~6자여야 합니다';
      }
      break;
    case 'address':
      if (value.length < 2 || value.length > 11) {
        return "주소는 '구'까지만 입력해주세요";
      }
      break;
    default:
      break;
  }
};
