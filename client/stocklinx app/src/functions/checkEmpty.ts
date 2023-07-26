export const checkEmpty = (obj: any): boolean | any => {
  if (Array.isArray(obj)) {
    return obj.length > 0 ? obj : false;
  }

  return obj !== null && obj !== undefined && Object.keys(obj).length > 0
    ? obj
    : false;
};
