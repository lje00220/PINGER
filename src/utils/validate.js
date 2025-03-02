import { AUTH_ERROR_MESSAGES } from '../constants/toastMessages';

export const validateSignUpForm = (name, value, password) => {
  switch (name) {
    case 'email':
      if (value.length < 8 || !value.includes('@') || value.includes(' ')) {
        return AUTH_ERROR_MESSAGES.EMAIL.INVALIDATE;
      }
      break;
    case 'password':
      if (value.length < 6 || value.length > 12) {
        return AUTH_ERROR_MESSAGES.PASSWORD.BLANK;
      }
      break;
    case 'checkpassword':
      if (value !== password) {
        return AUTH_ERROR_MESSAGES.PASSWORD.DIFFER;
      }
      break;
    case 'nickname':
      if (value.length < 2 || value.length > 8) {
        return AUTH_ERROR_MESSAGES.NICKNAME.LENGTH;
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

export const validateLoginForm = (name, value) => {
  switch (name) {
    case 'email':
      if (value.length < 8 || !value.includes('@')) {
        return AUTH_ERROR_MESSAGES.EMAIL.INVALIDATE;
      }
      break;
    case 'password':
      if (value.length < 6 || value.length > 10) {
        return AUTH_ERROR_MESSAGES.PASSWORD.BLANK;
      }
  }
};
