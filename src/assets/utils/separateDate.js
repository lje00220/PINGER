/**
 * 날짜 변환 함수
 *  - 연도, 월, 일을 콤마로 구분한 결과를 반환
 *
 * @param {String} date - 날짜 (ex) 20200202)
 * @returns {String} - 변환된 날짜 (ex) 2020.02.02)
 */

const separateDate = (date) => {
  const strDate = String(date);
  const separateArr = [
    strDate.slice(0, 4),
    strDate.slice(4, 6),
    strDate.slice(6),
  ];
  const formattedDate = separateArr.join('.');
  return formattedDate;
};

export default separateDate;
