export const removeItem = ({ array, removeValeu, value }) => {
  array.filter((item) => item?.[removeValeu] !== value);
};
