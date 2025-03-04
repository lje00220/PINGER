import DATE_RANGE from '../constants/dateRange';

/**
 * 날짜 변환 함수
 *  - 연도, 월, 일을 콤마로 구분한 결과를 반환
 *
 * @param {String} date - 날짜 (ex) 20200202)
 * @returns {String} - 변환된 날짜 (ex) 2020.02.02)
 */

const separateDate = (date) => {
  // 만약 date가 falsy한 값일 경우 빈 문자열 반환 (날짜가 null인 경우가 있음)
  if (!date) {
    return '';
  }
  const strDate = String(date);
  const separateArr = [
    strDate.slice(DATE_RANGE.YEAR_START, DATE_RANGE.YEAR_END),
    strDate.slice(DATE_RANGE.MONTH_START, DATE_RANGE.MONTH_END),
    strDate.slice(DATE_RANGE.DAY_START),
  ];
  const formattedDate = separateArr.join('.');
  return formattedDate;
};

export default separateDate;
