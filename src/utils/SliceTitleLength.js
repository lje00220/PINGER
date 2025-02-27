const START_INDEX = 0;
const SLICE_INDEX = 20;
const DOT = '...';

const sliceTitleLength = (title) => {
  const sliceTitle = title.slice(START_INDEX, SLICE_INDEX) + DOT;
  return sliceTitle;
};

export default sliceTitleLength;
