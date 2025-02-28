export const AUTH_ERROR_MESSAGES = {
  EMAIL: {
    BLANK: '이메일을 입력해주세요!',
    SAME: '이미 존재하는 회원입니다!',
    INVALIDATE: '이메일 형식에 맞춰주세요!',
  },
  PASSWORD: {
    BLANK: '비밀번호는 6-12글자 여야합니다!',
    WEEK: '취약한 비밀번호입니다!',
    DIFFER: '비밀번호가 다릅니다!',
  },
  NICKNAME: {
    BLANK: '닉네임을 입력해주세요!',
    SAME: '동일한 닉네임이 존재합니다!',
    LENGTH: '닉네임은 2-8글자 여야합니다!',
    CHECK: '닉네임 중복을 확인해주세요!',
  },
  ADDRESS: {
    BLANK: '근무 희망지역을 선택해주세요!',
  },
  ERROR: '잠시 후 다시 시도해주세요!',
};

export const AUTH_SUCCESS_MESSAGES = {
  SIGNUP: {
    NEW: 'PINGER 회원이 되신 것을 환영합니다!',
    NICKNAME: '사용가능한 닉네임입니다!',
  },
  LOGIN: '로그인 되었습니다!',
  LOGOUT: '로그아웃 되었습니다!',
};
