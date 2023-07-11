export const hasAllElements = (array1: any[], array2: any[]): boolean => {
  return array1.every((element) => array2.includes(element));
};
