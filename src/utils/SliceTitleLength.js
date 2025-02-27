const START_INDEX = 0;
const SLICE_INDEX = 20;
const DOT = '...';

/**
 * 채용 공고 제목의 길이를 자르기 위한 함수
 *
 * @param {string} title - 채용 공고 제목
 * @returns {string} - 채용 공고의 제목을 20자로 자른 후 "..." 추가한 문자열
 */

const sliceTitleLength = (title) => {
  const sliceTitle = title.slice(START_INDEX, SLICE_INDEX) + DOT;
  return sliceTitle;
};

export default sliceTitleLength;
