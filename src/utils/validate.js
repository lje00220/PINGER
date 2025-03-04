import { QUERY_KEY } from '../constants/queryKeys';
import {
  AUTH_ERROR_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
  REVIEW_MESSAGES,
} from '../constants/toastMessages';
import supabase from '../supabase/client';

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

export const validateReviewInput = (value) => {
  if (value.length < 2 || value.length > 50) {
    return REVIEW_MESSAGES.ERROR;
  }
};

export const validateNickname = async (value, currentNickname) => {
  if (value === currentNickname) return;

  const { data } = await supabase
    .from(QUERY_KEY.USERS)
    .select('*')
    .eq('nickname', value);
  const [userData] = data;

  if (data.length === 0) return;

  if (userData.nickname?.length !== 0) {
    return AUTH_ERROR_MESSAGES.NICKNAME.SAME;
  }
};
