import { createBookMark, deleteBookMark } from '../api/bookmarks';

/**
 * 북마크 추가/취소 함수
 * @param {boolean} isBookMarked
 * @param {function} setIsBookmarked
 * @param {number} jobId
 * @param {string} userId
 */
export const toggleBookMark = async ({
  isBookMarked,
  setIsBookmarked,
  jobId,
  userId,
}) => {
  try {
    /** 북마크 추가/취소 */
    if (isBookMarked === false) {
      await createBookMark(jobId, userId);
    } else {
      await deleteBookMark(jobId, userId);
    }

    setIsBookmarked(!isBookMarked);
  } catch (error) {
    console.error('북마크 오류', error);
  }
};
