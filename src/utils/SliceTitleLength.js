const SLICE_INDEX = 20;

const sliceTitleLength = (title) => {
  const sliceTitle = title.slice(0, SLICE_INDEX) + '...';
  return sliceTitle;
};

export default sliceTitleLength;
