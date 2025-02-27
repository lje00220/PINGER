import { createBookMark } from '../api/createData';
import { deleteBookMark } from '../api/deleteData';

/**
 * 북마크 추가/취소 함수
 * @param {*} { isBookMarked, setIsBookmarked, jobId, userId }
 */
export const handleToggleBookMark = async ({
  isBookMarked,
  setIsBookmarked,
  jobId,
  userId,
}) => {
  const newBookMark = { job_id: jobId, user_id: userId };

  try {
    /** 북마크 추가/취소 */
    if (isBookMarked === false) {
      await createBookMark(newBookMark);
    } else {
      await deleteBookMark(jobId, userId);
    }

    setIsBookmarked((prev) => !prev);
  } catch (error) {
    console.error('북마크 오류', error);
  }
};
