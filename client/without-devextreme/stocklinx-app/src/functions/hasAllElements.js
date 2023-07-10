export const hasAllElements = (array1, array2) => {
  return array1.every((element) => array2.includes(element));
};
